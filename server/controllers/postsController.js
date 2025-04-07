import dbConnection from '../db-connection.js';
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});


export const getPost = async(req,res) => {
  const { author } = req.params;
  try{
    const result = await dbConnection.query(`SELECT * FROM posts WHERE author = $1`, [author]);
    if(result.rows.length === 0){
      return res.send({ "error": "post not found" });
    }
    res.json(result.rows);
  }catch (error){
    console.error('no post found', error);
  }
}

export const getPosts = async(req,res) => {
  try{
    const result = await dbConnection.query(`SELECT * FROM posts`);
    if(result.rows.length === 0){
      return res.send({ "error": "posts not found" });
    }
    res.json(result.rows);
  }catch (error){
    console.error('no posts found', error);
  }
}

export const createPost = async(req,res) => {
  const { author, title, content, favorite, comments, post_image } = req.body;
  try{
    const result = await dbConnection.query(`INSERT INTO posts 
                                              (author, title, content, favorite, comments, post_image) 
                                              VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                                              [author, title, content, favorite, comments, post_image]);

    res.json({ message:`new post ${result.rows[0].author} was added`})
    }catch (error) {
        console.error('Error creating new post: ', error);
    }
}

export const updatePost = async(req,res) =>{
  const { author } = req.params; 
  const { content, title, favorite } = req.body; 

  const favoriteValue = favorite !== undefined ? favorite : false;

  try{
    const result = await dbConnection.query(`UPDATE posts 
                                            SET 
                                            title = $1,
                                            content = $2,
                                            favorite = $3 
                                            WHERE author = $4 RETURNING *`, [content, title, favorite, author]);
    res.json(result.rows);
  }catch (error) {
    console.error('Error updating post: ', error);
}
}

export const deletePost = async(req,res) => {
  const { author } = req.params;
  try{
    const result = await dbConnection.query(`DELETE FROM posts WHERE author = $1 RETURNING *`, [author]);
    if(result.rowCount === 0){
        return res.send( { "error": "post not found" } );
    }
    res.send(`post with contact_id ${author} has been deleted`);
    } catch (error){
        console.error(`Could not locate contact with contact_id: ${author}: `, error);
    }
}

export const searchPosts = async(req,res) => {
  const { created_at } = req.body;
  try{
  const result = await dbConnection.query(`SELECT * FROM posts WHERE created_at ILIKE  $1`, [`%${created_at}%`]);
  if(result.rowCount === 0){
    return res.send( { "error": "posts not found" } );
  }
  res.json(result.rows);
  }catch (error){
  console.error('no posts found', error);
  }
}

export const getSocials = async(req, res) => {
  const { author } = req.params;
  
  try{
    const result = await dbConnection.query(`SELECT posts.author, socials.twitter, socials.youtube, socials.linkedIn,
                                            socials.instagram 
                                            FROM posts 
                                            INNER JOIN socials ON
                                            posts.author = socials.author
                                            WHERE socials.author = $1`, [author]);
    if(result.rows.length === 0){
      return res.send({ "error": "socials not found" });
    }
    res.json(result.rows);
  }catch (error){
    console.error('no socials found', error);
  }

}

export const generateANDSavePostImage = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  
  if(!content){
    return res.status(400).json({error: "content is required"});
  }

  try{
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: content,
    n: 1,
    size: "1024x1024",
  })
  const imageURL = response.data[0].url;
  console.log("generated AI image URL:", imageURL);
  
  // await dbConnection.query(`UPDATE posts SET post_image = $1 WHERE id = $2 RETURNING *`, [imageURL, id]); 

  res.status(200).json({ imageURL })
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "something went wrong" });
  }
};


