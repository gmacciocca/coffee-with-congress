import ReactDOM from "react-dom";
import routes from "./routes";
import { createApp } from "./ApplicationCreation";

createApp()
.then(() => {
    ReactDOM.render(routes, document.getElementById("mainElement"));
});
