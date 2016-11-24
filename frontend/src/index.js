import ReactDOM from "react-dom";
import routes from "./routes";
import injectTapEventPlugin from "react-tap-event-plugin";
import { createApp } from "./ApplicationCreation";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

createApp()
.then(() => {
    ReactDOM.render(routes, document.getElementById("mainElement"));
});
