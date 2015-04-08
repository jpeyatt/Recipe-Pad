
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
