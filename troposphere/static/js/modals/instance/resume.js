import ModalHelpers from "components/modals/ModalHelpers";
import InstanceResumeModal from "components/modals/instance/InstanceResumeModal";

import actions from "actions";


export default {
    /**
     * Resume any valid/actionable instances
     *
     * @param instances - collection of instances to act on
     */
    resume: function(instances) {
        let props = { instances };

        ModalHelpers.renderModal(InstanceResumeModal, props, function() {
            actions.InstanceActions.resume({ instances });
        });
    }
};
