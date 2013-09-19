var app = angular.module("traveler", []).config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    //.when("/", {controller: HomeCtrl, templateUrl: "/static/html/home.html"})
    .when("/", {templateUrl: "/static/html/home.html"})
    .when("/about", {templateUrl: "/static/html/about.html"})
    .when("/links", {templateUrl: "/static/html/links.html"})
    // .when("/roundup", {controller: "RoundupCtrl", templateUrl: "/static/html/roundup.html"})
    // .when("/archive", {controller: "ArchiveCtrl", templateUrl: "/static/html/archive.html"})
    // .when("/tags", {controller: "TagsCtrl", templateUrl: "/static/html/tags.html"})
    // .when("/subscribe", {controller: "SubscribeCtrl", templateUrl: "/static/html/subscribe.html"})
    // .when("submit", controller: "SubmitCtrl", templateUrl: "/static/html/submit.html")
    .when("/feeds", {controller: "FeedsCtrl", templateUrl: "/static/html/feeds.html"})
    .otherwise({controller: "NotFoundCtrl", templateUrl: "/static/html/notfound.html"});
});

app.run(function($rootScope, $location) {
    $rootScope.location = $location;
});

function FeedsCtrl($scope) {
    $.get("/api/feeds", function(response) {
        $scope.$apply(function() {
            $scope.feeds = response;
        });
    });
}

function NotFoundCtrl($scope) {
    //todo: use fuzzy search on slugs with url
    $.get("/api/posts", function(response) {
        $scope.$apply(function() {
            $scope.results = [];
        });
    });
}
