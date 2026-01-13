<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Vietnam International Connections - Educational App

Ứng dụng giáo dục tương tác về quan hệ ngoại giao, kinh tế và lịch sử của Việt Nam.

## 🚀 Tính năng

- **Bản đồ tương tác**: Khám phá các mối quan hệ với UN, ASEAN, APEC, EU, Châu Phi.
- **Chatbot AI**: Trợ lý ảo trả lời câu hỏi về đối ngoại (Sử dụng Google Gemini).
- **Thống kê Dashboard**: Biểu đồ thương mại, đầu tư FDI.
- **Trắc nghiệm**: Kiểm tra kiến thức với AI tạo câu hỏi.
- **Dòng thời gian**: Lịch sử ngoại giao Việt Nam.

## 🛠️ Cài đặt & Chạy Local

**Yêu cầu:** Node.js (v16 trở lên)

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

2. **Cấu hình môi trường:**
   - Tạo file `.env` tại thư mục gốc.
   - Thêm API Key của Google Gemini:
     ```env
     VITE_API_KEY=your_google_gemini_api_key_here
     ```

3. **Chạy ứng dụng:**
   ```bash
   npm run dev
   ```
   Truy cập: `http://localhost:5173`

## 📦 Deploy lên Vercel

1. Đẩy code lên GitHub.
2. Tạo dự án mới trên [Vercel](https://vercel.com).
3. Chọn repository của bạn.
4. Trong phần **Environment Variables**, thêm:
   - Key: `VITE_API_KEY`
   - Value: `[API Key Gemini của bạn]`
5. Nhấn **Deploy**.

## 📂 Cấu trúc dự án

- `components/`: Các trang và thành phần giao diện (Map, Dashboard, Chatbot...).
- `services/`: Xử lý gọi API (Gemini AI).
- `types.ts`: Định nghĩa kiểu dữ liệu TypeScript.
- `App.tsx`: Component chính điều hướng ứng dụng.

---
*Dự án thuộc môn học HCM202 - Nhóm 10*
