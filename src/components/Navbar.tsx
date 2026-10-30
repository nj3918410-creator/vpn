import React from 'react';
import { Language, TRANSLATIONS } from '../data/translations';
import { ShieldCheck, ShieldAlert, Globe, Download } from 'lucide-react';

interface NavbarProps {
  currentTab: 'dashboard' | 'ips' | 'map' | 'browser' | 'config';
  setCurrentTab: (tab: 'dashboard' | 'ips' | 'map' | 'browser' | 'config') => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isConnected: boolean;
  onToggleConnect: () => void;
  isConnecting: boolean;
  onOpenDownloadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  isConnected,
  onToggleConnect,
  isConnecting,
  onOpenDownloadModal,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setCurrentTab('dashboard');
          }}
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 group"
        >
          <span className="w-2.5 h-6 bg-gradient-to-b from-blue-500 via-white to-red-500 rounded-xs inline-block" />
          <span>FranceShield Ultra</span>
        </a>

        {/* Zone 2: 4-5 Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              currentTab === 'dashboard'
                ? 'text-blue-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.navStatus}
            {currentTab === 'dashboard' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('ips')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              currentTab === 'ips'
                ? 'text-blue-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.navIpList}
            {currentTab === 'ips' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('map')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              currentTab === 'map'
                ? 'text-blue-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.navMap}
            {currentTab === 'map' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('browser')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              currentTab === 'browser'
                ? 'text-blue-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.navBrowser}
            {currentTab === 'browser' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('config')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              currentTab === 'config'
                ? 'text-blue-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.navConfig}
            {currentTab === 'config' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Language Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenDownloadModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-600/50 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-emerald-500/20"
            title="Download & Install App / অ্যাপ ডাউনলোড ও ইনস্টল"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
            <span>{lang === 'bn' ? 'অ্যাপ ডাউনলোড' : 'Download App'}</span>
          </button>

          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
            title="Switch Language / ভাষা পরিবর্তন"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          <button
            onClick={onToggleConnect}
            disabled={isConnecting}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
              isConnected
                ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
            }`}
          >
            {isConnected ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{t.disconnectBtn}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isConnecting ? t.connecting : t.connectBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
