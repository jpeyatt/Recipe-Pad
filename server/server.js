var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds051851.mongolab.com:51851/recipepad');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})

var port = process.env.PORT || 8000;

var router = require('./routes/recipes');

app.use('/api', router);

app.listen(port, function () {
    console.log('RecipePad app is listening on port ' + port);
});
