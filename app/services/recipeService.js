
    RpApp.factory('RecipeService', function ($resource){
            return $resource('http://localhost:8000/api/recipes/:id');
        });
