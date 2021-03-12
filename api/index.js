const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'nuxtjs-shoping-cart-sample'
}));

app.get('/', (req, res) => {

    let cart = [];
    if(req.session.cart) {
        cart = req.session.cart;
    }

    // TotalPrice Calculate
    let cartTotalPrice = 0.0;
    cart.forEach(item => {
        cartTotalPrice += item.totalPrice;
    });

    res.status(200).json({
        products: [
            { id: 1, title: 'MacBook Pro 11', price: 18000 },
            { id: 2, title: 'iPhone 11', price: 12000 },
            { id: 3, title: 'Huawei Y7 2019 Pro', price: 3450 },
            { id: 4, title: 'Samsung J7 Pro', price: 4100 },
            { id: 5, title: 'Xaomi 4.0', price: 5000 },
            { id: 6, title: 'Oppo Reno PRO 4', price: 4750 },
            { id: 7, title: 'LG G4', price: 850 },
            { id: 8, title: 'iPad Pro 4', price: 7840 },
            { id: 9, title: 'iPhone 8S', price: 5450 },
            // { id: 10, title: 'MacBook Air', price: 25700 },
            // { id: 11, title: 'Carlsberg 50cl', price: 15 },
            // { id: 12, title: 'Pizza', price: 56 },
        ],
        cart: {
            items: cart,
            totalPrice: cartTotalPrice
        }
    });
});

app.post('/addToCart', (req, res) => {
    let product = req.body.product;
    
    // Basket Session
    let cart = [];

    if(req.session.cart) {
        cart = req.session.cart;
    }

    if(cart.length > 0) {
        let productIndis = cart.findIndex(item => item.id == product.id);
        if(productIndis > -1) {
            cart[productIndis].count += product.count;
            cart[productIndis].totalPrice = cart[productIndis].count * cart[productIndis].price;
        } else {
            cart.push({ ...product, totalPrice: product.count * product.price });
        }
    } else {
        cart.push({ ...product, totalPrice: product.count * product.price });
    }
    req.session.cart = cart;

    // Session Control End

    // TotalPrice Calculate
    let cartTotalPrice = 0.0;
    cart.forEach(item => {
        cartTotalPrice += item.totalPrice;
    });

    res.status(200).json({
        cart: {
            items: req.session.cart,
            totalPrice: cartTotalPrice
        }
    });
});

app.post('/changeCount', (req, res) => {
    let product = req.body.product;

    // Basket Session
    let cart = [];

    if(req.session.cart) {
        cart = req.session.cart;
    }

    if(cart.length > 0) {
        let productIndis = cart.findIndex(item => item.id == product.id);
        if(productIndis > -1) {
            cart[productIndis].count = product.count;
            cart[productIndis].totalPrice = cart[productIndis].count * cart[productIndis].price;
        }
    }
    req.session.cart = cart;

    // Session Control End

    // TotalPrice Calculate
    let cartTotalPrice = 0.0;
    cart.forEach(item => {
        cartTotalPrice += item.totalPrice;
    });

    res.status(200).json({
        cart: {
            items: req.session.cart,
            totalPrice: cartTotalPrice
        }
    });
});

app.post('/removeCart', (req, res) => {
    let product = req.body.product;

    let cart = [];
    if(req.session.cart) {
        cart = req.session.cart;
    }

    let cartIndis = cart.findIndex(item => item.id == product.id);
    if(cartIndis > -1) {
        cart.splice(cartIndis, 1);
        req.session.cart = cart;
    }

    // TotalPrice Calculate
    let cartTotalPrice = 0.0;
    cart.forEach(item => {
        cartTotalPrice += item.totalPrice;
    });

    req.session.cart = cart;

    res.status(200).json({
        cart: {
            items: req.session.cart,
            totalPrice: cartTotalPrice
        }
    });
});

module.exports = {
    path: '/api',
    handler: app
}