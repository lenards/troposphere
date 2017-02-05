import ModalHelpers from "components/modals/ModalHelpers";
import InstanceSuspendModal from "components/modals/instance/InstanceSuspendModal";

import actions from "actions";


export default {
    /**
     * Suspend any valid/actionable instances
     *
     * These instances as passed to the modal as `props` so that they
     * can be optional displayed for clarity.
     *
     * @param instances - collection of instances to act on
     */
    suspend: function(instances) {
        let props = { instances };

        ModalHelpers.renderModal(InstanceSuspendModal, props, function() {
            actions.InstanceActions.suspend({ instances });
        });
    }
};
