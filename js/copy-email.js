const emailLink = document.getElementById("copy-email");
const copyIcon = document.getElementById("copy-icon");

let defaultIcon = "/media/copy-icon.png";
const hoverIcon = "/media/copy-icon-hover.png";
const doneIcon = "/media/copy-icon-click.png";

const tooltip = new bootstrap.Tooltip(emailLink, {trigger: "manual"});

emailLink.addEventListener("mouseenter", () => {
    if (defaultIcon !== doneIcon) {
        copyIcon.src = hoverIcon;
    }
});
emailLink.addEventListener("mouseleave", () => {
    copyIcon.src = defaultIcon;
});

// Click: copy to clipboard, show tooltip, swap icon
emailLink.addEventListener("click", e => {
    e.preventDefault();
    navigator.clipboard
        .writeText(emailLink.textContent.trim())
        .then(() => {
            defaultIcon = doneIcon;
            copyIcon.src = doneIcon;
            copyIcon.classList.remove("ms-3");
            copyIcon.classList.add("ms-2");
            tooltip.show();
            setTimeout(() => tooltip.hide(), 1500);
        })
        .catch(err => console.error("Copy failed", err));
});