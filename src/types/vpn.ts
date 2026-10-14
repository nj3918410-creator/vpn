export interface FranceServer {
  id: string;
  name: string;
  nameBn: string;
  city: string;
  cityBn: string;
  datacenter: string;
  ipRange: string;
  baseIp: string;
  asn: string;
  isp: string;
  pingMs: number;
  bandwidthGbps: number;
  loadPercent: number;
  coordinates: { x: number; y: number }; // Relative SVG percentages
  protocol: 'WireGuard' | 'OpenVPN-UDP' | 'OpenVPN-TCP' | 'IKEv2';
  isOnline: boolean;
}

export interface RotatedIP {
  id: string;
  ip: string;
  timestamp: string;
  city: string;
  isp: string;
  durationSeconds: number;
  encryptedBytes: number;
}

export interface SecurityShieldStatus {
  killSwitch: boolean;
  dnsLeakProtection: boolean;
  webrtcBlocker: boolean;
  ipv6LeakShield: boolean;
  canvasSpoofing: boolean;
  trackerShield: boolean;
}

export interface ProxyBrowserTab {
  id: string;
  url: string;
  title: string;
  isLoading: boolean;
  currentMaskedIp: string;
  userAgent: string;
  blockedTrackersCount: number;
  loadTimeMs: number;
}
