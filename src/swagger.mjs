import swaggerJsDoc from "swagger-jsdoc";
import fs from "fs";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce AI Chatbot API",
      version: "1.0.0",
      description: "API for E-commerce AI Chatbot",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/modules/routes/*.mjs"],
};

const specs = swaggerJsDoc(options);
fs.writeFileSync("./swagger.json", JSON.stringify(specs, null, 2));
console.log("Swagger JSON file generated successfully!");

export default specs;
