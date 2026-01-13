
import React, { useState } from 'react';
import { Language } from '../types';
import { 
  Briefcase, 
  GraduationCap, 
  Palette, 
  Flag, 
  X, 
  TrendingUp, 
  Globe, 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  Landmark,
  Cpu,
  Leaf,
  Zap
} from 'lucide-react';

interface CooperationFieldsPageProps {
  language: Language;
  onBack: () => void;
}

interface FieldDetail {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDesc: string;
  color: string;
  bgGradient: string;
  popupContent: {
    intro: string;
    stats: { label: string; value: string }[];
    points: string[];
    example: string;
  };
}

const CooperationFieldsPage: React.FC<CooperationFieldsPageProps> = ({ language, onBack }) => {
  const [selectedField, setSelectedField] = useState<FieldDetail | null>(null);
  const isVi = language === 'vi';

  const texts = {
    heroTitle: isVi ? 'Các Lĩnh Vực Hợp Tác Nổi Bật' : 'Highlighted Cooperation Fields',
    heroSubtitle: isVi 
      ? 'Khám phá các trụ cột chính trong quan hệ quốc tế của Việt Nam' 
      : 'Discover the key pillars of Vietnam\'s international relations',
    back: isVi ? 'Quay lại' : 'Back',
    clickPrompt: isVi ? 'Nhấp vào thẻ để xem chi tiết' : 'Click on cards for details',
    exampleTitle: isVi ? 'Ví dụ điển hình:' : 'Typical Example:',
  };

  // REAL DATA INTEGRATION
  const fields: FieldDetail[] = [
    {
      id: 'economy',
      icon: TrendingUp,
      title: isVi ? 'Kinh Tế & Thương Mại' : 'Economy & Trade',
      shortDesc: isVi ? 'Hội nhập sâu rộng, 16 FTA và trung tâm sản xuất mới.' : 'Deep integration, 16 FTAs and new manufacturing hub.',
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      popupContent: {
        intro: isVi 
          ? 'Việt Nam nằm trong Top 20 nền kinh tế có quy mô thương mại quốc tế lớn nhất thế giới, chuyển dịch sang kinh tế số và tăng trưởng xanh.' 
          : 'Vietnam is among the Top 20 economies with the largest international trade scale, shifting to digital economy and green growth.',
        stats: [
          { label: isVi ? 'Kim ngạch 2023' : '2023 Trade', value: '$683B' },
          { label: isVi ? 'Tổng vốn FDI' : 'FDI Registered', value: '$36.6B' }, // 2023 Registered
          { label: isVi ? 'Thị trường XK' : 'Export Mkts', value: '230+' }
        ],
        points: isVi ? [
          'Thành viên của các hiệp định thương mại tự do thế hệ mới: CPTPP, EVFTA, RCEP.',
          'Đối tác thương mại lớn nhất của Việt Nam: Trung Quốc (Nhập khẩu), Mỹ (Xuất khẩu).',
          'Thu hút đại bàng công nghệ: Samsung, Intel, Foxconn, Amkor.',
          'Cam kết JETP (Chuyển đổi năng lượng công bằng) trị giá 15.5 tỷ USD với G7 & EU.'
        ] : [
          'Member of new-generation FTAs: CPTPP, EVFTA, RCEP.',
          'Largest trade partners: China (Imports), USA (Exports).',
          'Attracting tech giants: Samsung, Intel, Foxconn, Amkor.',
          'JETP (Just Energy Transition Partnership) worth $15.5B with G7 & EU.'
        ],
        example: isVi 
          ? 'Hợp tác chiến lược về Bán dẫn & AI với Hoa Kỳ (2023) đưa Việt Nam vào chuỗi cung ứng toàn cầu.' 
          : 'Strategic cooperation on Semiconductors & AI with the US (2023) putting Vietnam in the global supply chain.'
      }
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: isVi ? 'Giáo Dục & Đào Tạo' : 'Education & Training',
      shortDesc: isVi ? '200.000 du học sinh và hợp tác đại học quốc tế.' : '200,000 overseas students and intl university cooperation.',
      color: 'text-green-600',
      bgGradient: 'from-green-50 to-green-100',
      popupContent: {
        intro: isVi 
          ? 'Hợp tác giáo dục giúp nâng cao chất lượng nguồn nhân lực chất lượng cao, với trọng tâm là STEM và ngôn ngữ.'
          : 'Education cooperation enhances high-quality human resources, focusing on STEM and languages.',
        stats: [
          { label: isVi ? 'Du học sinh' : 'Students Abroad', value: '~200k' },
          { label: isVi ? 'Tại Nhật Bản' : 'In Japan', value: '44,000+' },
          { label: isVi ? 'Tại Hàn Quốc' : 'In Korea', value: '43,000+' }
        ],
        points: isVi ? [
          'Các chương trình học bổng chính phủ: Đề án 89, Fulbright (Mỹ), Chevening (Anh), AAS (Úc), MEXT (Nhật).',
          'Đại học quốc tế hoạt động tại VN: RMIT, VinUni, Đại học Việt-Đức, Đại học Việt-Nhật.',
          'Hợp tác đào tạo nhân lực ngành Chip/Bán dẫn với các đối tác Mỹ, Đài Loan.',
          'Phổ cập tiếng Anh, tiếng Nhật, tiếng Hàn trong hệ thống giáo dục.'
        ] : [
          'Gov scholarships: Project 89, Fulbright (US), Chevening (UK), AAS (Aus), MEXT (Japan).',
          'Intl universities in VN: RMIT, VinUni, VGU, VJU.',
          'Training cooperation in Chips/Semiconductors with US, Taiwan partners.',
          'Popularizing English, Japanese, Korean in the education system.'
        ],
        example: isVi ? 'Đại học Fulbright Việt Nam - Biểu tượng hợp tác giáo dục Việt-Mỹ.' : 'Fulbright University Vietnam - A symbol of Vietnam-US educational cooperation.'
      }
    },
    {
      id: 'culture',
      icon: Palette,
      title: isVi ? 'Văn Hóa & Du Lịch' : 'Culture & Tourism',
      shortDesc: isVi ? 'Ngoại giao văn hóa và quảng bá di sản thế giới.' : 'Cultural diplomacy and promoting world heritage.',
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      popupContent: {
        intro: isVi 
          ? 'Việt Nam sử dụng "Sức mạnh mềm" văn hóa để kết nối với thế giới, được vinh danh là Điểm đến Di sản hàng đầu.'
          : 'Vietnam uses cultural "Soft Power" to connect with the world, honored as a Leading Heritage Destination.',
        stats: [
          { label: isVi ? 'Di sản UNESCO' : 'World Heritage', value: '8 Sites' },
          { label: isVi ? 'Khách du lịch' : 'Tourists (2023)', value: '12.6M' },
          { label: isVi ? 'Khách 2024' : '2024 Target', value: '18M' }
        ],
        points: isVi ? [
          '8 Di sản Thiên nhiên/Văn hóa thế giới (Hạ Long, Phong Nha, Tràng An, Huế, Hội An, Mỹ Sơn, Thăng Long, Thành nhà Hồ).',
          'Ẩm thực Việt (Phở, Bánh Mì, Cà phê) trở thành thương hiệu toàn cầu.',
          'Chính sách Visa điện tử (E-visa) cấp cho công dân tất cả các nước.',
          'Được World Travel Awards vinh danh là Điểm đến hàng đầu Châu Á.'
        ] : [
          '8 World Natural/Cultural Heritages (Ha Long, Phong Nha, Trang An, Hue, Hoi An, My Son, Thang Long, Ho Citadel).',
          'Vietnamese cuisine (Pho, Banh Mi, Coffee) becoming global brands.',
          'E-visa policy granted to citizens of all countries.',
          'Honored by World Travel Awards as Asia\'s Leading Destination.'
        ],
        example: isVi ? 'Vịnh Hạ Long - Hai lần được UNESCO công nhận là Di sản Thiên nhiên Thế giới.' : 'Ha Long Bay - Twice recognized by UNESCO as a World Natural Heritage.'
      }
    },
    {
      id: 'diplomacy',
      icon: Flag,
      title: isVi ? 'Ngoại Giao & Hòa Bình' : 'Diplomacy & Peace',
      shortDesc: isVi ? 'Ngoại giao Cây tre, Gìn giữ hòa bình LHQ.' : 'Bamboo Diplomacy, UN Peacekeeping.',
      color: 'text-red-600',
      bgGradient: 'from-red-50 to-red-100',
      popupContent: {
        intro: isVi 
          ? 'Trường phái "Ngoại giao Cây tre": Gốc vững, thân chắc, cành uyển chuyển. Việt Nam là bạn, là đối tác tin cậy.'
          : '"Bamboo Diplomacy" school: Solid roots, stout trunk, flexible branches. Vietnam is a friend and reliable partner.',
        stats: [
          { label: isVi ? 'Quan hệ NG' : 'Diplomatic Rel', value: '193' },
          { label: isVi ? 'Đối tác CL' : 'Strat. Partners', value: '30+' }, // Broad category
          { label: isVi ? 'Đối tác ĐC' : 'Comprehensive', value: '7 Major' } // China, Russia, India, Korea, US, Japan, Aus
        ],
        points: isVi ? [
          '7 Đối tác Chiến lược Toàn diện: Trung Quốc, Nga, Ấn Độ, Hàn Quốc, Mỹ, Nhật Bản, Úc.',
          'Đảm nhiệm thành công vai trò Ủy viên không thường trực HĐBA LHQ (2020-2021).',
          'Trúng cử Hội đồng Nhân quyền LHQ nhiệm kỳ 2023-2025.',
          'Cử lực lượng Quân đội & Công an tham gia Gìn giữ hòa bình tại Nam Sudan, Abyei.'
        ] : [
          '7 Comprehensive Strategic Partners: China, Russia, India, ROK, USA, Japan, Australia.',
          'Successfully served as UNSC Non-Permanent Member (2020-2021).',
          'Elected to UN Human Rights Council (2023-2025 term).',
          'Deployed Military & Police forces to UN Peacekeeping in South Sudan, Abyei.'
        ],
        example: isVi ? 'Bệnh viện dã chiến cấp 2 số 5 lên đường làm nhiệm vụ tại Nam Sudan (2023).' : 'Level 2 Field Hospital No. 5 departed for mission in South Sudan (2023).'
      }
    },
    {
      id: 'tech',
      icon: Cpu,
      title: isVi ? 'Khoa học & Công nghệ' : 'Science & Technology',
      shortDesc: isVi ? 'Chuyển đổi số, AI và công nghiệp bán dẫn.' : 'Digital transformation, AI and semiconductor industry.',
      color: 'text-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100',
      popupContent: {
        intro: isVi 
          ? 'Việt Nam đang nổi lên như một trung tâm công nghệ mới, ưu tiên phát triển công nghiệp bán dẫn, AI và đổi mới sáng tạo.' 
          : 'Vietnam is emerging as a new tech hub, prioritizing semiconductor industry, AI and innovation.',
        stats: [
          { label: isVi ? 'Kinh tế số' : 'Digital Econ', value: '~16.5%' }, // of GDP
          { label: isVi ? 'Kỹ sư CNTT' : 'IT Engineers', value: '530k+' },
          { label: isVi ? 'Chỉ số GII' : 'GII Rank', value: '46/132' }
        ],
        points: isVi ? [
          'Chiến lược quốc gia về bán dẫn: Đào tạo 50.000 kỹ sư đến năm 2030.',
          'Đối tác chiến lược của các "đại bàng": NVIDIA, Synopsys, Marvell.',
          'Vận hành Trung tâm Đổi mới sáng tạo Quốc gia (NIC) tiêu chuẩn quốc tế.',
          'Triển khai mạng 5G thương mại hóa trên toàn quốc.'
        ] : [
          'National Semiconductor Strategy: Training 50,000 engineers by 2030.',
          'Strategic partner of tech giants: NVIDIA, Synopsys, Marvell.',
          'Operating the National Innovation Center (NIC) with international standards.',
          'Commercializing 5G network nationwide.'
        ],
        example: isVi 
          ? 'Tập đoàn NVIDIA cam kết biến Việt Nam thành "quê hương thứ hai" và trung tâm AI của khu vực.' 
          : 'NVIDIA commits to making Vietnam its "second home" and the region\'s AI hub.'
      }
    },
    {
      id: 'environment',
      icon: Leaf,
      title: isVi ? 'Môi trường & Khí hậu' : 'Environment & Climate',
      shortDesc: isVi ? 'Cam kết Net Zero 2050 và chuyển đổi xanh.' : 'Net Zero 2050 commitment and green transition.',
      color: 'text-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      popupContent: {
        intro: isVi 
          ? 'Việt Nam là một trong những nước đi đầu trong nhóm đang phát triển về cam kết chống biến đổi khí hậu và chuyển đổi năng lượng.' 
          : 'Vietnam is a leader among developing nations in climate change commitments and energy transition.',
        stats: [
          { label: isVi ? 'Mục tiêu' : 'Target', value: 'Net Zero' },
          { label: isVi ? 'Năng lượng TT' : 'Renewables', value: '#1 ASEAN' },
          { label: isVi ? 'Tài chính xanh' : 'Green Finance', value: '$15.5B' }
        ],
        points: isVi ? [
          'Cam kết mạnh mẽ tại COP26: Đạt phát thải ròng bằng "0" vào năm 2050.',
          'Thực hiện JETP (Đối tác Chuyển đổi Năng lượng Công bằng) với G7.',
          'Phát triển thị trường tín chỉ Carbon và trái phiếu xanh.',
          'Dự án trồng 1 tỷ cây xanh giai đoạn 2021-2025.'
        ] : [
          'Strong commitment at COP26: Net Zero emissions by 2050.',
          'Implementing JETP (Just Energy Transition Partnership) with G7.',
          'Developing Carbon credit market and green bonds.',
          'Project to plant 1 billion trees in 2021-2025 period.'
        ],
        example: isVi 
          ? 'Nhà máy LEGO tại Bình Dương - Nhà máy trung hòa carbon đầu tiên trên thế giới của tập đoàn.' 
          : 'LEGO Factory in Binh Duong - The group\'s first carbon-neutral factory globally.'
      }
    }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-full pb-12 animate-fade-in relative">
      
      {/* Hero Section */}
      <div className="bg-diplomatic-900 text-white py-12 px-6 rounded-3xl mb-8 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <Globe className="w-96 h-96 absolute -top-20 -left-20 animate-pulse" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">{texts.heroTitle}</h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">{texts.heroSubtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-gray-500 mb-8 italic flex items-center justify-center gap-2">
           <Heart className="w-4 h-4 text-red-400" /> {texts.clickPrompt}
        </p>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {fields.map((field) => (
            <div 
              key={field.id}
              onClick={() => setSelectedField(field)}
              className={`group bg-gradient-to-br ${field.bgGradient} p-8 rounded-3xl border border-white/50 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden`}
            >
              {/* Background Icon */}
              <field.icon className={`absolute -bottom-4 -right-4 w-32 h-32 opacity-10 ${field.color} group-hover:scale-110 transition-transform duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 ${field.color}`}>
                  <field.icon className="w-8 h-8" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 text-gray-800 group-hover:${field.color} transition-colors`}>
                  {field.title}
                </h3>
                
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                  {field.shortDesc}
                </p>

                <div className="mt-auto flex items-center text-sm font-bold text-gray-500 group-hover:text-diplomatic-900 transition-colors">
                  {isVi ? 'Xem chi tiết' : 'View Details'} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP MODAL */}
      {selectedField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedField(null)}>
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in-up max-h-[90vh] overflow-y-auto custom-scrollbar" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Color */}
            <div className={`p-8 bg-gradient-to-r ${selectedField.bgGradient} relative sticky top-0 z-10`}>
              <button 
                onClick={() => setSelectedField(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-white rounded-xl shadow-sm ${selectedField.color}`}>
                  <selectedField.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">{selectedField.title}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="text-gray-700 text-lg mb-8 leading-relaxed font-medium">
                {selectedField.popupContent.intro}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {selectedField.popupContent.stats.map((stat, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100 hover:border-gray-300 transition-colors">
                    <div className={`text-xl md:text-2xl font-bold mb-1 ${selectedField.color} break-words`}>{stat.value}</div>
                    <div className="text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Bullet Points */}
              <div className="space-y-4 mb-8">
                {selectedField.popupContent.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-2 w-2 h-2 rounded-full ${selectedField.color} shrink-0`} />
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              {/* Example Box */}
              <div className={`p-5 rounded-xl bg-opacity-30 ${selectedField.bgGradient} border border-opacity-20 border-gray-200 flex items-start gap-4`}>
                <div className={`p-2 bg-white rounded-full shadow-sm ${selectedField.color}`}>
                  <Cpu className="w-5 h-5" /> 
                </div>
                <div>
                  <span className="font-bold text-gray-800 block text-sm mb-1 uppercase tracking-wide">{texts.exampleTitle}</span>
                  <p className="text-gray-800 italic text-base font-medium">{selectedField.popupContent.example}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CooperationFieldsPage;
