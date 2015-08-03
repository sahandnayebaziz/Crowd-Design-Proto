if (Meteor.isClient) {
  Template.solution.helpers({
    decision: function () {
      
      // find decisions whose projectId == this project's id
      // sort alphabetically
      return Decisions.findOne({_id: this.decisionId}); 
    }
  })
  
  Template.solutionMeta.events({
    "submit .solutionMetaName": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      
      // Get value from form element
      var text = event.target.text.value;
      // if name is not empty
      if (event.target.text.value != "") {
        
        // Insert a task into the collection
        Solutions.update(this._id, {$set: {name: text}}, function () {
          event.target.text.value = "";
        });
      }
    },
    "submit .solutionSketchData": function (event) {
      event.preventDefault();
      
      var sketchData = JSON.stringify(canvas);
      
      Solutions.update(this._id, {$set: {sketch: sketchData}}, function () {
        // this is the completion function
        console.log("saved sketch successfully");
      });
    }
  });
}