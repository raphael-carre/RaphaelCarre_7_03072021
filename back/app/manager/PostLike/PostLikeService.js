const FetchErrorHandler = require('../../config/FetchErrorHandler')
const Service = require('../Service')
const PostLike = require('./PostLikeModel')
const User = require('../User/UserModel')
const Post = require('../Post/PostModel')

class PostLikeService extends Service {
    /**
     * Find every posts the user has liked.
     * @param {Request} req Request
     * @returns {Array} Array of posts
     */
    getByUser = async req => {
        const userId = this.checkId(req.params.id)

        const user = await User.findOne({ attributes: ['id'], where: { id: userId } })
        if (!user) throw new FetchErrorHandler(404, 'Utilisateur introuvable !')

        const likedPosts = await this.Model.findAll({ where: { userId } })
        if (typeof likedPosts !== 'object') throw new FetchErrorHandler(500)

        return likedPosts
    }

    /**
     * Find every users who liked a specific post.
     * @param {Request} req Request
     * @returns {Array} Array of users
     */
    getByPost = async req => {
        const postId = this.checkId(req.params.id)

        await this.checkIfPostExists(postId)

        const options = {
            include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }],
            where: { postId }
        }

        const usersLiked = await this.Model.findAll(options)
        if (typeof usersLiked !== 'object') throw new FetchErrorHandler(500)

        return usersLiked
    }

    /**
     * Toggles user's like/unlike for a post.
     * @param {Request} req Request
     * @returns {String} Message
     */
    toggle = async req => {
        const postId = this.checkId(req.params.id)
        const userId = this.tokenId(req)

        await this.checkIfPostExists(postId)

        const postLiked = await this.Model.findOne({ where: { postId, userId } })

        if (!postLiked) {
            const newPostLike = await this.Model.create({ userId, postId })
            if (!newPostLike) throw new FetchErrorHandler(500)

            return 'Vous aimez cette publication !!'
        }

        const like = !postLiked.like
        const message = like ? 'Vous aimez cette publication !!' : 'Vous n\'aimez plus cette publication !'

        const postLikeUpdate = await this.Model.update({ like }, { where: { id: postLiked.id } })
        if (postLikeUpdate[0] === 0) throw new FetchErrorHandler(500)

        return message
    }
}

module.exports = new PostLikeService(PostLike)