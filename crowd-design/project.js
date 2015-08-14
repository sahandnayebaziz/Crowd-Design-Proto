if (Meteor.isClient) {

  var canvas;

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

  var timeoutId;
  
  Template.decisionBox.events({
    "click .decisionName": function (event) {
      $(event.target).parent().siblings().slideToggle();
    },
    "click .decisionBox": function (event) {
      $(event.target).siblings().slideToggle();
    },
    "input .rationaleBox": function (event) {
      var text = event.target.value;
      Decisions.update(this._id, {$set: {rationale: text}});
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        var feedbackMessage = $($(event.target).parents(".rationale").children(".rationaleMessage")[0])
        feedbackMessage.addClass('animated fadeIn');
        setTimeout(function () {
          feedbackMessage.removeClass('fadeIn');
          feedbackMessage.addClass('fadeOut');
        }, 1500);
        setTimeout(function () {
          feedbackMessage.removeClass('fadeOut');
        }, 3000);
      }, 1000)
    },
    "change .categorySelect": function (event) {
      var selectedCategory = event.target.value;
      Decisions.update(this._id, {$set: {category: selectedCategory}}, function () {
        console.log("updated category");
      });
    },
    "click .thumb1": function (event) { // TODO: get rid of the repeated function below, add an html-data att to mark with thumb to save it in
      canvas.backgroundColor = "#E3E3E3";
      var url =  canvas.toDataURL({format: 'jpeg', quality: 0.3})
      canvas.backgroundColor = null;
      canvas.setBackgroundColor(null, canvas.renderAll.bind(canvas));
      Decisions.update(this._id, {$set: {thumb1: url}}, function () {
        event.target.setAttribute("src", url);
        console.log(event.target);
      });
    },
    "click .thumb2": function (event) {
      canvas.backgroundColor = "#E3E3E3";
      var url =  canvas.toDataURL({format: 'jpeg', quality: 0.3})
      canvas.backgroundColor = null;
      canvas.setBackgroundColor(null, canvas.renderAll.bind(canvas));
      Decisions.update(this._id, {$set: {thumb2: url}}, function () {
        event.target.setAttribute("src", url);
        console.log(event.target);
      });
    }
  });

  Template.decisionBox.helpers({
    isSelected: function(cat) {
      console.log(cat);
      return (cat === this.category);
    }
  });

  Template.freeformSketch.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;

      // MARK: Create Canvas and add hooks
      canvas = new fabric.Canvas('practiceSketch');
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 6
      canvas.freeDrawingBrush.color = "white"

      var canvasStateStack = [];
      var canvasRedoStack = [];

      function saveState() {
        console.log("saved state");

        if (canvasStateStack.length == 30) {
          canvasStateStack.shift();
        }
        if (canvasRedoStack.length != 0) {
          canvasRedoStack = [];
        }
        canvasStateStack.push(JSON.stringify(canvas));
      }

      saveState();
      var recordingStates = true;

      canvas.on('object:added', function (e) {
        if (recordingStates) {
          saveState();
        }
      })

      canvas.on('object:modified', function (e) {
        if (recordingStates) {
          saveState();
        }
      })

      canvas.on('object:removed', function (e) {
        if (recordingStates) {
          saveState();
        }
      })

      // selecting colors
      $(".colorSelector").click(function () {
        $("img.selectedTool").removeClass("selectedTool");
        $(this).addClass("selectedTool");
        canvas.freeDrawingBrush.color = this.getAttribute("data-color");
        disableEraser();
      });

      // selecting the eraser
      $(".eraserTool").click(function () {
        $("img.selectedTool").removeClass("selectedTool");
        $(this).addClass("selectedTool");
        enableEraser();
      })

      function disableEraser() {
        canvas.off("mouse:down");
        canvas.isDrawingMode = true;
      }

      function enableEraser() {
        canvas.isDrawingMode = false;
        canvas.on("mouse:down", function (e) {
          if (canvas.getActiveGroup()) {
            recordingStates = false;
            canvas.getActiveGroup().forEachObject(function (a) {
              canvas.remove(a);
            });
            canvas.discardActiveGroup();
            recordingStates = true;
          } else {
            canvas.remove(canvas.getActiveObject());
          }
          canvas.renderAll();
        });
      }

      $(".undoSelector").click(function () {
        if (canvasStateStack.length > 1) {
          recordingStates = false;
          var currentState = canvasStateStack.pop();
          canvasRedoStack.push(currentState);

          var stateToReturnTo = canvasStateStack[canvasStateStack.length - 1];
          canvas.loadFromJSON(stateToReturnTo);
          canvas.renderAll();
          recordingStates = true;
        }
      });

      $(".redoSelector").click(function () {
        if (canvasRedoStack.length > 0) {
          recordingStates = false;
          var stateToReturnTo = canvasRedoStack.pop();
          canvasStateStack.push(stateToReturnTo);
          canvas.loadFromJSON(stateToReturnTo);
          canvas.renderAll();
          recordingStates = true;
        }
      });

      $(".clearSelector").click(function () {
        if (canvas.getObjects().length > 0) {
          canvas.clear().renderAll();
          saveState();
        }
      })

      function showShadow() {
        $(".decisionShadow").isHidden = false;
      }
    }
  }
}
