// Client code
if (Meteor.isClient) {
  Template.home.helpers({
    projects: function () {
      return Projects.find({}, {sort: {createdAt: -1}});
    }
  })

  Template.home.events({
    "submit .new-project": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Projects.insert({
        name: text,
        createdAt: new Date()
      });

      // Clear form
      event.target.text.value = "";
    }
  });
  
  Template.projectLink.events({
    "click .delete": function () {
      Projects.remove(this._id);
    }
  });
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}


// Server code
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}