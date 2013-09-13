App = Ember.Application.create();

App.Router.reopen({
	location: "history"
});

App.Router.map(function() {
    this.resource("about");
    this.route("notFound", {path: "/*path"});
});