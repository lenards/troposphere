import React from "react";

import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import Glyphicon from "components/common/Glyphicon";


export default React.createClass({
    displayName: "InstanceStartModal",

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
                    {`Started on: ${instance.get("start_date")}`}
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
                {`Would you like to start ${operativeNoun}?`}
            </p>
            );
        }

        return (
        <div>
            <p className="alert alert-warning">
                <Glyphicon name="warning-sign" />
                {" "}
                <strong>WARNING</strong>
                {' In order to start a stopped instance, you must have sufficient quota and the cloud must have enough room to support your instance\'s size.'}
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
                {`Yes, start ${buttonText}`}
            </button>

            );
        }

        return (
        <div className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {this.renderCloseButton()}
                        <h1 className="t-title">{`Start ${titleNoun}`}</h1>
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
