import React from "react";
import Backbone from "backbone";
import stores from "stores";
import context from "context";
import moment from "moment";

const HistoryRow = React.createClass({
    displayName: "HistoryRow",

    propTypes: {
       historyItem: React.PropTypes.instanceOf(Backbone.Model).isRequired
    },

    renderFormattedExtraLines(isStaff, extra) {
        let formattedExtra = "";
        let formattedExtraLines = [];
        let show_traceback = (isStaffUser || context.hasEmulatedSession());

        if(extra && 'display_error' in extra) {
            formattedExtra = extra['display_error'];
            if('traceback' in extra && show_traceback) {
                formattedExtra = formattedExtra + "\\n" + extra['traceback']
                formattedExtraLines = formattedExtra.split('\\n');
            }
        }
        return formattedExtraLines.map(
            (strng, idx) => (<p key={idx}>{strng}</p>)
        );
    },

    render() {
        let { historyItem } = this.props;

        let profile = stores.ProfileStore.get();
        let isStaffUser = (profile) ? profile.get("is_staff") : false;
        let extra = historyItem.get('extra'),
            formattedStartDate = moment(historyItem.get("start_date")).format("MMMM Do YYYY, h:mm a"),
            formattedEndDate = "Present";

        if (historyItem.get("end_date") && historyItem.get("end_date").isValid()) {
            formattedEndDate = moment(historyItem.get("end_date")).format("MMMM Do YYYY, h:mm a");
        }

        return (
            <tr key={historyItem.cid}>
                <td>{historyItem.get("status")}</td>
                <td>{formattedStartDate}</td>
                <td>{formattedEndDate}</td>
                <td>
                    {this.renderFormattedExtraLines(isStaffUser, extra)}
                </td>
            </tr>
        );

    }
});


const InstanceHistorySection = React.createClass({
    displayName: "InstanceHistorySection",

    propTypes: {
        instance: React.PropTypes.instanceOf(Backbone.Model).isRequired
    },

    getInitialState: function() {
        return {
            instanceHistory: stores.InstanceHistoryStore.fetchWhere({
                "instance": this.props.instance.id
            }),
            refreshing: false
        }
    },

    componentDidMount: function() {
        stores.InstanceHistoryStore.addChangeListener(this.onNewData);
        stores.InstanceStore.addChangeListener(this.onNewData);
        stores.InstanceHistoryStore.addChangeListener(this.requestListener);
    },

    componentWillUnmount: function() {
        stores.InstanceHistoryStore.removeChangeListener(this.onNewData);
        stores.InstanceStore.removeChangeListener(this.onNewData);
        stores.InstanceHistoryStore.removeChangeListener(this.requestListener);
    },

    requestListener() {
        this.setState({
            refreshing: false
        });
    },

    onNewData: function() {
        this.setState({
            instanceHistory: stores.InstanceHistoryStore.fetchWhere({
                "instance": this.props.instance.id
            })
        });
    },

    onRefresh() {
        stores.InstanceHistoryStore.clearCache();
        let instanceHistory = stores.InstanceHistoryStore.fetchWhere({
            "instance": this.props.instance.id
        })
        this.setState({
            refreshing: true,
            instanceHistory
        });

    },

    style() {
        return {
            refreshIcon: {
                float: "right",
                color: "lightgrey"
            },
        }
    },

    renderRefreshButton() {
        let { refreshing } = this.state;
        let { refreshIcon } = this.style();
        let controlsClass = "glyphicon glyphicon-refresh";

        if (refreshing) {
            controlsClass += " refreshing"
            refreshIcon.color = "inherit";
        }

        return (
        <span className={controlsClass} style={refreshIcon} onClick={this.onRefresh} />
        );
    },

    renderHistoryRow(historyItem) {
        return (
            <HistoryRow historyItem={historyItem} />
        );
    },

    renderHistoryTable() {
        let { instanceHistory } = this.state,
            tableContent;

        if (!instanceHistory) {
            if (stores.InstanceHistoryStore.isFetching) {
                tableContent = (
                    <div className="loading" />
                );
            } else {
                tableContent = (
                    <div>
                        {"Error loading instance history. Please try again later."}
                    </div>
                );
            }
        } else {
            tableContent = (
                <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "100px"}}>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instanceHistory.map(this.renderHistoryRow) }
                    </tbody>
                </table>
            );
        }
        return tableContent;
    },

    render: function() {
        return (
        <div className="resource-details-section section">
            <h4 className="t-title">Instance Status History {this.renderRefreshButton()}</h4>
            {this.renderHistoryTable()}
        </div>
        );
    }

});

export default InstanceHistorySection;
