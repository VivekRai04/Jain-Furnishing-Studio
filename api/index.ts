import 'dotenv/config';
import express, { type Request, type Response } from "express";
import session from "express-session";
import { join } from "path";
import { registerRoutes } from "../server/routes";
import { serveStatic, log } from "../server/vite";

declare module 'express-session' {
  interface SessionData {
    admin?: boolean;
    lastAdminActivity?: number;
  }
}

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

// Create a shared app instance
const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

app.use(express.json({
  verify: (req: any, _res: any, buf: Buffer) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Serve static assets
app.use('/assets', express.static(join(process.cwd(), 'attached_assets')));

// Store the app for reuse
let appReady = false;

// Initialize app routes once
async function initApp() {
  if (appReady) return;
  
  await registerRoutes(app);
  
  // Error handling middleware
  app.use((err: any, _req: Request, res: Response) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Serve static files
  const distPath = join(process.cwd(), 'dist', 'public');
  app.use(express.static(distPath));
  
  // SPA fallback
  app.use('*', (_req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
  
  appReady = true;
}

// Vercel serverless handler
export default async function handler(req: Request, res: Response) {
  await initApp();
  app(req, res);
}
