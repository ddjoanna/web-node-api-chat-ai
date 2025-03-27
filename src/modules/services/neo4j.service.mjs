import cache from "../../config/cache.config.mjs";
import neo4jDriver from "../../config/neo4j.config.mjs";

class Neo4jService {
  async queryKnowledgeGraph(userInput) {
    const session = neo4jDriver.session();

    try {
      const cacheKey = `knowledge-graph-${userInput}`;
      const cachedResult = cache.get(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }
      let result = null;
      // 查詢 FAQ
      result = await session.run(
        `
          MATCH (faq:FAQ) WHERE faq.question =~ $regex 
          RETURN faq.answer AS answer
        `,
        { regex: ".*" + userInput + ".*" }
      );
      if (result.records.length > 0) {
        const faqResult = {
          label: "faq",
          records: result.records.slice(0, 10),
        };

        cache.set(cacheKey, faqResult);
        return faqResult;
      }

      // 查詢產品資訊，全文索引
      result = await session.run(
        `
          CALL db.index.fulltext.queryNodes('productsIndex', $query) 
          YIELD node 
          RETURN node.name AS name, node.description AS description, node.url AS url
        `,
        { query: userInput }
      );
      if (result.records.length > 0) {
        const productResult = {
          label: "product",
          records: result.records.slice(0, 5),
        };

        cache.set(cacheKey, productResult);
        return productResult;
      }

      return null;
    } catch (error) {
      console.error("Neo4j 查詢錯誤:", error);
      return null;
    } finally {
      await session.close();
    }
  }

  async close() {
    await neo4jDriver.close();
  }
}

export default Neo4jService;
