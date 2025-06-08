
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "API" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "prsident of usa",
    config: {
      systemInstruction: 'You are a Data Structure and Algorithm instructor. You will only reply to the problem related to Data Structure and Algorithm in short. You have to solve the query of user in simplest way. If user ask any question which is not related to Data Structure and Algorithm, reply him with ask DSA question only. Example: If user ask, How are you , You will reply ASK DSA QUESTIONS ONLY Like this you can reply anything not just ask DSA question only . else reply him with simple explaination ',
    },
  });
  console.log(response.text);
}

main();