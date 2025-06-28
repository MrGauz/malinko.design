document.addEventListener("DOMContentLoaded", function () {
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
        "Do we have documentation<br>for that?",
        "Canva? Hmm...",
        "Computer says no.",
        "That looks interesting.",
        "Let’s try and see.",
        "People are funny.",
        "Clicking the button<br>is fun, right?",
        "Very nice.",
    ];

    const talkingHead = document.getElementById("talking-head");
    const speechBubble = document.getElementById("speech-bubble");
    const bubbleText = document.getElementById("bubble-text");

    talkingHead.addEventListener("click", function (event) {
        if (event.target.closest('#style-controls')) {
            return;
        }
        // Toggle the visibility of the speech bubble
        speechBubble.classList.remove("d-none");

        // Pick a random text from the array
        const randomIndex = Math.floor(Math.random() * texts.length);
        bubbleText.innerHTML = texts[randomIndex];
    });
});
