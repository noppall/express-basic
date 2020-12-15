const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const exphbs = require('express-handlebars')

const app = express()

// app.get('/', (req, res) => {
    // res.send('<h1>Hello World</h1>')
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// handlebars midware
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// homepage route
app.get('/', (req, res) => res.render('index', {
    title : 'member app'
}))

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// init middleware
app.use(logger)

// members api routes
app.use('/routes/api', require('./routes/api/Members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))