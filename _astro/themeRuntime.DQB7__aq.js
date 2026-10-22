window.setImmediate ??= (e) => setTimeout(e, 0);
function o() {
  let e = localStorage.getItem("theme");
  return (
    (!e || !["light", "dark"].includes(e)) &&
      (e = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
    e
  );
}
function t(e) {
  (e === "system" ? localStorage.removeItem("theme") : localStorage.setItem("theme", e),
    document.dispatchEvent(new Event("themechange")),
    console.log("Switched theme to", e));
}
globalThis.setTheme = t;
export { o as g };
