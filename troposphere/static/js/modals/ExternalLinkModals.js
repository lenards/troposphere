define(function (require) {

  return {
    create: require('./link/create').create,
    createAndAddToProject: require('./link/createAndAddToProject').createAndAddToProject
  };

});
