var express = require('express');
var router = express.Router();

// Export
module.exports = router;

// admin index
router.get('/', function (req, res, next) {
    res.send('Admin Area');
});