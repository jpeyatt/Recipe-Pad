
    RpApp.controller('RecipesCtrl',['RecipesService', function (RecipesService) {
            var vm = this;

            RecipesService.get()
                .success(function (data) {
                    vm.recipes = data;
                });

        }]);
