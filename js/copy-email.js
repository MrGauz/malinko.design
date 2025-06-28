const emailLink = document.getElementById("copy-email");
const tooltip = new bootstrap.Tooltip(emailLink, {trigger: "manual"});

emailLink.addEventListener("click", e => {
    e.preventDefault();
    navigator.clipboard
        .writeText(emailLink.textContent.trim())
        .then(() => {
            tooltip.show();
            setTimeout(() => tooltip.hide(), 1500);
        })
        .catch(err => console.error("Copy failed", err));
});