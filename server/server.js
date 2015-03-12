var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds051851.mongolab.com:51851/recipepad');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:63342");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Headers", "x-xsrf-token");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
})

var port = process.env.PORT || 8000;

var router = require('./routes/recipes');

app.use('/api', router);

app.listen(port, function () {
    console.log('RecipePad app is listening on port ' + port);
});
