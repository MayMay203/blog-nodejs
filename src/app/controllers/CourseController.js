const Course = require('../../models/Course')

class CourseController {
  index(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then(course => res.render('courses/show', {course} ))
      .catch(next)
  }
}

module.exports = new CourseController()
