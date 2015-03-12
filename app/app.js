
var RpApp = angular.module('RpApp', ['ui.router', 'ui.bootstrap', 'ngRoute'])

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
        });

}]);
