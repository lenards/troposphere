import errorMessages from "./errorMessages.js";
import { applyInstanceAction } from "./functions.js";


/**
 * Defines the "stop" action for a collection of instances
 *
 * We expect `params` to be an object with an `instances`
 * property providing access to the colleciton of instances
 */
const resume = (params) => {
    let instanceResume = applyInstanceAction(
        "resume",
        {
            status_raw: "suspended - resuming",
            status: "active",
            activity: "resuming"
        },
        errorMessages.resumeFailed
    );

    instanceResume(params);
}

export default { resume };
