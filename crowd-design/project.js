if (Meteor.isClient) {
  Template.decisionsList.helpers({
    decisions: function () {
      
      // find decisions whose projectId == this project's id
      // sort alphabetically
      return Decisions.find({projectId: this._id}, {sort: {createdAt: 1}}); 
    }
  })

  Template.decisionsList.events({
    "submit .new-decision": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      
      // Get value from form element
      var text = event.target.text.value;
      
      // if name is not empty
      if (event.target.text.value != "") {
        
        // Insert a task into the collection
        Decisions.insert({
          name: text,
          createdAt: new Date(),
          projectId: this._id // this refers to the current project
        });
      }
      
      showShadow();

      // Clear form
      event.target.text.value = "";
    },
    "click .delete": function () {
      Decisions.remove(this._id);
    }
  });
}