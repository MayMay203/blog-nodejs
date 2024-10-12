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

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => {
        res.redirect('back')
      })
      .catch(next)
  }

  // [DELETE]/courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  // [DELETE]/courses/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
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

  // [POST] /courses/handle-form-actions
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break
      case 'force-delete':
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break
      default:
        res.json({ message: 'Action is invalid' })
    }
  }
}

module.exports = new CourseController()
