
RpApp.controller('CreateRecipeCtrl',['RecipesService', '$state', 'Genres', function (RecipesService, $state, Genres) {
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
                console.log('Recipe successfully created: ' + data);
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