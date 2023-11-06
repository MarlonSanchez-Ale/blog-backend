const { Router } = require('express');
const router = Router();
const { v4 } = require('uuid')
const posts = require('../data/posts')
const dateNow = Date.now()
const today = new Date(dateNow)

//Raiz
router.get('/getPosts', (req, res) => {
    return res.status(200).json(posts);
})

router.get('/getPost', (req, res) => {
    const { id } = req.query;

    if (!id) return res.status(404).json({ message: "Id is missing" })

    const found = posts.find(x => x.id == id)

    if (found) {
        return res.status(200).json(found)
    } else {
        return res.status(404).json({
            message: "Post not found"
        })
    }
})

router.post('/create', (req, res) => {
    const { title, description, date } = req.body;

    //Validation
    if (!title || !description || !date) {
        return res.status(404).json({
            message: "Data is missing"
        })
    }

    if ((typeof title !== "string") || (typeof description !== "string") || (typeof date !== "string")) {
        return res.status(500).json({
            message: "Type of incorrect data"
        })
    }

    const newPost = { id: v4(), ...req.body }
    posts.push(newPost)
    return res.status(200).json(newPost)
})

router.put('/update', (req, res) => {
    const { id, title, description, date } = req.body;

    if (!id || !title || !description || !date) {
        return res.status(404).json({
            message: "Data is missing"
        })
    }

    if (typeof title !== "string" || typeof description !== "string" || typeof date !== "string") {
        return res.status(500).json({
            message: "Type of incorrect data"
        })
    }

    const found = posts.find(x => x.id == id)

    if (found) {
        if (found.title === title || found.description === description || found.date === date) return res.status(500).json({ message: "The data entered is the same" })

        found.title = title;
        found.description = description;
        found.date = date;
    } else {
        return res.status(400).json({ message: "Post not found" })
    }

    return res.status(200).json(found)

})

router.delete('/delete', (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(404).json({
            message: "Id is missing"
        })
    }

    const index = posts.findIndex(x => x.id == id)

    if (index < 0) {
        return res.status(400).json({ message: "Post not found" })
    } else {
        posts.splice(index, 1)
        return res.status(200).json({
            message: "Post was deleted",
        })
    }

})

module.exports = router;

