
import React from 'react';
import { X, Users, Bot, Code, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: 'vi' | 'en';
    memberId?: string | null;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, language, memberId }) => {
    if (!isOpen) return null;

    const TEAM_DATA = {
        'SE181767': {
            name: 'Võ Thành Phát',
            role: 'Leader & Fullstack Dev',
            avatar: 'https://ui-avatars.com/api/?name=Vo+Thanh+Phat&background=0D47A1&color=fff',
            contributions: language === 'vi' ? [
                'Khởi tạo và xây dựng kiến trúc dự án (React + Vite + TypeScript).',
                'Phát triển Core chức năng: Bản đồ tương tác (Interactive Map) và Logic xử lý sự kiện.',
                'Tích hợp các hiệu ứng chuyển động phức tạp (Framer Motion).',
                'Tối ưu hóa hiệu năng và quản lý State toàn cục.'
            ] : [
                'Initialized and architected the project (React + Vite + TypeScript).',
                'Developed Core features: Interactive Map and Event Handling Logic.',
                'Integrated complex animations (Framer Motion).',
                'Performance optimization and Global State management.'
            ]
        },
        'SE181689': {
            name: 'Lương Công Khoa',
            role: 'UI/UX Designer & Frontend',
            avatar: 'https://ui-avatars.com/api/?name=Luong+Cong+Khoa&background=1565C0&color=fff',
            contributions: language === 'vi' ? [
                'Thiết kế giao diện người dùng (UI) hiện đại, lấy cảm hứng từ phong cách Ngoại giao.',
                'Phát triển trang "Các Lĩnh Vực Hợp Tác" và các Component hiển thị số liệu.',
                'Nghiên cứu và tổng hợp dữ liệu về Kinh tế, Chính trị.',
                'Thiết kế Responsive đảm bảo hiển thị tốt trên mọi thiết bị.'
            ] : [
                'Designed modern User Interface (UI) inspired by Diplomatic style.',
                'Developed "Cooperation Fields" page and Data Display Components.',
                'Researched and compiled data on Economy and Politics.',
                'Responsive Design ensuring good display on all devices.'
            ]
        },
        'SE173621': {
            name: 'Nguyễn Phú Cường',
            role: 'Content Creator & QA',
            avatar: 'https://ui-avatars.com/api/?name=Nguyen+Phu+Cuong&background=1976D2&color=fff',
            contributions: language === 'vi' ? [
                'Xây dựng nội dung cho trang "Hành trình & Sự kiện" (Timeline).',
                'Phát triển bộ câu hỏi trắc nghiệm (Quiz) và logic tính điểm.',
                'Kiểm thử phần mềm (Testing) và rà soát lỗi giao diện.',
                'Biên tập nội dung song ngữ Việt - Anh chuẩn xác.'
            ] : [
                'Created content for "Journey & Events" (Timeline) page.',
                'Developed Quiz questions and scoring logic.',
                'Software Testing and UI bug review.',
                'Curated accurate bilingual Vietnamese-English content.'
            ]
        }
    };

    const selectedMember = memberId ? TEAM_DATA[memberId as keyof typeof TEAM_DATA] : null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] relative"
                >
                    {/* Header */}
                    <div className="bg-diplomatic-900 px-6 py-4 flex items-center justify-between shrink-0 relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>

                        <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
                            <Users className="w-5 h-5 text-gold-400" />
                            {selectedMember ? (language === 'vi' ? 'Thông tin thành viên' : 'Member Profile') : (language === 'vi' ? 'Thành viên & Công nghệ' : 'Team & Technology')}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors relative z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto custom-scrollbar">

                        {selectedMember ? (
                            // INDIVIDUAL VIEW
                            <div className="animate-fade-in">
                                <div className="flex flex-col items-center mb-6">
                                    <div className="w-24 h-24 rounded-full border-4 border-diplomatic-100 shadow-lg mb-4 overflow-hidden">
                                        <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-diplomatic-900">{selectedMember.name}</h3>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold mt-2">
                                        {selectedMember.role}
                                    </span>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                    <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                        <Code className="w-4 h-4 text-gold-500" />
                                        {language === 'vi' ? 'Đóng góp chính' : 'Key Contributions'}
                                    </h4>
                                    <ul className="space-y-3">
                                        {selectedMember.contributions.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                                                <div className="min-w-[6px] h-[6px] rounded-full bg-diplomatic-400 mt-1.5"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            // GENERAL VIEW (Fallback or if existing logic is kept)
                            <div className="space-y-8 animate-fade-in">
                                {/* Team List */}
                                <section>
                                    <h3 className="text-diplomatic-900 font-bold text-lg mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <Users className="w-5 h-5 text-blue-600" />
                                        {language === 'vi' ? 'Thành viên nhóm' : 'Team Members'}
                                    </h3>
                                    <div className="grid gap-3">
                                        {Object.entries(TEAM_DATA).map(([id, member]) => (
                                            <div key={id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                                                <div>
                                                    <p className="font-bold text-gray-800">{member.name}</p>
                                                    <p className="text-xs text-gray-500">{id}</p>
                                                </div>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                                    {member.role}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* AI Tech Stack */}
                                <section>
                                    <h3 className="text-diplomatic-900 font-bold text-lg mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <Bot className="w-5 h-5 text-purple-600" />
                                        {language === 'vi' ? 'Công nghệ sử dụng' : 'Technology Stack'}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-center">
                                            <Bot className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                            <div className="font-bold text-gray-800 text-xs">Google Gemini</div>
                                        </div>
                                        <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-100 text-center">
                                            <Code className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                                            <div className="font-bold text-gray-800 text-xs">React + Vite</div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AboutModal;
