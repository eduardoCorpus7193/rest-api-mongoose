import express from 'express';
import { connect } from 'mongoose';
import  connectDB  from './db.js';
import { configDotenv } from 'dotenv';
import ArticleRoute from './routes/ArticleRoute.js';

const app = express();

app.use(express.json());
app.use('/api', ArticleRoute)

configDotenv();

const PORT = process.env.PORT || 3000;
connectDB();

app.get('/', (req, res) => {
    res.send({'Hello World': 'Welcome to the Node.js World!'});
});

app.get('/api', ArticleRoute);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});