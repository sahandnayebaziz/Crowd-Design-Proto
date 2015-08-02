if (Meteor.isClient) {
  Template.decisionsList.helpers({
    decisions: function () {
      return Decisions.find({}, {sort: {createdAt: -1}});
    }
  })

  Template.decisionsList.events({
    "submit .new-decision": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      
      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Decisions.insert({
        name: text,
        createdAt: new Date()
      });

      // Clear form
      event.target.text.value = "";
    },
    "click .delete": function () {
      Decisions.remove(this._id);
    }
  });
}