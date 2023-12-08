// Using import syntax for modules in ES6
import express from 'express';
import multer from 'multer';
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/userRoutes.js';
import path from 'path';


const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);


const uploadDestination = path.join(__dirname, 'uploads');
const storage = multer.memoryStorage(); // Use memory storage for now
const upload = multer({ storage });


// Create an Express application

const app = express();

// Config env
dotenv.config();

// Database config
connectDB();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => res.render('upload'))

// Routes
app.use('/api', router);

app.use('/uploads', express.static('uploads'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
