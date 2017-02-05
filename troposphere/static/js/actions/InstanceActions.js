// Delegated definitions of Instance Actions
import IReboot from "./instance/reboot";
import IRedeploy from "./instance/redeploy";
import IPoll from "./instance/poll";
import ILaunch from "./instance/launch";
import IDestroy from "./instance/destroy";
import IUpdate from "./instance/update";
import IReport from "./instance/report";
import IRequest from "./instance/requestImage";

// Marked for re-working with common `instanceActionImpl`
import { resume } from "./instance/resume";
import { suspend } from "./instance/suspend";
import { stop } from "./instance/stop";
import { start } from "./instance/start";


export default {
    resume,
    suspend,
    stop,
    start,
    reboot: IReboot.reboot,
    redeploy: IRedeploy.redeploy,
    poll: IPoll.poll,
    launch: ILaunch.launch,
    createProjectAndLaunchInstance: ILaunch.createProjectAndLaunchInstance,
    destroy: IDestroy.destroy,
    update: IUpdate.update,
    report: IReport.report,
    requestImage: IRequest.requestImage
};
