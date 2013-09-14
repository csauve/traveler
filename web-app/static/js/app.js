App = Ember.Application.create();

App.Router.reopen({
	location: "history"
});

App.Router.map(function() {
	//this.route("latest", {path: "/"});
    this.resource("about");
    this.route("notFound", {path: "/*path"});
});