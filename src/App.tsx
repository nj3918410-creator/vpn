/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FranceServer, SecurityShieldStatus } from './types/vpn';
import { FRANCE_SERVERS } from './data/franceServers';
import { FRANCE_100_IPS, FranceIPItem } from './data/franceIps';
import { Language, TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { VPNStatusHero } from './components/VPNStatusHero';
import { IPCatalogPanel } from './components/IPCatalogPanel';
import { FranceMap } from './components/FranceMap';
import { AnonymousBrowser } from './components/AnonymousBrowser';
import { SpeedTestModal } from './components/SpeedTestModal';
import { ConfigExporterModal } from './components/ConfigExporterModal';
import datacenterImg from './assets/images/france_datacenter_1791994085761.jpg';
import shieldTechImg from './assets/images/france_shield_tech_1791994111147.jpg';
import {
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  Lock,
  ArrowRight,
  Server,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const t = TRANSLATIONS[lang];

  const [currentTab, setCurrentTab] = useState<'dashboard' | 'ips' | 'map' | 'browser' | 'config'>('dashboard');
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // Selected IP item from 100+ France IP list
  const [selectedIpItem, setSelectedIpItem] = useState<FranceIPItem>(FRANCE_100_IPS[0]);
  const [selectedServer, setSelectedServer] = useState<FranceServer>(FRANCE_SERVERS[0]);

  // Security shields
  const [shields, setShields] = useState<SecurityShieldStatus>({
    killSwitch: true,
    dnsLeakProtection: true,
    webrtcBlocker: true,
    ipv6LeakShield: true,
    canvasSpoofing: true,
    trackerShield: true,
  });

  // Modals
  const [isSpeedTestOpen, setIsSpeedTestOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // When user selects an IP from the 100+ list
  const handleSelectIp = (ipItem: FranceIPItem) => {
    setSelectedIpItem(ipItem);
    setIsConnected(true);

    // Sync matching server node for map & telemetry
    const matched = FRANCE_SERVERS.find(
      (s) => s.city.toLowerCase() === ipItem.city.toLowerCase()
    );
    if (matched) {
      setSelectedServer({
        ...matched,
        baseIp: ipItem.ip,
        pingMs: ipItem.pingMs,
        isp: ipItem.isp,
      });
    } else {
      setSelectedServer({
        id: ipItem.id,
        name: `${ipItem.city} Dedicated Node`,
        nameBn: `${ipItem.cityBn} ডেডিকেটেড নোড`,
        city: ipItem.city,
        cityBn: ipItem.cityBn,
        datacenter: ipItem.datacenter,
        ipRange: `${ipItem.ip.substring(0, ipItem.ip.lastIndexOf('.'))}.0/24`,
        baseIp: ipItem.ip,
        asn: ipItem.asn,
        isp: ipItem.isp,
        pingMs: ipItem.pingMs,
        bandwidthGbps: parseInt(ipItem.bandwidth) || 10,
        loadPercent: ipItem.loadPercent,
        coordinates: ipItem.coordinates,
        protocol: 'WireGuard',
        isOnline: true,
      });
    }
  };

  // Master Connect/Disconnect Handler
  const handleToggleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
      }, 400);
    }
  };

  const handleToggleShield = (key: keyof SecurityShieldStatus) => {
    setShields((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Background Datacenter Graphic Ambient Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-15">
        <img
          src={datacenterImg}
          alt="France Datacenter Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter saturate-50 blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950" />
      </div>

      {/* Strict Top Bar Contract Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        isConnected={isConnected}
        onToggleConnect={handleToggleConnect}
        isConnecting={isConnecting}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Active Dedicated IP Status Banner */}
        <div className="bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">
              {lang === 'bn' ? '১০০+ ফ্রান্স ভেরিফায়েড আইপি ফ্লিট প্রস্তুত' : '100+ Verified France Dedicated & Residential Fleet Ready'}
            </span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-slate-400 font-mono hidden sm:inline">
              {selectedIpItem.isp} ({selectedIpItem.city}, FR)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">
              {lang === 'bn' ? 'সক্রিয় আইপি:' : 'Active IP:'}
            </span>
            <span className="font-mono text-blue-400 font-bold bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-800/40 tabular-nums">
              {selectedIpItem.ip}
            </span>
            <button
              onClick={() => setCurrentTab('ips')}
              className="text-xs text-blue-300 hover:text-white underline underline-offset-2 transition-colors ml-1 font-medium"
            >
              {lang === 'bn' ? 'আইপি পরিবর্তন করুন (১০০+)' : 'Switch IP (100+)'}
            </button>
          </div>
        </div>

        {/* Tab Content Rendering */}
        {currentTab === 'dashboard' && (
          <VPNStatusHero
            isConnected={isConnected}
            isConnecting={isConnecting}
            onToggleConnect={handleToggleConnect}
            selectedServer={selectedServer}
            selectedIpItem={selectedIpItem}
            shields={shields}
            onToggleShield={handleToggleShield}
            onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
            onOpenConfigModal={() => setIsConfigModalOpen(true)}
            onGoToIpList={() => setCurrentTab('ips')}
            onGoToMap={() => setCurrentTab('map')}
            lang={lang}
          />
        )}

        {currentTab === 'ips' && (
          <IPCatalogPanel
            ips={FRANCE_100_IPS}
            selectedIpItem={selectedIpItem}
            onSelectIp={handleSelectIp}
            isConnected={isConnected}
            lang={lang}
          />
        )}

        {currentTab === 'map' && (
          <FranceMap
            servers={FRANCE_SERVERS}
            selectedServer={selectedServer}
            onSelectServer={(srv) => {
              setSelectedServer(srv);
              // Find matching IP in that city
              const match = FRANCE_100_IPS.find((i) => i.city.toLowerCase() === srv.city.toLowerCase());
              if (match) setSelectedIpItem(match);
            }}
            isConnected={isConnected}
            lang={lang}
          />
        )}

        {currentTab === 'browser' && (
          <AnonymousBrowser
            currentIp={selectedIpItem.ip}
            currentCity={selectedIpItem.city}
            currentIsp={selectedIpItem.isp}
            isConnected={isConnected}
            lang={lang}
          />
        )}

        {currentTab === 'config' && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  {lang === 'bn' ? 'নেটিভ WireGuard ও OpenVPN ক্লায়েন্ট প্রফাইল' : 'Native WireGuard & OpenVPN Client Profiles'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'bn'
                    ? `আপনার নির্বাচিত আইপি (${selectedIpItem.ip} - ${selectedIpItem.city}) দিয়ে অফিসিয়াল অ্যাপের জন্য কনফিগ জেনারেট করা হয়েছে।`
                    : `Pre-configured profile for your selected IP (${selectedIpItem.ip} - ${selectedIpItem.city}) ready for official clients.`}
                </p>
              </div>

              <button
                onClick={() => setIsConfigModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-md shadow-blue-600/20"
              >
                {lang === 'bn' ? 'কনফিগ মডাল খুলুন' : 'Open Config Studio'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature card 1 with graphic lock image */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={shieldTechImg}
                      alt="French Cryptographic Lock"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">WireGuard Kernel Protocol</h4>
                      <span className="text-[11px] text-slate-400 block font-mono">Noise_IKpsk2 · ChaCha20-Poly1305</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {lang === 'bn'
                      ? `নির্বাচিত ফরাসি আইপি ${selectedIpItem.ip}-এর সাথে সর্বোচ্চ ১০ গিগাবিট ব্যান্ডউইথ ও অতি-দ্রুত কার্নেল সংযোগ প্রদান করে।`
                      : `Ultra high-speed kernel tunneling bound directly to selected French IP ${selectedIpItem.ip}.`}
                  </p>
                </div>

                <button
                  onClick={() => setIsConfigModalOpen(true)}
                  className="w-full py-2 px-3 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-800 rounded-lg transition-colors text-center"
                >
                  {t.downloadWireguard}
                </button>
              </div>

              {/* Feature card 2 */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">OpenVPN Stealth Tunnel</h4>
                      <span className="text-[11px] text-slate-400 block font-mono">AES-256-GCM · SHA256 Handshake</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'কঠোর ফায়ারওয়াল এবং ডিপ প্যাকেট ইন্সপেকশন (DPI) বাইপাস করার জন্য টিসিপি ৪৪৩ পোর্ট স্টেলথ মাস্কিং সমর্থন করে।'
                      : 'Robust battle-tested protocol supporting port 443 stealth encapsulation to bypass restrictive network firewalls.'}
                  </p>
                </div>

                <button
                  onClick={() => setIsConfigModalOpen(true)}
                  className="w-full py-2 px-3 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-800 rounded-lg transition-colors text-center"
                >
                  {t.downloadOpenvpn}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feature Highlights Bento Section */}
        <div className="border-t border-slate-800/80 pt-8">
          <div className="mb-4">
            <h3 className="text-base font-bold text-white">
              {lang === 'bn' ? 'কেন FranceShield ভিপিএন অনন্য?' : 'Why FranceShield Architecture?'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'bn'
                ? 'একক ফরাসি নেটওয়ার্ক অবকাঠামো এবং ১০০+ ডেডিকেটেড আইপির সরাসরি সিলেক্টর'
                : 'Dedicated French optical infrastructure with instant 100+ IP selection'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4.5">
              <span className="text-xs font-semibold text-blue-400 block mb-1">
                {lang === 'bn' ? '১. শতভাগ ফ্রান্স সার্ভার ও ১০০+ আইপি' : '1. 100% France Fleet & 100+ IPs'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'প্যারিস, মার্সেই, লিওঁ, লিল, স্ট্রাসবার্গ ও বোর্দোর শীর্ষ টিয়ার-৪ ডেটাসেন্টারের ১২০+ ভেরিফায়েড আইপি পুল।'
                  : 'Over 120+ verified French IPs across Paris, Marseille, Lyon, Lille, Strasbourg, and Bordeaux.'}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4.5">
              <span className="text-xs font-semibold text-emerald-400 block mb-1">
                {lang === 'bn' ? '২. পছন্দের আইপিতে স্থির সংযোগ' : '2. Stable Connection On Demand'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'কোনো বিরক্তিকর অটো-রোটেশন নেই। আপনি যে আইপি নির্বাচন করবেন, সংযোগ বিচ্ছিন্ন না করা পর্যন্ত সেটিই অবিচল থাকবে।'
                  : 'Zero unwanted automatic rotating. Whichever IP you select remains permanently connected until changed.'}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4.5">
              <span className="text-xs font-semibold text-purple-400 block mb-1">
                {lang === 'bn' ? '৩. র‍্যাম-অনলি নো-লগ গ্যারান্টি' : '3. RAM-Only Zero Disk Logging'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'সার্ভারে কোনো হার্ডডিস্ক বা এসএসডি স্টোরেজ নেই। বিদ্যুৎ সংযোগ বিচ্ছিন্ন করার সাথে সাথে সমস্ত সাময়িক ডেটা চিরতরে মুছে যায়।'
                  : 'Volatile RAM-only operating systems ensure that zero logs, IP records, or browsing footprints are ever written to disk.'}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 sm:px-6 mt-12 relative z-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-semibold text-slate-300">FranceShield Ultra VPN</span>
            <span aria-hidden="true">·</span>
            <span>Paris · Marseille · Lyon · Lille · Strasbourg · Bordeaux</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-slate-400">100+ French IPs · 10 Gbps Tier-4</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">GDPR Compliant Privacy</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SpeedTestModal
        isOpen={isSpeedTestOpen}
        onClose={() => setIsSpeedTestOpen(false)}
        selectedServer={selectedServer}
        lang={lang}
      />

      <ConfigExporterModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        selectedServer={selectedServer}
        currentIp={selectedIpItem.ip}
        lang={lang}
      />
    </div>
  );
}
