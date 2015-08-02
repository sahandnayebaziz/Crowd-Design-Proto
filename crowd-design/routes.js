// Routes
Router.route('/', function () {
  this.render('Home');
});

// given a url like "/project/1"
Router.route('/projects/:_id', function () {
  this.render('project', {
    data: function () {
      return Projects.findOne({_id: this.params._id});
    }
  });
});