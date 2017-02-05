import React from "react";

import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import Glyphicon from "components/common/Glyphicon";


export default React.createClass({
    displayName: "InstanceSuspendModal",

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
                {`Would you like to suspend ${operativeNoun}?`}
            </p>
            );
        }

        return (
        <div>
            <p className="alert alert-warning">
                <Glyphicon name="warning-sign" />
                {" "}
                <strong>WARNING</strong>
                {" Suspending an instance will freeze its state, and the " +
                 "IP address may change when you resume the instance."}
            </p>
            <p>
                {'Suspending an instance frees up resources for other users ' +
                 'and allows you to safely preserve the state of your ' +
                 'instance without imaging. '}
                {'Your time allocation no longer counts against you in the ' +
                 ' suspended mode.'}
            </p>
            <p>
                {'Your resource usage charts will only reflect the freed ' +
                 'resources once the instance\'s state is "suspended."'}
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
                {`Yes, suspend ${buttonText}`}
            </button>
            );
        }

        return (
        <div className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {this.renderCloseButton()}
                        <h1 className="t-title">{`Suspend ${titleNoun}`}</h1>
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
