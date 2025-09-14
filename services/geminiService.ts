import { GoogleGenAI, Type } from "@google/genai";
import type { FormState, AdCopy } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildPrompt = (formData: FormState): string => {
    const { occasion, promotion, length, spinContent } = formData;

    let lengthDescription: string;
    switch (length) {
        case 'short':
            lengthDescription = "Ngắn gọn: 50–80 từ (dễ chạy ads)";
            break;
        case 'medium':
            lengthDescription = "Vừa phải: 80–120 từ (phù hợp bài post thường)";
            break;
        case 'long':
            lengthDescription = "Cảm xúc, kể chuyện: 150–200 từ (dành cho gắn kết cộng đồng)";
            break;
        case 'special':
            lengthDescription = "Bài viết quảng cáo bình thường, không khuyến mãi, độ dài từ 200 đến 300 từ.";
            break;
    }

    const occasionText = (occasion.trim() === '' || length === 'special') ? 'Bài viết quảng cáo bình thường' : occasion;
    const promotionText = (promotion.trim() === '' || length === 'special') ? 'Không có khuyến mãi' : promotion;

    const spinInstructions = `
    **YÊU CẦU ĐẶC BIỆT: SPIN CONTENT**
    Tất cả 10 phiên bản phải được viết theo định dạng SPIN CONTENT.
    Mục tiêu: Tạo ra các biến thể nội dung bài viết bằng cách spin icon và spin text theo cú pháp chuẩn để dùng với phần mềm đăng bài tự động.

    **QUY TẮC ĐỊNH DẠNG SPIN (BẮT BUỘC TUÂN THỦ):**

    1.  **SPIN ICON:**
        -   **Tuyệt đối không** sử dụng emoji trực tiếp (ví dụ: ✨, 🎁, ✅).
        -   Thay thế TẤT CẢ emoji bằng cú pháp \`#icon{Mã}\`. Ví dụ: \`#icon{R1}\`.
        -   Sử dụng các mã sau:
            -   \`#icon{R1}\`: Dùng cho các icon nhấn mạnh, tiêu đề, cảm xúc (ví dụ thay cho: ❤, ✨, 🌸, 🎉).
            -   \`#icon{R2}\`: Dùng cho các icon mô tả chất lượng, lợi ích, dấu tích (ví dụ thay cho: ✅, 💎, 👍, 💯).
            -   \`#icon{R3}\`: Dùng cho các icon liệt kê chi tiết, thông số (ví dụ thay cho: 📌, 📝, 🎁).
            -   \`#icon{R4}\`: Dùng cho các icon liên quan đến địa điểm, vận chuyển (ví dụ thay cho: 🇦🇺, 🚚, ✈).
            -   \`#icon{R5}\`: Dùng cho các icon liên quan đến liên hệ, hành động (ví dụ thay cho: 📞, 💬, 👉).

    2.  **SPIN TEXT:**
        -   Sử dụng cú pháp \`#text{Biến thể 1|Biến thể 2|Biến thể 3}\` để tạo các cụm từ đồng nghĩa hoặc các cách diễn đạt khác nhau.
        -   Spin các cụm từ có ý nghĩa, không spin các từ đơn lẻ, vô nghĩa.
        -   Ví dụ: \`#text{Món quà sức khỏe ý nghĩa|Lựa chọn quà biếu tinh tế|Quà tặng sang trọng cho người thân}\`.
    `;
    
    const regularInstructions = `
    2.  **Phong cách chung:** Sang trọng, thân thiện, dễ hiểu, đáng tin cậy. Dùng biểu tượng cảm xúc nhẹ nhàng, tinh tế.
    `;

    return `
    Bạn là một chuyên gia nội dung Facebook đẳng cấp, hỗ trợ quản lý fanpage cho thương hiệu yến sào cao cấp Viet Sun Bird's Nest tại Úc.

    **Thông tin chiến dịch:**
    - **Sản phẩm:** Yến sào nhập khẩu chính ngạch vào Úc, đã được Bộ Nông nghiệp Úc kiểm định và cho phép lưu hành.
    - **Khách hàng mục tiêu:** Người Việt đang sinh sống tại Úc, quan tâm sức khỏe hoặc tìm quà biếu sang trọng.
    - **Dịp quảng cáo:** ${occasionText}
    - **Nội dung khuyến mãi:** ${promotionText}
    - **Độ dài yêu cầu:** ${lengthDescription}

    **Nhiệm vụ:**
    Dựa vào thông tin trên, hãy tạo ra 10 phiên bản bài viết quảng cáo Facebook khác nhau.

    **YÊU CẦU BẮT BUỘC (TUÂN THỦ TUYỆT ĐỐI):**

    1.  **Tạo 10 phiên bản** theo 10 phong cách sau:
        1. Cảm xúc tinh tế
        2. Rõ ràng, nhấn mạnh sản phẩm
        3. Nhấn mạnh lợi ích
        4. Ngắn gọn, đậm CTA
        5. Dành cho gia đình
        6. Gợi hình ảnh sang trọng
        7. Tông nhẹ nhàng, nữ tính
        8. Vui tươi, gần gũi
        9. Gợi ý biếu tặng
        10. Dành cho người mua sắm thông minh

    ${spinContent ? spinInstructions : regularInstructions}

    3.  **Nội dung cốt lõi (PHẢI CÓ TRONG MỖI BÀI):**
        - Nhấn mạnh "Yến Sào Viet Sun là sản phẩm nhập khẩu chính ngạch vào Úc".
        - Khẳng định sản phẩm "có kiểm định của Bộ Nông nghiệp Úc".
        - Cảnh báo về tác hại của yến nhập lậu, không rõ nguồn gốc đối với sức khỏe.

    4.  **Hiển thị khuyến mãi (Nếu có):**
        - PHẢI trình bày đầy đủ, rõ ràng toàn bộ nội dung khuyến mãi người dùng đã cung cấp.
        - KHÔNG được tóm tắt hay dùng từ ngữ chung chung như "ưu đãi hấp dẫn".
        - Nếu là giảm giá, phải ghi rõ giá cũ, giá mới.
        
    5.  **Định dạng & Trình bày (QUAN TRỌNG):**
        - Trình bày bài viết sao cho thật chuyên nghiệp và dễ đọc trên giao diện Facebook (đặc biệt là di động).
        - Sử dụng các đoạn văn ngắn (2-3 dòng mỗi đoạn) để tránh tạo cảm giác "bức tường chữ".
        - Ngắt dòng và tạo khoảng trắng hợp lý để tạo nhịp điệu và làm nổi bật các ý chính.
        - Khi liệt kê lợi ích hoặc chi tiết khuyến mãi, hãy sử dụng các biểu tượng đầu dòng (ví dụ: ✅, 🎁, ✨) để thông tin được rõ ràng, trực quan và dễ theo dõi.

    6.  **Thông tin liên hệ (PHẢI CÓ Ở CUỐI MỖI BÀI VIẾT, GIỮ NGUYÊN ĐỊNH DẠNG):**
        Hệ thống phân phối:
        Perth: SPRING PERTH PTY LTD, 34 Robinson Rd, Morley 6062, WA
        📞 Ms Trâm: 04.1213.5666 | Ms Mai: 0491 672 009 | Ms Singlin: 0412 888 697
        Sydney: Harry Trading Pty Ltd, 9C/4 Home Pride Avenue, Warwick Farm, Liverpool 2170 NSW
        📞 Mr Tài: 0423 892 968 (English/Chinese/Vietnamese)
        Melbourne:
        25 Governors Rd, Coburg 3058 – Ms Nguyệt: 0422 795 497
        Unit 1, 7 Green St, Airport West VIC 3042 – Ms Ngân: 0435 060 209
        🌐 www.vietsunbirdnest.com.au
        Hashtags bắt buộc:
        #YenHuVietSun #YenSaoUc #VietSunBirdnest #YenChinhHang #SucKhoeVaSacDep #ChungNhanChinhPhuUc #SanPhamNhapKhau
    
    7.  **Hashtag bổ sung:** Với mỗi bài viết, tạo thêm một bộ hashtag gồm 6-8 tags phù hợp, kết hợp tiếng Việt không dấu và tiếng Anh (ví dụ: #quabieuUc #yensaonhapkhau #healthylifestyleAustralia). Các hashtag này phải khác nhau giữa các phiên bản.

    8.  **Kêu gọi hành động:** Mỗi bài viết phải có lời kêu gọi inbox hoặc comment để được tư vấn.
    `;
};


export const generateAdCopy = async (formData: FormState): Promise<AdCopy[]> => {
    const prompt = buildPrompt(formData);
    
    const schema = {
        type: Type.OBJECT,
        properties: {
          ads: {
            type: Type.ARRAY,
            description: "An array of 10 ad copy versions.",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { 
                    type: Type.STRING,
                    description: "The title of the ad version, e.g., 'Phiên bản 1 – Cảm xúc tinh tế'" 
                },
                content: { 
                    type: Type.STRING,
                    description: "The full ad copy content, including the mandatory contact block. If spin content was requested, this content must be in the specified spin format."
                },
                hashtags: { 
                    type: Type.STRING,
                    description: "A space-separated string of 6-8 generated hashtags, not including the mandatory ones."
                },
              },
              required: ["title", "content", "hashtags"]
            }
          }
        },
        required: ["ads"]
      };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.8,
            },
        });

        const jsonString = response.text;
        const parsedJson = JSON.parse(jsonString);

        if (parsedJson.ads && Array.isArray(parsedJson.ads)) {
            return parsedJson.ads;
        } else {
            throw new Error("Invalid JSON structure received from API.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate ad copy from the Gemini API.");
    }
};