
import { GoogleGenAI, Type } from "@google/genai";
import { RegionContentResponse, Language, QuizQuestion, RegionID } from "../types";

// Prefer Groq if available (to avoid Gemini quota limits). Fall back to Gemini.
const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
const useGroq = Boolean(groqApiKey);
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

type GroqChatResponse = {
  choices?: Array<{
    message?: { content?: string };
  }>;
};

const sanitizeJsonContent = (content: string): string => {
  let text = content.trim();
  // Strip Markdown fences ```json ... ```
  if (text.startsWith("```")) {
    text = text.replace(/^```[a-zA-Z]*\s*/, "").replace(/```$/, "").trim();
  }
  return text;
};

const callGroq = async (prompt: string) => {
  if (!groqApiKey) {
    throw new Error("Missing Groq API key");
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqApiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Groq API error: ${res.status} ${body}`);
  }

  const data = (await res.json()) as GroqChatResponse;
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Groq returned empty content");
  }
  return content;
};

// --- STATIC DATA STORAGE ---
// Dữ liệu cứng được biên soạn kỹ lưỡng để đảm bảo tính chính xác và giáo dục
const STATIC_DATA: Record<string, Record<Language, RegionContentResponse>> = {
  [RegionID.UN]: {
    vi: {
      history: "Việt Nam chính thức gia nhập Liên Hợp Quốc ngày 20/9/1977, đánh dấu sự công nhận của cộng đồng quốc tế ngay sau khi đất nước thống nhất. Từ một quốc gia nhận viện trợ nhân đạo để tái thiết sau chiến tranh, Việt Nam đã vươn lên trở thành một đối tác tích cực, chủ động tham gia vào các cơ chế hoạch định chính sách toàn cầu.",
      contribution: "Việt Nam đã hai lần đảm nhiệm thành công vai trò Ủy viên không thường trực Hội đồng Bảo an (2008-2009 và 2020-2021) với số phiếu tín nhiệm kỷ lục. Đặc biệt, Việt Nam đã cử lực lượng tham gia gìn giữ hòa bình Liên Hợp Quốc tại Nam Sudan và Cộng hòa Trung Phi, cũng như đề xuất lấy ngày 27/12 là 'Ngày Quốc tế phòng chống dịch bệnh'.",
      meaning: "Liên Hợp Quốc là diễn đàn quan trọng nhất để Việt Nam khẳng định đường lối ngoại giao độc lập, tự chủ, đa phương hóa, đa dạng hóa. Hợp tác với UN giúp Việt Nam nâng cao vị thế chính trị, bảo vệ lợi ích quốc gia dựa trên luật pháp quốc tế và tranh thủ nguồn lực cho phát triển bền vững (MDGs, SDGs).",
      milestones: [
        { year: "1977", event: "Gia nhập Liên Hợp Quốc (Thành viên thứ 149)." },
        { year: "2008", event: "Lần đầu tiên trúng cử Ủy viên không thường trực HĐBA (2008-2009)." },
        { year: "2014", event: "Chính thức cử lực lượng tham gia Gìn giữ hòa bình LHQ." },
        { year: "2020", event: "Đảm nhiệm Ủy viên không thường trực HĐBA nhiệm kỳ 2 (2020-2021)." },
        { year: "2022", event: "Trúng cử Hội đồng Nhân quyền LHQ nhiệm kỳ 2023-2025." }
      ]
    },
    en: {
      history: "Vietnam officially joined the United Nations on September 20, 1977, marking international recognition shortly after national reunification. Transforming from a recipient of humanitarian aid for post-war reconstruction, Vietnam has risen to become an active partner, proactively participating in global policy-making mechanisms.",
      contribution: "Vietnam has successfully served twice as a Non-Permanent Member of the Security Council (2008-2009 and 2020-2021) with record confidence votes. Notably, Vietnam has deployed forces to UN peacekeeping missions in South Sudan and the Central African Republic, and proposed December 27 as the 'International Day of Epidemic Preparedness'.",
      meaning: "The UN is the most critical forum for Vietnam to affirm its foreign policy of independence, self-reliance, multilateralism, and diversification. Cooperation with the UN helps Vietnam elevate its political status, protect national interests based on international law, and leverage resources for sustainable development (MDGs, SDGs).",
      milestones: [
        { year: "1977", event: "Joined the United Nations (149th Member)." },
        { year: "2008", event: "Elected as UNSC Non-Permanent Member for the first time (2008-2009)." },
        { year: "2014", event: "Officially deployed forces for UN Peacekeeping." },
        { year: "2020", event: "Served second term as UNSC Non-Permanent Member (2020-2021)." },
        { year: "2022", event: "Elected to the UN Human Rights Council (2023-2025)." }
      ]
    }
  },
  [RegionID.ASEAN]: {
    vi: {
      history: "Ngày 28/7/1995, Việt Nam chính thức gia nhập ASEAN tại Brunei. Đây là bước đột phá phá thế bao vây cấm vận, mở đầu cho quá trình hội nhập khu vực và quốc tế sâu rộng. Từ một nước có chế độ chính trị khác biệt, Việt Nam đã trở thành một thành viên nòng cốt, dẫn dắt sự đoàn kết trong khối.",
      contribution: "Việt Nam đóng vai trò then chốt trong việc xác định mục tiêu và lộ trình hình thành Cộng đồng ASEAN (2015) và Tầm nhìn ASEAN 2025. Nước ta đã tổ chức thành công nhiều hội nghị cấp cao, giữ vai trò điều phối quan hệ ASEAN với các đối tác lớn, và thúc đẩy giải quyết hòa bình các tranh chấp trên Biển Đông dựa trên luật pháp quốc tế (UNCLOS 1982).",
      meaning: "ASEAN là 'vòng đai an ninh' trực tiếp và là thị trường quan trọng của Việt Nam. Hội nhập ASEAN tạo nền tảng vững chắc để Việt Nam mở rộng quan hệ với các nước lớn, duy trì môi trường hòa bình, ổn định để phát triển kinh tế và nâng cao vị thế địa chính trị trong khu vực Đông Nam Á.",
      milestones: [
        { year: "1995", event: "Chính thức gia nhập ASEAN." },
        { year: "1998", event: "Tổ chức thành công Hội nghị Cấp cao ASEAN lần thứ 6 tại Hà Nội." },
        { year: "2010", event: "Chủ tịch ASEAN: Thúc đẩy mở rộng Cấp cao Đông Á (EAS) (kết nạp Nga, Mỹ)." },
        { year: "2015", event: "Cộng đồng Kinh tế ASEAN (AEC) chính thức hình thành." },
        { year: "2020", event: "Chủ tịch ASEAN: Dẫn dắt khối vượt qua đại dịch COVID-19." }
      ]
    },
    en: {
      history: "On July 28, 1995, Vietnam officially joined ASEAN in Brunei. This was a breakthrough in breaking the embargo, initiating extensive regional and international integration. From a country with a different political system, Vietnam has become a core member, leading solidarity within the bloc.",
      contribution: "Vietnam played a key role in defining the goals and roadmap for the formation of the ASEAN Community (2015) and ASEAN Vision 2025. The country has successfully hosted many summits, coordinated ASEAN relations with major partners, and promoted peaceful resolution of South China Sea disputes based on international law (UNCLOS 1982).",
      meaning: "ASEAN serves as Vietnam's immediate 'security belt' and a crucial market. ASEAN integration provides a solid foundation for Vietnam to expand relations with major powers, maintain a peaceful and stable environment for economic development, and enhance its geopolitical position in Southeast Asia.",
      milestones: [
        { year: "1995", event: "Officially joined ASEAN." },
        { year: "1998", event: "Successfully hosted the 6th ASEAN Summit in Hanoi." },
        { year: "2010", event: "ASEAN Chair: Promoted expansion of East Asia Summit (EAS) (admitting Russia, USA)." },
        { year: "2015", event: "ASEAN Economic Community (AEC) officially established." },
        { year: "2020", event: "ASEAN Chair: Led the bloc through the COVID-19 pandemic." }
      ]
    }
  },
  [RegionID.APEC]: {
    vi: {
      history: "Việt Nam gia nhập Diễn đàn Hợp tác Kinh tế Châu Á - Thái Bình Dương (APEC) vào năm 1998. Đây là quyết định chiến lược nhằm hội nhập vào khu vực kinh tế năng động nhất thế giới, nơi quy tụ các nền kinh tế hàng đầu như Mỹ, Trung Quốc, Nhật Bản.",
      contribution: "Dù là nền kinh tế đang phát triển, Việt Nam đã hai lần đăng cai tổ chức thành công Năm APEC (2006 và 2017). Đặc biệt, Hội nghị APEC Đà Nẵng 2017 đã giữ vững đà tự do hóa thương mại trong bối cảnh chủ nghĩa bảo hộ gia tăng, thông qua 'Tầm nhìn APEC sau 2020'.",
      meaning: "APEC mang lại lợi ích kinh tế trực tiếp: 77% thương mại, 81% vốn đầu tư trực tiếp và 85% lượng khách du lịch đến Việt Nam là từ các thành viên APEC. Đây cũng là kênh quan trọng để Việt Nam làm sâu sắc thêm quan hệ song phương với các đối tác chiến lược hàng đầu.",
      milestones: [
        { year: "1998", event: "Chính thức trở thành thành viên APEC." },
        { year: "2006", event: "Đăng cai APEC lần 1 tại Hà Nội (Kết nạp Việt Nam vào WTO bên lề)." },
        { year: "2017", event: "Đăng cai APEC lần 2 tại Đà Nẵng - Khẳng định vai trò dẫn dắt." },
        { year: "2023", event: "Chủ tịch nước tham dự APEC tại Mỹ, nâng cấp quan hệ Việt-Mỹ, Việt-Nhật." }
      ]
    },
    en: {
      history: "Vietnam joined the Asia-Pacific Economic Cooperation (APEC) forum in 1998. This was a strategic decision to integrate into the world's most dynamic economic region, gathering leading economies such as the US, China, and Japan.",
      contribution: "Despite being a developing economy, Vietnam successfully hosted the APEC Year twice (2006 and 2017). Notably, the APEC Da Nang 2017 Summit maintained the momentum of trade liberalization amidst rising protectionism, adopting the 'Post-2020 APEC Vision'.",
      meaning: "APEC brings direct economic benefits: 77% of trade, 81% of direct investment, and 85% of tourists to Vietnam come from APEC members. It is also a crucial channel for Vietnam to deepen bilateral relations with top strategic partners.",
      milestones: [
        { year: "1998", event: "Officially became an APEC member." },
        { year: "2006", event: "Hosted APEC for the 1st time in Hanoi (WTO accession finalized on sidelines)." },
        { year: "2017", event: "Hosted APEC for the 2nd time in Da Nang - Affirming leadership role." },
        { year: "2023", event: "President attended APEC in the US, upgraded Vietnam-US, Vietnam-Japan ties." }
      ]
    }
  },
  [RegionID.EU]: {
    vi: {
      history: "Thiết lập quan hệ ngoại giao từ năm 1990, quan hệ Việt Nam - EU đã phát triển vượt bậc từ hỗ trợ nhân đạo sang đối tác bình đẳng cùng có lợi. Năm 2012, hai bên ký Hiệp định Đối tác và Hợp tác toàn diện (PCA).",
      contribution: "Việt Nam là quốc gia đang phát triển đầu tiên ở khu vực Châu Á - Thái Bình Dương ký Hiệp định Thương mại Tự do (EVFTA) với EU. Việt Nam cũng là cầu nối quan trọng thúc đẩy quan hệ ASEAN - EU lên Đối tác chiến lược.",
      meaning: "EU là đối tác quan trọng hàng đầu về thương mại, đầu tư và viện trợ không hoàn lại. Hiệp định EVFTA (có hiệu lực từ 1/8/2020) và EVIPA (Bảo hộ đầu tư) là 'cặp lá chắn' giúp hàng hóa Việt Nam tiếp cận thị trường 450 triệu dân với tiêu chuẩn cao, thúc đẩy cải cách thể chế và phát triển bền vững.",
      milestones: [
        { year: "1990", event: "Thiết lập quan hệ ngoại giao Việt Nam - EC (tiền thân EU)." },
        { year: "2012", event: "Ký Hiệp định Đối tác và Hợp tác toàn diện (PCA)." },
        { year: "2019", event: "Ký kết Hiệp định EVFTA và EVIPA tại Hà Nội." },
        { year: "2020", event: "Hiệp định EVFTA chính thức có hiệu lực." },
        { year: "2022", event: "Thủ tướng dự Hội nghị Cấp cao ASEAN-EU tại Brussels." }
      ]
    },
    en: {
      history: "Established diplomatic relations in 1990, Vietnam-EU relations have grown significantly from humanitarian aid to equal, mutually beneficial partnerships. In 2012, both sides signed the Partnership and Cooperation Agreement (PCA).",
      contribution: "Vietnam is the first developing country in the Asia-Pacific region to sign a Free Trade Agreement (EVFTA) with the EU. Vietnam also serves as a vital bridge promoting ASEAN-EU relations to a Strategic Partnership.",
      meaning: "The EU is a leading partner in trade, investment, and non-refundable aid. The EVFTA (effective Aug 1, 2020) and EVIPA (Investment Protection) act as 'twin shields' helping Vietnamese goods access a market of 450 million people with high standards, driving institutional reform and sustainable development.",
      milestones: [
        { year: "1990", event: "Established diplomatic relations with EC (predecessor to EU)." },
        { year: "2012", event: "Signed Partnership and Cooperation Agreement (PCA)." },
        { year: "2019", event: "Signed EVFTA and EVIPA in Hanoi." },
        { year: "2020", event: "EVFTA officially entered into force." },
        { year: "2022", event: "PM attended ASEAN-EU Commemorative Summit in Brussels." }
      ]
    }
  },
  [RegionID.AFRICA]: {
    vi: {
      history: "Việt Nam và các nước Châu Phi có mối quan hệ hữu nghị truyền thống, được hình thành từ những năm tháng cùng đấu tranh giải phóng dân tộc. Việt Nam thiết lập quan hệ ngoại giao với hầu hết các quốc gia Châu Phi (54/55 nước).",
      contribution: "Việt Nam triển khai mô hình hợp tác Nam - Nam và hợp tác ba bên (với FAO) rất hiệu quả, cử hàng trăm chuyên gia nông nghiệp, y tế, giáo dục sang giúp các nước Châu Phi đảm bảo an ninh lương thực. Tập đoàn Viettel đầu tư viễn thông thành công tại nhiều nước (Mozambique, Tanzania, Burundi...).",
      meaning: "Châu Phi là nguồn ủng hộ chính trị quan trọng của Việt Nam tại các diễn đàn đa phương. Đây cũng là thị trường tiềm năng về xuất khẩu gạo, hàng tiêu dùng và đầu tư năng lượng, khoáng sản. Quan hệ này thể hiện đạo lý 'uống nước nhớ nguồn' và tinh thần quốc tế vô sản của Việt Nam.",
      milestones: [
        { year: "1950s", event: "Đặt nền móng quan hệ trong phong trào giải phóng dân tộc." },
        { year: "2010", event: "Đề án phát triển quan hệ Việt Nam - Trung Đông - Châu Phi." },
        { year: "2014", event: "Cử lực lượng gìn giữ hòa bình đầu tiên tới Nam Sudan." },
        { year: "2023", event: "Việt Nam trở thành Quan sát viên của Liên minh Châu Phi (AU)." }
      ]
    },
    en: {
      history: "Vietnam and African countries share a traditional friendship formed during the years of struggle for national liberation. Vietnam has established diplomatic relations with almost all African nations (54/55 countries).",
      contribution: "Vietnam effectively implements South-South and trilateral cooperation models (with FAO), sending hundreds of agricultural, medical, and educational experts to help African countries ensure food security. Viettel Group has successfully invested in telecommunications in many countries (Mozambique, Tanzania, Burundi...).",
      meaning: "Africa is a crucial source of political support for Vietnam at multilateral forums. It is also a potential market for rice exports, consumer goods, and investment in energy and minerals. This relationship reflects Vietnam's moral principle of gratitude and international solidarity.",
      milestones: [
        { year: "1950s", event: "Laid foundation during national liberation movements." },
        { year: "2010", event: "Project to develop relations with Middle East - Africa." },
        { year: "2014", event: "Deployed first peacekeeping forces to South Sudan." },
        { year: "2023", event: "Vietnam became an Observer of the African Union (AU)." }
      ]
    }
  }
};

// Cache for quiz questions
const quizCache: Record<string, QuizQuestion[]> = {};

// Function returns static data immediately
export const fetchRegionDetails = async (
  regionId: string, 
  regionName: string, 
  language: Language
): Promise<RegionContentResponse> => {
  // Simulate an async operation for consistency, though it resolves instantly
  return new Promise((resolve) => {
    // Check if we have data for this region
    const regionData = STATIC_DATA[regionId];
    if (regionData && regionData[language]) {
      resolve(regionData[language]);
    } else {
      // Fallback just in case ID doesn't match
      const fallbackText = language === 'vi' ? "Thông tin đang được cập nhật." : "Information is being updated.";
      resolve({
        history: fallbackText,
        contribution: fallbackText,
        meaning: fallbackText,
        milestones: []
      });
    }
  });
};

// Function fetches Quiz (prefers Groq, falls back to Gemini)
export const fetchRegionQuiz = async (
  regionName: string,
  language: Language
): Promise<QuizQuestion[]> => {
  const cacheKey = `${regionName}-${language}`;
  
  if (quizCache[cacheKey]) {
    return quizCache[cacheKey];
  }
  
  // No API keys at all -> return empty to avoid crash
  if (!groqApiKey && !import.meta.env.VITE_API_KEY) {
    return [];
  }

  try {
    const langInstruction = language === 'vi' 
      ? "Ngôn ngữ: Tiếng Việt." 
      : "Language: English.";

    const prompt = `
      Tạo 10 câu hỏi trắc nghiệm (Multiple Choice) chất lượng cao để kiểm tra kiến thức về chủ đề: "${regionName}" (trong bối cảnh quan hệ quốc tế, ngoại giao, kinh tế của Việt Nam).
      ${langInstruction}
      
      Yêu cầu quan trọng:
      - Đảm bảo 10 câu hỏi KHÔNG bị trùng lặp về nội dung. Mỗi câu hỏi phải khai thác một khía cạnh riêng biệt.
      - Nội dung phong phú: Lịch sử, các hiệp định (FTA), con số thương mại, sự kiện ngoại giao gần đây, và ý nghĩa chiến lược.
      - Độ khó: Trung bình - Khó (Dành cho sinh viên/người nghiên cứu).
      - Câu hỏi phải thú vị, kích thích tư duy, tránh các câu hỏi quá đơn giản hoặc hiển nhiên.
      - Trả về JSON object: {"questions":[{question, options (4), correctAnswerIndex, explanation}]}.
    `;

    let questions: QuizQuestion[] = [];

    if (useGroq) {
      const content = await callGroq(prompt);
      const parsed = JSON.parse(sanitizeJsonContent(content));
      const list = Array.isArray(parsed) ? parsed : parsed?.questions;
      questions = (list || []).map((q: QuizQuestion, idx: number) => ({ ...q, id: idx }));
    } else {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswerIndex: { type: Type.INTEGER, description: "Index of the correct answer (0-3)" },
                explanation: { type: Type.STRING, description: "Explanation of why the answer is correct" }
              },
              required: ["question", "options", "correctAnswerIndex", "explanation"]
            }
          }
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(sanitizeJsonContent(text)) as QuizQuestion[];
        questions = parsed.map((q, idx) => ({ ...q, id: idx }));
      }
    }

    quizCache[cacheKey] = questions;
    return questions;

  } catch (error) {
    console.error("Error fetching quiz:", error);
    return [];
  }
};

export const chatWithAI = async (message: string, language: Language): Promise<string> => {
  if (!groqApiKey && !import.meta.env.VITE_API_KEY) {
    return language === 'vi' 
      ? "Vui lòng cấu hình API Key để sử dụng tính năng này." 
      : "Please configure the API Key to use this feature.";
  }

  try {
    const langInstruction = language === 'vi' 
      ? "Bạn là một chuyên gia AI cao cấp về quan hệ quốc tế, ngoại giao, kinh tế và lịch sử Việt Nam. Hãy cung cấp câu trả lời chi tiết, sâu sắc, có dẫn chứng số liệu và phân tích bối cảnh cụ thể. Bạn CHỈ trả lời các câu hỏi thuộc lĩnh vực này. Nếu câu hỏi không liên quan (giải toán, code, giải trí...), hãy lịch sự từ chối và hướng người dùng về chủ đề chính." 
      : "You are a senior AI expert in Vietnam's international relations, diplomacy, economy, and history. Please provide detailed, profound answers with specific data and context analysis. You ONLY answer questions within this domain. If the question is unrelated (math, coding, entertainment...), politely refuse and guide the user back to the main topic.";

    const prompt = `${langInstruction}\n\nUser: ${message}\nAI:`;

    if (useGroq) {
      return await callGroq(prompt);
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || (language === 'vi' ? "Xin lỗi, tôi không thể trả lời ngay lúc này." : "Sorry, I cannot answer right now.");
  } catch (error) {
    console.error("Chat error:", error);
    return language === 'vi' ? "Đã xảy ra lỗi khi kết nối với AI." : "An error occurred while connecting to AI.";
  }
};
