import ModalHelpers from "components/modals/ModalHelpers";
import InstanceStartModal from "components/modals/instance/InstanceStartModal";

import actions from "actions";


export default {
    /**
     * Start any valid/actionable instances
     *
     * @param instances - collection of instances to act on
     */
    start: function(instances) {
        let props = { instances };

        ModalHelpers.renderModal(InstanceStartModal, props, function() {
            actions.InstanceActions.start({ instances })
        });
    }

};
