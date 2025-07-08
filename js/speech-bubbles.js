document.addEventListener("DOMContentLoaded", function () {
    // Texts for the speech bubble
    const texts = [
        "Hi, I’m Denis.",
        "Which problem are we solving?",
        "It doesn’t have<br>to be complicated.",
        "When is the deadline?",
        "When is the second deadline?",
        "Minimalism must<br>have a purpose.",
        "Maximalism must<br>have a purpose.",
        "Who are we talking to?",
        "It depends.",
        "Maybe yes, maybe not.",
        "Canva? Hmm...",
        "Computer says no.",
        "That looks interesting.",
        "Let’s try and see.",
        "People are funny.",
        "Clicking the button<br>is fun, right?",
        "Very nice.",
    ];
    // Fits only on larger screens
    if (window.innerWidth >= 768) {
        texts.push("Do we have documentation<br>for that?");
    }

    const talkingHead = document.getElementById("talking-head");
    const speechBubble = document.getElementById("speech-bubble");
    const bubbleText = document.getElementById("bubble-text");
    let bubbleTimeout;

    talkingHead.addEventListener("click", function (event) {
        // If the click is on the style controls, do nothing
        if (event.target.closest('#style-controls')) {
            return;
        }
        // Show the speech bubble with a random text from the array
        speechBubble.classList.remove("d-none");
        const randomIndex = Math.floor(Math.random() * texts.length);
        bubbleText.innerHTML = texts[randomIndex];

        // Set a timeout to hide the speech bubble after 4 seconds
        clearTimeout(bubbleTimeout);
        bubbleTimeout = setTimeout(() => {
            speechBubble.classList.add("d-none");
        }, 2000);
    });
});
