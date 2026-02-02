
import React, { useState } from 'react';
import { Language, RegionID } from '../types';
import { BarChart3, TrendingUp, Users, DollarSign, Briefcase, Activity, ArrowUpRight, Globe, X, Info } from 'lucide-react';

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
    heatmapDetailTitle: isVi ? 'Chi tiết chỉ số' : 'Metric Details',
    clickToView: isVi ? '(Nhấp để xem chi tiết)' : '(Click to view details)',
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

  // Detailed Explanations & Sub-metrics Data
  type SubMetric = { name: { vi: string, en: string }, score: number };
  type MetricDetail = {
    summary: { vi: string, en: string },
    subMetrics: SubMetric[]
  };

  const HEATMAP_DETAILS_FULL: Record<string, Record<string, MetricDetail>> = {
    'ASEAN': {
      'economy': {
        summary: { vi: "Kinh tế năng động, hội nhập sâu rộng.", en: "Dynamic economy, deep integration." },
        subMetrics: [
          { name: { vi: "Kim ngạch thương mại", en: "Trade Volume" }, score: 8.5 }, // ~$80B
          { name: { vi: "Thuế quan (ATIGA)", en: "Tariffs (ATIGA)" }, score: 9.5 }, // 0%
          { name: { vi: "Đầu tư nội khối", en: "Intra-ASEAN FDI" }, score: 7.0 },
          { name: { vi: "Kết nối chuỗi cung ứng", en: "Supply Chain" }, score: 7.0 }
        ]
      },
      'politics': {
        summary: { vi: "Vai trò trung tâm và đoàn kết.", en: "Central, unified role." },
        subMetrics: [
          { name: { vi: "Quan hệ ngoại giao", en: "Diplomatic Relations" }, score: 10 },
          { name: { vi: "Cơ chế đối thoại", en: "Dialogue Mechanisms" }, score: 10 },
          { name: { vi: "Ủng hộ quốc tế", en: "Intl Support" }, score: 10 }
        ]
      },
      'culture': {
        summary: { vi: "Giao lưu nhân dân mạnh mẽ.", en: "Strong people-to-people exchange." },
        subMetrics: [
          { name: { vi: "Du lịch & Miễn thị thực", en: "Tourism & Visa-free" }, score: 9.5 },
          { name: { vi: "Thể thao (SEAGames)", en: "Sports (SEAGames)" }, score: 9.0 },
          { name: { vi: "Bản sắc chung", en: "Shared Identity" }, score: 8.5 }
        ]
      },
      'security': {
        summary: { vi: "Hợp tác an ninh toàn diện.", en: "Comprehensive security cooperation." },
        subMetrics: [
          { name: { vi: "An ninh biển (DOC/COC)", en: "Maritime Security" }, score: 9.0 },
          { name: { vi: "Chống tội phạm", en: "Anti-crime" }, score: 9.0 },
          { name: { vi: "Ổn định khu vực", en: "Regional Stability" }, score: 9.0 }
        ]
      }
    },
    'APEC': {
      'economy': {
        summary: { vi: "Động lực tăng trưởng chính.", en: "Main growth engine." },
        subMetrics: [
          { name: { vi: "Quy mô thương mại", en: "Trade Volume" }, score: 10 }, // 77%
          { name: { vi: "Vốn FDI", en: "FDI Capital" }, score: 10 }, // 81%
          { name: { vi: "Chuyển giao công nghệ", en: "Tech Transfer" }, score: 9.0 },
          { name: { vi: "Hỗ trợ phát triển (ODA)", en: "ODA Support" }, score: 10 } // Japan
        ]
      },
      'politics': {
        summary: { vi: "Đối tác chiến lược hàng đầu.", en: "Top strategic partners." },
        subMetrics: [
          { name: { vi: "Đối tác chiến lược", en: "Strategic Partners" }, score: 9.5 }, // US, China, Russia...
          { name: { vi: "Thượng đỉnh cấp cao", en: "High-level Summits" }, score: 9.0 },
          { name: { vi: "Tầm ảnh hưởng", en: "Influence" }, score: 8.5 }
        ]
      },
      'culture': {
        summary: { vi: "Sức hút văn hóa lớn.", en: "Great cultural appeal." },
        subMetrics: [
          { name: { vi: "Du học sinh", en: "Intl Students" }, score: 9.0 }, // Australia, US, Japan
          { name: { vi: "Văn hóa đại chúng", en: "Pop Culture" }, score: 9.0 }, // Kpop, US, Anime
          { name: { vi: "Lao động & Kiều bào", en: "Labor & Diaspora" }, score: 6.0 } // Still issues
        ]
      },
      'security': {
        summary: { vi: "Đối thoại và hợp tác biển.", en: "Dialogue & maritime coop." },
        subMetrics: [
          { name: { vi: "An ninh năng lượng", en: "Energy Security" }, score: 7.0 },
          { name: { vi: "Cứu hộ cứu nạn", en: "Search & Rescue" }, score: 8.0 },
          { name: { vi: "An ninh mạng", en: "Cyber Security" }, score: 6.0 }
        ]
      }
    },
    'EU': {
      'economy': {
        summary: { vi: "Đối tác chất lượng cao.", en: "High-quality partner." },
        subMetrics: [
          { name: { vi: "Hiệp định EVFTA", en: "EVFTA Agreement" }, score: 9.5 },
          { name: { vi: "Tiêu chuẩn hàng hóa", en: "Goods Standards" }, score: 8.5 },
          { name: { vi: "Kinh tế xanh", en: "Green Economy" }, score: 9.0 }
        ]
      },
      'politics': {
        summary: { vi: "Đề cao luật pháp quốc tế.", en: "Upholds intl law." },
        subMetrics: [
          { name: { vi: "Tuân thủ luật pháp", en: "Rule of Law" }, score: 9.0 },
          { name: { vi: "Đối thoại nhân quyền", en: "Human Rights Dialogue" }, score: 7.0 },
          { name: { vi: "Hợp tác đa phương", en: "Multilateral Coop" }, score: 8.0 }
        ]
      },
      'culture': {
        summary: { vi: "Giao lưu học thuật tinh hoa.", en: "Elite academic exchange." },
        subMetrics: [
          { name: { vi: "Giáo dục & Học bổng", en: "Edu & Scholarships" }, score: 9.5 },
          { name: { vi: "Bảo tồn di sản", en: "Heritage Conservation" }, score: 9.0 },
          { name: { vi: "Nghệ thuật", en: "Arts" }, score: 8.5 }
        ]
      },
      'security': {
        summary: { vi: "An ninh phi truyền thống.", en: "Non-traditional security." },
        subMetrics: [
          { name: { vi: "Biến đổi khí hậu", en: "Climate Change" }, score: 7.0 },
          { name: { vi: "An ninh mạng", en: "Cyber Security" }, score: 6.0 },
          { name: { vi: "Gìn giữ hòa bình", en: "Peacekeeping" }, score: 5.0 }
        ]
      }
    },
    'Africa': {
      'economy': {
        summary: { vi: "Tiềm năng đang khai phá.", en: "Unlocking potential." },
        subMetrics: [
          { name: { vi: "Thương mại nông sản", en: "Agri-trade" }, score: 5.0 },
          { name: { vi: "Viễn thông (Viettel)", en: "Telecom (Viettel)" }, score: 7.0 },
          { name: { vi: "Đầu tư hạ tầng", en: "Infra Investment" }, score: 3.0 }
        ]
      },
      'politics': {
        summary: { vi: "Bạn bè truyền thống.", en: "Traditional friends." },
        subMetrics: [
          { name: { vi: "Ủng hộ lsử", en: "Historical Support" }, score: 10.0 },
          { name: { vi: "Ủng hộ tại LHQ", en: "UN Support" }, score: 9.0 },
          { name: { vi: "Viếng thăm cấp cao", en: "High-level Visits" }, score: 8.0 }
        ]
      },
      'culture': {
        summary: { vi: "Đang mở rộng.", en: "Expanding." },
        subMetrics: [
          { name: { vi: "Giao lưu văn hóa", en: "Cultural Exchange" }, score: 5.0 },
          { name: { vi: "Du lịch", en: "Tourism" }, score: 4.0 },
          { name: { vi: "Cộng đồng người Việt", en: "Vietnamese Diaspora" }, score: 6.0 }
        ]
      },
      'security': {
        summary: { vi: "Điểm sáng Gìn giữ hòa bình.", en: "Peacekeeping highlight." },
        subMetrics: [
          { name: { vi: "Phái bộ LHQ", en: "UN Missions" }, score: 9.0 },
          { name: { vi: "Quân y & Công binh", en: "Military Med & Eng" }, score: 9.0 },
          { name: { vi: "Hợp tác quốc phòng", en: "Defense Coop" }, score: 6.0 }
        ]
      }
    },
    'UN': {
      'economy': {
        summary: { vi: "Hỗ trợ phát triển bền vững.", en: "Sustainable dev support." },
        subMetrics: [
          { name: { vi: "Hỗ trợ ODA/Vốn vay", en: "ODA/Loans" }, score: 6.0 }, // Decreasing as VN is middle-income
          { name: { vi: "Tư vấn chính sách", en: "Policy Advisory" }, score: 9.0 },
          { name: { vi: "Xóa đói giảm nghèo", en: "Poverty Reduction" }, score: 8.0 } // Result
        ]
      },
      'politics': {
        summary: { vi: "Thành viên có trách nhiệm.", en: "Responsible member." },
        subMetrics: [
          { name: { vi: "Uy tín quốc tế", en: "Intl Reputation" }, score: 10.0 },
          { name: { vi: "Tuân thủ Hiến chương", en: "Charter Compliance" }, score: 10.0 },
          { name: { vi: "Tham gia điều hành", en: "Executive Participation" }, score: 10.0 }
        ]
      },
      'culture': {
        summary: { vi: "Bảo tồn & Vinh danh.", en: "Conservation & Honor." },
        subMetrics: [
          { name: { vi: "Di sản thế giới", en: "World Heritage" }, score: 9.0 },
          { name: { vi: "Danh nhân văn hóa", en: "Cultural Celebrity" }, score: 8.0 },
          { name: { vi: "Giáo dục (UNESCO)", en: "Education (UNESCO)" }, score: 7.0 } // Result
        ]
      },
      'security': {
        summary: { vi: "Đối tác tin cậy vì hòa bình.", en: "Trusted partner for peace." },
        subMetrics: [
          { name: { vi: "Lực lượng Gìn giữ hòa bình", en: "PKO Force" }, score: 9.5 }, // High commitment
          { name: { vi: "Giải quyết xung đột", en: "Conflict Resolution" }, score: 9.5 }, // Dialogue approach
          { name: { vi: "Chống khủng bố", en: "Anti-terrorism" }, score: 10.0 } // Strong stance
        ]
      }
    }
  };

  const getMetricDetail = (catKey: string, regionName: string): MetricDetail | null => {
    let key = '';
    if (Object.values(texts.sectors).includes(catKey)) {
      if (catKey === texts.sectors.eco) key = 'economy';
      else if (catKey === texts.sectors.pol) key = 'politics';
      else if (catKey === texts.sectors.cul) key = 'culture';
      else if (catKey === texts.sectors.sec) key = 'security';
    }
    return HEATMAP_DETAILS_FULL[regionName]?.[key] || null;
  };

  const [selectedMetric, setSelectedMetric] = useState<{ region: string, category: string, score: number, detail: MetricDetail | null } | null>(null);

  // Helper for Heatmap Cell
  const HeatmapCell = ({ value, label, category, region }: { value: number, label: string, category: string, region: string }) => {
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
        <button
          onClick={() => setSelectedMetric({
            region,
            category,
            score: value,
            detail: getMetricDetail(category, region)
          })}
          className={`w-full aspect-[4/3] rounded-xl ${bgClass} shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center cursor-pointer ring-2 ring-transparent focus:ring-gold-400 outline-none`}
        >
          <span className={`font-bold text-sm ${textClass}`}>
            {value}
          </span>
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 hidden group-hover:block z-10 w-max max-w-[150px] bg-gray-900 text-white text-xs rounded-lg p-2 shadow-xl animate-fade-in pointer-events-none">
          <p className="font-bold">{label}</p>
          <p className="opacity-80">Score: {value}/10</p>
          <p className="text-[10px] text-gold-400 mt-1">{texts.clickToView}</p>
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
                <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
                  {texts.heatmapDesc} <span className="text-diplomatic-700 font-medium">{texts.clickToView}</span>
                </p>
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
                      <HeatmapCell value={row.economy} label={`${row.region} - ${texts.sectors.eco}`} category={texts.sectors.eco} region={row.region} />
                      <HeatmapCell value={row.politics} label={`${row.region} - ${texts.sectors.pol}`} category={texts.sectors.pol} region={row.region} />
                      <HeatmapCell value={row.culture} label={`${row.region} - ${texts.sectors.cul}`} category={texts.sectors.cul} region={row.region} />
                      <HeatmapCell value={row.security} label={`${row.region} - ${texts.sectors.sec}`} category={texts.sectors.sec} region={row.region} />
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

        {/* Detail Modal */}
        {
          selectedMetric && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-up relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-diplomatic-900 to-gold-400"></div>
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                <h4 className="text-lg font-bold text-diplomatic-900 mb-1 flex items-center gap-2">
                  <Info className="w-5 h-5 text-gold-500" />
                  {texts.heatmapDetailTitle}
                </h4>
                <div className="mb-4 text-sm text-gray-500 font-medium uppercase tracking-wider border-b pb-2">
                  {selectedMetric.region} • {selectedMetric.category}
                </div>

                {/* Score Big Display */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-5xl font-bold ${selectedMetric.score >= 7 ? 'text-green-600' : 'text-blue-600'}`}>
                    {selectedMetric.score}
                    <span className="text-base text-gray-400 font-normal ml-1">/10</span>
                  </div>
                  <div className="text-sm text-gray-600 italic border-l-2 border-gray-200 pl-3">
                    "{selectedMetric.detail ? (isVi ? selectedMetric.detail.summary.vi : selectedMetric.detail.summary.en) : '...'}"
                  </div>
                </div>

                {/* Sub-metrics Breakdown List */}
                {selectedMetric.detail && (
                  <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {selectedMetric.detail.subMetrics.map((sub, idx) => {
                      const name = isVi ? sub.name.vi : sub.name.en;
                      return (
                        <div key={idx} className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span>{name}</span>
                            <span>{sub.score}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${sub.score >= 8 ? 'bg-green-500' : (sub.score >= 6 ? 'bg-blue-500' : 'bg-orange-400')}`}
                              style={{ width: `${sub.score * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                    <div className="text-[10px] text-gray-400 text-center pt-2 border-t border-gray-200 mt-2">
                      {isVi ? 'Điểm tổng hợp là trung bình cộng của các chỉ số trên.' : 'Overall score is the average of these metrics.'}
                    </div>
                  </div>
                )}


                <button
                  onClick={() => setSelectedMetric(null)}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )
        }

      </div >
    </div >
  );
};

export default DashboardPage;
