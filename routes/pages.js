var express = require('express');
var router = express.Router();

// Export
module.exports = router;

// home / index
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home'
    })
});

