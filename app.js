var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var config = require('./config/database');
var pages = require('./routes/pages');
var adminPages = require('./routes/admin_pages');
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Connected to database');
});

//Initial
var app = express();

//View engine setup - EJS
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set routes index
app.use('/', pages);

// Set routes admin area
app.use('/admin/pages', adminPages);


// Middleware body parser
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

// Middleware express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

// Middleware express validator

app.use(expressValidator({
    errorFormartter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shitf(),
            formParam = root;
        while (namespace.lenght) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Middleware express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//setup server
var port = 3000;
app.listen(port, function () {
    console.log('Server running on port ' + port);
})