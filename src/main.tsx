import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

function render(): void {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
  );
}

render();
