if (Meteor.isClient) {
  Template.morphologicalChart.helpers({
    decisions: function () {
      
      // find decisions whose projectId == this project's id
      // sort alphabetically
      return Decisions.find({projectId: this._id}, {sort: {name: 1}}); 
    }
  });

  Template.decisionRow.events({
    "click .new-solution": function (event) {
      Solutions.insert({
          name: "untitled",
          createdAt: new Date(),
          decisionId: this._id // this refers to the current project
        });
    }
  });
  
  Template.decisionRow.helpers({
    solutions: function () {
      return Solutions.find({decisionId: this._id}, {sort: {createdAt: 1}});
    }
  });
  
  Template.solutionPreview.events({
    "click .delete": function (event) {
      Solutions.remove(this._id);
    }
  })
}