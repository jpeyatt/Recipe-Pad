
RpApp.controller('EditRecipeCtrl',['RecipeService', '$state', '$stateParams', 'Genres', function (RecipeService, $state, $stateParams, Genres) {
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
        vm.recipe.directions.splice(index);
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
                console.log('Recipe Updated! ' + data);
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