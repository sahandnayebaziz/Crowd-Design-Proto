// this is using iron::router! Look at their documentation it's really helpful. Essentially all that is happening here
// is that I defined some pretty basic routes (URL schemes can be whatever you like without much effort!) and then
// fetch the right object from mongo and pass that to the template as its data context


// Routes
Router.route('/', function () {
  this.render('Home');
});

// given a url like "/projects/1"
Router.route('/projects/:_id', function () {
  this.render('project', {
    data: function () {
      return Projects.findOne({_id: this.params._id});
    }
  });
});

// given a url like "/project/1"
Router.route('/projects/:_id/chart', function () {
  this.render('projectChart', {
    data: function () {
      return Projects.findOne({_id: this.params._id});
    }
  });
});

// given a url like "/solution/1"
Router.route("/solution/:_id", function () {
  this.render('solution', {
    data: function () {
      return Solutions.findOne({_id: this.params._id});
    }
  })
})