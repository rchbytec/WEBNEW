interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body: any = await context.request.json().catch(() => ({}));
    const oldVid = body.old_visitor_id;
    const newVid = body.new_visitor_id;

    if (!oldVid || !newVid) {
      return new Response(JSON.stringify({ success: false, error: 'Faltan IDs de visitante' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (oldVid !== newVid) {
      // Check if oldVid exists in D1
      const oldExisting = await context.env.DB.prepare(
        `SELECT visitor_id FROM visitors WHERE visitor_id = ?`
      ).bind(oldVid).first();

      if (oldExisting) {
        // Update existing record's visitor_id preserving all metadata
        await context.env.DB.prepare(
          `UPDATE visitors SET visitor_id = ? WHERE visitor_id = ?`
        ).bind(newVid, oldVid).run();
      } else {
        // If oldVid wasn't found, check if newVid exists
        const targetExisting = await context.env.DB.prepare(
          `SELECT visitor_id FROM visitors WHERE visitor_id = ?`
        ).bind(newVid).first();

        if (!targetExisting) {
          const currentTimestamp = new Date().toLocaleString('es-AR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          });
          const clientIp = context.request.headers.get('cf-connecting-ip') || 
                           context.request.headers.get('x-real-ip') || 
                           '181.16.24.110';
          const ua = context.request.headers.get('user-agent') || 'Desconocido';
          const initialHistory = [{ timestamp: currentTimestamp, visitedSection: '#inicio' }];

          await context.env.DB.prepare(`
            INSERT INTO visitors (visitor_id, ip, first_seen, last_seen, visit_count, device_type, browser, location, last_section, user_agent, visit_history)
            VALUES (?, ?, ?, ?, 1, 'Escritorio', 'Navegador Web (Escritorio)', 'Argentina', '#inicio', ?, ?)
          `).bind(newVid, clientIp, currentTimestamp, currentTimestamp, ua, JSON.stringify(initialHistory)).run();
        }
      }
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
        ip: row.ip || '181.16.24.110',
        firstSeen: row.first_seen || row.last_seen,
        timestamp: row.last_seen,
        visitCount: row.visit_count || 1,
        visitHistory: h,
        deviceType: row.device_type || 'Escritorio',
        browser: row.browser || 'Navegador Web',
        location: row.location || 'Argentina',
        visitedSection: row.last_section || '#inicio',
        userAgent: row.user_agent || ''
      };
    });

    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      'Set-Cookie': `rbt_vid=${encodeURIComponent(newVid)}; Max-Age=31536000; Path=/; SameSite=Lax`
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
