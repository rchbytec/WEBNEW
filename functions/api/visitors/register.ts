interface Env {
  DB: D1Database;
}

interface VisitHistoryItem {
  timestamp: string;
  visitedSection: string;
}

function parseDeviceInfo(ua: string, screenWidth?: number) {
  let deviceType: 'Escritorio' | 'Móvil' | 'Tablet' = 'Escritorio';

  if (/iPad|Tablet|Android(?!.*Mobile)|Nexus 7|Nexus 10/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|SM-J7|Samsung|Mobile/i.test(ua)) {
    deviceType = 'Móvil';
  } else if (screenWidth && screenWidth <= 768) {
    deviceType = 'Móvil';
  }

  let browserName = 'Navegador Web';
  if (/Edg/i.test(ua)) browserName = 'Edge';
  else if (/Chrome|CriOS/i.test(ua)) browserName = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browserName = 'Safari';
  else if (/Firefox|FxiOS/i.test(ua)) browserName = 'Firefox';
  else if (/SamsungBrowser/i.test(ua)) browserName = 'Samsung Internet';

  return { deviceType, browserName };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body: any = await context.request.json().catch(() => ({}));
    
    // Extract visitor_id from body, header, or cookie
    let vid = body.visitor_id || context.request.headers.get('x-visitor-id');
    if (!vid) {
      const cookieHeader = context.request.headers.get('Cookie') || '';
      const match = cookieHeader.match(/(?:^|; )rbt_vid=([^;]*)/);
      if (match && match[1]) {
        vid = decodeURIComponent(match[1]);
      }
    }

    if (!vid) {
      vid = `vtok_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    }

    const ua = body.userAgent || context.request.headers.get('user-agent') || 'Desconocido';
    
    // Cloudflare native IP header
    const clientIp = context.request.headers.get('cf-connecting-ip') || 
                     context.request.headers.get('x-real-ip') || 
                     '181.16.24.110';

    // Cloudflare native Geolocation object from request.cf
    const cf = (context.request as any).cf;
    const city = cf?.city || '';
    const region = cf?.region || '';
    const country = cf?.country || 'Argentina';

    const locParts = [city, region, country].filter(Boolean);
    const location = locParts.length > 0 ? locParts.join(', ') : 'Argentina';

    const { deviceType, browserName } = parseDeviceInfo(ua, body.screenWidth);
    const fullBrowser = `${browserName} (${deviceType})`;
    const targetSection = body.visitedSection || '#inicio';

    const currentTimestamp = new Date().toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Query D1 for existing visitor
    const existing = await context.env.DB.prepare(
      `SELECT * FROM visitors WHERE visitor_id = ?`
    ).bind(vid).first<any>();

    if (existing) {
      let history: VisitHistoryItem[] = [];
      try {
        if (existing.visit_history) {
          history = JSON.parse(existing.visit_history);
        }
      } catch (e) {
        history = [];
      }

      const lastSection = history[0]?.visitedSection;
      const isNewSection = lastSection !== targetSection;
      
      let newHistory = history;
      if (isNewSection || history.length === 0) {
        newHistory = [{ timestamp: currentTimestamp, visitedSection: targetSection }, ...history];
      }

      const newVisitCount = Math.max((existing.visit_count || 1) + (isNewSection ? 1 : 0), 1);

      await context.env.DB.prepare(`
        UPDATE visitors SET 
          ip = ?,
          last_seen = ?,
          visit_count = ?,
          device_type = ?,
          browser = ?,
          location = ?,
          last_section = ?,
          user_agent = ?,
          visit_history = ?
        WHERE visitor_id = ?
      `).bind(
        clientIp,
        currentTimestamp,
        newVisitCount,
        deviceType,
        fullBrowser,
        location,
        targetSection,
        ua,
        JSON.stringify(newHistory),
        vid
      ).run();
    } else {
      // Insert new visitor
      const initialHistory: VisitHistoryItem[] = [{ timestamp: currentTimestamp, visitedSection: targetSection }];
      
      await context.env.DB.prepare(`
        INSERT INTO visitors (visitor_id, ip, first_seen, last_seen, visit_count, device_type, browser, location, last_section, user_agent, visit_history)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        vid,
        clientIp,
        currentTimestamp,
        currentTimestamp,
        1,
        deviceType,
        fullBrowser,
        location,
        targetSection,
        ua,
        JSON.stringify(initialHistory)
      ).run();
    }

    // Fetch updated visitor logs list (top 100)
    const { results } = await context.env.DB.prepare(
      `SELECT * FROM visitors ORDER BY last_seen DESC LIMIT 100`
    ).all<any>();

    const visitorLogs = (results || []).map(row => {
      let h = [];
      try { h = JSON.parse(row.visit_history); } catch (e) { h = []; }
      return {
        id: row.visitor_id,
        visitor_id: row.visitor_id,
        visitorToken: row.visitor_id,
        ip: row.ip || clientIp,
        firstSeen: row.first_seen || row.last_seen,
        timestamp: row.last_seen,
        visitCount: row.visit_count || 1,
        visitHistory: h,
        deviceType: row.device_type || 'Escritorio',
        browser: row.browser || fullBrowser,
        location: row.location || location,
        visitedSection: row.last_section || targetSection,
        userAgent: row.user_agent || ua
      };
    });

    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      'Set-Cookie': `rbt_vid=${encodeURIComponent(vid)}; Max-Age=31536000; Path=/; SameSite=Lax`
    });

    return new Response(JSON.stringify({ success: true, visitorLogs }), {
      headers: responseHeaders
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
