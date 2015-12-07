/**
 * Created by Matt on 11/5/2015.
 */
var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider) {

   $routeProvider
       .when( "/",{
           templateUrl:'pages/main.html',
           controller:'mainController'
       })
       .when('/second/:num',{
            templateUrl:'pages/second.html',
            controller:'secondController'
       })
       .when('/second/',{
           templateUrl:'pages/second.html',
           controller:'secondController'
       })

});

myApp.service('nameService', function() {

    var self= this;
    this.name='john doe';

    this.namelength = function() {
        return self.name.length;
    };
});

myApp.controller('mainController',['$scope','$log','nameService',
    function($scope,$log,nameService)
    {
        $scope.name = nameService.name;
        $log.main='m';
        $log.log($log);
        $scope.$watch('name',function(){
            nameService.name=$scope.name;
        });
        $scope.people = [
        {
            name: 'umut',
            address: '981 ave',  //eski address: '981 ave Brooklyn'
            city:'Brooklyn'
        },
            {
                name: 'haluk',
                address: 'newhaw',  //eski address: '981 ave Brooklyn'
                city:'nj'
            },
            {
                name: 'levo',
                address: 'chery',  //eski address: '981 ave Brooklyn'
                city:'pa'
            }
        ];

        $scope.formattedAddress = function(person) {
            return person.address + ',' + person.city;
        };
     // $log.info($location.path());
    }]);
myApp.controller('secondController',['$scope','$log','$routeParams','nameService',
    function($scope,$log,$routeParams,nameService)
    {

        $scope.name = nameService.name;
        $scope.num = $routeParams.num || 1;
        $log.sec="from second";
        $log.log($log);
        $scope.$watch('name',function(){
            nameService.name=$scope.name;
        });
        // $log.info($location.path());
    }]);

myApp.directive('searchResult',function(){
   return{
    restrict:'AE',
    templateUrl: 'directives/searchresult.html',
    replace: true,
    scope: {
      personObject: "=",
      formattedAddressFunction:"&"
     },
     transclude:true,

     compile : function(elem, attrs) {
         console.log('compiling');
         //removes all the classes from the main directive html
         elem.remove('class');
         console.log(elem.html());

                        //ALWAYS THIS ORDER NAMES CAN BE DIFFERENT
         return {       //model(data), view(html), classes
              post:function(scope,elements, attrs) {
              console.log(scope);
              console.log('post link..');
              console.log(elements);
             }
         }

     }
   }
});

