import React, { useState, useEffect } from 'react';
import { FranceServer } from '../types/vpn';
import { Language, TRANSLATIONS } from '../data/translations';
import { Gauge, X, Play, RotateCw, CheckCircle2, Zap } from 'lucide-react';

interface SpeedTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServer: FranceServer;
  lang: Language;
}

export const SpeedTestModal: React.FC<SpeedTestModalProps> = ({
  isOpen,
  onClose,
  selectedServer,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [currentPing, setCurrentPing] = useState(selectedServer.pingMs);
  const [jitter, setJitter] = useState(0.5);

  const startTest = () => {
    setIsRunning(true);
    setPhase('ping');
    setDownloadSpeed(0);
    setUploadSpeed(0);

    // Ping phase
    setTimeout(() => {
      setCurrentPing(selectedServer.pingMs + Math.floor(Math.random() * 2));
      setJitter(Number((0.3 + Math.random() * 0.4).toFixed(1)));
      setPhase('download');

      // Download phase animation
      let dl = 50;
      const dlInterval = setInterval(() => {
        dl += Math.floor(Math.random() * 95) + 35;
        if (dl >= 920 + Math.floor(Math.random() * 60)) {
          dl = 948.4;
          clearInterval(dlInterval);
          setDownloadSpeed(dl);
          setPhase('upload');

          // Upload phase animation
          let ul = 40;
          const ulInterval = setInterval(() => {
            ul += Math.floor(Math.random() * 80) + 25;
            if (ul >= 830 + Math.floor(Math.random() * 50)) {
              ul = 874.2;
              clearInterval(ulInterval);
              setUploadSpeed(ul);
              setPhase('complete');
              setIsRunning(false);
            } else {
              setUploadSpeed(ul);
            }
          }, 80);
        } else {
          setDownloadSpeed(dl);
        }
      }, 70);
    }, 600);
  };

  useEffect(() => {
    if (isOpen && phase === 'idle') {
      startTest();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">
              {t.speedTestTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Server Target */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block">{t.activeLocation}</span>
            <span className="font-semibold text-white">
              {selectedServer.name} ({selectedServer.city}, France 🇫🇷)
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block">Backbone Port</span>
            <span className="font-mono text-emerald-400 font-bold">10 Gbps Tier-4</span>
          </div>
        </div>

        {/* Center Live Meter */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-44 h-44 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center bg-slate-950/70">
            {/* Spinning indicator ring when running */}
            {isRunning && (
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
            )}

            <Zap className={`w-6 h-6 mb-1 ${isRunning ? 'text-amber-400 animate-pulse' : 'text-blue-400'}`} />

            <span className="text-3xl font-extrabold font-mono text-white tracking-tight tabular-nums">
              {phase === 'download'
                ? downloadSpeed.toFixed(0)
                : phase === 'upload'
                ? uploadSpeed.toFixed(0)
                : phase === 'complete'
                ? downloadSpeed.toFixed(0)
                : '...'}
            </span>

            <span className="text-xs text-slate-400 font-medium uppercase mt-0.5">
              Mbps
            </span>

            <span className="text-[10px] text-blue-400 font-semibold mt-1">
              {phase === 'ping'
                ? 'Testing Ping...'
                : phase === 'download'
                ? 'Testing Download...'
                : phase === 'upload'
                ? 'Testing Upload...'
                : phase === 'complete'
                ? 'Optimal'
                : 'Ready'}
            </span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-4 gap-2 text-center font-mono">
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">{t.ping}</span>
            <span className="text-sm font-bold text-emerald-400 tabular-nums">
              {currentPing} ms
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">{t.jitter}</span>
            <span className="text-sm font-bold text-white tabular-nums">
              {jitter} ms
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">{t.downloadSpeed}</span>
            <span className="text-sm font-bold text-blue-400 tabular-nums">
              {downloadSpeed > 0 ? `${downloadSpeed.toFixed(0)} M` : '--'}
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">{t.uploadSpeed}</span>
            <span className="text-sm font-bold text-indigo-400 tabular-nums">
              {uploadSpeed > 0 ? `${uploadSpeed.toFixed(0)} M` : '--'}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            {t.close}
          </button>

          <button
            onClick={startTest}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg transition-colors shadow-md shadow-blue-600/20"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? t.testing : (lang === 'bn' ? 'আবার পরীক্ষা করুন' : 'Test Again')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
