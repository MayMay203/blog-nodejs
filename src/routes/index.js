// Tat ca file trong route phai nap vao index.js
const newRoute = require('./news');
const siteRoute = require('./site');

function route(app) {
    // app.get('/', (req, res)=> {
    //     res.render('home')
    //  })

    //  app.get('/news', (req, res)=> {
    //    res.render('news')
    //  })

    // app.get("/search",(req,res)=>{
    //     // console.log(req.query.q)
    //     res.render("search")
    //   })
    app.use('/news', newRoute);
    app.use('/', siteRoute);

    //  app.post("/search",(req,res)=>{
    //    console.log(req.body)
    //    res.render("search")
    //  })
}

module.exports = route;
