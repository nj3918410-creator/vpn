import React, { useState, useMemo } from 'react';
import { FranceIPItem } from '../data/franceIps';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  Search,
  Check,
  Zap,
  Globe,
  Radio,
  Copy,
  CheckCheck,
  Server,
  Layers,
  SlidersHorizontal,
} from 'lucide-react';

interface IPCatalogPanelProps {
  ips: FranceIPItem[];
  selectedIpItem: FranceIPItem;
  onSelectIp: (ipItem: FranceIPItem) => void;
  isConnected: boolean;
  lang: Language;
}

export const IPCatalogPanel: React.FC<IPCatalogPanelProps> = ({
  ips,
  selectedIpItem,
  onSelectIp,
  isConnected,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique cities
  const cities = useMemo(() => {
    const list = Array.from(new Set(ips.map((i) => i.city)));
    return list;
  }, [ips]);

  // Filtered IPs
  const filteredIps = useMemo(() => {
    return ips.filter((item) => {
      const matchSearch =
        searchQuery === '' ||
        item.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.isp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.datacenter.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCity = selectedCity === 'all' || item.city.toLowerCase() === selectedCity.toLowerCase();
      const matchType = selectedType === 'all' || item.type.toLowerCase() === selectedType.toLowerCase();

      return matchSearch && matchCity && matchType;
    });
  }, [ips, searchQuery, selectedCity, selectedType]);

  const handleCopy = (ip: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ip);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 lg:p-7 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h2 className="text-xl font-bold text-white">
              {lang === 'bn' ? '১০০+ ফ্রান্স ভেরিফায়েড আইপি ক্যাটালগ' : '100+ Verified France Dedicated & Residential IP Fleet'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'bn'
              ? 'যেকোনো আইপিতে ক্লিক করে সরাসরি সংযুক্ত হোন। কোনো অটো-রোটেশন নেই—আপনার নির্বাচিত আইপিটি স্থিরভাবে কানেক্টেড থাকবে।'
              : 'Click any French IP to connect instantly. Stable connection without rotation on your chosen node.'}
          </p>
        </div>

        {/* Counter */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{ips.length} {lang === 'bn' ? 'টি ফরাসি আইপি সক্রিয়' : 'French IPs Online'}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchIpPlaceholder}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          <span className="text-slate-500 text-[11px] shrink-0">{lang === 'bn' ? 'ধরণ:' : 'Type:'}</span>
          {(['all', 'Residential', 'Datacenter', 'Streaming', 'P2P'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {type === 'all'
                ? t.allTypes
                : type === 'Residential'
                ? (lang === 'bn' ? 'রেসিডেন্সিয়াল' : 'Residential')
                : type === 'Datacenter'
                ? (lang === 'bn' ? 'ডেটাসেন্টার' : 'Datacenter')
                : type === 'Streaming'
                ? (lang === 'bn' ? 'স্ট্রিমিং' : 'Streaming')
                : 'P2P'}
            </button>
          ))}
        </div>
      </div>

      {/* City Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs border-b border-slate-800/80">
        <span className="text-slate-500 text-[11px] shrink-0">{lang === 'bn' ? 'শহর:' : 'City:'}</span>
        <button
          onClick={() => setSelectedCity('all')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
            selectedCity === 'all'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.allCities} ({ips.length})
        </button>
        {cities.map((city) => {
          const count = ips.filter((i) => i.city === city).length;
          return (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
                selectedCity === city
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {city} ({count})
            </button>
          );
        })}
      </div>

      {/* 100+ IP Table / Grid */}
      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/60 max-h-[560px] overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 sticky top-0 z-20 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 backdrop-blur-md">
            <tr>
              <th className="py-3 px-4 font-semibold">French IP Address</th>
              <th className="py-3 px-4 font-semibold">City & Datacenter</th>
              <th className="py-3 px-4 font-semibold">ISP & ASN</th>
              <th className="py-3 px-4 font-semibold">Network Category</th>
              <th className="py-3 px-4 font-semibold text-right">Ping</th>
              <th className="py-3 px-4 font-semibold text-right">Bandwidth</th>
              <th className="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
            {filteredIps.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-sans">
                  {lang === 'bn' ? 'কোনো ফরাসি আইপি পাওয়া যায়নি।' : 'No French IPs match your filter criteria.'}
                </td>
              </tr>
            ) : (
              filteredIps.map((item) => {
                const isSelected = selectedIpItem.id === item.id;
                const isCurrentConnected = isSelected && isConnected;

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectIp(item)}
                    className={`cursor-pointer transition-colors ${
                      isCurrentConnected
                        ? 'bg-blue-950/40 text-white font-medium border-l-2 border-l-blue-500'
                        : isSelected
                        ? 'bg-slate-900/50 text-white'
                        : 'hover:bg-slate-900/40'
                    }`}
                  >
                    {/* IP */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-bold text-sm tracking-tight tabular-nums">
                          {item.ip}
                        </span>
                        <button
                          onClick={(e) => handleCopy(item.ip, item.id, e)}
                          title="Copy IP"
                          className="p-1 text-slate-500 hover:text-slate-300 rounded transition-colors"
                        >
                          {copiedId === item.id ? (
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* City & Datacenter */}
                    <td className="py-3 px-4 font-sans">
                      <span className="font-semibold text-slate-200 block">
                        {lang === 'bn' ? item.cityBn : item.city}, France 🇫🇷
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[200px]">
                        {item.datacenter}
                      </span>
                    </td>

                    {/* ISP & ASN */}
                    <td className="py-3 px-4 font-sans">
                      <span className="text-slate-300 block font-medium">
                        {item.isp}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.asn}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 font-sans">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                          item.type === 'Residential'
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                            : item.type === 'Datacenter'
                            ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                            : item.type === 'Streaming'
                            ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                            : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>

                    {/* Ping */}
                    <td className="py-3 px-4 text-right tabular-nums">
                      <span className="text-emerald-400 font-bold font-mono">
                        {item.pingMs} ms
                      </span>
                    </td>

                    {/* Bandwidth */}
                    <td className="py-3 px-4 text-right tabular-nums text-slate-300 font-mono">
                      {item.bandwidth}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectIp(item);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all whitespace-nowrap ${
                          isCurrentConnected
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800'
                        }`}
                      >
                        {isCurrentConnected
                          ? t.connectedNow
                          : isSelected
                          ? (lang === 'bn' ? 'সক্রিয়' : 'Active')
                          : t.connectToIp}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
