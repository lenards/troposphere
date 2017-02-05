import errorMessages from "./errorMessages.js";
import { applyInstanceAction } from "./functions.js";


/**
 * Defines the "suspend" action to apply to a collection of instances
 *
 * We expect `params` to be an object with an `instances`
 * property providing access to the colleciton of instances
 */
const suspend = (params) => {
    let instanceSuspend = applyInstanceAction(
        "suspend",
        {
            status_raw: "active - suspending",
            status: "active",
            activity: "suspending"
        },
        errorMessages.suspendFailed
    );

    instanceSuspend(params);
}

export default { suspend };
