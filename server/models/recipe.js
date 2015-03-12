var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ingredientSchema = new Schema({
    measurement: String,
    name: String
});

var directionSchema = new Schema({
    step: Number,
    instructions: String
});

var RecipeSchema = new Schema({
    name: String,
    genre: String,
    description: String,
    prepTime: Number,
    cookTime: Number,
    rating: Number,
    ingredients: [ingredientSchema],
    directions: [directionSchema]
});

module.exports = mongoose.model('Recipe', RecipeSchema);