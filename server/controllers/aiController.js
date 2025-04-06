import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

export const getaiImage = async (req, res) => {
  
  try{
  const { content } = req.body;
  if(!content){
    return res.status(400).json({error: "content is required"});
  }
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: content,
    n: 1,
    size: "1024x1024",
  })
  const imageURL = response.data[0].url;
  console.log("generated AI image URL:", imageURL);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "something went wrong" });
  }
};
