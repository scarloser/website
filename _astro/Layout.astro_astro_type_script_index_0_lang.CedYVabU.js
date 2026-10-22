import "./themeRuntime.DQB7__aq.js";
fetch("https://api.lanyard.rest/v1/users/259449904047456256")
  .then((a) => a.json())
  .then((a) => {
    const t = a?.data?.discord_user;
    if (!t?.avatar) return;
    const s = t.avatar.startsWith("a_") ? "gif" : "png",
      r = document.querySelector("link[rel=icon]");
    r && (r.href = `https://cdn.discordapp.com/avatars/${t.id}/${t.avatar}.${s}?size=256`);
  })
  .catch(() => {});
