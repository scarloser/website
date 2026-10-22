// Fills the Discord server cards on /tech with icon, online and member counts.
document.querySelectorAll("a[data-invite]").forEach(async (card) => {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/invites/${card.dataset.invite}?with_counts=true`,
    );
    if (!res.ok) return;
    const invite = await res.json();

    const icon = invite.guild?.icon;
    if (icon) {
      const img = card.querySelector("img");
      const ext = icon.startsWith("a_") ? "gif" : "png";
      img.src = `https://cdn.discordapp.com/icons/${card.dataset.id}/${icon}.${ext}?size=64`;
      img.hidden = false;
    }

    const online = card.querySelector(".online");
    const members = card.querySelector(".members");
    if (invite.approximate_presence_count != null) {
      online.textContent = `${invite.approximate_presence_count} online`;
      online.hidden = false;
    }
    if (invite.approximate_member_count != null) {
      members.textContent = `${invite.approximate_member_count} members`;
      members.hidden = false;
    }
  } catch {
    // invite lookup failed, leave the card as is
  }
});
