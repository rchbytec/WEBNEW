import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface VisitHistoryItem {
  timestamp: string;
  visitedSection: string;
}

interface VisitorLog {
  id: string;
  visitor_id: string;
  visitorToken: string;
  ip: string;
  firstSeen: string;
  timestamp: string;
  visitCount: number;
  visitHistory: VisitHistoryItem[];
  deviceType: 'Escritorio' | 'Móvil' | 'Tablet';
  browser: string;
  location: string;
  visitedSection: string;
  userAgent: string;
}

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('Could not create data dir', e);
  }
}

// Load initial visitor logs from file if available
let serverVisitorLogs: VisitorLog[] = [];
if (fs.existsSync(VISITORS_FILE)) {
  try {
    const raw = fs.readFileSync(VISITORS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      serverVisitorLogs = parsed;
    }
  } catch (e) {
    console.error('Error loading visitor logs from file', e);
  }
}

const saveVisitorsToFile = () => {
  try {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(serverVisitorLogs, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving visitors to file', e);
  }
};

// Helper: Parse Device and Browser from User-Agent
const parseDeviceInfo = (ua: string, screenWidth?: number) => {
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
  else if (/Chrome/i.test(ua) || /CriOS/i.test(ua)) browserName = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browserName = 'Safari';
  else if (/Firefox|FxiOS/i.test(ua)) browserName = 'Firefox';
  else if (/SamsungBrowser/i.test(ua)) browserName = 'Samsung Internet';

  return { deviceType, browserName };
};

// Helper: Get Geolocation string from IP
const ipGeoCache = new Map<string, string>();
const fetchLocationForIp = async (ip: string): Promise<string> => {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return 'Buenos Aires, CF, AR';
  }

  if (ipGeoCache.has(ip)) {
    return ipGeoCache.get(ip)!;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const res = await fetch(`https://ipwho.is/${ip}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false) {
        const city = data.city || '';
        const region = data.region || '';
        const country = data.country || 'Argentina';

        const parts: string[] = [];
        if (city) parts.push(city);
        if (region && region.toLowerCase() !== city.toLowerCase()) parts.push(region);
        if (country) parts.push(country);

        const locStr = parts.length > 0 ? parts.join(', ') : 'Argentina';
        ipGeoCache.set(ip, locStr);
        return locStr;
      }
    }
  } catch (e) {
    // silent catch on timeout or network error
  }

  const fallback = 'Argentina';
  ipGeoCache.set(ip, fallback);
  return fallback;
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // CORS and Cache Control Middleware
  app.use('/api', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-visitor-id, Authorization');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  app.get('/api/visitors', (_req, res) => {
    res.json({ success: true, visitorLogs: serverVisitorLogs });
  });

  app.delete('/api/visitors', (_req, res) => {
    serverVisitorLogs = [];
    saveVisitorsToFile();
    res.json({ success: true, visitorLogs: [] });
  });

  app.post('/api/visitors/register', async (req, res) => {
    try {
      const { visitor_id, visitedSection, userAgent, locationOverride, screenWidth } = req.body || {};
      
      // Extract visitor_id from body, query, header, or cookie
      let vid = visitor_id || (req.query.visitor_id as string) || (req.headers['x-visitor-id'] as string);
      
      if (!vid && req.headers.cookie) {
        const match = req.headers.cookie.match(/(?:^|; )rbt_vid=([^;]*)/);
        if (match && match[1]) {
          vid = decodeURIComponent(match[1]);
        }
      }

      if (!vid) {
        vid = `vtok_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      }

      // Set cookie header on response
      res.setHeader('Set-Cookie', `rbt_vid=${encodeURIComponent(vid)}; Max-Age=31536000; Path=/; SameSite=Lax`);

      const ua = userAgent || req.headers['user-agent'] || 'Desconocido';

      // Extract client IP address
      let clientIp = (req.headers['x-forwarded-for'] as string || '')
        .split(',')[0]
        .trim();
      
      if (!clientIp) {
        clientIp = (req.headers['x-real-ip'] as string) || req.socket.remoteAddress || '181.16.24.110';
      }

      // Format IPv6 loopback or local IP
      if (clientIp === '::1' || clientIp === '127.0.0.1' || clientIp.startsWith('::ffff:127.')) {
        clientIp = '181.16.24.110';
      } else if (clientIp.startsWith('::ffff:')) {
        clientIp = clientIp.replace('::ffff:', '');
      }

      const { deviceType, browserName } = parseDeviceInfo(ua, screenWidth);
      const fullBrowserLabel = `${browserName} (${deviceType})`;

      let location = locationOverride;
      if (!location || location === 'Desconocido' || location === 'Argentina') {
        location = await fetchLocationForIp(clientIp);
      }

      const currentTimestamp = new Date().toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const targetSection = visitedSection || '#inicio';

      // Find existing record for this visitor_id or IP+UA combo
      const existingIdx = serverVisitorLogs.findIndex(l => 
        l.visitor_id === vid || 
        l.id === vid ||
        (l.ip === clientIp && l.userAgent === ua)
      );

      if (existingIdx !== -1) {
        const existing = serverVisitorLogs[existingIdx];
        const firstSeen = existing.firstSeen || existing.timestamp || currentTimestamp;
        
        const existingHistory = Array.isArray(existing.visitHistory) && existing.visitHistory.length > 0
          ? existing.visitHistory
          : [{ timestamp: existing.timestamp || currentTimestamp, visitedSection: existing.visitedSection || '#inicio' }];

        const latestSection = existingHistory[0]?.visitedSection;

        // Count as new visit if section changed OR > 2 minutes since last log
        const newHistory = (latestSection !== targetSection)
          ? [{ timestamp: currentTimestamp, visitedSection: targetSection }, ...existingHistory]
          : existingHistory;

        const updatedEntry: VisitorLog = {
          ...existing,
          id: vid,
          visitor_id: vid,
          visitorToken: vid,
          ip: clientIp,
          firstSeen,
          timestamp: currentTimestamp,
          visitCount: Math.max((existing.visitCount || 1) + (latestSection !== targetSection ? 1 : 0), 1),
          visitHistory: newHistory,
          visitedSection: targetSection,
          browser: fullBrowserLabel,
          deviceType,
          location: location || existing.location || 'Argentina',
          userAgent: ua
        };

        serverVisitorLogs.splice(existingIdx, 1);
        serverVisitorLogs.unshift(updatedEntry);
      } else {
        const newEntry: VisitorLog = {
          id: vid,
          visitor_id: vid,
          visitorToken: vid,
          ip: clientIp,
          firstSeen: currentTimestamp,
          timestamp: currentTimestamp,
          visitCount: 1,
          visitHistory: [{ timestamp: currentTimestamp, visitedSection: targetSection }],
          deviceType,
          browser: fullBrowserLabel,
          location: location || 'Argentina',
          visitedSection: targetSection,
          userAgent: ua
        };
        serverVisitorLogs.unshift(newEntry);
      }

      // Limit in-memory visitor logs to max 100
      if (serverVisitorLogs.length > 100) {
        serverVisitorLogs = serverVisitorLogs.slice(0, 100);
      }

      saveVisitorsToFile();
      console.log(`[VISITOR LOGGED] ${vid} (${deviceType}) IP: ${clientIp} Location: ${location}`);

      res.json({ success: true, visitorLogs: serverVisitorLogs });
    } catch (err) {
      console.error('Error in /api/visitors/register:', err);
      res.status(500).json({ success: false, visitorLogs: serverVisitorLogs });
    }
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
