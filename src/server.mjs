import express from "express";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger.mjs";
import neo4j from "./config/neo4j.config.mjs";
import chatRoute from "./modules/routes/chat.route.mjs";

const app = express();
// 啟用 Swagger UI
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

// health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// redirect to health check
app.get("/", (req, res) => {
  res.redirect("/health");
});

// 解析 JSON 數據
app.use(express.json());

app.use("/api/chat", chatRoute);

app.get("/test-neo4j", async (req, res) => {
  const session = neo4j.session();
  try {
    const result = await session.run("RETURN 'Neo4j Connected' AS message");
    res.json({ message: result.records[0].get("message") });
  } catch (error) {
    console.error("Neo4j connection error:", error);
    res.status(500).json({ error: "Neo4j connection failed" });
  } finally {
    await session.close();
  }
});

// 全局錯誤處理中間件
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);
  res.status(err.status || 500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
