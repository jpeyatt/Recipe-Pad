
var RpApp = angular.module('RpApp', [ 'ngRoute', 'ui.router', 'ui.bootstrap'])

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
