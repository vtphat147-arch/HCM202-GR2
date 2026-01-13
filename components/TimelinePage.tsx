
import React, { useState } from 'react';
import { Language } from '../types';
import { Globe, Flag, Briefcase, TrendingUp, FileCheck, Star, History, Users, X, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

interface TimelinePageProps {
  language: Language;
  onBack: () => void;
}

interface MilestoneData {
  year: string;
  icon: React.ElementType;
  color: string;
  image: string;
  content: {
    vi: { title: string; desc: string; details: string; impact: string };
    en: { title: string; desc: string; details: string; impact: string };
  };
}

const TimelinePage: React.FC<TimelinePageProps> = ({ language, onBack }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneData | null>(null);
  const isVi = language === 'vi';

  const texts = {
    title: isVi ? 'Timeline Hội Nhập Quốc Tế' : 'Intl Integration Timeline',
    subtitle: isVi 
      ? 'Hành trình từ phá thế bao vây cấm vận đến đối tác toàn cầu tin cậy.' 
      : 'Journey from breaking embargoes to becoming a trusted global partner.',
    back: isVi ? 'Quay lại' : 'Back',
    clickPrompt: isVi ? 'Nhấp vào năm để xem chi tiết' : 'Click on the year for details',
    impactTitle: isVi ? 'Ý nghĩa lịch sử:' : 'Historical Significance:',
    detailsTitle: isVi ? 'Bối cảnh & Diễn biến:' : 'Context & Details:',
    close: isVi ? 'Đóng' : 'Close'
  };

  const MILESTONES: MilestoneData[] = [
    { 
      year: '1977', 
      icon: Globe,
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1478827387698-1527752a2e30?q=80&w=2070&auto=format&fit=crop',
      content: {
        vi: {
          title: 'Gia nhập Liên Hợp Quốc (UN)',
          desc: 'Thành viên thứ 149, đánh dấu sự công nhận quốc tế.',
          details: 'Ngày 20/9/1977, Việt Nam chính thức trở thành thành viên thứ 149 của Liên Hợp Quốc. Sự kiện này mở ra một chương mới cho chính sách đối ngoại đa phương hóa, đa dạng hóa quan hệ quốc tế của Việt Nam, tranh thủ sự ủng hộ và giúp đỡ của cộng đồng quốc tế cho công cuộc tái thiết đất nước sau chiến tranh.',
          impact: 'Khẳng định tính chính danh và vị thế độc lập, chủ quyền của Việt Nam trên trường quốc tế.'
        },
        en: {
          title: 'Joined the United Nations',
          desc: '149th member, marking international recognition.',
          details: 'On September 20, 1977, Vietnam officially became the 149th member of the United Nations. This event opened a new chapter for Vietnam\'s foreign policy of multilateralization and diversification, gaining international support for post-war reconstruction.',
          impact: 'Affirmed Vietnam\'s legitimacy, independent status, and sovereignty on the international stage.'
        }
      }
    },
    { 
      year: '1995', 
      icon: Flag,
      color: 'bg-red-600',
      image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop',
      content: {
        vi: {
          title: 'Gia nhập ASEAN & Bình thường hóa với Mỹ',
          desc: 'Phá thế bao vây cấm vận, mở cửa hội nhập.',
          details: 'Năm 1995 là năm bản lề. Ngày 11/7, Tổng thống Mỹ Bill Clinton tuyên bố bình thường hóa quan hệ với Việt Nam. Ngày 28/7, Việt Nam chính thức gia nhập ASEAN tại Brunei. Hai sự kiện này đã hoàn toàn phá vỡ thế bao vây cấm vận, đưa Việt Nam hội nhập sâu rộng vào khu vực và thế giới.',
          impact: 'Tạo môi trường hòa bình, ổn định ở khu vực để phát triển kinh tế và bảo vệ tổ quốc.'
        },
        en: {
          title: 'Joined ASEAN & Normalized with US',
          desc: 'Broke the embargo, opening doors to integration.',
          details: '1995 was a pivotal year. On July 11, US President Bill Clinton announced the normalization of relations with Vietnam. On July 28, Vietnam officially joined ASEAN. These events completely broke the embargo, integrating Vietnam deeply into the region and the world.',
          impact: 'Created a peaceful and stable regional environment for economic development and national defense.'
        }
      }
    },
    { 
      year: '1998', 
      icon: Users,
      color: 'bg-green-600',
      image: 'https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=2070&auto=format&fit=crop',
      content: {
        vi: {
          title: 'Gia nhập APEC',
          desc: 'Kết nối với các nền kinh tế lớn nhất thế giới.',
          details: 'Việt Nam trở thành thành viên của Diễn đàn Hợp tác Kinh tế Châu Á - Thái Bình Dương (APEC), nơi quy tụ các nền kinh tế hàng đầu thế giới như Mỹ, Trung Quốc, Nhật Bản. Đây là bước đi chiến lược để thúc đẩy thương mại, đầu tư và chuyển giao công nghệ.',
          impact: 'Mở rộng thị trường xuất khẩu và thu hút làn sóng đầu tư trực tiếp nước ngoài (FDI) chất lượng cao.'
        },
        en: {
          title: 'Joined APEC',
          desc: 'Connecting with the world\'s largest economies.',
          details: 'Vietnam became a member of the Asia-Pacific Economic Cooperation (APEC), gathering leading economies like the US, China, and Japan. This was a strategic move to promote trade, investment, and technology transfer.',
          impact: 'Expanded export markets and attracted waves of high-quality Foreign Direct Investment (FDI).'
        }
      }
    },
    { 
      year: '2007', 
      icon: TrendingUp,
      color: 'bg-purple-600',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop',
      content: {
        vi: {
          title: 'Gia nhập WTO',
          desc: 'Thành viên thứ 150, tham gia sân chơi toàn cầu.',
          details: 'Sau 11 năm đàm phán gian nan, Việt Nam chính thức trở thành thành viên thứ 150 của Tổ chức Thương mại Thế giới (WTO). Sự kiện này đánh dấu việc Việt Nam tham gia đầy đủ vào luật chơi thương mại toàn cầu, thúc đẩy cải cách thể chế kinh tế trong nước.',
          impact: 'Tăng trưởng xuất khẩu vượt bậc, GDP tăng mạnh và đời sống người dân được cải thiện rõ rệt.'
        },
        en: {
          title: 'Joined WTO',
          desc: '150th member, entering the global playground.',
          details: 'After 11 years of tough negotiations, Vietnam officially became the 150th member of the World Trade Organization (WTO). This marked Vietnam\'s full participation in global trade rules, driving domestic economic institutional reforms.',
          impact: 'Tremendous export growth, strong GDP increase, and significant improvement in living standards.'
        }
      }
    },
    { 
      year: '2019', 
      icon: FileCheck,
      color: 'bg-indigo-600',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
      content: {
        vi: {
          title: 'Ký kết CPTPP & EVFTA',
          desc: 'Tham gia các FTA thế hệ mới tiêu chuẩn cao.',
          details: 'Việt Nam tham gia Hiệp định Đối tác Toàn diện và Tiến bộ xuyên Thái Bình Dương (CPTPP - 2019) và Hiệp định Thương mại tự do Việt Nam - EU (EVFTA - 2020). Đây là các hiệp định thương mại tự do thế hệ mới với các tiêu chuẩn rất cao về lao động, môi trường và sở hữu trí tuệ.',
          impact: 'Đa dạng hóa thị trường, tránh phụ thuộc vào một đối tác và nâng cao năng lực cạnh tranh quốc gia.'
        },
        en: {
          title: 'Signed CPTPP & EVFTA',
          desc: 'Joining high-standard new generation FTAs.',
          details: 'Vietnam joined the Comprehensive and Progressive Agreement for Trans-Pacific Partnership (CPTPP - 2019) and the EU-Vietnam Free Trade Agreement (EVFTA - 2020). These are new-generation FTAs with very high standards on labor, environment, and intellectual property.',
          impact: 'Diversified markets, reduced dependence on single partners, and enhanced national competitiveness.'
        }
      }
    },
    { 
      year: '2023', 
      icon: Star,
      color: 'bg-gold-500',
      image: 'https://images.unsplash.com/photo-1540910419868-4749459ca6c8?q=80&w=2069&auto=format&fit=crop',
      content: {
        vi: {
          title: 'Nâng cấp Đối tác Chiến lược Toàn diện',
          desc: 'Nâng tầm quan hệ với Mỹ và Nhật Bản.',
          details: 'Năm 2023 chứng kiến bước nhảy vọt ngoại giao khi Việt Nam nâng cấp quan hệ lên Đối tác Chiến lược Toàn diện với Hoa Kỳ (tháng 9) và Nhật Bản (tháng 11). Việt Nam hiện có quan hệ ở mức cao nhất này với 7 cường quốc, bao gồm cả Trung Quốc, Nga, Ấn Độ, Hàn Quốc và Úc.',
          impact: 'Khẳng định vị thế, uy tín và vai trò trung tâm của Việt Nam trong cấu trúc an ninh - kinh tế khu vực.'
        },
        en: {
          title: 'Comprehensive Strategic Partnerships',
          desc: 'Elevating ties with USA and Japan.',
          details: '2023 witnessed a diplomatic leap as Vietnam upgraded relations to Comprehensive Strategic Partnerships with the USA (September) and Japan (November). Vietnam now holds this highest level of relations with 7 major powers, including China, Russia, India, South Korea, and Australia.',
          impact: 'Affirms Vietnam\'s status, prestige, and central role in the regional security-economic architecture.'
        }
      }
    }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-full pb-12 animate-fade-in relative">
      
      {/* Header Banner */}
      <div className="bg-diplomatic-900 text-white py-12 px-6 rounded-3xl mb-12 shadow-xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500 opacity-10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-gold-400 font-bold text-sm mb-4 border border-white/20">
            <History className="w-4 h-4" /> 1977 - 2024
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{texts.title}</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">{texts.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-gray-500 mb-8 italic text-sm">
           {texts.clickPrompt}
        </p>

        {/* Timeline Container */}
        <div className="relative pb-20">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full h-full z-0"></div>

          <div className="space-y-12">
            {MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;
              const content = isVi ? item.content.vi : item.content.en;

              return (
                <div key={index} className={`relative flex items-center md:justify-between ${isEven ? 'flex-row' : 'flex-row-reverse md:flex-row'} group`}>
                  
                  {/* Left Side (Text for Even, Spacer for Odd) */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'text-right pr-12' : ''}`}>
                    {isEven && (
                      <div 
                        onClick={() => setSelectedMilestone(item)}
                        className="cursor-pointer hover:-translate-x-2 transition-transform duration-300"
                      >
                        <h3 className="text-2xl font-bold text-diplomatic-900 mb-2 group-hover:text-gold-600 transition-colors">{content.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{content.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Center Node (The Year Bubble) */}
                  <div 
                    onClick={() => setSelectedMilestone(item)}
                    className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer"
                  >
                    {/* The Icon Bubble */}
                    <div className={`w-14 h-14 rounded-full ${item.color} text-white flex items-center justify-center shadow-lg border-4 border-white ring-4 ring-gray-100 group-hover:ring-gold-300 group-hover:scale-110 transition-all duration-300`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    
                    {/* The Year Label (Always visible) */}
                    <div className="mt-3 bg-white px-3 py-1 rounded-full shadow-md border border-gray-200 font-black text-diplomatic-900 group-hover:bg-diplomatic-900 group-hover:text-gold-400 transition-colors text-sm md:text-base whitespace-nowrap z-20">
                       {item.year}
                    </div>
                  </div>

                  {/* Right Side (Text for Odd, Spacer for Even) */}
                  <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${!isEven ? 'md:pl-12 text-left' : 'md:text-right'}`}>
                    
                    {/* Desktop Content logic */}
                    <div 
                      onClick={() => setSelectedMilestone(item)}
                      className={`${!isEven ? 'block' : 'hidden md:hidden'} md:block cursor-pointer hover:translate-x-2 transition-transform duration-300`}
                    >
                      <div className={`relative z-10 ${isEven ? 'md:hidden' : ''}`}>
                        <h3 className="text-xl md:text-2xl font-bold text-diplomatic-900 mb-2 group-hover:text-gold-600 transition-colors">{content.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{content.desc}</p>
                      </div>
                    </div>

                    {/* Mobile Only Content (For Even items) */}
                    {isEven && (
                      <div 
                        onClick={() => setSelectedMilestone(item)}
                        className="md:hidden cursor-pointer"
                      >
                        <h3 className="text-xl font-bold text-diplomatic-900 mb-2 group-hover:text-gold-600 transition-colors">{content.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{content.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* End Node */}
          <div className="flex justify-center mt-16 relative z-10 ml-6 md:ml-0">
             <div className="px-6 py-2 bg-diplomatic-100 text-diplomatic-900 rounded-full font-bold text-sm border border-diplomatic-200 animate-pulse">
               {isVi ? 'Hành trình tiếp nối...' : 'Journey continues...'}
             </div>
          </div>
        </div>
      </div>

      {/* --- DETAILED MODAL --- */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedMilestone(null)}>
          <div 
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`relative h-48 sm:h-64 ${selectedMilestone.color}`}>
              <img 
                src={selectedMilestone.image} 
                alt="Milestone background" 
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              <button 
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-3 py-1 bg-gold-500 text-diplomatic-900 font-black text-lg rounded mb-2 shadow-sm">
                  {selectedMilestone.year}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                  {isVi ? selectedMilestone.content.vi.title : selectedMilestone.content.en.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-white">
              <div className="flex items-start gap-4 mb-6">
                 <div className="p-3 bg-diplomatic-50 rounded-xl text-diplomatic-900 shrink-0">
                    <Calendar className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-2">{texts.detailsTitle}</h4>
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {isVi ? selectedMilestone.content.vi.details : selectedMilestone.content.en.details}
                    </p>
                 </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-xl border border-gold-200">
                 <div className="p-1 rounded-full bg-gold-500 text-white shrink-0 mt-1">
                    <Star className="w-4 h-4 fill-current" />
                 </div>
                 <div>
                    <h4 className="font-bold text-diplomatic-900 uppercase tracking-wide text-sm mb-1">{texts.impactTitle}</h4>
                    <p className="text-gray-800 text-sm italic font-medium">
                      "{isVi ? selectedMilestone.content.vi.impact : selectedMilestone.content.en.impact}"
                    </p>
                 </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedMilestone(null)}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                {texts.close}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TimelinePage;
