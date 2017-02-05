import errorMessages from "./errorMessages.js";
import { applyInstanceAction } from "./functions.js";


/**
 * Defines the "start" action for a collection of instances
 *
 * We expect `params` to be an object with an `instances`
 * property providing access to the colleciton of instances
 */

const start = (params) => {
    let instanceStart = applyInstanceAction(
        "start",
        {
            status_raw: "shutoff - powering-on",
            status: "shutoff",
            activity: "powering-on"
        },
        errorMessages.startFailed
    );

    instanceStart(params);
}

export default { start };
