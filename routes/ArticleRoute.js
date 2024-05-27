import express from 'express';
import ArticleModel from '../models/article.js';

const router = express.Router();
const keysArr = ["title", "description", "content"];
keysArr.sort();

const isTheSameArray = (currentValue) => currentValue === keysArr;

router.post('/articles', async (req, res) => {
    const article = new ArticleModel(req.body);
    try {
        await article.save();
        res.status(201).send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/articles', async (req, res) => {
    try {
        const articles = await ArticleModel.find();
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/articles/:title', async (req, res) => {
    try {
        const titleText = req.params.title;
        const articleTitle = await ArticleModel.find({ title: titleText });
        if (!articleTitle) res.status(404).send("No item found");
        res.status(200).send("Item deleted successfully");
    } catch (error) {
        res.status(500).send("Error finding item");
    }
});

router.delete('/articles/:title', async (req, res) => {
    try {
        const titleText = req.params.title;
        const articleTitle = await ArticleModel.deleteOne({ title: titleText });
        if (!articleTitle) res.status(404).send("No item found");
        res.status(200).send("Item deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting item");
    }
});

router.put('/articles/:title', async (req, res) => {
    try {
        const titleText = req.params.title;
        const title = req.body.title;
        const description = req.body.description;
        const content = req.body.content;
        if([title, description, content].includes(undefined)){
            return res.status(400).send("Bad request");
        }
        const articleTitle = await ArticleModel.find({ title: titleText });
        if (!articleTitle) return res.status(404).send("No item found");
        
        const articleTitleDeleted = await ArticleModel.updateOne({ title }, req.body );
        
        res.status(200).send("Item updated successfully");
    } catch (error) {
        res.status(500).send("Error updating item");
    }
});  

router.patch('/articles/:title', async (req, res) => {
    try {
        const titleText = req.params.title;
        const articleTitle = await ArticleModel.updateOne({ title: titleText}, req.body );
        if (!articleTitle) res.status(404).send("No item found");
        res.status(200).send("Item updated successfully");
    } catch (error) {
        res.status(500).send("Error updating item");
    }
});  

export default router;