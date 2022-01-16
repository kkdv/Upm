import mixpanel from "mixpanel-browser";

export function pa(fn) {
    console.log("app_env=" + process.env.REACT_APP_ENV);
    if (process.env.REACT_APP_ENV.trim() === "DEV") {
        mixpanel.init(process.env.REACT_APP_MIXPANEL_DEV_TOKEN, {
            debug: true
        });
        console.log("app_token=" + process.env.REACT_APP_MIXPANEL_DEV_TOKEN);
    } else {
        // Prod
        mixpanel.init(process.env.REACT_APP_MIXPANEL_PRD_TOKEN, {
            debug: true
        });
        console.log("app_token=" + process.env.REACT_APP_MIXPANEL_PRD_TOKEN);
    }
    mixpanel.track(fn);
}