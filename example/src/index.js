import "./index.css";

import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const root = createRoot(document.getElementById("root"));

root.render(<React.StrictMode>{<App />}</React.StrictMode>);
