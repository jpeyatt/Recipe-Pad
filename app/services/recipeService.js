
    RpApp.factory('RecipeService', function ($http){
            return {
                get : function (id) {
                    return $http.get('http://localhost:8000/api/recipes/' + id);
                }
            }
        });
