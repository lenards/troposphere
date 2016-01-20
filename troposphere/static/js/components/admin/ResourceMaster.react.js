define(function (require) {
  "use strict";

  var React = require('react/addons'),
    Router = require('react-router'),
    OtherRouter = require('../../Router'),
    stores = require('stores'),
    ResourceRequest = require('./ResourceRequest.react'),
    RouteHandler = Router.RouteHandler;

  return React.createClass({

    mixins: [Router.State],

    getInitialState: function(){
      return{
        statusTypes: null,
        requests: null
      }
    },

    componentDidMount: function(){
      var statusCallback = function(response){
        this.setState({statusTypes: response.models});
      }.bind(this);
      var requestsCallBack = function(response){
        this.setState({requests: response.models});
      }.bind(this);
      stores.StatusStore.getAllWithCallBack(statusCallback);
      stores.ResourceRequestStore.getAllWithCallBack(requestsCallBack);
    }, 

    onResourceClick: function(request){
      OtherRouter.getInstance().transitionTo("resource-request-detail", {request: request, id: request.id});
    },

    render: function () {
      // var requests = stores.ResourceRequestStore.fetchWhere({
      //     'status__name': 'pending'
      //   });//,
        //statuses = stores.StatusStore.getAll();
      if (!this.state.requests || !this.state.statusTypes) return <div className="loading"></div>;

      var resourceRequests = this.state.requests.map(function (request) {
        var doThing = function(){
          this.onResourceClick(request);
        }.bind(this);

        return (
          <li onClick={doThing}>
            {request.get('request')}
          </li>
        );
      }.bind(this));

      if (!resourceRequests[0]) {
        return  (
          <div>
            <h3>No resource requests</h3>
          </div>
        );
      }

      return (
        <div className="resource-master">
          <h3>Resource Requests</h3>
          <ul className="requests-list pull-left">
            {resourceRequests}
          </ul>
          <RouteHandler /> 
        </div>
      );
    }

  });

});
