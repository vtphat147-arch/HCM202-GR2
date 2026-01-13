
import React from 'react';
import { Language, RegionID } from '../types';
import { BarChart3, TrendingUp, Users, DollarSign, Briefcase, Activity, ArrowUpRight, Globe } from 'lucide-react';

interface DashboardPageProps {
  language: Language;
  onBack: () => void;
}

// REAL DATA SOURCES (Approximate based on 2023-2024 GSO & MOFA reports)
// APEC: Accounts for ~77% trade, ~81% FDI.
// ASEAN: ~11-12% trade (~$80B).
// EU: ~10% trade (~$72B).
// UN: Symbolic global metric.
// Africa: Trade ~$6B (Low volume, high political potential).

const REGION_STATS = [
  { id: RegionID.APEC, name: 'APEC', trade: 95, investment: 90, students: 85, color: 'bg-purple-600' }, // Dominant: US, China, Japan, Korea
  { id: RegionID.ASEAN, name: 'ASEAN', trade: 45, investment: 40, students: 30, color: 'bg-blue-500' },
  { id: RegionID.EU, name: 'EU', trade: 40, investment: 35, students: 50, color: 'bg-indigo-500' },
  { id: RegionID.AFRICA, name: 'Africa', trade: 10, investment: 5, students: 5, color: 'bg-orange-500' }, // Emerging
  { id: RegionID.UN, name: 'Others', trade: 15, investment: 10, students: 10, color: 'bg-gray-400' }, 
];

// Heatmap Data (1-10 Scale based on Diplomatic Reality)
const HEATMAP_DATA = [
  { region: 'ASEAN', economy: 8, politics: 10, culture: 9, security: 9 }, // Neighbors, Political stability high
  { region: 'APEC', economy: 10, politics: 9, culture: 8, security: 7 }, // Economic engine (China, US, Japan)
  { region: 'EU', economy: 9, politics: 8, culture: 9, security: 6 }, // EVFTA, Cultural exchange high
  { region: 'Africa', economy: 4, politics: 9, culture: 5, security: 8 }, // Peacekeeping (High Security/Pol), Low Eco
  { region: 'UN', economy: 5, politics: 10, culture: 7, security: 10 }, // Multilateral Forum
];

const DashboardPage: React.FC<DashboardPageProps> = ({ language, onBack }) => {
  const isVi = language === 'vi';

  const texts = {
    title: isVi ? 'Thống Kê Hợp Tác Quốc Tế' : 'Intl Cooperation Statistics',
    subtitle: isVi ? 'Dữ liệu kinh tế - xã hội & ngoại giao (Cập nhật 2023-2024)' : 'Socio-economic & diplomatic data (2023-2024 Update)',
    overview: isVi ? 'Tổng quan Kinh tế - Đối ngoại' : 'Economic - Diplomatic Overview',
    tradeChart: isVi ? 'Tỷ trọng Thương mại & Đầu tư (Theo khu vực)' : 'Trade & Investment Share (By Region)',
    fdiChart: isVi ? 'Dự án Đầu tư (FDI)' : 'Investment Projects (FDI)',
    studentChart: isVi ? 'Trao đổi Sinh viên & Nhân lực' : 'Student Exchange & Labor',
    heatmapTitle: isVi ? 'Bản đồ nhiệt Mức độ Hợp tác' : 'Cooperation Intensity Heatmap',
    heatmapDesc: isVi ? 'Đánh giá dựa trên quy mô thương mại và tần suất hoạt động ngoại giao.' : 'Based on trade volume and diplomatic frequency.',
    sectors: {
      eco: isVi ? 'Kinh tế' : 'Economy',
      pol: isVi ? 'Chính trị' : 'Politics',
      cul: isVi ? 'Văn hóa' : 'Culture',
      sec: isVi ? 'An ninh' : 'Security',
    },
    cards: {
      totalTrade: isVi ? 'Tổng Kim Ngạch 2023' : 'Total Trade 2023',
      partners: isVi ? 'Đối tác Chiến lược/Toàn diện' : 'Strategic/Comprehensive Partners',
      agreements: isVi ? 'Hiệp định FTA hiệu lực' : 'Active FTAs',
      growth: isVi ? 'Tăng trưởng GDP 2023' : 'GDP Growth 2023',
    },
    footerNote: isVi ? '*Nguồn: Tổng cục Thống kê (GSO) & Bộ Ngoại giao Việt Nam.' : '*Source: GSO Vietnam & MOFA.'
  };

  const overviewCards = [
    { 
        label: texts.cards.totalTrade, 
        value: '$683B', 
        sub: 'USD', 
        icon: DollarSign, 
        color: 'text-green-600', 
        trend: 'Top 20 Global',
        details: isVi ? ['Xuất khẩu: $355.5B', 'Nhập khẩu: $327.5B', 'Thặng dư: $28B'] : ['Exports: $355.5B', 'Imports: $327.5B', 'Surplus: $28B']
    },
    { 
        label: texts.cards.partners, 
        value: '30+', 
        sub: 'Partners', 
        icon: Users, 
        color: 'text-blue-600', 
        trend: '7 Comprehensive Strategic',
        details: isVi ? ['Trung Quốc, Nga, Ấn Độ', 'Hàn Quốc, Mỹ, Nhật Bản', 'Úc (Mới nhất 2024)'] : ['China, Russia, India', 'Korea, USA, Japan', 'Australia (Newest 2024)']
    },
    { 
        label: texts.cards.agreements, 
        value: '16', 
        sub: 'FTAs', 
        icon: Briefcase, 
        color: 'text-purple-600', 
        trend: 'Signed',
        details: isVi ? ['CPTPP (11 nước)', 'EVFTA (EU)', 'RCEP (ASEAN+5)', 'UKVFTA (Anh)'] : ['CPTPP (11 countries)', 'EVFTA (EU)', 'RCEP (ASEAN+5)', 'UKVFTA (UK)']
    },
    { 
        label: texts.cards.growth, 
        value: '5.05%', 
        sub: 'Y-o-Y', 
        icon: TrendingUp, 
        color: 'text-gold-600', 
        trend: 'Target 6.5% (2024)',
        details: isVi ? ['Nông nghiệp: +3.83%', 'Công nghiệp: +3.74%', 'Dịch vụ: +6.82%'] : ['Agriculture: +3.83%', 'Industry: +3.74%', 'Services: +6.82%']
    },
  ];

  // Helper to render bars
  const renderBar = (label: string, value: number, max: number, color: string, details?: string) => (
    <div className="mb-4 group relative cursor-help">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-bold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out group-hover:opacity-80`} 
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
      
      {/* Tooltip for Bar */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 w-max bg-gray-800 text-white text-xs rounded px-3 py-2 shadow-xl">
         <div className="font-bold mb-1">{label}</div>
         <div className="opacity-90">{details || `Share: ${value}%`}</div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );

  // Helper for Heatmap Cell
  const HeatmapCell = ({ value, label }: { value: number, label: string }) => {
    let bgClass = 'bg-gray-50';
    let textClass = 'text-gray-400';
    
    // Heatmap Logic: Sophisticated Gradient
    if (value >= 9) { bgClass = 'bg-red-600 shadow-red-200'; textClass = 'text-white'; }
    else if (value >= 7) { bgClass = 'bg-orange-500 shadow-orange-200'; textClass = 'text-white'; }
    else if (value >= 5) { bgClass = 'bg-yellow-400 shadow-yellow-200'; textClass = 'text-yellow-900'; }
    else if (value >= 3) { bgClass = 'bg-blue-200'; textClass = 'text-blue-800'; }
    else { bgClass = 'bg-slate-100'; textClass = 'text-slate-400'; }
    
    return (
      <div className="group relative flex flex-col items-center justify-center p-1">
        <div className={`w-full aspect-[4/3] rounded-xl ${bgClass} shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center cursor-help`}>
             <span className={`font-bold text-sm ${textClass}`}>
                 {value}
             </span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 hidden group-hover:block z-10 w-max max-w-[150px] bg-gray-900 text-white text-xs rounded-lg p-2 shadow-xl animate-fade-in">
            <p className="font-bold">{label}</p>
            <p className="opacity-80">Score: {value}/10</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-full bg-slate-50 pb-12 animate-fade-in">
      {/* Hero Header */}
      <div className="bg-diplomatic-900 text-white py-10 px-6 shadow-lg mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h2 className="text-2xl md:text-3xl font-serif font-bold flex items-center gap-3">
                 <Activity className="text-gold-400 w-8 h-8" />
                 {texts.title}
               </h2>
               <p className="text-blue-200 mt-2 text-sm md:text-lg max-w-2xl">{texts.subtitle}</p>
            </div>
            <div className="flex gap-2">
                 <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm text-xs font-medium border border-white/20">
                    Data: Official
                 </div>
                 <div className="px-4 py-2 bg-gold-500 text-diplomatic-900 rounded-lg font-bold text-xs shadow">
                    Live View
                 </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        {/* 1. Overview Cards (Real Data) */}
        <section>
            <h3 className="text-xl font-bold text-diplomatic-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" /> {texts.overview}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {overviewCards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group relative cursor-help">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-opacity-10 ${card.color.replace('text', 'bg')}`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3" /> {card.trend}
                            </span>
                        </div>
                        <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{card.label}</h4>
                        <div className="flex items-baseline gap-1">
                           <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                           <span className="text-xs text-gray-400 font-medium">{card.sub}</span>
                        </div>

                        {/* Hover Detail Modal/Tooltip */}
                        <div className="absolute top-full left-0 mt-2 w-full bg-gray-900 text-white text-xs rounded-xl p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                            <div className="absolute -top-2 left-8 border-8 border-transparent border-b-gray-900"></div>
                            <ul className="space-y-1.5">
                                {card.details.map((detail, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400"></div>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 2. Charts Section */}
        <section className="grid md:grid-cols-2 gap-8">
            {/* Trade Volume */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
                    <BarChart3 className="w-5 h-5 text-diplomatic-800" />
                    {texts.tradeChart}
                </h3>
                <div className="space-y-1">
                    {REGION_STATS.map(region => renderBar(
                        region.name, 
                        region.trade, 
                        100, 
                        region.color,
                        isVi ? `Thương mại: ${region.trade}% | Đầu tư: ${region.investment}%` : `Trade: ${region.trade}% | FDI: ${region.investment}%`
                    ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                  <span className="font-bold">Insight:</span> {isVi ? 'Các nền kinh tế APEC (Mỹ, Trung, Nhật, Hàn) chiếm tới ~77% tổng kim ngạch thương mại của Việt Nam.' : 'APEC economies (US, China, Japan, Korea) account for ~77% of Vietnam\'s total trade volume.'}
                </div>
            </div>

            {/* Students & Human Capital */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
                    <Users className="w-5 h-5 text-diplomatic-800" />
                    {texts.studentChart}
                </h3>
                {/* Visualizing Student distribution: Japan/Korea/Aus (APEC) dominate, EU second */}
                <div className="flex-grow flex items-end justify-between px-2 gap-2 sm:gap-4">
                    {REGION_STATS.map(region => (
                        <div key={region.id} className="flex flex-col items-center group w-full">
                            <div className="relative w-full flex justify-center">
                                {/* Tooltip */}
                                <span className="absolute -top-8 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap z-10">
                                    {region.name}
                                </span>
                                <div 
                                    className={`w-full max-w-[40px] rounded-t-lg ${region.color} transition-all duration-1000 ease-out hover:brightness-110 opacity-90`}
                                    style={{ height: `${region.students * 1.8}px` }} 
                                ></div>
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 mt-2 truncate max-w-full uppercase">{region.name}</span>
                        </div>
                    ))}
                </div>
                 <div className="mt-4 text-xs text-gray-500 text-right">
                  ~200,000 {isVi ? 'Du học sinh' : 'Intl Students'} (2023)
                </div>
            </div>
        </section>

        {/* 3. Heatmap Section */}
        <section className="animate-fade-in-up delay-100">
             <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-3xl opacity-50 -z-10"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-diplomatic-900 flex items-center gap-2 mb-2">
                            <Activity className="w-6 h-6 text-orange-500" />
                            {texts.heatmapTitle}
                        </h3>
                        <p className="text-gray-500 text-sm max-w-lg leading-relaxed">{texts.heatmapDesc}</p>
                    </div>
                    
                    {/* Legend Badge */}
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Intensity:</span>
                        <div className="flex gap-1">
                            <div className="w-2 h-6 bg-slate-100 rounded-sm" title="Low"></div>
                            <div className="w-2 h-6 bg-blue-200 rounded-sm"></div>
                            <div className="w-2 h-6 bg-yellow-400 rounded-sm"></div>
                            <div className="w-2 h-6 bg-orange-500 rounded-sm"></div>
                            <div className="w-2 h-6 bg-red-600 rounded-sm" title="High"></div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto pb-4">
                    <div className="min-w-[600px]">
                        {/* Heatmap Header */}
                        <div className="grid grid-cols-5 gap-4 mb-4 px-2">
                            <div className="col-span-1 flex items-end pb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Region</span>
                            </div> 
                            <div className="font-bold text-diplomatic-900 text-sm uppercase tracking-wide text-center bg-gray-50 py-2 rounded-lg">{texts.sectors.eco}</div>
                            <div className="font-bold text-diplomatic-900 text-sm uppercase tracking-wide text-center bg-gray-50 py-2 rounded-lg">{texts.sectors.pol}</div>
                            <div className="font-bold text-diplomatic-900 text-sm uppercase tracking-wide text-center bg-gray-50 py-2 rounded-lg">{texts.sectors.cul}</div>
                            <div className="font-bold text-diplomatic-900 text-sm uppercase tracking-wide text-center bg-gray-50 py-2 rounded-lg">{texts.sectors.sec}</div>
                        </div>

                        {/* Heatmap Rows */}
                        <div className="space-y-3">
                            {HEATMAP_DATA.map((row, idx) => (
                                <div key={idx} className="grid grid-cols-5 gap-4 items-center group hover:bg-gray-50 rounded-xl p-2 transition-all duration-300 border border-transparent hover:border-gray-100">
                                    <div className="font-bold text-diplomatic-900 text-base pl-2 border-l-4 border-transparent group-hover:border-gold-500 transition-all">
                                        {row.region}
                                    </div>
                                    <HeatmapCell value={row.economy} label={`${row.region} - ${texts.sectors.eco}`} />
                                    <HeatmapCell value={row.politics} label={`${row.region} - ${texts.sectors.pol}`} />
                                    <HeatmapCell value={row.culture} label={`${row.region} - ${texts.sectors.cul}`} />
                                    <HeatmapCell value={row.security} label={`${row.region} - ${texts.sectors.sec}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <p className="text-[10px] text-gray-400 italic">{texts.footerNote}</p>
                </div>
             </div>
        </section>

      </div>
    </div>
  );
};

export default DashboardPage;
