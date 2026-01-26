import React from 'react';
import { Language } from '../types';
import { motion } from 'framer-motion';
import { BookOpen, Users, Globe, ArrowLeft, Lightbulb, FileText, Quote, ChevronRight } from 'lucide-react';

interface DocumentPageProps {
    language: Language;
    onBack: () => void;
}

const DocumentPage: React.FC<DocumentPageProps> = ({ language, onBack }) => {
    const isVi = language === 'vi';

    const texts = {
        title: isVi
            ? 'Vận dụng Tư tưởng Hồ Chí Minh về Đại đoàn kết'
            : 'Applying Ho Chi Minh\'s Ideology on Great Unity',
        subtitle: isVi
            ? 'Tài liệu nghiên cứu và học tập chuyên sâu'
            : 'In-depth research and study material',
        back: isVi ? 'Quay lại' : 'Back',
        toc: isVi ? 'Mục lục' : 'Table of Contents',
    };

    return (
        <motion.div
            className="w-full bg-[#f8f9fa] min-h-screen flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Navbar / Header */}
            <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-diplomatic-900 hover:bg-gray-100 rounded-lg transition-all font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>{texts.back}</span>
                    </button>

                    <div className="flex items-center gap-2 text-diplomatic-900 font-serif font-bold opacity-0 md:opacity-100 transition-opacity">
                        <FileText className="w-5 h-5" />
                        <span className="hidden sm:inline line-clamp-1">{texts.title}</span>
                    </div>

                    <div className="w-10"></div> {/* Spacer for symmetry */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-4xl">

                {/* Paper Container */}
                <article className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">

                    {/* Hero Header within Paper */}
                    <div className="bg-diplomatic-900 text-white p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

                        <div className="relative z-10 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/10 shadow-lg"
                            >
                                <BookOpen className="w-8 h-8 text-gold-400" />
                            </motion.div>
                            <h1 className="text-2xl md:text-4xl font-serif font-bold mb-4 leading-normal md:leading-relaxed text-balance">
                                VẬN DỤNG TƯ TƯỞNG HỒ CHÍ MINH <br />
                                <span className="text-gold-400">VỀ ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC</span> <br />
                                VÀ ĐOÀN KẾT QUỐC TẾ
                            </h1>
                            <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full my-6"></div>
                            <p className="text-blue-100 max-w-2xl mx-auto italic">
                                "Đoàn kết, đoàn kết, đại đoàn kết.<br /> Thành công, thành công, đại thành công."
                            </p>
                        </div>
                    </div>

                    <div className="p-8 md:p-16 space-y-16">

                        {/* Introduction / Preamble */}
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-diplomatic-900 first-letter:float-left first-letter:mr-3">
                            <p>
                                Phải khơi dậy và phát huy đến mức cao nhất sức mạnh dân tộc và sức mạnh quốc tế;
                                đặt lợi ích dân tộc, của đất nước lên hàng đầu, lấy đó làm cơ sở để xây dựng các chủ trương,
                                chính sách kinh tế - xã hội.
                            </p>
                            <div className="my-8 p-6 bg-yellow-50 border-l-4 border-gold-500 rounded-r-xl flex gap-4 items-start">
                                <Quote className="w-8 h-8 text-gold-500 shrink-0 opacity-50" />
                                <p className="italic text-gray-800 font-medium m-0">
                                    "Trước đây, sức mạnh của khối đại đoàn kết toàn dân tộc là sức mạnh để chiến thắng giặc ngoại xâm.
                                    Hiện nay, sức mạnh ấy phải là sức mạnh để chiến thắng nghèo nàn và lạc hậu."
                                </p>
                            </div>
                        </div>

                        {/* Section 1 */}
                        <motion.section
                            className="group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <Lightbulb className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-diplomatic-900 uppercase tracking-tight">1. Quán triệt tư tưởng</h2>
                            </div>

                            <div className="pl-4 md:pl-16 space-y-4 text-gray-700 leading-relaxed border-l-2 border-dashed border-gray-200 ml-6 pb-6">
                                <p>
                                    Nhận thức tầm quan trọng của vấn đề đại đoàn kết toàn dân tộc, ngày 2/11/1993,
                                    Bộ Chính trị Trung ương Đảng khóa VII đã ra Nghị quyết số 07-NQ/TW
                                    "Về đại đoàn kết dân tộc và tăng cường Mặt trận dân tộc thống nhất".
                                </p>
                                <p>
                                    Tại Đại hội đại biểu toàn quốc lần thứ XII, Đảng khẳng định:
                                    <strong> "Đại đoàn kết dân tộc là đường lối chiến lược của cách mạng Việt Nam, là động lực và nguồn lực to lớn trong xây dựng và bảo vệ Tổ quốc"</strong>.
                                </p>

                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mt-4">
                                    <h4 className="font-bold text-diplomatic-900 mb-2 flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-gold-500" /> Mục tiêu chung:
                                    </h4>
                                    <p className="text-sm">
                                        Xây dựng một nước Việt Nam hòa bình, độc lập, thống nhất, toàn vẹn lãnh thổ,
                                        "dân giàu, nước mạnh, dân chủ, công bằng, văn minh".
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Section 2 */}
                        <motion.section
                            className="group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-diplomatic-900 uppercase tracking-tight">2. Xây dựng khối đại đoàn kết</h2>
                            </div>

                            <div className="pl-4 md:pl-16 space-y-4 text-gray-700 leading-relaxed border-l-2 border-dashed border-gray-200 ml-6 pb-6">
                                <p>
                                    Lịch sử đã chứng minh rằng, Mặt trận dân tộc thống nhất càng rộng rãi thì liên minh công - nông - trí càng mạnh,
                                    sự lãnh đạo của Đảng càng vững.
                                </p>

                                <h4 className="font-bold text-gray-900 mt-6 mb-3">5 Vấn đề cơ bản cần thực hiện:</h4>
                                <div className="grid gap-3">
                                    {[
                                        "Nhận thức sâu sắc về sự cần thiết phải tăng cường khối đại đoàn kết.",
                                        "Tăng cường sự lãnh đạo của Đảng, quản lý của Nhà nước.",
                                        "Giải quyết tốt quan hệ lợi ích giữa các giai cấp, tầng lớp xã hội.",
                                        "Tăng cường quan hệ mật thiết giữa nhân dân với Đảng, Nhà nước.",
                                        "Kiên quyết đấu tranh với các quan điểm sai trái, thù địch."
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-gold-300 transition-colors">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold-100 text-amber-700 text-xs font-bold shrink-0">{idx + 1}</span>
                                            <span className="text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>

                        {/* Section 3 */}
                        <motion.section
                            className="group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-700 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-diplomatic-900 uppercase tracking-tight">3. Kết hợp với đoàn kết quốc tế</h2>
                            </div>

                            <div className="pl-4 md:pl-16 space-y-4 text-gray-700 leading-relaxed ml-6">
                                <p>
                                    Trong giai đoạn cách mạng hiện nay, phải nhất quán coi cách mạng Việt Nam là một bộ phận không thể tách rời của cách mạng thế giới.
                                    Đảng, Nhà nước ta chủ trương nêu cao nguyên tắc độc lập tự chủ, tự lực, tự cường.
                                </p>

                                <div className="my-6 grid md:grid-cols-2 gap-4">
                                    <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                                        <h5 className="font-bold text-diplomatic-900 mb-2">Đường lối đối ngoại</h5>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>• Đa phương hóa, đa dạng hóa</li>
                                            <li>• Là bạn, là đối tác tin cậy</li>
                                            <li>• Thành viên có trách nhiệm</li>
                                        </ul>
                                    </div>
                                    <div className="p-5 bg-gold-50 rounded-xl border border-gold-100">
                                        <h5 className="font-bold text-amber-900 mb-2">Bài học kinh nghiệm</h5>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>• Kết hợp sức mạnh dân tộc & thời đại</li>
                                            <li>• Độc lập, tự chủ là nền tảng</li>
                                            <li>• Vận dụng sáng tạo tư tưởng Hồ Chí Minh</li>
                                        </ul>
                                    </div>
                                </div>

                                <p>
                                    Thực hiện phương châm: "Dĩ bất biến, ứng vạn biến", giữ vững nguyên tắc độc lập dân tộc và chủ nghĩa xã hội,
                                    đồng thời linh hoạt, mềm dẻo trong sách lược đối ngoại.
                                </p>
                            </div>
                        </motion.section>


                    </div>

                    {/* Footer of the paper */}
                    <div className="bg-gray-50 border-t border-gray-100 p-8 text-center">
                        <div className="inline-block px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm">
                            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Tài liệu học tập nội bộ</span>
                        </div>
                    </div>
                </article>
            </main>
        </motion.div>
    );
};

export default DocumentPage;
