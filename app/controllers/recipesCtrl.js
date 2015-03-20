
    RpApp.controller('RecipesCtrl',['RecipesService', 'RecipeService', function (RecipesService, RecipeService) {
            var vm = this;

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
                        console.log('Recipe deleted successfully');
                        vm.loadRecipes();
                        $('.modal-backdrop').fadeOut();
                    });

            };

        vm.loadRecipes();
    }]);
