import React, { useState } from 'react';
import { FranceServer } from '../types/vpn';
import { Language, TRANSLATIONS } from '../data/translations';
import { Download, Copy, Check, X, FileCode, Shield } from 'lucide-react';

interface ConfigExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServer: FranceServer;
  currentIp: string;
  lang: Language;
}

export const ConfigExporterModal: React.FC<ConfigExporterModalProps> = ({
  isOpen,
  onClose,
  selectedServer,
  currentIp,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [configType, setConfigType] = useState<'wireguard' | 'openvpn'>('wireguard');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const wireguardConfig = `[Interface]
# FranceShield Ultra VPN - Dedicated French Node
# Node: ${selectedServer.name} (${selectedServer.city}, France)
PrivateKey = eI2F/x8+qY7QzN3kJ4b0V8v9P1rL4t6W8x2Z0m4K9gU=
Address = 10.66.77.2/32, fd42:42:42::2/128
DNS = 1.1.1.1, 1.0.0.1
MTU = 1420

[Peer]
PublicKey = fR4NC3+U1tR4+Sp33d+Sh13ld+P4r1s+N0d3+K3y99=
Endpoint = ${selectedServer.baseIp}:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
# 2s-Dynamic-Rotation: Enabled (Subnet: ${selectedServer.ipRange})`;

  const openvpnConfig = `client
dev tun
proto udp
remote ${selectedServer.baseIp} 1194
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
cipher AES-256-GCM
auth SHA256
key-direction 1
# FranceShield Dynamic French Exit Node: ${selectedServer.city}
<ca>
-----BEGIN CERTIFICATE-----
MIIB/zCCAaWgAwIBAgIUFr4nc3+Sh13ld+P4r1s...[FRANCE_ROOT_CA]...
-----END CERTIFICATE-----
</ca>`;

  const activeContent = configType === 'wireguard' ? wireguardConfig : openvpnConfig;
  const fileName = configType === 'wireguard' ? `franceshield-${selectedServer.city.toLowerCase()}.conf` : `franceshield-${selectedServer.city.toLowerCase()}.ovpn`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">
              {lang === 'bn' ? 'অফিসিয়াল ক্লায়েন্ট কনফিগারেশন' : 'Export Native Client Profile'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description & Tab Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            {t.exportGuide}
          </span>

          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setConfigType('wireguard')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                configType === 'wireguard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              WireGuard (.conf)
            </button>
            <button
              onClick={() => setConfigType('openvpn')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                configType === 'openvpn' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              OpenVPN (.ovpn)
            </button>
          </div>
        </div>

        {/* Code Box */}
        <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300 max-h-56 overflow-y-auto">
          <pre className="whitespace-pre-wrap">{activeContent}</pre>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-500 font-mono">
            Endpoint: {selectedServer.baseIp} ({selectedServer.city}, FR)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copied : t.copyConfig}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-md shadow-blue-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ফাইল ডাউনলোড' : 'Download File'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
