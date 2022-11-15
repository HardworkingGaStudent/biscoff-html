const mongoose = require('mongoose')

const productRatingSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

const ProductRating = mongoose.model('ProductRatings', productRatingSchema)

module.exports = ProductRating
