/**
 * Helper per tracking lato server (User-Agent, bot, ecc.). Usato solo dalle API routes.
 */

export function detectDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk|android(?!.*mobile)/i.test(ua)) return 'tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera|mini|windows\s+ce|palm|smartphone|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

export function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('chrome') && !ua.includes('edg')) return 'Chrome';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('edg')) return 'Edge';
  if (ua.includes('opera') || ua.includes('opr')) return 'Opera';
  if (ua.includes('msie') || ua.includes('trident')) return 'IE';
  return 'Unknown';
}

export function detectOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('mac') || ua.includes('darwin')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  return 'Unknown';
}

const BOTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot', 'sogou', 'exabot',
  'facebot', 'ia_archiver', 'facebookexternalhit', 'twitterbot', 'rogerbot', 'linkedinbot',
  'embedly', 'quora', 'pinterest', 'slackbot', 'redditbot', 'applebot', 'whatsapp', 'flipboard',
  'tumblr', 'bitlybot', 'skypeuripreview', 'nuzzel', 'discordbot', 'qseero', 'pinterestbot',
];

export function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOTS.some((bot) => ua.includes(bot));
}

export function anonymizeIp(ip: string): string {
  if (!ip) return '0.0.0.0';
  const parts = ip.split('.');
  if (parts.length === 4 && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  if (ip.includes(':')) {
    const idx = ip.lastIndexOf(':');
    return idx > 0 ? ip.substring(0, idx + 1) + '0:0:0:0' : '0.0.0.0';
  }
  return '0.0.0.0';
}
