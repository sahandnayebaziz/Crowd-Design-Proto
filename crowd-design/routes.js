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