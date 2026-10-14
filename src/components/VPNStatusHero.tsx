import React from 'react';
import { FranceServer, SecurityShieldStatus } from '../types/vpn';
import { FranceIPItem } from '../data/franceIps';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  ShieldCheck,
  ShieldAlert,
  Power,
  Zap,
  Activity,
  Lock,
  ArrowUpDown,
  Gauge,
  Download,
  Server,
  Layers,
  Check,
  ExternalLink,
} from 'lucide-react';

interface VPNStatusHeroProps {
  isConnected: boolean;
  isConnecting: boolean;
  onToggleConnect: () => void;
  selectedServer: FranceServer;
  selectedIpItem: FranceIPItem;
  shields: SecurityShieldStatus;
  onToggleShield: (key: keyof SecurityShieldStatus) => void;
  onOpenSpeedTest: () => void;
  onOpenConfigModal: () => void;
  onGoToIpList: () => void;
  onGoToMap: () => void;
  lang: Language;
}

export const VPNStatusHero: React.FC<VPNStatusHeroProps> = ({
  isConnected,
  isConnecting,
  onToggleConnect,
  selectedServer,
  selectedIpItem,
  shields,
  onToggleShield,
  onOpenSpeedTest,
  onOpenConfigModal,
  onGoToIpList,
  onGoToMap,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-6">
      {/* Hero Banner Grid */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:p-8 backdrop-blur-md">
        {/* Ambient background glow */}
        <div
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
            isConnected ? 'bg-blue-600/20 opacity-100' : 'bg-slate-800/10 opacity-40'
          }`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Big Connection Orb & Action */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* France Tricolor pill */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <span className="w-2.5 h-4 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-xs inline-block" />
              <span className="font-semibold text-slate-300">
                {lang === 'bn' ? '১০০% ফ্রান্স আল্ট্রাফাস্ট ব্যাকবোন' : '100% France Dedicated Backbone'}
              </span>
              <span aria-hidden="true">·</span>
              <span>WireGuard Noise Protocol</span>
            </div>

            {/* Main Power Button Button */}
            <div className="my-2 relative flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div
                className={`w-36 h-36 rounded-full transition-all duration-700 flex items-center justify-center ${
                  isConnected
                    ? 'bg-blue-950/60 border-2 border-blue-500/80 shadow-[0_0_50px_rgba(37,99,235,0.35)]'
                    : isConnecting
                    ? 'bg-amber-950/40 border-2 border-amber-500/60 animate-pulse'
                    : 'bg-slate-950/80 border-2 border-slate-800'
                }`}
              >
                <button
                  onClick={onToggleConnect}
                  disabled={isConnecting}
                  aria-label={isConnected ? t.disconnectBtn : t.connectBtn}
                  className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                    isConnected
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-inner'
                      : isConnecting
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Power
                    className={`w-9 h-9 transition-transform duration-200 ${
                      isConnected ? 'scale-110 text-white' : 'text-slate-400'
                    }`}
                  />
                  <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">
                    {isConnected ? 'ON' : isConnecting ? 'SYNC' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>

            {/* Connection Status Text */}
            <div className="mt-3">
              <h2 className="text-2xl font-extrabold text-white">
                {isConnected ? t.connected : isConnecting ? t.connecting : t.disconnected}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isConnected
                  ? lang === 'bn'
                    ? 'আপনার নেটওয়ার্ক ট্র্যাফিক সুরক্ষিত ফরাসি টানেলের মাধ্যমে এনক্রিপ্ট হচ্ছে।'
                    : 'Your network traffic is fully shielded through the French optical tunnel.'
                  : lang === 'bn'
                  ? 'সংযোগ স্থাপন করতে বোতামে চাপ দিন।'
                  : 'Press the power switch to encrypt your connection.'}
              </p>
            </div>
          </div>

          {/* Right Column: Active Node Card & Rotating IP Box */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Selected French IP Box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-slate-300">
                    {lang === 'bn' ? 'সরাসরি কানেক্টেড ফরাসি আইপি' : 'Dedicated French IP Endpoint'}
                  </span>
                </div>
                <button
                  onClick={onGoToIpList}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? '১০০+ আইপি তালিকা ব্রাউজ করুন' : 'Browse 100+ IP List'}</span>
                </button>
              </div>

              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block">{t.currentIp}</span>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                    {isConnected ? selectedIpItem.ip : '185.15.68.44'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">{t.activeLocation}</span>
                  <span className="text-sm font-semibold text-slate-200">
                    {lang === 'bn' ? selectedIpItem.cityBn : selectedIpItem.city}, France 🇫🇷
                  </span>
                </div>
              </div>

              {/* IP Profile Specs */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-medium">{selectedIpItem.isp}</span>
                  <span>·</span>
                  <span className="font-mono text-slate-400">{selectedIpItem.asn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    {selectedIpItem.type}
                  </span>
                  <span className="font-mono text-emerald-400">{selectedIpItem.pingMs} ms</span>
                </div>
              </div>
            </div>

            {/* Selected Server Card */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">
                      {lang === 'bn' ? selectedServer.nameBn : selectedServer.name}
                    </span>
                    <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 font-mono">
                      {selectedServer.pingMs} ms
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    {selectedServer.datacenter} · {selectedServer.bandwidthGbps} Gbps Port
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onGoToMap}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  {lang === 'bn' ? 'সার্ভার বদলান' : 'Change Server'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Quick Telemetry Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">{t.ping} (France Node)</span>
          <span className="text-xl font-bold font-mono text-white mt-1 block tabular-nums">
            {selectedServer.pingMs} ms
          </span>
          <span className="text-[11px] text-emerald-400 block mt-0.5">Ultra Low Jitter (±0.4ms)</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">{t.bandwidth}</span>
          <span className="text-xl font-bold font-mono text-white mt-1 block tabular-nums">
            10.0 Gbps
          </span>
          <span className="text-[11px] text-blue-400 block mt-0.5">Unmetered French Optical Fiber</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">{t.cipher}</span>
          <span className="text-base font-bold font-mono text-white mt-1 block truncate">
            ChaCha20-Poly1305
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">AEAD 256-bit Ephemeral Key</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">{t.protocol}</span>
          <span className="text-xl font-bold font-mono text-white mt-1 block">
            WireGuard
          </span>
          <span className="text-[11px] text-emerald-400 block mt-0.5">Kernel Speed Optimization</span>
        </div>
      </div>

      {/* Security Shield Controls & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Security Toggles */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-3">
            {lang === 'bn' ? 'বেনামিত্ব ও সুরক্ষা কনফিগারেশন' : 'Privacy & Security Guard Settings'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Kill Switch */}
            <div
              onClick={() => onToggleShield('killSwitch')}
              className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                shields.killSwitch
                  ? 'bg-slate-950/80 border-blue-600/40 text-white'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="text-xs font-semibold block text-slate-200">{t.killSwitch}</span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn' ? 'সংযোগ বিচ্ছিন্ন হলে ট্র্যাফিক অবরুদ্ধ হবে' : 'Block all traffic if VPN drops'}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  shields.killSwitch ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 bg-slate-900'
                }`}
              >
                {shields.killSwitch && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* DNS Leak */}
            <div
              onClick={() => onToggleShield('dnsLeakProtection')}
              className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                shields.dnsLeakProtection
                  ? 'bg-slate-950/80 border-blue-600/40 text-white'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="text-xs font-semibold block text-slate-200">{t.dnsLeakShield}</span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn' ? 'প্যারিস Unbound DoH সমাধানকারী' : 'Route via Paris Encrypted DoH'}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  shields.dnsLeakProtection ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 bg-slate-900'
                }`}
              >
                {shields.dnsLeakProtection && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* WebRTC Blocker */}
            <div
              onClick={() => onToggleShield('webrtcBlocker')}
              className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                shields.webrtcBlocker
                  ? 'bg-slate-950/80 border-blue-600/40 text-white'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="text-xs font-semibold block text-slate-200">{t.webrtcShield}</span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn' ? 'ব্রাউজার STUN/TURN রিকোয়েস্ট ব্লক' : 'Nullify STUN/TURN IP leaks'}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  shields.webrtcBlocker ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 bg-slate-900'
                }`}
              >
                {shields.webrtcBlocker && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* IPv6 Shield */}
            <div
              onClick={() => onToggleShield('ipv6LeakShield')}
              className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                shields.ipv6LeakShield
                  ? 'bg-slate-950/80 border-blue-600/40 text-white'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="text-xs font-semibold block text-slate-200">{t.ipv6Shield}</span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn' ? 'অসুরক্ষিত IPv6 ট্র্যাফিক নাল-রুট' : 'Null-route non-tunnel IPv6'}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  shields.ipv6LeakShield ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 bg-slate-900'
                }`}
              >
                {shields.ipv6LeakShield && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Hub */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-2">
              {lang === 'bn' ? 'দ্রুত টুলস' : 'Quick Utilities'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {lang === 'bn'
                ? 'ফ্রান্স নোডের সাথে লাইভ স্পিড টেস্ট বা অফিসিয়াল অ্যাপের জন্য কনফিগ জেনারেট করুন।'
                : 'Perform optical speed diagnostics or generate ready-to-use WireGuard client profiles.'}
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={onOpenSpeedTest}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/20"
            >
              <Gauge className="w-4 h-4" />
              <span>{t.runSpeedTest}</span>
            </button>

            <button
              onClick={onOpenConfigModal}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>{lang === 'bn' ? 'WireGuard / OpenVPN কনফিগ' : 'Export Native Client Config'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
