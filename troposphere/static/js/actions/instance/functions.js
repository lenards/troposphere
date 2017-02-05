import InstanceConstants from "constants/InstanceConstants";
import Instance from "models/Instance";
import InstanceState from "models/InstanceState";
import InstanceActionRequest from "models/InstanceActionRequest";

import Utils from "../Utils";

// we define a "function" constructor that will create a closure for an actionName
// and the closure will take one argument, the instance

/**
 * Creates an instance action `function` to carry out `actionName`
 *
 *
 */
const instanceActionImpl = (actionName, desiredState, errorMsg, delayOptions) => {
    delayOptions = delayOptions || { delay: 25*1000 };

    return function(instance) {
        let instanceState = new InstanceState(desiredState),
        originalState = instance.get("state"),
        actionRequest = new InstanceActionRequest({
            instance: instance
        });

        instance.set({
            state: instanceState
        });

        Utils.dispatch(InstanceConstants.UPDATE_INSTANCE, {
            instance: instance
        });

        actionRequest.save(null, {
            attrs: {
                action: actionName
            }
        }).done(function() {
            instance.set({
                state: instanceState
            });
        }).fail(function(response) {
            instance.set({
                state: originalState
            });
            Utils.displayError({
                title: errorMsg,
                response: response
            });
        }).always(function() {
            Utils.dispatch(InstanceConstants.UPDATE_INSTANCE, {
                instance: instance
            });
            Utils.dispatch(InstanceConstants.POLL_INSTANCE_WITH_DELAY, {
                instance: instance,
                delay: delayOptions.delay,
            });
        });
    }
}


/**
 * Applies the created instance action to all instances passed via `params`
 *
 */
const applyInstanceAction = (actionName, desiredState, errorMsg, delayOptions) => {
    let instanceAction = instanceActionImpl(
        actionName,
        desiredState,
        errorMsg,
        delayOptions);

    return function(params) {
        if (!params.instances)
            throw new Error("Missing instances parameter");

        let { instances } = params;

        instances.map(instanceAction)
    }
}

export { applyInstanceAction };
