var app = angular.module("traveler", []).config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    //.when("/", {controller: HomeCtrl, templateUrl: "/static/html/home.html"})
    .when("/", {templateUrl: "/static/html/home.html"})
    .when("/about", {templateUrl: "/static/html/about.html"})
    .when("/links", {controller: "LinksCtrl", templateUrl: "/static/html/links.html"})
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

function LinksCtrl($scope) {
    //form backer for edit modal
    $scope.editModel = {};
    //serves as reference to original link when editing
    $scope.linkBeingEdited = null;

    $scope.editLink = function(link) {
        $scope.linkBeingEdited = link;
        $scope.editModel = {};
        $scope.editModel = angular.copy(link);
        $("#editLinkModal").modal("show");
    }

    $scope.newLink = function() {
        $scope.linkBeingEdited = null;
        $scope.editModel = {};
        $("#editLinkModal").modal("show");
    };

    $scope.deleteLink = function() {
        $.ajax({
            type: "DELETE",
            url: "/api/links/" + $scope.editModel._id,
            success: function(response) {
                $("#editLinkModal").modal("hide");
                loadLinks();
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
                    $("#editLinkModal").modal("hide");
                    loadLinks();
                }
            });
        } else { //otherwise, creating a new link
            $.post("/api/links", $scope.editModel, function(response) {
                $("#editLinkModal").modal("hide");
                loadLinks();
            });
        }
    };

    function loadLinks() {
        $.get("/api/links", function(response) {
            $scope.$apply(function() {
                $scope.categories = response;
            });
        });
    }

    loadLinks();
}

function NotFoundCtrl($scope) {
    //todo: use fuzzy search on slugs with url
    $.get("/api/posts", function(response) {
        $scope.$apply(function() {
            $scope.results = [];
        });
    });
}
