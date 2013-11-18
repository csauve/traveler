var app = angular.module("traveler", []);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    //.when("/", {controller: HomeCtrl, templateUrl: "/static/html/home.html"})
    .when("/", {templateUrl: "/static/html/home.html"})
    .when("/about", {templateUrl: "/static/html/about.html"})
    .when("/links", {controller: "LinksCtrl", templateUrl: "/static/html/links.html"})
    .when("/links/edit", {controller: "EditLinkCtrl", templateUrl: "/static/html/editlink.html"})
    .when("/links/edit/:id", {controller: "EditLinkCtrl", templateUrl: "/static/html/editlink.html"})
    // .when("/roundup", {controller: "RoundupCtrl", templateUrl: "/static/html/roundup.html"})
    // .when("/archive", {controller: "ArchiveCtrl", templateUrl: "/static/html/archive.html"})
    // .when("/tags", {controller: "TagsCtrl", templateUrl: "/static/html/tags.html"})
    // .when("/subscribe", {controller: "SubscribeCtrl", templateUrl: "/static/html/subscribe.html"})
    .when("/submit", {controller: "SubmitCtrl", templateUrl: "/static/html/submit.html"})
    .when("/feeds", {controller: "FeedsCtrl", templateUrl: "/static/html/feeds.html"})
    .when("/feeds/edit", {controller: "EditFeedCtrl", templateUrl: "/static/html/editfeed.html"})
    .when("/feeds/edit/:id", {controller: "EditFeedCtrl", templateUrl: "/static/html/editfeed.html"})
    .otherwise({controller: "NotFoundCtrl", templateUrl: "/static/html/notfound.html"});
});

app.run(function($rootScope, $location) {
    $rootScope.location = $location;
});

app.directive("unique", function() {
    return {
        require: "ngModel",
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function() {
                if (ctrl.$viewValue && ctrl.$viewValue.length > 0) {
                    $.post(encodeURI(attrs.unique),
                        function (results) {
                            ctrl.$setValidity("unique", results.length == 0);
                        }
                    );
                }
            });
        }
    };
});

function SubmitCtrl($scope) {
    var converter = new Showdown.converter();
    $scope.postModel = {};

    $scope.preview = function() {
        return $scope.postModel.descriptionMd ? converter.makeHtml($scope.postModel.descriptionMd) : "";
    };

    $scope.submitPost = function() {
        $scope.postModel.datePosted = new Date();
        $.ajax({
            type: "POST",
            url: "/api/posts",
            contentType: "application/json",
            data: JSON.stringify($scope.postModel),
            success: function(response) {
                $scope.$apply(function() {
                    $scope.postModel = {};
                });
            },
            error: function(response) {
                console.log(response); //todo: show user an error happened
            }
        });
    };
}

function EditFeedCtrl($scope, $routeParams, $location) {
    $scope.deleteFeed = function() {
        $.ajax({
            type: "DELETE",
            url: "/api/feeds/" + $scope.editModel._id,
            success: function(response) {
                $scope.$apply(function() {
                    $location.path("/feeds");
                });
            }
        });
    };

    $scope.submitEditFeed = function() {
        //if editing an existing link
        if ($scope.editModel._id) {
            $.ajax({
                type: "PUT",
                url: "/api/feeds/" + $scope.editModel._id,
                contentType: "application/json",
                data: JSON.stringify($scope.editModel),
                success: function(response) {
                    $scope.$apply(function() {
                        $location.path("/feeds");
                    });
                }
            });
        } else { //otherwise, creating a new link
            $.post("/api/feeds", $scope.editModel, function(response) {
                $scope.$apply(function() {
                    $location.path("/feeds");
                });
            });
        }
    };

    $scope.editModel = {
        defaultDigest: true,
        defaultPublished: true
    };

    if ($routeParams.id) {
        console.log($routeParams.id);
        $.get("/api/feeds/" + $routeParams.id, function(response) {
            $scope.$apply(function() {
                $scope.editModel = response;
            });
        });
    }
}

function FeedsCtrl($scope) {
    $.get("/api/feeds", function(response) {
        $scope.$apply(function() {
            $scope.feeds = response;
        });
    });
}

function EditLinkCtrl($scope, $routeParams, $location) {
    $scope.deleteLink = function() {
        $.ajax({
            type: "DELETE",
            url: "/api/links/" + $scope.editModel._id,
            success: function(response) {
                $scope.$apply(function() {
                    $location.path("/links");
                });
            }
        });
    };

    $scope.submitEditLink = function() {
        //if editing an existing link
        if ($scope.editModel._id) {
            $.ajax({
                type: "PUT",
                url: "/api/links/" + $scope.editModel._id,
                contentType: "application/json",
                data: JSON.stringify($scope.editModel),
                success: function(response) {
                    $scope.$apply(function() {
                        $location.path("/links");
                    });
                }
            });
        } else { //otherwise, creating a new link
            $.post("/api/links", $scope.editModel, function(response) {
                $scope.$apply(function() {
                    $location.path("/links");
                });
            });
        }
    };

    $scope.editModel = {};
    if ($routeParams.id) {
        console.log($routeParams.id);
        $.get("/api/links/" + $routeParams.id, function(response) {
            $scope.$apply(function() {
                $scope.editModel = response;
            });
        });
    }
}

function LinksCtrl($scope) {
    $.get("/api/links", function(response) {
        $scope.$apply(function() {
            $scope.categories = response;
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
