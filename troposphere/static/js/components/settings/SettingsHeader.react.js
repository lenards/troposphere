/** @jsx React.DOM */

define(
  [
    'react',
    'backbone'
  ],
  function (React, Backbone) {

    return React.createClass({

      propTypes: {},

      render: function () {
        return (
          <div className="secondary-nav half-height">
            <div className="container">
              <div className="project-name">
                <h1>Settings</h1>
              </div>
            </div>
          </div>
        );
      }

    });

  });
