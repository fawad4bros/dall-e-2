import { Configuration, OpenAIApi } from "openai";
import fs from "fs"
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {

    try {
        const { prompt, size } = req.body
        const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
        const apiRespone = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize
        });
        const imageURL = apiRespone.data.data[0].url;
        // Saveing Image on the Disk
        const imgResult = await fetch(imageURL);
        const blob = await imgResult.blob();
        const buffer = Buffer.from( await blob.arrayBuffer())
        fs.writeFileSync(`./img/${Date.now()}.png`, buffer);
        res.status(200).json({
            success: true,
            data: imageURL
        })
    } catch (error) {
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else {
            console.log('Message:', error.message);
        }
        res.status(400).json({
            success: false,
            error: 'Image could not be generated'
        })
    }
}

export default generateImage;
