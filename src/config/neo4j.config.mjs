import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const NEO4J_URI = process.env.NEO4J_URI;
const NEO4J_USERNAME = process.env.NEO4J_USERNAME;
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;

// 建立 Neo4j 連線
const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
  {
    encrypted: false,
    database: "neo4j",
  }
);

export default driver;
