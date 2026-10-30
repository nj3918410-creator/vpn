import React from 'react';
import { FranceServer } from '../types/vpn';
import { Language, TRANSLATIONS } from '../data/translations';
import { Server, Zap, Shield, Activity, MapPin } from 'lucide-react';

interface FranceMapProps {
  servers: FranceServer[];
  selectedServer: FranceServer;
  onSelectServer: (server: FranceServer) => void;
  isConnected: boolean;
  lang: Language;
}

export const FranceMap: React.FC<FranceMapProps> = ({
  servers,
  selectedServer,
  onSelectServer,
  isConnected,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 lg:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            {t.navMap}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {t.franceOnlyNotice} · Tier-4 Data Centers & 10 Gbps Fiber
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800/80">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>7/7 Nodes Online · 0% Packet Loss</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive SVG Hexagon of France */}
        <div className="lg:col-span-7 relative bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex items-center justify-center overflow-hidden min-h-[380px]">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* SVG Map of France Territory */}
          <svg
            viewBox="0 0 600 560"
            className="w-full h-auto max-h-[460px] drop-shadow-xl select-none"
            aria-label="France Server Map"
          >
            {/* France Silhouette Polygon */}
            <path
              d="M 280,30 
                 L 340,35 
                 L 380,70 
                 L 430,100 
                 L 510,135 
                 L 540,195 
                 L 490,270 
                 L 510,340 
                 L 470,410 
                 L 430,470 
                 L 410,480 
                 L 380,470 
                 L 320,490 
                 L 260,495 
                 L 220,465 
                 L 190,420 
                 L 140,360 
                 L 110,310 
                 L 140,250 
                 L 100,180 
                 L 130,130 
                 L 190,110 
                 L 230,80 Z"
              fill="#091326"
              stroke="#1e3a5f"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="transition-colors duration-300 hover:fill-[#0c1a35]"
            />

            {/* Internal Region Divisions (Light hairline) */}
            <path
              d="M 300,130 L 400,260 L 320,380 M 340,35 L 320,200 L 220,260 M 430,100 L 380,180 L 490,270"
              fill="none"
              stroke="#172e4c"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.6"
            />

            {/* Connection lines from selected server if connected */}
            {isConnected && (
              <line
                x1={selectedServer.coordinates.x * 6}
                y1={selectedServer.coordinates.y * 5.6}
                x2="300"
                y2="530"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            )}

            {/* Server Markers */}
            {servers.map((server) => {
              const isSelected = selectedServer.id === server.id;
              const posX = server.coordinates.x * 6;
              const posY = server.coordinates.y * 5.6;

              return (
                <g
                  key={server.id}
                  onClick={() => onSelectServer(server)}
                  className="cursor-pointer group"
                >
                  {/* Outer pulse aura if selected */}
                  {isSelected && (
                    <circle
                      cx={posX}
                      cy={posY}
                      r="18"
                      fill="#3b82f6"
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Node Outer Circle */}
                  <circle
                    cx={posX}
                    cy={posY}
                    r={isSelected ? '10' : '7'}
                    fill={isSelected ? '#2563eb' : '#0f172a'}
                    stroke={isSelected ? '#60a5fa' : '#38bdf8'}
                    strokeWidth="2"
                    className="transition-all duration-200 group-hover:scale-125"
                  />

                  {/* Inner node dot */}
                  <circle
                    cx={posX}
                    cy={posY}
                    r="3.5"
                    fill={isSelected ? '#ffffff' : '#38bdf8'}
                  />

                  {/* City Label */}
                  <text
                    x={posX}
                    y={posY - 14}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#94a3b8'}
                    fontSize="11"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight={isSelected ? '700' : '500'}
                    className="transition-colors group-hover:fill-white"
                  >
                    {lang === 'bn' ? server.cityBn : server.city}
                  </text>

                  {/* Ping pill on map */}
                  <text
                    x={posX}
                    y={posY + 22}
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="9.5"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {server.pingMs}ms
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Compass / Country indicator */}
          <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-2 text-[11px] text-slate-300 flex items-center gap-2">
            <span className="font-semibold text-blue-400">RÉPUBLIQUE FRANÇAISE</span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-emerald-400">10G BACKBONE</span>
          </div>
        </div>

        {/* Selected Server Details & Fleet List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Active / Highlighted Card */}
          <div className="bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 border border-blue-900/40 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-blue-400 font-semibold">
                  {lang === 'bn' ? 'নির্বাচিত নোড' : 'Selected France Node'}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {lang === 'bn' ? selectedServer.nameBn : selectedServer.name}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded">
                {selectedServer.pingMs} ms
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs border-t border-slate-800/80 pt-3">
              <div>
                <span className="text-slate-400 block">{t.activeLocation}</span>
                <span className="font-semibold text-slate-200">
                  {lang === 'bn' ? selectedServer.cityBn : selectedServer.city}, France 🇫🇷
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{t.protocol}</span>
                <span className="font-mono text-blue-300 font-medium">WireGuard 10Gbps</span>
              </div>
              <div>
                <span className="text-slate-400 block">ISP & ASN</span>
                <span className="text-slate-200 font-medium truncate block">
                  {selectedServer.isp}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{t.load}</span>
                <span className="font-mono text-emerald-400 font-medium">
                  {selectedServer.loadPercent}% {lang === 'bn' ? '(স্বাভাবিক)' : '(Optimal)'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Data Center:</span>
              <span className="text-slate-300 font-mono text-[11px]">{selectedServer.datacenter}</span>
            </div>
          </div>

          {/* All France Nodes Compact List */}
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
            <span className="text-xs font-semibold text-slate-400 block px-1 mb-1">
              {t.franceNodes} ({servers.length})
            </span>
            {servers.map((s) => {
              const active = selectedServer.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectServer(s)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all text-xs border ${
                    active
                      ? 'bg-blue-950/40 border-blue-600/50 text-white'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className={`w-3.5 h-3.5 ${active ? 'text-blue-400' : 'text-slate-500'}`} />
                    <div>
                      <span className="font-medium text-slate-200 block">
                        {lang === 'bn' ? s.nameBn : s.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {s.isp} · {s.bandwidthGbps} Gbps
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono text-[11px]">
                    <span className="text-emerald-400 font-medium">{s.pingMs} ms</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
