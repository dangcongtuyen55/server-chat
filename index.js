import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());
const api_key = "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";

// Configure open api
const configuration = new Configuration({
  // organization: "PASTE YOUR ORGANIZATION ID HERE",
  apiKey: process.env.open_api_key, // VISIT .env AND MAKE CHANGES
});
const openai = new OpenAIApi(configuration);

// listeninng
const PORT = 8000;
app.listen(PORT, () => console.log("listening on port" + PORT));

// dummy route to test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//post route for making requests
app.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });
    res.json({ message: response.data.choices[0].text });
    // res.status(200).send({
    //   message: response.data.choices[0].text,
    // });
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});
