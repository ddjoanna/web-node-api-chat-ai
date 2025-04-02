// src/modules/controllers/chat-controller.mjs
import ChatUsecase from "../usecases/chat.usecase.mjs";

class ChatController {
  async chatHandler(req, res, next) {
    try {
      const { message } = req.body;
      if (!message) return res.status(400).json({ error: "請輸入訊息" });

      const usecase = new ChatUsecase();
      const response = await usecase.execute(message);
      res.status(200).json({ response });
    } catch (error) {
      console.error("❌ Controller Error:", error.message);
      next(error); // 傳遞錯誤給全局錯誤處理器
    }
  }
}

export default new ChatController();
