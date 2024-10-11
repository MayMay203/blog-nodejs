const Course = require('../models/Course')

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Course.find({deleteAt: null})
      .lean()
      .then((courses) => res.render('me/stored-courses', {courses}))
      .catch(next)
  }

  storedNews(req, res, next) {
    res.send('stored news')
  }
}

module.exports = new MeController()
