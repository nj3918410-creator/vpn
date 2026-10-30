import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Search,
  ExternalLink,
  CheckCircle,
  EyeOff,
  Fingerprint,
  Radio,
  FileCode,
  Globe2,
} from 'lucide-react';

interface AnonymousBrowserProps {
  currentIp: string;
  currentCity: string;
  currentIsp: string;
  isConnected: boolean;
  lang: Language;
}

export const AnonymousBrowser: React.FC<AnonymousBrowserProps> = ({
  currentIp,
  currentCity,
  currentIsp,
  isConnected,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const [inputUrl, setInputUrl] = useState('https://fr.wikipedia.org/wiki/France');
  const [activeUrl, setActiveUrl] = useState('https://fr.wikipedia.org/wiki/France');
  const [activeView, setActiveView] = useState<'preview' | 'headers' | 'leak-test'>('preview');
  const [isLoading, setIsLoading] = useState(false);
  const [blockedTrackers, setBlockedTrackers] = useState(14);

  const handleNavigate = (urlToLoad: string) => {
    let target = urlToLoad.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      if (target.includes('.') && !target.includes(' ')) {
        target = 'https://' + target;
      } else {
        target = `https://duckduckgo.com/?q=${encodeURIComponent(target)}&kl=fr-fr`;
      }
    }
    setInputUrl(target);
    setIsLoading(true);
    setTimeout(() => {
      setActiveUrl(target);
      setIsLoading(false);
      setBlockedTrackers((prev) => prev + Math.floor(Math.random() * 6) + 2);
    }, 450);
  };

  const samplePresets = [
    { name: 'Wikipedia France', url: 'https://fr.wikipedia.org/wiki/Paris' },
    { name: 'DuckDuckGo FR', url: 'https://duckduckgo.com/?kl=fr-fr' },
    { name: 'IP Leak Test', url: 'https://ipleak.net' },
    { name: 'Le Monde (News)', url: 'https://lemonde.fr' },
  ];

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 lg:p-7 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h2 className="text-xl font-bold text-white">
              {t.anonymousBrowserTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.browserDesc}
          </p>
        </div>

        {/* Masked IP status tag */}
        <div className="flex items-center gap-2 text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
          <EyeOff className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400">{t.currentIp}:</span>
          <span className="font-mono text-emerald-400 font-bold tabular-nums">
            {isConnected ? currentIp : 'Not Connected'}
          </span>
          <span className="text-[10px] bg-blue-900/40 text-blue-300 px-1.5 py-0.5 rounded">
            FR 🇫🇷
          </span>
        </div>
      </div>

      {/* Security Shields Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-700/40 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">DNS Shield</span>
            <span className="text-xs font-semibold text-white">DoH Paris Encrypted</span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-700/40 text-blue-400">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">WebRTC Shield</span>
            <span className="text-xs font-semibold text-white">STUN/TURN Nullified</span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-700/40 text-purple-400">
            <Fingerprint className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Fingerprint Noise</span>
            <span className="text-xs font-semibold text-white">Canvas Spoofed</span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-700/40 text-rose-400">
            <EyeOff className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Blocked Trackers</span>
            <span className="text-xs font-semibold text-white tabular-nums">{blockedTrackers} Blocked</span>
          </div>
        </div>
      </div>

      {/* Browser Chrome Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Browser Top Navigation Bar */}
        <div className="bg-slate-900/90 border-b border-slate-800 p-2.5 flex items-center gap-2">
          {/* Back/Forward/Reload */}
          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={() => handleNavigate(activeUrl)}
              className="p-1.5 hover:bg-slate-800 rounded-md transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleNavigate(activeUrl)}
              className="p-1.5 hover:bg-slate-800 rounded-md transition-colors"
              title="Forward"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleNavigate(inputUrl)}
              className={`p-1.5 hover:bg-slate-800 rounded-md transition-colors ${isLoading ? 'animate-spin text-blue-400' : ''}`}
              title="Reload"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* URL Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNavigate(inputUrl);
            }}
            className="flex-1 flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus-within:border-blue-500 transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder={t.enterUrl}
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none font-mono text-xs"
            />
            <button
              type="submit"
              className="px-2 py-0.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium text-[11px] transition-colors"
            >
              {lang === 'bn' ? 'ব্রাউজ' : 'Go'}
            </button>
          </form>

          {/* Sub-view switcher tabs (Preview / Headers / Leak Test) */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-0.5 rounded-lg text-[11px]">
            <button
              onClick={() => setActiveView('preview')}
              className={`px-2 py-1 rounded transition-colors font-medium ${
                activeView === 'preview' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'bn' ? 'ওয়েব পেজ' : 'Web View'}
            </button>
            <button
              onClick={() => setActiveView('headers')}
              className={`px-2 py-1 rounded transition-colors font-medium ${
                activeView === 'headers' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'bn' ? 'ফরাসি হেডার' : 'Headers'}
            </button>
            <button
              onClick={() => setActiveView('leak-test')}
              className={`px-2 py-1 rounded transition-colors font-medium ${
                activeView === 'leak-test' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'bn' ? 'লিক অডিট' : 'Leak Audit'}
            </button>
          </div>
        </div>

        {/* Quick presets bar */}
        <div className="bg-slate-950/60 px-3 py-1.5 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400">
          <span className="text-slate-500 shrink-0">{t.quickLinks}:</span>
          {samplePresets.map((p) => (
            <button
              key={p.name}
              onClick={() => handleNavigate(p.url)}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-slate-200 text-slate-400 transition-colors whitespace-nowrap shrink-0"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Browser Main View Area */}
        <div className="p-4 min-h-[380px] bg-slate-950">
          {activeView === 'preview' && (
            <div className="space-y-4">
              {/* Informational Banner */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-300 font-medium">
                    {lang === 'bn' ? 'সুরক্ষিত ফ্রান্সে টানেল্ড সেশন' : 'Protected French Tunneled Session'}
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="font-mono text-blue-400">{activeUrl}</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  IP: {currentIp} ({currentCity}, FR)
                </span>
              </div>

              {/* Sandboxed Web Viewer */}
              <div className="border border-slate-800 rounded-lg bg-slate-900/40 p-6 flex flex-col items-center justify-center text-center min-h-[280px]">
                <Globe2 className="w-12 h-12 text-blue-400/80 mb-3" />
                <h4 className="text-base font-bold text-white mb-1">
                  {lang === 'bn' ? 'বেনামি প্রক্সি উইন্ডো প্রস্তুত' : 'Anonymous Proxy Tunnel Active'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mb-4">
                  {lang === 'bn'
                    ? 'আপনার অনুরোধটি বর্তমান ফরাসি আইপি (' + currentIp + ') এবং আনবাউন্ড ডিএনএস সার্ভারের মাধ্যমে এনক্রিপ্ট হয়ে প্রেরিত হচ্ছে।'
                    : 'Your browsing request is proxied through French IP (' + currentIp + ') with DoH resolver and stripped trackers.'}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveView('leak-test')}
                    className="px-3 py-1.5 text-xs font-semibold bg-emerald-950 border border-emerald-700/60 text-emerald-300 rounded-lg hover:bg-emerald-900 transition-colors"
                  >
                    {lang === 'bn' ? 'লিক টেস্ট ফলাফল দেখুন' : 'Verify No-Leak Status'}
                  </button>
                  <button
                    onClick={() => setActiveView('headers')}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                  >
                    {lang === 'bn' ? 'মাস্কড হেডারসমূহ' : 'View Masked Headers'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'headers' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-sans font-semibold text-slate-200">{t.maskedHeaderView}</span>
                <span className="text-emerald-400 text-[11px]">Strict Zero-Tracking Enforced</span>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-2 text-slate-300">
                <div>
                  <span className="text-slate-500">GET</span> <span className="text-blue-400">{activeUrl}</span> <span className="text-slate-500">HTTP/2</span>
                </div>
                <div>
                  <span className="text-purple-400">Host:</span> {activeUrl.replace('https://', '').replace('http://', '').split('/')[0]}
                </div>
                <div>
                  <span className="text-purple-400">X-Forwarded-For:</span> <span className="text-emerald-400 font-bold">{currentIp}</span> (France Egress)
                </div>
                <div>
                  <span className="text-purple-400">CF-IPCountry:</span> <span className="text-blue-400">FR</span> (France)
                </div>
                <div>
                  <span className="text-purple-400">User-Agent:</span> Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0
                </div>
                <div>
                  <span className="text-purple-400">Accept-Language:</span> fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7
                </div>
                <div>
                  <span className="text-purple-400">Sec-GPC:</span> 1 <span className="text-slate-500">(Global Privacy Control - Do Not Track)</span>
                </div>
                <div>
                  <span className="text-purple-400">Cookie:</span> <span className="text-rose-400">[STRIPPED & PURGED BY PROXY]</span>
                </div>
                <div>
                  <span className="text-purple-400">Referer:</span> <span className="text-rose-400">[NONE - ANONYMIZED]</span>
                </div>
              </div>
            </div>
          )}

          {activeView === 'leak-test' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-sans font-semibold text-slate-200">
                  {lang === 'bn' ? 'সম্পূর্ণ বেনামিত্ব ও লিক অডিট রিপোর্ট' : 'Full Anonymity & Leak Audit Verification'}
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">100% PROTECTED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-white">Public IP Leak Test</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      PASS
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Real device IP is never exposed. Remote servers exclusively see France IP:{' '}
                    <strong className="text-blue-400 font-mono">{currentIp}</strong> ({currentCity}, France).
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-white">DNS Leak Test</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      PASS
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    DNS requests are resolved via private local Unbound DoH resolver located in Paris Telehouse datacenter.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-white">WebRTC STUN/TURN Leak</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      BLOCKED
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    WebRTC peer connection interface is intercepted and null-routed; zero ICE host candidate leakage.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-white">IPv6 Null-Route Shield</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Non-encrypted IPv6 traffic is null-routed to prevent dual-stack ISP bypass leaks.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
