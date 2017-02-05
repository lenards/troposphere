import ModalHelpers from "components/modals/ModalHelpers";
import InstanceStopModal from "components/modals/instance/InstanceStopModal";

import actions from "actions";


export default {
    /**
     * Stop any valid/actionable instances
     *
     * @param instances - collection of instances to act on
     */
    stop: function(instances) {
        let props = { instances };

        ModalHelpers.renderModal(InstanceStopModal, props, function() {
            actions.InstanceActions.stop({ instances });
        })
    }
};
