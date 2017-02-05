import errorMessages from "./errorMessages.js";
import { applyInstanceAction } from "./functions.js";


/**
 * Defines the "stop" action for a collection of instances
 *
 * We expect `params` to be an object with an `instances`
 * property providing access to the colleciton of instances
 */
const stop = (params) => {
    let instanceStop = applyInstanceAction(
        "stop",
        {
            status_raw: "active - powering-off",
            status: "active",
            activity: "powering-off"
        },
        errorMessages.stopFailed
    );

    instanceStop(params);
}

export { stop };
