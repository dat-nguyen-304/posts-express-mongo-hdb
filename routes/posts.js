import express from 'express';
import Post from '../models/Post';
const router = express.Router();

router.get('/add', (req, res) => {
    res.render('posts/add');
})

router.get('/', async (req, res) => {
    const posts = await Post.find().lean().sort({ date: -1 });
    res.render('posts/index', { posts });
})

router.post('/', async (req, res) => {
    const { title, text } = req.body;
    let errors = [];
    if (!title) errors.push({ msg: 'Title required' });
    if (!text) errors.push({ msg: 'Text required' });
    if (errors.length > 0) res.render('posts/add', { errors, title, text });
    else {
        const newPostData = { title, text };
        const newPost = new Post(newPostData);
        await newPost.save();
        res.redirect('/posts');
    }
})

router.get('/edit/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).lean();
    res.render('posts/edit', { post });
})

router.put('/:id', async (req, res) => {
    const { title, text } = req.body;
    await Post.findOneAndUpdate({ _id: req.params.id }, { title, text });
    res.redirect('/posts');
})

router.delete('/:id', async (req, res) => {
    await Post.findOneAndRemove({ _id: req.params.id });
    res.redirect('/posts');
})

export default router;