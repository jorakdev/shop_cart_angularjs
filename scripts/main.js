
var mainApp = angular.module("myApp", ['ngRoute']);

//ROUTES
mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})
		.when('/viewAllProduct', {
			templateUrl: 'views/viewAllProduct.html',
			controller: 'viewAllProduct'
        })
        .when('/viewProductDetail/:id', {
			templateUrl: 'views/viewProductDetail.html',
			controller: 'productDetail'
		})
		.otherwise({
			redirectTo: '/home'
		});
});

//CONTROLLER
mainApp.controller('HomeController', function($scope) {
	// 
});

mainApp.controller('viewAllProduct', function($scope) {
	$scope.products = [
	{ id :  1, name:"RTX2080", category : "graphic card", description : "La carte graphique GeForce RTX 2080 s'appuie sur la toute nouvelle architecture NVIDIA Turing et offre des jeux d'un réalisme époustouflant",   price :   100, qty : 1 },
    { id :  2, name:"GTX1080", category : "graphic card", description : "Attention aux yeux, la MSI GeForce GTX 1080 Gaming X arrive avec des mensurations de haute volée ! La 1080 arrive armée de ses 2560 coeurs CUDA (+25%...)",   price :   90, qty : 1 },
    { id :  3, name:"GTX980",  category : "graphic card", description : "La carte GeForce GTX 980 est la carte graphique la plus avancée au monde exploitant l'architecture de nouvelle génération NVIDIA Maxwell.",     price :   80, qty : 1 }
    
	];

// creation d'un tableau vide de panier named cart
$scope.cart = [];

// recuperer l'id correspondant
var findItemById = function(items, id) {
	// underscorejs : ex var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); => 2
    return _.find(items, function(item) {
      return item.id === id;
    });
  };

//  calculer le prix par ligne en fonction du prix unitaire et de la qté
$scope.getCost = function(item) {
    return item.qty * item.price;
};

//ajout d'un item dans cart ou incrementation s'il y existe déjà
$scope.addItem = function(itemToAdd) {
	var found = findItemById($scope.cart, itemToAdd.id);
	// si un item avec son id correspondant  est déjà dans la cart on rajoute seulement 
    if (found) {
      found.qty += itemToAdd.qty;
	}
	// si non on push dans cart le nouveau élément
    else {
      $scope.cart.push(angular.copy(itemToAdd));}
};

// suppression d'un item dans l'array cart
$scope.removeItem = function(item) {
	var index = $scope.cart.indexOf(item);
	// splice peut etre utliser ici pusique il s'agit de l'array cart (slice method doesn't change the original array )
    $scope.cart.splice(index, 1);
  };

//  total:
$scope.getTotal = function() {
	//exemple d'utilisation de underscore.reduce var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0); => 6
    var total =  _.reduce($scope.cart, function(sum, item) {
      return sum + $scope.getCost(item);
    }, 0);
    // console.log('total: ' + total);
    return total;
  };

//vider le panier
$scope.clearCart = function() {
    $scope.cart.length = 0;
  };

});

// Views details of item
//routeParams is used to get the url params
mainApp.controller('productDetail', function($scope, $routeParams) {
	$scope.productDetails = [
		{id:1, name: 'RTX2080', details: "La carte graphique GeForce RTX 2080 s'appuie sur la toute nouvelle architecture NVIDIA Turing et offre des jeux d'un réalisme époustouflant, ainsi qu'une"},
		{id:2, name: 'GTX1080', details: "Attention aux yeux, la MSI GeForce GTX 1080 Gaming X arrive avec des mensurations de haute volée ! La 1080 arrive armée de ses 2560 coeurs CUDA (+25%...)" },
		{id:3, name: 'GTX980',  details: "La carte GeForce GTX 980 est la carte graphique la plus avancée au monde exploitant l'architecture de nouvelle génération NVIDIA Maxwell."}
	];
//take the params id using routeParams
    $scope.id = $routeParams.id;

	
});
