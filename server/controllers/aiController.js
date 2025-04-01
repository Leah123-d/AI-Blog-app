import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

export const getaiImage = async(req,res) => {
  try{
    const completion = openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {"role": "user", "content": "write a haiku about ai"},
      ],
    });
    res.json({response: completion.choices[0].message.content});

  }
  catch(error){
    console.error(error);
    res.status(500).json({error: "something went wrong"});
  }
}