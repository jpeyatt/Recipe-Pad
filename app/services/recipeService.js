
    RpApp.factory('RecipeService', function ($http){
            return {
                get : function (id) {
                    return $http.get('http://localhost:8000/api/recipes/' + id);
                },
                update : function (id, recipeData) {
                    return $http.put('http://localhost:8000/api/recipes/' + id, recipeData);
                },
                delete : function (id) {
                    return $http.delete('http://localhost:8000/api/recipes/' + id);
                }
            };
        });
