import Neo4jService from "../services/neo4j.service.mjs";
import OpenAIService from "../services/openai.service.mjs";

class ChatUsecase {
  async execute(userInput) {
    try {
      const neo4jService = new Neo4jService();
      const openaiService = new OpenAIService();

      // 先查詢知識圖譜
      const knowledgeRecords = await neo4jService.queryKnowledgeGraph(
        userInput
      );
      if (knowledgeRecords) {
        const uniqueAnswers = [
          ...new Set(
            knowledgeRecords.records.map((record) => record._fields[0])
          ),
        ];
        const jsonStr = JSON.stringify(uniqueAnswers);
        const openaiResponse = await openaiService.generateResponse(
          userInput,
          jsonStr
        );
        if (openaiResponse) {
          return openaiResponse;
        }

        // 如果AI沒有回覆資料，直接返回知識圖譜结果
        return this.handleKnowledgeRecords(knowledgeRecords);
      }

      // 知識圖譜沒有相關資料，轉AI
      const openaiResponse = await openaiService.generateResponse(
        userInput,
        ""
      );
      if (openaiResponse) {
        return openaiResponse;
      }

      return "很抱歉，這方面的資訊我無法提供";
    } catch (error) {
      console.error("聊天用例执行错误:", error);
      return "很抱歉，發生錯誤。請稍後再試";
    }
  }

  handleKnowledgeRecords(knowledgeRecords) {
    const handlers = {
      faq: (records) => records.records[0].answer,
      product: (records) => {
        const product = records.records[0];
        const productName = product._fields[0];
        const productDescription = product._fields[1];
        const productUrl = product._fields[2];
        return `推薦好物：${productName}(${productUrl})，${productDescription}`;
      },
    };

    const handler = handlers[knowledgeRecords.label];
    if (handler) {
      return handler(knowledgeRecords);
    }

    return "很抱歉，這方面的資訊我無法提供";
  }
}

export default ChatUsecase;
