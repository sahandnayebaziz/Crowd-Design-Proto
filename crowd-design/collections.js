// Each one of these declares a Mongo collection with the given name
// and then also makes the assignment name available globally
//
// As per mongoDB, the actual contents of these collections are determined
// with each [Collection].insert. You'll notice that I laid out most of the data
// similarly to what we had in ASP.net, with each psuedo-nested thing, like a decision,
// carrying the id of it's psuedo-parent, like a project

// Collections
Projects = new Mongo.Collection("projects");
Decisions = new Mongo.Collection("decisions");
Solutions = new Mongo.Collection("solutions");
Sortable.collections = ["decisions"];