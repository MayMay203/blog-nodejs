class SiteController {
    index(req, res) {
        res.render('home');
    }

                                               search(req, res) {
        res.send('Search');
    }

                                            contact(req, res) {
        res.send('Contact');
    }
}

module.exports = new SiteController();
