
angular
  .module("readinglist", [
    "ui.router",

    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("ReadFactory", [
    "$resource",
    ReadFactoryFunction
  ])

  .controller("ReadIndexController",
    "$state"
    "ReadFactory",
    ReadIndexControllerFunction
  ])
  .controller("ReadShowController", [
    "$state",
    "$stateParams",
    "ReadFactory",
     ReadShowControllerFunction
  ])


  function RouterFunction($stateProvider) {

    $stateProvider
    .state("readIndex", {
      url: "/reads",
      templateUrl: "js/ng-views/index.html",
      controller: "ReadIndexController",
      controllerAs: "vm"
    })

    .state("readShow", {
      url: "/reads/:title",
      templateUrl: "js/ng-views/show.html",
      controller: "ReadShowController",
      controllerAs: "vm"
    })
  
  }

function ReadFactoryFunction($resource) {
  return $resource("http://localhost:3001/reads",{}, {
    update: {method: "PUT"}
  })
}

function ReadIndexControllerFunction($state, ReadFactory) {
  this.reads = ReadFactory.query();
  this.newRead = new Read()
  this.create = function() {
    this.newRead.$save().then(function(read) {
      $state.go("show", {title: read.title} )
    })

  }
}

function ReadShowControllerFunction($state, $stateParams, ReadFactory) {
  this.read = ReadFactory.get({title: $stateParams.title})
  this.update = function () {
    this.read.$update({title: $stateParams.title})
  }
  this.destroy = function () {
    this.read.$delete({title: $stateParams.title}).then(funciton() {
      $state.go("index")
    })
  }
}
