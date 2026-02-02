
import React from 'react';
import { X, Users, Bot, Code, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: 'vi' | 'en';
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, language }) => {
    if (!isOpen) return null;

    const text = {
        title: language === 'vi' ? 'Thành viên & Công nghệ' : 'Team & Technology',
        teamTitle: language === 'vi' ? 'Thành viên nhóm' : 'Team Members',
        aiTitle: language === 'vi' ? 'Sử dụng AI & Công nghệ' : 'AI & Technology Usage',
        aiDesc: language === 'vi'
            ? 'Dự án này được hỗ trợ phát triển bởi các công nghệ AI tiên tiến.'
            : 'This project is supported by advanced AI technologies.',
        team: [
            { name: 'Võ Thành Phát', id: 'SE181767', role: 'Dev' },
            { name: 'Lương Công Khoa', id: 'SE181689', role: 'Dev' },
            { name: 'Nguyễn Phú Cường', id: 'SE173621', role: 'Dev' },
        ],
        aiTools: [
            {
                name: 'Google Gemini (Antigravity)',
                role: language === 'vi' ? 'Trợ lý lập trình AI' : 'AI Coding Assistant',
                icon: <Bot className="w-5 h-5 text-blue-500" />
            },
            {
                name: 'React + Vite',
                role: language === 'vi' ? 'Framework Frontend' : 'Frontend Framework',
                icon: <Code className="w-5 h-5 text-cyan-500" />
            },
            {
                name: 'Framer Motion',
                role: language === 'vi' ? 'Hiệu ứng chuyển động' : 'Animation Library',
                icon: <Cpu className="w-5 h-5 text-purple-500" />
            }
        ],
        prompts: {
            title: language === 'vi' ? 'Các loại Prompt đã sử dụng' : 'Prompt Types Used',
            list: language === 'vi'
                ? ['Tạo cấu trúc dự án và component', 'Tối ưu hóa hiệu năng React', 'Debug lỗi logic và giao diện', 'Gợi ý thiết kế UI/UX hiện đại']
                : ['Project structure & component generation', 'React performance optimization', 'Logic & UI debugging', 'Modern UI/UX design suggestions']
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="bg-diplomatic-900 px-6 py-4 flex items-center justify-between shrink-0">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Users className="w-5 h-5 text-gold-400" />
                            {text.title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">

                        {/* Team Section */}
                        <section>
                            <h3 className="text-diplomatic-900 font-bold text-lg mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                <Users className="w-5 h-5 text-blue-600" />
                                {text.teamTitle}
                            </h3>
                            <div className="grid gap-3">
                                {text.team.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                                        <div>
                                            <p className="font-bold text-gray-800">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.id}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                            {member.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* AI Section */}
                        <section>
                            <h3 className="text-diplomatic-900 font-bold text-lg mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                <Bot className="w-5 h-5 text-purple-600" />
                                {text.aiTitle}
                            </h3>

                            <div className="mb-4">
                                <p className="text-sm text-gray-600 italic mb-3">{text.aiDesc}</p>
                                <div className="grid gap-3">
                                    {text.aiTools.map((tool, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                                {tool.icon}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{tool.name}</p>
                                                <p className="text-xs text-gray-500">{tool.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-700 text-sm mb-2">{text.prompts.title}</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {text.prompts.list.map((prompt, idx) => (
                                        <li key={idx} className="text-sm text-slate-600">{prompt}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AboutModal;
