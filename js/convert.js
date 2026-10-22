// Converts an Aliucord theme (.json) into the flat color format and downloads it.
const fileInput = document.getElementById("file");

const SIMPLE_COLOR_KEYS = {
  accent: "simple_accent_color",
  background: "simple_bg_color",
  background_secondary: "simple_bg_secondary_color",
  mention_highlight: "mention_highlight",
};

function forEachEntry(obj, fn) {
  if (obj == null) return;
  for (const key in obj) fn(key, obj[key]);
}

function convert(theme) {
  const out = {};
  forEachEntry(theme.colors, (k, v) => (out["color_" + k] = v));
  forEachEntry(theme.drawable_tints, (k, v) => (out["drawablecolor_" + k] = v));
  forEachEntry(theme.simple_colors, (k, v) => {
    out[SIMPLE_COLOR_KEYS[k] ?? k + "_color"] = v;
  });
  return out;
}

function download(name, data) {
  const blob = new Blob([JSON.stringify(data, null, 4)], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (name.endsWith(".json") ? name.slice(0, -5) : name) + ".converted.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

fileInput.addEventListener("change", () => {
  const file = fileInput.files[fileInput.files.length - 1];
  const reader = new FileReader();
  reader.onload = (e) => download(file.name, convert(JSON.parse(e.target.result)));
  reader.readAsText(file);
});
