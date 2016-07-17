var todoApp = angular.module('todoApp',['ngRoute', 'ngResource']);

todoApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'alltodos.html',
		controller: 'todoAppCtrl'
	}).when('/new',{
		templateUrl: 'newtodos.html',
		controller: 'newtodoAppCtrl'
	});
});

todoApp.controller('todoAppCtrl',function($scope, $http){
	$scope.todos = [];
	
	$scope.fetchList = function(){
		$http.get('/todos').success(function(data){
			$scope.todos = data;
		});
	}

	$scope.fetchList();
});

todoApp.controller('newtodoAppCtrl',function($scope,$http,$location){
	$scope.todoListName = '';
	$scope.todoTasks = {list:$scope.todoListName,todotasks:[]};
	$scope.todoTask = '';
	$scope.errMsg = '';

	$scope.post = function(){
		$scope.todoTasks.todotasks.push({list: $scope.todoListName,todo: $scope.todoTask});
		$scope.todoTask = '';
	}

	$scope.pushTaskToDb = function(){
		$http.post('/todos',$scope.todoTasks).success(function(data){
			console.log('State : ' + data.state);
			console.log('message : ' + data.message);
			
				console.log('To Do List Created');
				console.log("Changing Location to /");
				$location.path('/');
		}).error(function(data){
			console.log(data);
				$scope.errMsg = data;
		});
	}
})