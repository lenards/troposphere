// a module of error message text

/**
 * If the approach of extracted "messages" for errors is more widely
 * adopted, this module may need to move into a _messages_ directory
 * structure.
 *
 * For now, this is a proof-of-concept in pulling text out of action
 * methods.
 */

// TODO - need to research if "template" style text is helpful or
// harmful to the process of internationalization (i18n) and
// localization (l10n).
const instanceTemplate = (action) => { `Your instance could not be ${action}` };

export default {
    stopFailed: instanceTemplate("stopped"),
    suspendFailed: instanceTemplate("suspended"),
    resumeFailed: instanceTemplate("resumed"),
    startFailed: instanceTemplate("started")
}
