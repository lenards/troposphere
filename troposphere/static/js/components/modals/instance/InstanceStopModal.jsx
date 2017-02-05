import React from "react";

import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import Glyphicon from "components/common/Glyphicon";


export default React.createClass({
    displayName: "InstanceStopModal",

    mixins: [BootstrapModalMixin],

    //
    // Internal Modal Callbacks
    // ------------------------
    //

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        this.hide();
        this.props.onConfirm();
    },

    //
    // Render
    // ------
    //

    renderInstance(instance) {
        return (
        <li key={instance.get("uuid")}>
            <strong>
                {`${instance.get("name")}`}
            </strong>
            <ul>
                <li style={{listStyleType: "square"}}>
                    {`IP Address: ${instance.get("ip_address")}`}
                </li>
            </ul>
        </li>
        );
    },

    renderBody: function(instances) {
        let instanceList = (<div>No instances to act on</div>),
            operativeNoun,
            questionBlock;

        if (instances) {
            if (instances.length > 0) {
                instanceList = (
                    <div>
                        <ul>
                            {instances.map(this.renderInstance)}
                        </ul>
                    </div>
                );
            }

            operativeNoun = instances.length > 1 ? "these instances" : "this instance";
            questionBlock = (
            <p>
                {`Would you like to stop ${operativeNoun}?`}
            </p>
            );
        }

        return (
        <div>
            <p className="alert alert-info">
                <Glyphicon name="info-sign" />
                {' '}
                <strong>NOTE:</strong>
                {' \"Stopping\" will NOT affect your resource usage. To preserve resources and time allocation, you must suspend instances.'}
            </p>
            {instanceList}
            {questionBlock}
        </div>
        );
    },

    render: function() {
        let { instances } = this.props,
            multi = instances && instances.length > 1,
            noInstances = !instances || (instances && instances.length == 0),
            titleNoun = multi ? "Instances" : "Instance",
            buttonText = multi ? "these instances" : "this instance",
            actionButton;

        if (!noInstances) {
            actionButton = (
            <button type="button"
                    className="btn btn-primary"
                    onClick={this.confirm}>
                {`Yes, stop ${buttonText}`}
            </button>
            );
        }

        return (
        <div className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {this.renderCloseButton()}
                        <h1 className="t-title">{`Stop ${titleNoun}`}</h1>
                    </div>
                    <div className="modal-body">
                        {this.renderBody(instances)}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.cancel}>
                            Cancel
                        </button>
                        {actionButton}
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
