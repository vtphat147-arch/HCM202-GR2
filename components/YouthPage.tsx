import React from 'react';
import { Language } from '../types';
import { GraduationCap, Globe, Heart, Users, BookOpen, Award, ArrowRight, Lightbulb, Link, ExternalLink } from 'lucide-react';

interface YouthPageProps {
  language: Language;
  onBack: () => void;
}

const YouthPage: React.FC<YouthPageProps> = ({ language, onBack }) => {
  const isVi = language === 'vi';

  const texts = {
    title: isVi ? 'Góc Nhìn Thanh Niên' : 'Youth Perspective',
    subtitle: isVi ? 'Hành trang hội nhập và cơ hội phát triển cho sinh viên Việt Nam' : 'Integration toolkit and development opportunities for Vietnamese students',
    back: isVi ? 'Quay lại' : 'Back',
    sections: {
      skills: {
        title: isVi ? 'Kỹ Năng Hội Nhập' : 'Integration Skills',
        desc: isVi ? 'Những hành trang không thể thiếu của công dân toàn cầu.' : 'Essential tools for global citizens.',
        items: [
          {
            title: isVi ? 'Ngoại ngữ & Giao tiếp' : 'Languages & Communication',
            content: isVi ? 'Thành thạo tiếng Anh và ngôn ngữ thứ 2 (Trung, Nhật, Hàn...) là chìa khóa mở cửa ra thế giới. Kỹ năng giao tiếp đa văn hóa giúp xóa bỏ rào cản.' : 'Mastering English and a second language (Chinese, Japanese, Korean...) is the key. Cross-cultural communication skills help bridge gaps.',
            icon: LanguagesIcon
          },
          {
            title: isVi ? 'Tư duy Phản biện & Số' : 'Critical & Digital Thinking',
            content: isVi ? 'Khả năng phân tích thông tin đa chiều và làm chủ công nghệ số trong kỷ nguyên 4.0.' : 'Ability to analyze multi-dimensional information and master digital technology in the 4.0 era.',
            icon: Lightbulb
          },
          {
            title: isVi ? 'Thích nghi Đa văn hóa' : 'Cross-Cultural Adaptability',
            content: isVi ? 'Sẵn sàng hòa nhập với các môi trường làm việc đa dạng, tôn trọng sự khác biệt và linh hoạt trong ứng xử.' : 'Ready to integrate into diverse work environments, respecting differences and being flexible in behavior.',
            icon: Globe
          },
          {
            title: isVi ? 'Lãnh đạo & Làm việc nhóm' : 'Leadership & Teamwork',
            content: isVi ? 'Kỹ năng dẫn dắt bản thân và phối hợp hiệu quả với người khác để giải quyết các vấn đề phức tạp.' : 'Skills to lead oneself and coordinate effectively with others to solve complex problems.',
            icon: Users
          }
        ]
      },
      programs: {
        title: isVi ? 'Học Bổng & Trao Đổi' : 'Scholarships & Exchange',
        desc: isVi ? 'Các cơ hội vươn ra biển lớn dành cho sinh viên.' : 'Opportunities for students to reach out to the world.',
        items: [
          {
            name: 'YSEALI',
            org: 'USA',
            detail: isVi ? 'Sáng kiến Thủ lĩnh Trẻ Đông Nam Á - Cơ hội tập huấn ngắn hạn tại Mỹ về lãnh đạo, môi trường.' : 'Young Southeast Asian Leaders Initiative - Short-term training in the US on leadership, environment.',
            color: 'bg-blue-600'
          },
          {
            name: 'Erasmus+',
            org: 'EU',
            detail: isVi ? 'Chương trình trao đổi tín chỉ và thạc sĩ tại các trường đại học hàng đầu Châu Âu.' : 'Credit exchange and master programs at top European universities.',
            color: 'bg-indigo-600'
          },
          {
            name: 'SSEAYP',
            org: 'Japan/ASEAN',
            detail: isVi ? 'Tàu Thanh niên Đông Nam Á - Nhật Bản: Hành trình kết nối văn hóa trên biển.' : 'Ship for Southeast Asian and Japanese Youth Program: Cultural connection journey at sea.',
            color: 'bg-red-600'
          },
          {
            name: 'Global UGRAD',
            org: 'USA',
            detail: isVi ? 'Học bổng trao đổi sinh viên đại học một học kỳ tại Mỹ, đài thọ toàn phần.' : 'Global Undergraduate Exchange Program - Fully funded one-semester scholarship in the US.',
            color: 'bg-blue-500'
          },
          {
            name: 'Australia Awards',
            org: 'Australia',
            detail: isVi ? 'Học bổng Chính phủ Úc danh giá dành cho bậc Thạc sĩ với mục tiêu phát triển bền vững.' : 'Prestigious Australian Government Scholarships for Masters degrees focusing on sustainable development.',
            color: 'bg-green-600'
          },
          {
            name: 'Chevening',
            org: 'UK',
            detail: isVi ? 'Học bổng toàn phần của Chính phủ Anh dành cho các nhà lãnh đạo tương lai.' : 'UK Government’s global scholarship programme for future leaders.',
            color: 'bg-red-700'
          }
        ]
      },
      volunteer: {
        title: isVi ? 'Tình Nguyện & Xã Hội' : 'Volunteering & Social Work',
        desc: isVi ? 'Cống hiến sức trẻ và trải nghiệm thực tế.' : 'Dedicate youth and gain practical experience.',
        items: [
          {
            title: isVi ? 'UN Volunteers' : 'UN Volunteers',
            content: isVi ? 'Tham gia các dự án phát triển của Liên Hợp Quốc tại Việt Nam và nước ngoài.' : 'Participate in UN development projects in Vietnam and abroad.',
            icon: Heart
          },
          {
            title: isVi ? 'AIESEC' : 'AIESEC',
            content: isVi ? 'Tổ chức thanh niên lớn nhất thế giới, cung cấp cơ hội thực tập và tình nguyện toàn cầu.' : 'World\'s largest youth organization, providing global internship and volunteer opportunities.',
            icon: Users
          },
          {
            title: isVi ? 'V.E.O' : 'V.E.O',
            content: isVi ? 'Tổ chức Tình nguyện vì Giáo dục - Kết hợp du lịch thiện nguyện hỗ trợ vùng cao.' : 'Volunteer for Education Organization - Combining volunteer tourism to support highland areas.',
            icon: BookOpen
          },
          {
            title: isVi ? 'Mùa Hè Xanh' : 'Green Summer',
            content: isVi ? 'Chiến dịch tình nguyện hè truyền thống của sinh viên Việt Nam, đóng góp cho cộng đồng địa phương.' : 'Traditional summer volunteer campaign of Vietnamese students, contributing to local communities.',
            icon: Award
          }
        ]
      },
      resources: {
        title: isVi ? 'Tài Nguyên Hữu Ích' : 'Useful Resources',
        desc: isVi ? 'Các kênh thông tin săn học bổng và phát triển bản thân.' : 'Channels for scholarship hunting and self-development.',
        items: [
          { name: 'Scholarship Planet', url: 'https://scholarshipplanet.info/', desc: isVi ? 'Tổng hợp học bổng du học' : 'Scholarship aggregator' },
          { name: 'Youth Opportunities', url: 'https://web.facebook.com/YouthOp.vn/?_rdc=1&_rdr#', desc: isVi ? 'Cơ hội toàn cầu cho giới trẻ' : 'Global opportunities for youth' },
          { name: 'YBOX.VN', url: 'https://ybox.vn/', desc: isVi ? 'Kênh thông tin chất lượng cao' : 'High quality info channel' },
          { name: 'Coursera', url: 'https://www.coursera.org/', desc: isVi ? 'Học trực tuyến từ ĐH hàng đầu' : 'Online learning from top unis' }
        ]
      }
    }
  };

  return (
    <div className="min-h-full bg-slate-50 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12 px-6 shadow-lg mb-8">
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> {texts.back}
          </button>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <GraduationCap className="w-10 h-10 text-yellow-300" />
            {texts.title}
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl">{texts.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-12">
        
        {/* Section 1: Skills */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{texts.sections.skills.title}</h3>
              <p className="text-gray-500">{texts.sections.skills.desc}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {texts.sections.skills.items.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Exchange Programs */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{texts.sections.programs.title}</h3>
              <p className="text-gray-500">{texts.sections.programs.desc}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {texts.sections.programs.items.map((prog, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col">
                <div className={`${prog.color} h-2`}></div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-xl text-gray-800">{prog.name}</h4>
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">{prog.org}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{prog.detail}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(prog.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 w-fit"
                  >
                    {isVi ? 'Tìm hiểu thêm' : 'Learn more'} <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Volunteering */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 rounded-full text-red-600">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{texts.sections.volunteer.title}</h3>
              <p className="text-gray-500">{texts.sections.volunteer.desc}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-xl">
            <div className="grid md:grid-cols-2 gap-8">
              {texts.sections.volunteer.items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1">
                    <item.icon className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400 text-sm italic">
                "{isVi ? 'Đừng hỏi Tổ quốc đã làm gì cho ta, mà hãy hỏi ta đã làm gì cho Tổ quốc hôm nay.' : 'Ask not what your country can do for you — ask what you can do for your country.'}"
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Resources */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <Link className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{texts.sections.resources.title}</h3>
              <p className="text-gray-500">{texts.sections.resources.desc}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {texts.sections.resources.items.map((res, idx) => (
              <a 
                key={idx} 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-3 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-800 mb-1">{res.name}</h4>
                <p className="text-xs text-gray-500">{res.desc}</p>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

// Helper icon component
const LanguagesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
);

export default YouthPage;
