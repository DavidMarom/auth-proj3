const express = require('express')
const router = express.Router()
const generateToken = require('../utils/general').generateToken
const { addToken, removeToken } = require('../services/tokens')
const { isAuthorized } = require('./middlewares')
const bcrypt = require('bcrypt')

const DB = [{ id: 1, name: "Book 1" }, { id: 2, name: "Book 2" }, { id: 3, name: "Book 3" }]
const USERS = [{ user: "David", pass: "$2a$04$LwFegOasANg3IlWT2BhZSOyIH1p3LrYExDmwFPdk35l20WxDjqKF2" }]


router.post('/login', (req, res) => {
    const { user, pass } = req.body;

    if (USERS.find(u => u.user === user && bcrypt.compareSync(pass, u.pass))) {
        token = generateToken();
        addToken(token);
        res.json({ token })
    } else {
        res.status(401).json({ msg: "Unauthorized LOGIN" })
    }
})

router.post('/logout', isAuthorized, (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    removeToken(token);
    res.json({ msg: "Logged out" });
})

router.get('/books', isAuthorized, (req, res) => {
    res.json(DB)
})

module.exports = router
