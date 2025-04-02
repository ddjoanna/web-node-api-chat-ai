import fs from "fs";
import neo4jDriver from "./config/neo4j.config.mjs";

const filePath = "./neo4j_import/e-commerce.cypher";

async function resetIndexes(session) {
  const dropIndexes = [
    "DROP INDEX ProductIndex IF EXISTS;",
    "DROP INDEX BrandIndex IF EXISTS;",
    "DROP INDEX FaqIndex IF EXISTS;",
    "DROP INDEX ReviewIndex IF EXISTS;",
    "DROP INDEX SupportTicketIndex IF EXISTS;",
  ];

  const createIndexes = [
    `CREATE FULLTEXT INDEX ProductIndex FOR (n:Product) ON EACH [n.name, n.category, n.description];`,
    `CREATE FULLTEXT INDEX FaqIndex FOR (n:FAQ) ON EACH [n.question, n.answer];`,
    `CREATE FULLTEXT INDEX BrandIndex FOR (n:Brand) ON EACH [n.name];`,
    `CREATE FULLTEXT INDEX ReviewIndex FOR (n:Review) ON EACH [n.comment];`,
    `CREATE FULLTEXT INDEX SupportTicketIndex FOR (n:SupportTicket) ON EACH [n.issue, n.response];`,
  ];

  try {
    console.log("刪除舊索引...");
    for (const query of dropIndexes) {
      await session.run(query);
      console.log(`成功刪除索引: ${query}`);
    }

    console.log("建立新索引...");
    for (const query of createIndexes) {
      await session.run(query);
      console.log(`成功建立索引: ${query}`);
    }
  } catch (error) {
    console.error("索引重建失敗:", error.message);
  }
}

async function resetNodes(session) {
  try {
    console.log("刪除所有節點...");
    await session.run("MATCH (n) DETACH DELETE n;");
    console.log("所有節點已刪除");
  } catch (error) {
    console.error("節點刪除失敗:", error.message);
  }
}

async function executeCypherFromFile(session) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    // 解析並分割 Cypher 查詢語句
    const lines = fileContent.split("\n");
    const cypherQueries = [];

    let currentQuery = "";
    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("//")) {
        continue; // 忽略註解行
      }

      if (trimmedLine.endsWith(";")) {
        currentQuery += trimmedLine;
        cypherQueries.push(currentQuery.trim());
        currentQuery = "";
      } else {
        currentQuery += trimmedLine + " ";
      }
    }

    // 過濾掉空白查詢，避免 TypeError: Cypher query is expected to be a non-empty string.
    const validQueries = cypherQueries.filter((q) => q.length > 0);

    console.log("開始執行 Cypher 查詢...");
    for (const query of validQueries) {
      try {
        await session.run(query);
        console.log(`成功執行查詢：${query}`);
      } catch (error) {
        console.error(`執行查詢失敗：${query}`, error.message);
      }
    }

    console.log("所有查詢已執行完成");
  } catch (error) {
    console.error("讀取檔案或執行查詢失敗:", error.message);
  }
}

async function main() {
  const session = neo4jDriver.session();
  try {
    // 1. 刪除所有節點
    await resetNodes(session);
    // 2. 刪除並重建索引
    await resetIndexes(session);
    // 3. 執行 Cypher 建立資料
    await executeCypherFromFile(session);
  } finally {
    session.close();
    neo4jDriver.close();
  }
}

main();
