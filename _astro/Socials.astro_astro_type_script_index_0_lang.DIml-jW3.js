import { g as t } from "./themeRuntime.DQB7__aq.js";
const e = document.querySelector("#discord-widget"),
  d = () => {
    e.contentWindow.postMessage({ command: "setTheme", theme: t() }, "*");
  };
t() === "dark" && (e.src = e.src.replace("theme=light", "theme=dark"));
document.addEventListener("themechange", d);
