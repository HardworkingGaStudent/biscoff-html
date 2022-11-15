const productModel = require('../../models/products/products')
const productRatingModel = require('../../models/ratings/rating')
const productValidators = require('../validators/products')

const controller = {

    createProduct: async (req, res) => {
        // validations
        const validationResults = productValidators.createProductValidator.validate(req.body)

        if (validationResults.error) {
            res.send('validation error occurred')
            return
        }

        const validatedResults = validationResults.value

        try {
            await productModel.create(validatedResults)
        } catch(err) {
            console.log(err)
        }

        // todo: redirect to products page
        res.send('asd')
    },

    listProducts: async (req, res) => {
        const products = await productModel.find().exec()
        console.log(products)

        res.render('products/index', {products})
    },

    getProduct: async(req, res) => {
        const product = await productModel.findById(req.params.product_id)

        const ratings = await productRatingModel.find({product_id: req.params.product_id})

        // todo: aggregation of ratings

        res.render('products/show', {product, ratings})
    }

}

module.exports = controller