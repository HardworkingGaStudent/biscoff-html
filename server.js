require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()
const port = 8080
const connStr = `mongodb://127.0.0.1:27017/biscoff-html`
// const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.d73ns.mongodb.net/?retryWrites=true&w=majority`

const pageController = require('./controllers/pages/page_controller')
const productController = require('./controllers/products/products_controller')
const userController = require('./controllers/users/users_controller')
const productRatingController = require('./controllers/product_ratings/product_rating_controller')
const authMiddleware = require('./middlewares/auth_middleware')

// Set view engine
app.set('view engine', 'ejs')

// Apply middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, maxAge: 7200000 }
}))
app.use(authMiddleware.setAuthUserVar)

app.get('/', pageController.showHome)
app.get('/contact', pageController.showContact)

app.post('/products', productController.createProduct)
app.get('/products', productController.listProducts)
app.get('/products/:product_id', productController.getProduct)

// Rating Routes
app.post('/products/:product_id/ratings', authMiddleware.isAuthenticated, productRatingController.createRating)

// Users Routes
app.get('/users/register', userController.showRegistrationForm)
app.post('/users/register', userController.register)
app.get('/users/login', userController.showLoginForm)
app.post('/users/login', userController.login)
app.post('/users/logout', userController.logout)

app.get('/users/dashboard', authMiddleware.isAuthenticated, userController.showDashboard)
app.get('/users/profile', authMiddleware.isAuthenticated, userController.showProfile)




app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: 'biscoff_bakery'})
    } catch(err) {
        console.log(`Failed to connect to DB`)
        process.exit(1)
    }

    console.log(`Example app listening on port ${port}`)
})