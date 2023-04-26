var taskApp = angular.module('taskApp', []);

taskApp.service('TaskService', function() {
	var tasks = [];

	this.getTasks = function() {
		return tasks;
	};

	this.addTask = function(taskName, taskDescription, taskStatus) {
		tasks.push({
			name: taskName,
			description: taskDescription,
			status: taskStatus
		});
	};

	this.editTask = function(task, taskName, taskDescription, taskStatus) {
		task.name = taskName;
		task.description = taskDescription;
		task.status = taskStatus;
	};

	this.deleteTask = function(task) {
		var index = tasks.indexOf(task);
		tasks.splice(index, 1);
	};
});

taskApp.controller('TaskController', function($scope, TaskService) {
	$scope.tasks = TaskService.getTasks();

	$scope.addTask = function() {
		TaskService.addTask($scope.taskName, $scope.taskDescription, $scope.taskStatus);
		$scope.taskName = '';
		$scope.taskDescription = '';
		$scope.taskStatus = '';
	};

	$scope.editTask = function(task) {
		$scope.taskName = task.name;
		$scope.taskDescription = task.description;
		$scope.taskStatus = task.status;
		$scope.currentTask = task;
	};

	$scope.updateTask = function() {
		TaskService.editTask($scope.currentTask, $scope.taskName, $scope.taskDescription, $scope.taskStatus);
		$scope.taskName = '';
		$scope.taskDescription = '';
		$scope.taskStatus = '';
		$scope.currentTask = null;
	};

	$scope.deleteTask = function(task) {
		TaskService.deleteTask(task);
	};
});
