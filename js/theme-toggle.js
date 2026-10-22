// Theme switcher (light / system / dark). setTheme() comes from _astro/themeRuntime.
const THEMES = ["light", "dark", "system"];

let theme = localStorage.getItem("theme");
if (!THEMES.includes(theme)) theme = "system";
document.querySelector(`#theme-${theme}`).checked = true;

document.getElementById("theme-toggle").addEventListener("change", (e) => {
  const { name, value } = e.target;
  if (name === "theme" && THEMES.includes(value)) {
    globalThis.setTheme(value);
  }
});
