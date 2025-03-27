import fs from "fs";
import csv from "csvtojson";
import neo4jDriver from "./config/neo4j.config.mjs";

const sessionForData = neo4jDriver.session();
const INDEX_NAME = "productsIndex";
const PRODUCT_FILE = "./neo4j_import/products.csv";
const FAQ_FILE = "./neo4j_import/faq.csv";

// 匯入CSV檔案
async function readCsvFile(filePath) {
  try {
    const csvContent = await fs.promises.readFile(filePath, "utf8");
    return await csv().fromString(csvContent);
  } catch (error) {
    console.error(`讀取CSV檔案 ${filePath} 失敗:`, error);
    return [];
  }
}

// 匯入商品
async function importProducts(session, productRows) {
  for (const row of productRows) {
    try {
      await session.writeTransaction(async (tx) => {
        const productQuery = `
          MERGE (p:Product {id: toInteger($id)})
          SET p.name = $name, p.description = $description, p.price = toFloat($price), p.url = $url
        `;
        await tx.run(productQuery, {
          id: row.Id,
          name: row.Name,
          description: row.Description,
          price: row.Price,
          url: row.Url,
        });
      });
    } catch (error) {
      console.error(`匯入商品 ${row.Id} 失敗:`, error);
    }
  }
}

// 匯入FAQ
async function importFaqs(session, faqRows) {
  for (const row of faqRows) {
    try {
      await session.writeTransaction(async (tx) => {
        const faqQuery = `
          MERGE (q:FAQ {id: toInteger($id)})
          SET q.question = $question, q.answer = $answer
        `;
        await tx.run(faqQuery, {
          id: row.Id,
          question: row.Question,
          answer: row.Answer,
        });
      });
    } catch (error) {
      console.error(`匯入FAQ ${row.Id} 失敗:`, error);
    }
  }
}

// 檢查索引是否存在
async function checkIndexExists(session, indexName) {
  const query = `
    SHOW INDEXES YIELD name, type
    WHERE name = $indexName AND type = 'FULLTEXT'
  `;

  const result = await session.run(query, { indexName });
  return result.records.length > 0;
}

// 建立全文索引
async function createFullTextIndex(session, indexName) {
  try {
    // Neo4j 5.x 或更新版本
    await session.run(`
      CREATE FULLTEXT INDEX ${indexName} IF NOT EXISTS
      FOR (p:Product)
      ON EACH [p.name, p.description]
    `);

    console.log(`全文索引 ${indexName} 已建立或已經存在`);
  } catch (error) {
    console.error(`建立全文索引 ${indexName} 時發生錯誤:`, error);
  }
}

async function importData(session) {
  try {
    const productRows = await readCsvFile(PRODUCT_FILE);
    const faqRows = await readCsvFile(FAQ_FILE);

    await importProducts(session, productRows);
    await importFaqs(session, faqRows);

    const indexExists = await checkIndexExists(session, INDEX_NAME);
    if (!indexExists) {
      await createFullTextIndex(session, INDEX_NAME);
    } else {
      console.log(`全文索引 ${INDEX_NAME} 已經存在`);
    }

    console.log("匯入成功");
  } catch (error) {
    console.error("匯入過程中發生錯誤:", error);
  }
}

async function main() {
  try {
    await importData(sessionForData);
  } finally {
    await sessionForData.close();
    neo4jDriver.close();
  }
}

main();
