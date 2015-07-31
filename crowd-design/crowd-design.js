Projects = new Mongo.Collection("projects");

if (Meteor.isClient) {
  Template.body.helpers({
    projects: function () {
      return Projects.find({}, {sort: {createdAt: -1}});
    }
  })

  Template.body.events({
    "submit .new-project": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Projects.insert({
        name: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";
    }
  });
  
  Template.project.events({
    "click .delete": function () {
      Projects.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}