
    RpApp.factory('RecipesService', ['$http', function ($http) {
            return {
                get : function () {
                    return $http.get('http://localhost:8000/api/recipes');
                },
                create : function (recipeData) {
                    return $http.post('http://localhost:8000/api/recipes', recipeData);
                }
            };
        }]);
