import path from "path";
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/openAIRoutes.js"
// fileURLToPath ensuring a cross-platform valid absolute path string
import {fileURLToPath} from 'url';

// import.meta.url is the file path (including the file:// protocol)
const __filename = fileURLToPath(import.meta.url);

dotenv.config();
const app = express();
// Enable Body Parser to Access Req Object
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// Set Static Folder
app.use(express.static(path.join(path.dirname(__filename), 'public')));

app.use('/openai', routes)

app.listen(process.env.PORT || 5000, ()=>{console.log(`Server live at: http://localhost:5000 `)})

// global variables are not available in ECMAScript module files (__dirname, __filename)