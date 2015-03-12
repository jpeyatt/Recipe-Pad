var express = require('express');
var router  = express.Router();
var Recipe  = require('../models/recipe');

router.route('/recipes')
    .post(function (req, res) {
        var recipe = new Recipe();

        recipe.name = req.body.name;
        recipe.genre = req.body.genre;
        recipe.description = req.body.description;
        recipe.prepTime = req.body.prepTime;
        recipe.cookTime = req.body.cookTime;
        recipe.rating = req.body.rating;
        recipe.ingredients = req.body.ingredients;
        recipe.directions = req.body.directions;

        recipe.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Recipe Created!' });
        });
    })
    .get(function (req, res) {
        Recipe.find(function (err, recipes) {
            if (err) {
                res.send(err);
            }
            res.json(recipes);
        });
    });

router.route('/recipes/:id')
    .get(function (req, res) {
        Recipe.findById(req.params.id, function (err, recipe) {
           if (err) {
               res.send(err);
           }
            res.json(recipe);
        });
    })
    .put(function (req, res) {
        Recipe.findById(req.params.id, function (err, recipe) {
            if (err) {
                res.send(err);
            }

            recipe.name = req.body.name;

            recipe.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Recipe Updated!' });
            })
        })
    })
    .delete(function (req, res) {
        Recipe.remove({
            _id: req.params.id
        }, function (err, recipe) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Recipe Deleted!' });
        });
    });

module.exports = router;