const express = require('express')
const routes = require('./routes/routes')
const app = express()
const cors = require('cors')
const port = 3001

app.use(cors({
    origin: 'http://localhost:3000',      // must be the exact origin (no '*')
    credentials: true,                     // allow cookies/Authorization
}));


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
