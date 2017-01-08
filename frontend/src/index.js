import "./polyfills";
import ReactDOM from "react-dom";
import routes from "./routes";
import injectTapEventPlugin from "react-tap-event-plugin";
import { createApp } from "./ApplicationCreation";

injectTapEventPlugin();

createApp()
.then(() => {
    ReactDOM.render(routes, document.getElementById("mainElement"));
});
