// test-openai.js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    console.log(
      "Using API key starting with:",
      (process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY).substring(
        0,
        10
      ) + "..."
    );

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say hello!" },
      ],
      max_tokens: 50,
    });

    console.log("OpenAI API test successful!");
    console.log("Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API test failed:");
    console.error(error);
  }
}

testOpenAI();
