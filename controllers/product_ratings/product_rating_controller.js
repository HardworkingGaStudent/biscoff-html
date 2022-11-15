const productRatingModel = require('../../models/ratings/rating')
const userModel = require('../../models/users/users')

module.exports = {

    createRating: async (req, res) => {
        // validation

        const productID = req.params.product_id
        const validatedValues = req.body

        // get user from DB
        let user = null

        try {
            user = await userModel.findOne({email: req.session.user})
        } catch(err) {
            console.log(err)
            res.redirect('/users/login')
            return
        }

        // create the ratings
        try {
            await productRatingModel.create({
                user_id: user._id,
                product_id: productID,
                rating: validatedValues.rating
            })
        } catch(err) {
            console.log(err)
            res.redirect('/users/login')
            return
        }

        res.redirect('/products')
    }

}