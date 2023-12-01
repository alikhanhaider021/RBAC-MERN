const Post = require('../models/Post')
const User = require('../models/User')


const getAllPosts = async (req, res) => {
    const posts = await Post.find().lean()

    if (!posts?.length) {
        return res.status(400).json({ message: 'No posts found' })
    }

    const postsWithUser = await Promise.all(posts.map(async (post) => {
        const user = await User.findById(post.user).lean().exec()
        return { ...post, username: user.username }
    }))

    res.json(postsWithUser)
}

const createNewPost = async (req, res) => {
    const { user, title, text } = req.body

    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await Post.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate post title' })
    }

    const post = await Post.create({ user, title, text })

    if (post) { 
        return res.status(201).json({ message: 'New post created' })
    } else {
        return res.status(400).json({ message: 'Invalid post data received' })
    }

}

const updatePost = async (req, res) => {
    const { id, user, title, text, completed } = req.body

    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const post = await Post.findById(id).exec()

    if (!post) {
        return res.status(400).json({ message: 'Post not found' })
    }

    const duplicate = await Post.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate post title' })
    }

    post.user = user
    post.title = title
    post.text = text
    post.completed = completed

    const updatedPost = await post.save()

    res.json(`'${updatedPost.title}' updated`)
}

const deletePost = async (req, res) => {
    const { id } = req.body

   
    if (!id) {
        return res.status(400).json({ message: 'Post ID required' })
    }

    const post = await Post.findById(id).exec()

    if (!post) {
        return res.status(400).json({ message: 'Post not found' })
    }

    const result = await post.deleteOne()

    const reply = `Post '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost
}