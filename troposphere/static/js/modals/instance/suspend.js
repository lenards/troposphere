import ModalHelpers from "components/modals/ModalHelpers";
import InstanceSuspendModal from "components/modals/instance/InstanceSuspendModal";

import actions from "actions";


export default {
    /**
     * Suspend any valid/actionable resources
     *
     * @param resources - collection of resources to act on
     */
    suspend: function(resources) {
        let props = { resources };
        // TODO
        // - use typeof on `instance` to see if "wrapping" in Collection needed
        // - pass in `props` instead of null to include in Modal ...
        // - pass a Backbone.Collection to actions
        ModalHelpers.renderModal(InstanceSuspendModal, props, function() {
            actions.InstanceActions.suspend({ resources });
        });
    }
};
