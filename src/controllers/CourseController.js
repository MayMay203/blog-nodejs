const Course = require('../models/Course')

class CourseController {
  index(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => res.render('courses/show', { course }))
      .catch(next)
  }

  create(req, res, next) {
    res.render('courses/create')
  }

  edit(req, res, next) {
    const course = Course.findById(req.params.id)
      .lean()
      .then((course) => res.render('courses/edit', { course }))
      .catch(next)
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  store(req, res, next) {
    const formData = req.body
    formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`
    const course = new Course(formData)
    course
      .save()
      .then(() => res.redirect('/'))
      .catch(next)
  }
}

module.exports = new CourseController()
