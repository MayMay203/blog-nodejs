


const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const { urlencoded } = require('body-parser')
const path = require('path')
const methodOverride = require('method-override')
const app = express()
app.use(methodOverride('_method'))
// Middleware
const sortMiddleware = require('./app/middlewares/sortMidlleware.x')
// Custom middleware
app.use(sortMiddleware)
// ConnectDB
const port = 3001

// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default'
        const icons = {
          default: 'fa-solid fa-sort',
          asc: 'fa-solid fa-arrow-down-short-wide',
          desc: 'fa-solid fa-arrow-down-wide-short',
        }
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        }
        const icon = icons[sortType]
        const type = types[sort.type]
        return `
         <a href="?_sort&column=${field}&type=${type}">
          <i class="${icon}"></i>
        </a>`
      }
    },
  }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Config static file
app.use(express.static(path.join(__dirname, 'public')))
app.use(urlencoded({ extended: true }))
app.use(express.json())

const route = require('./routes')

// Routes init
route(app)

const db = require('./config/db')
db.connect()

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
