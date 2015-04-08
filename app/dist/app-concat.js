
var RpApp = angular.module('RpApp', [ 'ngRoute', 'ui.router', 'ui.bootstrap', 'ui-notification', 'ngSanitize', 'ngAnimate'])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/recipes');

    $stateProvider
        .state('recipes', {
            url: '/recipes',
            templateUrl: 'app/views/recipes.html',
            controller: "RecipesCtrl as vm"
        })
        .state('recipe', {
            url: '/recipe/:recipeId',
            templateUrl: 'app/views/recipe.html',
            controller: "RecipeCtrl as vm"
        })
        .state('newRecipe', {
            url: '/new-recipe',
            templateUrl: 'app/views/createRecipe.html',
            controller: "CreateRecipeCtrl as vm"
        })
        .state('editRecipe', {
            url: '/edit-recipe/:recipeId',
            templateUrl: 'app/views/editRecipe.html',
            controller: "EditRecipeCtrl as vm"
        });

}]);

RpApp.value('Genres', [
    'African', 'American', 'Asian',
    'Caribbean', 'European', 'Oceanian', 'Mexican', 'Chicken', 'Steak', 'Beef', 'Ham', 'Pasta'
]);

RpApp.controller('CreateRecipeCtrl',['RecipesService', '$state', 'Genres', 'Notification', function (RecipesService, $state, Genres, Notification) {
    var vm = this;

    vm.newRecipe = {};
    vm.genres = Genres;
    vm.newRecipe.genre = undefined;

    vm.newRecipe.ingredients = [];
    vm.addIngredient = function () {
        vm.newRecipe.ingredients.push({
            measurement: vm.newIngredientMeasurement,
            name: vm.newIngredientName
        });
        vm.newIngredientMeasurement = '';
        vm.newIngredientName = '';
    };
    vm.deleteIngredient = function (index) {
        vm.newRecipe.ingredients.splice(index, 1);
    };

    vm.newRecipe.directions = [];
    vm.addDirection = function () {
        vm.newRecipe.directions.push({
            step: vm.newDirectionStep,
            instructions: vm.newDirectionInstructions
        });
        vm.newDirectionStep = '';
        vm.newDirectionInstructions = '';
    };
    vm.deleteDirection = function (index) {
       vm.newRecipe.directions.splice(index, 1);
    };

    vm.createRecipe = function (newRecipe) {
        var newRecipeParams = {
            name: newRecipe.name,
            genre: newRecipe.genre,
            description: newRecipe.description,
            prepTime: newRecipe.prepTime,
            cookTime: newRecipe.cookTime,
            rating: newRecipe.rating,
            ingredients: newRecipe.ingredients,
            directions: newRecipe.directions
        };

        RecipesService.create(newRecipeParams)
            .success(function (data) {
                //console.log('Recipe successfully created: ' + data);
                Notification.primary({message: 'Recipe successfully created.', delay: 2000});
                $state.go('recipes');
            })
            .error(function (err) {
                console.log('Error: ' + err);
            });
    };

    vm.ratingHover = function (value) {
        vm.overStar = value;
        vm.percent = 100 * (value / 5);
    };

    vm.ratingStates = [
        {stateOn: 'fa fa-star'}
    ];

    vm.cancelRecipe = function () {
        $state.go('recipes');
    }

}]);

RpApp.controller('EditRecipeCtrl',['RecipeService', '$state', '$stateParams', 'Genres', 'Notification', function (RecipeService, $state, $stateParams, Genres, Notification) {
    var vm = this;
    vm.recipeId = $stateParams.recipeId;

    RecipeService.get($stateParams.recipeId)
        .success(function (data) {
            vm.recipe = data;
            console.log("Recipe (id): " + vm.recipe._id + " successfully loaded");
        })
        .error(function (err) {
            console.log('Error: ' + err);
        });

    vm.genres = Genres;

    vm.addIngredient = function () {
        vm.recipe.ingredients.push({
            measurement: vm.newIngredientMeasurement,
            name: vm.newIngredientName
        });
        vm.newIngredientMeasurement = '';
        vm.newIngredientName = '';
    };
    vm.deleteIngredient = function (index) {
        vm.recipe.ingredients.splice(index, 1);
    };

    vm.addDirection = function () {
        vm.recipe.directions.push({
            step: vm.newDirectionStep,
            instructions: vm.newDirectionInstructions
        });
        vm.newDirectionStep = '';
        vm.newDirectionInstructions = '';
    };
    vm.deleteDirection = function (index) {
        vm.recipe.directions.splice(index, 1);
    };

    vm.saveRecipe = function (recipe) {

        vm.updatedRecipe = {
            name: recipe.name,
            genre: recipe.genre,
            description: recipe.description,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            rating: recipe.rating,
            ingredients: recipe.ingredients,
            directions: recipe.directions
        }
        RecipeService.update(vm.recipeId, vm.updatedRecipe)
            .success(function (data) {
                Notification.primary({message: 'Recipe updated', delay: 2000});
                $state.go('recipes');
            })
            .error(function (err) {
                console.log('Error: ' + err);
            });
    }

    vm.cancelRecipe = function () {
        $state.go('recipes');
    }


}]);

RpApp.controller('RecipeCtrl',['RecipeService', '$state', '$stateParams', function (RecipeService, $state, $stateParams) {
    var vm = this;

    RecipeService.get($stateParams.recipeId)
        .success(function (data) {
            vm.recipe = data;
            console.log(data + " successfully loaded");
        })
        .error(function (err) {
            console.log('Error: ' + err);
        });

    vm.goBack = function () {
        $state.go('recipes');
        $('html,body').scrollTop(0);
    };

}]);

    RpApp.controller('RecipesCtrl',['RecipesService', 'RecipeService', 'Notification', function (RecipesService, RecipeService, Notification) {
        var vm = this;
        vm.pageClass = 'page-recipes';

        vm.loadRecipes = function () {
            RecipesService.get()
                .success(function (data) {
                    vm.recipes = data;
                })
                .error(function (err) {
                    console.log('Error: ' + err);
                });
        };

            vm.deleteRecipe = function (id) {
                RecipeService.delete(id)
                    .success(function (data) {
                        Notification.primary({message: 'Recipe deleted successfully', delay: 2000});
                        vm.loadRecipes();
                        $('.modal-backdrop').fadeOut();
                    });

            };

        vm.loadRecipes();
    }]);


    RpApp.factory('RecipeService', ['$http', function ($http){
            return {

                get : function (id) {
                    return $http.get('http://localhost:8000/api/recipes/' + id);
                },

                update : function (id, recipeData) {
                    return $http.put('http://localhost:8000/api/recipes/' + id, recipeData);
                },

                delete : function (id) {
                    return $http.delete('http://localhost:8000/api/recipes/' + id);
                }

            };
        }]);


    RpApp.factory('RecipesService', ['$http', function ($http) {
            return {
                get : function () {
                    return $http.get('http://localhost:8000/api/recipes');
                },
                create : function (recipeData) {
                    return $http.post('http://localhost:8000/api/recipes', recipeData);
                }
            };
        }]);
