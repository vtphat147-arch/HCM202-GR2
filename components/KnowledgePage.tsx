
import React from 'react';
import { Language } from '../types';
import { BookOpen, Target, Users, Globe, CheckCircle, ArrowRight, Star, ShieldCheck } from 'lucide-react';

interface KnowledgePageProps {
  language: Language;
  onBack: () => void;
  onStartQuiz: () => void;
}

const KnowledgePage: React.FC<KnowledgePageProps> = ({ language, onBack, onStartQuiz }) => {
  const isVi = language === 'vi';

  const texts = {
    title: isVi ? 'Vận Dụng Tư Tưởng Hồ Chí Minh' : 'Applying Ho Chi Minh\'s Ideology',
    subtitle: isVi
      ? 'Về đại đoàn kết toàn dân tộc và đoàn kết quốc tế trong giai đoạn hiện nay'
      : 'On great national unity and international solidarity in the current period',
    back: isVi ? 'Quay lại Bản đồ' : 'Back to Map',
    section1: isVi ? '1. Chủ trương & Đường lối' : '1. Guidelines & Policies',
    section2: isVi ? '2. Xây dựng khối đại đoàn kết toàn dân tộc' : '2. Building the great national unity bloc',
    section3: isVi ? '3. Kết hợp Sức mạnh Dân tộc & Quốc tế' : '3. Combining National & International Strength',
    quote: isVi
      ? '"Trước đây, sức mạnh của khối đại đoàn kết toàn dân tộc là sức mạnh để chiến thắng giặc ngoại xâm. Hiện nay, sức mạnh ấy phải là sức mạnh để chiến thắng nghèo nàn và lạc hậu."'
      : '"Previously, the power of great unity was to defeat foreign invaders. Now, that power must be the power to defeat poverty and backwardness."',
    corePrinciplesTitle: isVi ? 'Nguyên tắc Cốt lõi' : 'Core Principles',
    tasksTitle: isVi ? '5 Nhiệm vụ tăng cường khối Đại đoàn kết:' : '5 Tasks to strengthen Great Unity:',
    diplomaticThinkingTitle: isVi ? 'Tư duy Ngoại giao (Đại hội Đảng)' : 'Diplomatic Thinking (Party Congress)',
    lessonsTitle: isVi ? '4 Bài học Vận dụng:' : '4 Applied Lessons:',
    quizTitle: isVi ? 'Kiểm tra kiến thức' : 'Knowledge Check',
    quizDesc: isVi ? 'Thử thách bản thân với bộ câu hỏi trắc nghiệm về Tư tưởng Hồ Chí Minh.' : 'Challenge yourself with a quiz on Ho Chi Minh\'s Ideology.',
    startQuiz: isVi ? 'Làm bài trắc nghiệm ngay' : 'Start Quiz Now',
  };

  const timelineData = [
    {
      title: isVi ? 'Nghị quyết 07-NQ/TW (1993)' : 'Resolution 07-NQ/TW (1993)',
      desc: isVi ? 'Về đại đoàn kết dân tộc và tăng cường Mặt trận dân tộc thống nhất.' : 'On great national unity and strengthening the United National Front.'
    },
    {
      title: isVi ? 'Đại hội VIII (1996)' : 'VIII Congress (1996)',
      desc: isVi ? 'Phát huy sức mạnh toàn dân trong thời kỳ công nghiệp hóa, hiện đại hóa.' : 'Promoting the power of the whole people in the period of industrialization and modernization.'
    },
    {
      title: isVi ? 'Đại hội XII' : 'XII Congress',
      desc: isVi ? 'Đại đoàn kết là đường lối chiến lược, là động lực và nguồn lực to lớn.' : 'Great unity is a strategic line, a great driving force and resource.'
    },
    {
      title: isVi ? 'Đại hội XIII' : 'XIII Congress',
      desc: isVi ? 'Đất nước chưa bao giờ có được cơ đồ, tiềm lực, vị thế và uy tín quốc tế như hiện nay.' : 'The country has never had such fortune, potential, position, and international prestige as it does today.'
    }
  ];

  const corePrinciples = [
    isVi ? 'Nền tảng: Liên minh Công nhân - Nông dân - Trí thức.' : 'Foundation: Worker - Peasant - Intellectual Alliance.',
    isVi ? 'Dưới sự lãnh đạo vững chắc của Đảng Cộng sản.' : 'Under the firm leadership of the Communist Party.',
    isVi ? 'Mặt trận càng rộng rãi -> Liên minh càng mạnh -> Lãnh đạo càng vững.' : 'Broader Front -> Stronger Alliance -> Firmer Leadership.'
  ];

  const tasks = [
    isVi ? "Đẩy mạnh tuyên truyền, nâng cao nhận thức về đại đoàn kết." : "Promote propaganda, raise awareness about great unity.",
    isVi ? "Tăng cường lãnh đạo của Đảng, quản lý Nhà nước, thể chế hóa chính sách." : "Strengthen Party leadership, State management, institutionalize policies.",
    isVi ? "Giải quyết hài hòa lợi ích giữa các giai cấp, tầng lớp xã hội." : "Harmoniously resolve interests between classes and social strata.",
    isVi ? "Tăng cường quan hệ mật thiết giữa Nhân dân với Đảng, Nhà nước." : "Strengthen close relations between the People and the Party, State.",
    isVi ? "Kiên quyết đấu tranh với các quan điểm sai trái, thù địch, chia rẽ." : "Resolutely struggle against wrong, hostile, divisive views."
  ];

  const diplomaticThinking = [
    { congress: isVi ? 'ĐH VII' : 'VII Congress', text: isVi ? '"Muốn là bạn"' : '"Wants to be a friend"' },
    { congress: isVi ? 'ĐH VIII' : 'VIII Congress', text: isVi ? '"Sẵn sàng là bạn"' : '"Ready to be a friend"' },
    { congress: isVi ? 'ĐH IX' : 'IX Congress', text: isVi ? '"Là bạn và đối tác tin cậy"' : '"Friend and reliable partner"' },
    { congress: isVi ? 'ĐH XII, XIII' : 'XII, XIII Congress', text: isVi ? '"Chủ động và tích cực hội nhập quốc tế"' : '"Proactive and active international integration"', highlight: true }
  ];

  const lessons = [
    isVi ? "Mục tiêu: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh." : "Goal: Wealthy people, strong country, democracy, justice, civilization.",
    isVi ? "Mở cửa, hội nhập, là bạn của tất cả, tham gia vấn đề toàn cầu." : "Open door, integration, friend to all, participate in global issues.",
    isVi ? "Độc lập tự chủ, tự lực tự cường + Sức mạnh thời đại." : "Independence, self-reliance + Power of the times.",
    isVi ? "Xây dựng Đảng trong sạch, vững mạnh làm hạt nhân đoàn kết toàn dân tộc và quốc tế." : "Build a clean, strong Party as the nucleus of national and international unity."
  ];

  return (
    <div className="w-full bg-slate-50 min-h-full pb-12 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-diplomatic-900 text-white py-12 px-6 rounded-3xl mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-gold-400 text-sm font-bold mb-4 border border-white/20">
            <Star className="w-4 h-4" />
            <span>{isVi ? 'Tài liệu học tập' : 'Study Material'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
            {texts.title}
          </h2>
          <p className="text-blue-100 text-lg md:text-xl font-light">
            {texts.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-12">

        {/* SECTION 1: POLICY TIMELINE */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-diplomatic-100 rounded-xl text-diplomatic-900">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-diplomatic-900">{texts.section1}</h3>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-6 italic border-l-4 border-gold-500 pl-4 py-2 bg-yellow-50 rounded-r-lg">
              {texts.quote}
            </p>

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {timelineData.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-gold-400 hover:shadow-md transition-all group">
                  <div className="text-3xl font-bold text-slate-200 group-hover:text-gold-400 mb-2 transition-colors">0{idx + 1}</div>
                  <h4 className="font-bold text-diplomatic-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: ALLIANCE & TASKS */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-diplomatic-100 rounded-xl text-diplomatic-900">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-diplomatic-900">{texts.section2}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Core Principle Card */}
            <div className="md:col-span-1 bg-diplomatic-900 text-white p-6 rounded-2xl flex flex-col justify-center">
              <h4 className="text-xl font-bold text-gold-400 mb-4">{texts.corePrinciplesTitle}</h4>
              <ul className="space-y-4">
                {corePrinciples.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <span className="text-sm opacity-90">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5 Tasks Grid */}
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-4">{texts.tasksTitle}</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {tasks.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-diplomatic-100 text-diplomatic-800 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERNATIONAL SOLIDARITY */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-diplomatic-100 rounded-xl text-diplomatic-900">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-diplomatic-900">{texts.section3}</h3>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-sm border border-blue-100">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h4 className="text-xl font-bold text-diplomatic-800">{texts.diplomaticThinkingTitle}</h4>
                <div className="space-y-3">
                  {diplomaticThinking.map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-2 ${item.highlight ? 'text-diplomatic-900 font-bold bg-white p-2 rounded shadow-sm inline-block border border-gold-200' : 'text-gray-600'}`}>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${item.highlight ? 'bg-gold-400 text-diplomatic-900' : 'bg-gray-200'}`}>
                        {item.congress}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full">
                <h5 className="font-bold text-gray-800 mb-3 border-b pb-2">{texts.lessonsTitle}</h5>
                <ul className="space-y-3">
                  {lessons.map((lesson, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-gold-500 font-bold">•</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ SECTION */}
        <section className="bg-diplomatic-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-gold-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
              <Target className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">{texts.quizTitle}</h3>
            <p className="text-blue-100 mb-8 text-lg">{texts.quizDesc}</p>

            <button
              onClick={onStartQuiz}
              className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-diplomatic-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto"
            >
              {texts.startQuiz}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default KnowledgePage;
