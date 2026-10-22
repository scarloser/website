// Typing animation for the terminal box on the home page.
const lines = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "scarloser" },
  { type: "blank" },
  { type: "cmd", text: "cat about.txt" },
  {
    type: "out",
    text: "self-taught dev. python & discord.py. linux user.\nfreedom & privacy first. building things for fun.",
  },
  { type: "blank" },
  { type: "cmd", text: "ls projects/" },
  { type: "out", text: "website/" },
];

const body = document.getElementById("terminal-body");
const prompt = "visitor@scarloser:~$ ";
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function appendCaret() {
  const caret = document.createElement("span");
  caret.className = "terminal-caret";
  body.appendChild(caret);
}

function renderStatic() {
  const text = lines
    .map((l) => (l.type === "cmd" ? prompt + l.text : l.type === "out" ? l.text : ""))
    .join("\n");
  body.textContent = text + "\n" + prompt;
  appendCaret();
}

let lineIndex = 0;
let charIndex = 0;

function typeNext() {
  if (lineIndex >= lines.length) {
    body.appendChild(document.createTextNode(prompt));
    appendCaret();
    return;
  }

  const line = lines[lineIndex];

  if (line.type === "blank") {
    body.appendChild(document.createTextNode("\n"));
    lineIndex++;
    return setTimeout(typeNext, 120);
  }

  if (line.type === "out") {
    body.appendChild(document.createTextNode(line.text + "\n"));
    lineIndex++;
    return setTimeout(typeNext, 280);
  }

  // command line: type it out character by character
  if (charIndex === 0) body.appendChild(document.createTextNode(prompt));
  if (charIndex < line.text.length) {
    body.appendChild(document.createTextNode(line.text[charIndex]));
    charIndex++;
    return setTimeout(typeNext, 35 + Math.random() * 45);
  }
  body.appendChild(document.createTextNode("\n"));
  lineIndex++;
  charIndex = 0;
  setTimeout(typeNext, 220);
}

if (reduceMotion) renderStatic();
else setTimeout(typeNext, 400);
