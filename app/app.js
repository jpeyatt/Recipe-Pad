
var RpApp = angular.module('RpApp', ['ui.router', 'ui.bootstrap'])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/recipes');

    $stateProvider
        .state('recipes', {
            url: '/recipes',
            templateUrl: 'app/views/recipes.html',
            controller: "RecipesCtrl as vm"
        })
        .state('newRecipe', {
            url: '/new-recipe',
            templateUrl: 'app/views/createRecipe.html',
            controller: "CreateRecipeCtrl as vm"
        });
}]);
