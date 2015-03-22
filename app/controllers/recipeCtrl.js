
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