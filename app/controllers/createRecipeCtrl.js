
RpApp.controller('CreateRecipeCtrl',[function () {
    var vm = this;

    vm.selected = undefined;
    vm.genres = ['African', 'American', 'Asian', 'Caribbean', 'European', 'Oceanian', 'Mexican', 'Chicken', 'Steak', 'Beef', 'Ham', 'Pasta'];

    vm.ingredients = [];
    vm.addIngredient = function () {
        vm.ingredients.push({
            measurement: vm.newIngredientMeasurement,
            name: vm.newIngredientName
        });
        vm.newIngredientMeasurement = '';
        vm.newIngredientName = '';
    };
    vm.deleteIngredient = function (index) {
        vm.ingredients.splice(index, 1);
    };

    vm.directions = [];
    vm.addDirection = function () {
        vm.directions.push({
            step: vm.newDirectionStep,
            instructions: vm.newDirectionInstructions
        });
        vm.newDirectionStep = '';
        vm.newDirectionInstructions = '';
    };
    vm.deleteDirection = function (index) {
       vm.directions.splice(index);
    };

    vm.createRecipe = function () {

    };

}]);