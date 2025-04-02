# web-node-api-chat-ai

## 專案目的

    實作電子商務系統的AI客服

## 專案目標

    串接OpenAI

## 啟動專案步驟

1. clone 專案 & 設定.env
   - OPENAI_API_KEY 可在 [官網](https://platform.openai.com/account/api-keys) 申請
   - NEO4J_PASSWORD 字串長度要 8 碼以上
2. 安裝 docker 和 docker-compose
3. 執行 `make up` 啟動專案和匯入電商情境資料
4. 執行 `make run` 啟動 server
5. 查看 neo4j(圖形資料庫) 可視化工具 http://localhost:7474/browser/
   - 已於 `make up` 啟動專案時匯入商品和 FAQ 資料
     - 目前只是簡單建立資料尚未設定關聯
     - 可依據產業知識設計(透過 商品、使用者、訂單、常見問題 之間的關聯，快速提供智慧化回應。)
6. 電商 AI 客服已上線~(請參考[匯入資料](./neo4j_import/e-commerce.cypher)，測試回覆)
7. 執行 `make down` 關閉服務

## API Documentation

[Swagger JSON](swagger.json)

## Note

    圖形化資料庫和知識圖譜的設計蠻值得深挖的！
