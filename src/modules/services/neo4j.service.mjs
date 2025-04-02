import cache from "../../config/cache.config.mjs";
import neo4jDriver from "../../config/neo4j.config.mjs";
import OpenAIService from "./openai.service.mjs";

class Neo4jService {
  async queryKnowledgeGraph(userInput) {
    const session = neo4jDriver.session();

    try {
      const cacheKey = `knowledge-graph-${userInput}`;
      const cachedResult = cache.get(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }

      const openaiService = new OpenAIService();
      let query = await openaiService.generateCypherQuery(userInput);
      query = query.replace(/`|cypher/gi, "");
      if (!query) {
        return null;
      }

      const result = await session.run(query);
      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error("Neo4j 查詢錯誤:", error.message);
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
