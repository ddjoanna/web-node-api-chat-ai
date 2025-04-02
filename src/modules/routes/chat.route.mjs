// src/modules/routes/chat-route.mjs
import express from "express";
import ChatController from "../controllers/chat.controller.mjs";

const router = express.Router();

/**
 * @swagger
 * /api/chat/message:
 *   post:
 *     summary: 對話接口
 *     description: 對話接口
 *     tags:
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: 訊息
 *                 default: 我購買的筆電過熱
 *     responses:
 *       200:
 *         description: 回應
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: 回應
 *       400:
 *         description: 請輸入訊息
 *       500:
 *         description: Internal Server Error
 */
router.post("/message", ChatController.chatHandler);

export default router;
