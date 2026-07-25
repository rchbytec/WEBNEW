interface Env {
  DB: D1Database;
}

interface VisitHistoryItem {
  timestamp: string;
  visitedSection: string;
}

interface VisitorRow {
  visitor_id: string;
  ip: string;
  first_seen: string;
  last_seen: string;
  visit_count: number;
  device_type: string;
  browser: string;
  location: string;
  last_section: string;
  user_agent: string;
  visit_history: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      `SELECT * FROM visitors ORDER BY last_seen DESC LIMIT 100`
    ).all<VisitorRow>();

    const visitorLogs = (results || []).map(row => {
      let history: VisitHistoryItem[] = [];
      try {
        if (row.visit_history) {
          history = JSON.parse(row.visit_history);
        }
      } catch (e) {
        history = [];
      }

      return {
        id: row.visitor_id,
        visitor_id: row.visitor_id,
        visitorToken: row.visitor_id,
        ip: row.ip || '181.16.24.110',
        firstSeen: row.first_seen || row.last_seen,
        timestamp: row.last_seen,
        visitCount: row.visit_count || 1,
        visitHistory: history,
        deviceType: (row.device_type as any) || 'Escritorio',
        browser: row.browser || 'Navegador Web',
        location: row.location || 'Argentina',
        visitedSection: row.last_section || '#inicio',
        userAgent: row.user_agent || ''
      };
    });

    return new Response(JSON.stringify({ success: true, visitorLogs }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Error query D1', visitorLogs: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    await context.env.DB.prepare(`DELETE FROM visitors`).run();
    return new Response(JSON.stringify({ success: true, visitorLogs: [] }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
