import axios from "axios";
import { OPENAI_API_KEY } from "../../config/openai.config.mjs";
import cache from "../../config/cache.config.mjs";

class OpenAIService {
  async generateResponse(userInput, context) {
    if (!OPENAI_API_KEY) {
      return null;
    }

    const cacheKey = `openai-response-${userInput}-${context}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const systemPrompt = `
      你是一個電子商務的專業客服，請遵守以下原則：
      1. 不屬於電子商務相關的問題請不要回答
      2. 回答必須是簡短的，不超過80個字
      3. 回答必須是完整的，不能是部分的
      4. 只能回答疑問不能承諾幫忙操作
      5. 不可以提供會員、訂單含有個人資料的內容
      知識圖譜回傳內容：${context}
    `;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userInput },
          ],
        },
        { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
      );

      const content = response.data.choices[0].message.content;
      cache.set(cacheKey, content);
      return content;
    } catch (error) {
      console.error("AI 回應失敗:", error.message);
      return null;
    }
  }

  async generateCypherQuery(userInput) {
    if (!OPENAI_API_KEY) {
      return null;
    }

    const cacheKey = `openai-cypher-${userInput}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const systemPrompt = `
      你是一個Neo4j專家，
      已知節點類型：User, Product, FAQ, Brand, Review, Order, SupportTicket
      關係類型：PURCHASED, WROTE_REVIEW, ABOUT, BELONGS_TO, ASKED, ABOUT, CREATED_TICKET, RESOLVED_BY
      全文索引:ProductIndex, BrandIndex, FaqIndex, ReviewIndex, SupportTicketIndex
      針對問題使用全文索引來查詢Product, FAQ, Brand, Review, SupportTicket
      問題：${userInput}
      不要有註解和文字說明，輸出Cypher Query
    `;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: systemPrompt }],
        },
        { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
      );

      const content = response.data.choices[0].message.content;
      cache.set(cacheKey, content);
      return content;
    } catch (error) {
      console.error("AI 回應失敗:", error.message);
      return null;
    }
  }
}

export default OpenAIService;
