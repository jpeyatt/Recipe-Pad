
    RpApp.factory('RecipesService', function ($http) {
            return {
                get : function () {
                    return $http.get('http://localhost:8000/api/recipes');
                }

            }
        });
