import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../data/translations';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  Apple, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose, lang }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res) {
        setInstallSuccess(true);
      }
    }
  };

  const isBn = lang === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {isBn ? 'FranceShield VPN অ্যাপ ডাউনলোড ও ইনস্টল' : 'Download & Install FranceShield VPN'}
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                  PWA & APK
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isBn 
                  ? 'আপনার মোবাইল (Android/iOS) অথবা কম্পিউটারে অ্যাপ হিসেবে সরাসরি ব্যবহার করুন'
                  : 'Install natively on your Android, iOS, or Desktop PC'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Direct 1-Click Install Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/30 border border-blue-500/30 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    {isBn ? 'সরাসরি ১-ক্লিকে ইনস্টল' : 'Direct 1-Click Install'}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">
                  {isBn ? 'ফোনে বা পিসিতে অ্যাপ হিসেবে ইনস্টল করুন' : 'Install as Standalone Mobile App'}
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  {isBn 
                    ? 'কোনো ঝামেলা ছাড়াই হোম স্ক্রিনে অ্যাপ আইকন চলে আসবে, ফুল-স্ক্রিন চলবে এবং দ্রুত ওপেন হবে।'
                    : 'Adds app icon directly on your home screen, launches instantly without browser address bar.'}
                </p>
              </div>

              {isInstalled || installSuccess ? (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-semibold whitespace-nowrap">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? 'ইনস্টল সম্পন্ন হয়েছে!' : 'Already Installed!'}</span>
                </div>
              ) : isInstallable ? (
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>{isBn ? 'এখনই ইনস্টল করুন' : 'Install App Now'}</span>
                </button>
              ) : (
                <div className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                  {isBn ? 'ব্রাউজার মেনু থেকে ইনস্টলযোগ্য' : 'Install via Browser Menu'}
                </div>
              )}
            </div>
          </div>

          {/* Tabbed Guide for Android / PC / iOS */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isBn ? 'ডিভাইস অনুযায়ী অ্যাপ ডাউনলোড/ইনস্টল নির্দেশিকা:' : 'Device-Specific Installation Guides:'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Android Guide */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm">
                  <Smartphone className="w-4 h-4" />
                  <span>{isBn ? 'Android মোবাইল ব্যবহারকারীদের জন্য' : 'For Android Phones'}</span>
                </div>
                <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    {isBn 
                      ? 'মোবাইলে Chrome ব্রাউজারে এই সাইটটি খুলুন।'
                      : 'Open this site in Chrome on your phone.'}
                  </li>
                  <li>
                    {isBn 
                      ? 'ডানপাশের উপরের ৩-ডট মেনুতে (⋮) চাপ দিন।'
                      : 'Tap the top-right 3 dots menu (⋮).'}
                  </li>
                  <li>
                    <span className="text-blue-400 font-semibold">
                      {isBn ? '"Install app" বা "Add to Home screen"' : '"Install app" or "Add to Home screen"'}
                    </span>
                    {isBn ? ' অপশনটিতে চাপ দিন।' : ' option.'}
                  </li>
                  <li>
                    {isBn 
                      ? 'আপনার ফোনের অ্যাপ তালিকায় FranceVPN আইকনটি ইনস্টল হয়ে যাবে।'
                      : 'The FranceVPN app will be added to your app drawer.'}
                  </li>
                </ol>
              </div>

              {/* iOS Guide */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2.5 text-blue-400 font-semibold text-sm">
                  <Apple className="w-4 h-4" />
                  <span>{isBn ? 'iPhone / iPad (iOS) ব্যবহারকারীদের জন্য' : 'For iPhone & iPad (iOS)'}</span>
                </div>
                <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    {isBn 
                      ? 'Safari ব্রাউজারে লিঙ্কটি ওপেন করুন।'
                      : 'Open the link in Apple Safari browser.'}
                  </li>
                  <li>
                    {isBn 
                      ? 'নিচের Share (শেয়ার) বাটনে ট্যাপ করুন।'
                      : 'Tap the Share icon at the bottom.'}
                  </li>
                  <li>
                    <span className="text-blue-400 font-semibold">
                      {isBn ? '"Add to Home Screen"' : '"Add to Home Screen"'}
                    </span>
                    {isBn ? ' চাপুন এবং Add সিলেক্ট করুন।' : ' and select Add.'}
                  </li>
                  <li>
                    {isBn 
                      ? 'হোম স্ক্রিনে অ্যাপ হিসেবে চালু হবে।'
                      : 'It runs full-screen like a native iOS app.'}
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Android .APK Conversion Card (PWABuilder / Native APK) */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Layers className="w-3.5 h-3.5" />
                <span>{isBn ? 'Android .APK প্যাকেজ তৈরি (PWABuilder)' : 'Generate Signed Android .APK'}</span>
              </div>
              <p className="text-xs text-slate-300">
                {isBn 
                  ? 'আপনি কি গুগল প্লে স্টোর বা সরাসরি ইনস্টলেবল .APK ফাইল চান? PWABuilder দিয়ে এক ক্লিকে .apk ফাইল প্যাকেজ ডাউনলোড করতে পারেন।'
                  : 'Want a standalone .apk package file? Use PWABuilder to generate a ready-to-sideload APK.'}
              </p>
            </div>
            <a
              href="https://www.pwabuilder.com/reportcard?site=https://nj3918410-creator.github.io/vpn/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition whitespace-nowrap shrink-0"
            >
              <span>{isBn ? 'APK জেনারেটরে যান' : 'Open APK Builder'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* WireGuard VPN Config Profile Download */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isBn ? 'WireGuard VPN প্রোফাইল (.conf) ডাউনলোড' : 'WireGuard Client Profile (.conf)'}</span>
              </div>
              <p className="text-xs text-slate-300">
                {isBn 
                  ? 'WireGuard বা OpenVPN মোবাইল অ্যাপের মাধ্যমে পুরো ফোনের ইন্টারনেট ফ্রান্স সার্ভার দিয়ে চালাতে চান? কনফিগ ফাইল ডাউনলোড করুন।'
                  : 'Route your entire phone traffic through France VPN nodes using the official WireGuard app.'}
              </p>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.wireguard.android"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition whitespace-nowrap shrink-0"
            >
              <span>{isBn ? 'WireGuard অ্যাপ (Play Store)' : 'WireGuard App (Play Store)'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {isBn ? 'ভার্সন ২.১.০ • ফ্রান্স ডেডিকেটেড নোডস' : 'Version 2.1.0 • France Dedicated Nodes'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
