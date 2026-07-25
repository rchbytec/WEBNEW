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
      // Check if target newVid already exists in D1
      const targetExisting = await context.env.DB.prepare(
        `SELECT visitor_id FROM visitors WHERE visitor_id = ?`
      ).bind(newVid).first();

      if (!targetExisting) {
        // Rename existing record's visitor_id keeping all history, IP, counters intact
        await context.env.DB.prepare(
          `UPDATE visitors SET visitor_id = ? WHERE visitor_id = ?`
        ).bind(newVid, oldVid).run();
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
