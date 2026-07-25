import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

const devVisitorsMiddleware = (): Plugin => {
  let devVisitors: any[] = [];
  return {
    name: 'dev-visitors-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/visitors')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');

        if (req.method === 'GET' && req.url === '/api/visitors') {
          res.end(JSON.stringify({ success: true, visitorLogs: devVisitors }));
          return;
        }

        if (req.method === 'DELETE' && req.url === '/api/visitors') {
          devVisitors = [];
          res.end(JSON.stringify({ success: true, visitorLogs: [] }));
          return;
        }

        if (req.method === 'POST' && req.url === '/api/visitors/promote') {
          let bodyStr = '';
          req.on('data', chunk => bodyStr += chunk);
          req.on('end', () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const { old_visitor_id, new_visitor_id } = body;
              if (old_visitor_id && new_visitor_id) {
                const idx = devVisitors.findIndex(v => v.visitor_id === old_visitor_id || v.id === old_visitor_id);
                if (idx !== -1) {
                  devVisitors[idx] = {
                    ...devVisitors[idx],
                    id: new_visitor_id,
                    visitor_id: new_visitor_id,
                    visitorToken: new_visitor_id
                  };
                }
              }
              res.end(JSON.stringify({ success: true, visitorLogs: devVisitors }));
            } catch (e) {
              res.end(JSON.stringify({ success: true, visitorLogs: devVisitors }));
            }
          });
          return;
        }

        if (req.method === 'POST' && req.url === '/api/visitors/register') {
          let bodyStr = '';
          req.on('data', chunk => bodyStr += chunk);
          req.on('end', () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const vid = body.visitor_id || `vtok_${Date.now()}`;
              const currentTimestamp = new Date().toLocaleString('es-AR');
              const targetSection = body.visitedSection || '#inicio';

              const existingIdx = devVisitors.findIndex(v => v.visitor_id === vid);
              if (existingIdx !== -1) {
                const existing = devVisitors[existingIdx];
                const history = existing.visitHistory || [];
                const updatedHistory = history[0]?.visitedSection !== targetSection 
                  ? [{ timestamp: currentTimestamp, visitedSection: targetSection }, ...history]
                  : history;

                devVisitors[existingIdx] = {
                  ...existing,
                  timestamp: currentTimestamp,
                  visitedSection: targetSection,
                  visitCount: existing.visitCount + (history[0]?.visitedSection !== targetSection ? 1 : 0),
                  visitHistory: updatedHistory
                };
              } else {
                devVisitors.unshift({
                  id: vid,
                  visitor_id: vid,
                  ip: '181.16.24.110',
                  firstSeen: currentTimestamp,
                  timestamp: currentTimestamp,
                  visitCount: 1,
                  visitHistory: [{ timestamp: currentTimestamp, visitedSection: targetSection }],
                  deviceType: 'Móvil',
                  browser: 'Chrome (Móvil)',
                  location: 'Neuquén, Argentina',
                  visitedSection: targetSection,
                  userAgent: body.userAgent || ''
                });
              }

              res.end(JSON.stringify({ success: true, visitorLogs: devVisitors }));
            } catch (e) {
              res.end(JSON.stringify({ success: true, visitorLogs: devVisitors }));
            }
          });
          return;
        }

        next();
      });
    }
  };
};

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devVisitorsMiddleware()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
