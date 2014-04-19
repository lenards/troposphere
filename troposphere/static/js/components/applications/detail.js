define(['react', 'models/application', 'collections/applications',
'components/applications/cards', 'jquery',
'components/common/time', 'modal', 'components/applications/launch_modal'],
function(React, App, AppCollection, Cards, $, Time, Modal,
LaunchModal) {

    var Machine = React.createClass({
        render: function() {
            var machine = this.props.machine;
            console.log(machine);
            return React.DOM.li({}, "Version: ", machine.get('pretty_version'),
                React.DOM.br(),
                "Date: ", Time({date: machine.get('start_date'), showRelative: false}));
        }
    });

    var MachineList = React.createClass({
        render: function() {
            var versions = this.props.machines.map(function(model) {
                return Machine({key: model.id, machine: model});
            });
            return React.DOM.ul({}, versions);
        }
    });

    var ApplicationDetail = React.createClass({
        getInitialState: function() {
            return {application: null};
        },
        componentDidMount: function() {
            var app = new App({id: this.props.applicationId});
            app.fetch({success: function(model) {
                this.setState({application: model});
            }.bind(this)});
        },
        showModal: function(e) {
            Modal.show(LaunchModal({
                application: this.state.application,
                identities: this.props.identities,
                providers: this.props.providers
            }));
        },
        render: function() {
            var app = this.state.application;

            if (!app)
                return React.DOM.div({className: 'loading'});

            return React.DOM.div({id: 'app-detail'},
                React.DOM.h1({}, app.get('name_or_id')),
                Cards.Rating({rating: app.get('rating')}),
                Cards.ApplicationCard({application: app, onLaunch: this.showModal}),
                React.DOM.h2({}, "Description"),
                React.DOM.p({}, app.get('description')),
                React.DOM.h2({}, "Versions of this Image"),
                MachineList({machines: app.get('machines')}))
        }
    });

    return ApplicationDetail;
});
