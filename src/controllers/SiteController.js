const Course = require('../models/Course')

class SiteController {
  async index(req, res, next) {
    Course.find({}).lean()
      .then((courses) =>
        res.render('home', {
          courses,
        }),
      )
      .catch(next)
  }

  search(req, res) {
    res.send('Search')
  }

  contact(req, res) {
    res.send('Contact')
  }
}

module.exports = new SiteController()
