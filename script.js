const turntable = document.getElementById("turntable");
const audio = document.getElementById("audioPlayer");

audio.volume = 0.5;

turntable.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

const TALK_VOLUME = 0.2;

const talkSound = new Audio("kimtalk.wav"); 
talkSound.volume = TALK_VOLUME;
talkSound.preload = "auto";

function playTalkSound() {
    talkSound.currentTime = 0;
    talkSound.play();
}

const kidContainer = document.getElementById('kid');
const img = kidContainer.querySelector('.sprite-img');
const clickText = document.getElementById('clickText');
const optionsContainer = document.getElementById('dialogueOptions');

const greeting = "Hello, welcome to Hobby Jungle!";

let typingInterval = null;
let blinkTimeout = null;
let isTalking = false;

function startBlinking() {
    scheduleNextBlink();
}

function scheduleNextBlink() {
    const randomTime = Math.random() * 4000 + 2000;
    blinkTimeout = setTimeout(blink, randomTime);
}

function blink() {
    if (isTalking) {
        img.src = "kimtalkblink.png";
    } else {
        img.src = "kimblink.png";
    }

    setTimeout(() => {
        img.src = isTalking ? "kimtalk.png" : "kim.png";
        scheduleNextBlink();
    }, 150);
}

startBlinking();

kidContainer.addEventListener("mouseenter", () => {
    if (!isTalking) {
        img.src = "kim(hovered).png";
    }
});

kidContainer.addEventListener("mouseleave", () => {
    if (!isTalking) {
        img.src = "kim.png";
    }
});

kidContainer.addEventListener('click', () => {

    if (typingInterval) return; 

    isTalking = true;
    img.src = "kimtalk.png";

    kidContainer.style.pointerEvents = 'none';
    clickText.style.display = 'block';
    clickText.textContent = '';
    optionsContainer.innerHTML = '';
    optionsContainer.style.display = 'none';

    let i = 0;

    typingInterval = setInterval(() => {

        if (i < greeting.length) {

            clickText.textContent += greeting[i];

            if (greeting[i] !== " ") {
                playTalkSound();
            }

            i++;

        } else {

            clearInterval(typingInterval);
            typingInterval = null;

            isTalking = false;
            img.src = "kim.png";
            kidContainer.style.pointerEvents = 'auto';

            setTimeout(() => {
                clickText.style.display = 'none';
                showDialogueOptions();
            }, 1000);
        }

    }, 50);
});

function showDialogueOptions() {
    const options = [
        { text: "Who are you?", response: "Hi! I'm Kim, your personal tour guide around here. My boss told me to make you explore his personal favorite hobbies first (ugh) so go ahead and check them out." },
        { text: "What is this place?", response: "This is Hobby Jungle, kind of a bar/cafe hangout place and we're ON SPACE!! (just look at the stars... goregous right?? yeah goregous like you). It is where we can all share our hobbies! You can relax here with me at the bar listening to music whilst sipping on drinks made by my amazing bartending skills orr go and explore each and diffrent hobbies." },
        { text: "How do I navigate?", response: "Click on the different hobbies below to explore. Or go shopping in our store. go check them out!" }
        ,{ text: "Where is that yogurt kid?", response: "Vino aka El ((this is actually the MY/creator's name)) aka my boss right? Yeah him who else.. He's on vacation now and renovated this place and hired me to work here so yeah you won't be seeing this guy in a while (unfortunately and fortunately hehe)." }
        ,{ text: "What about you what do you like??", response: "Hmmm Vino likes walking painting machines nerd stuff and nice people... Wait! About ME??? Basically nothing like him lol. I like reading books and writing and music mixing drinks and stuff fork! That's also nerd stuff.. And also nice people hehe I LOVEEE nice people they're the best even though I'm not that extroverted." }
    ];

    optionsContainer.innerHTML = '';
    optionsContainer.style.display = 'block';

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option.text;
        optionElement.classList.add('dialogue-option');

        optionElement.addEventListener('click', (event) => {
            event.stopPropagation();
            typeResponse(option.response);
            optionsContainer.style.display = 'none';
        });

        optionsContainer.appendChild(optionElement);
    });
}

function typeResponse(responseText) {

    if (typingInterval) return;

    isTalking = true;
    img.src = "kimtalk.png";

    kidContainer.style.pointerEvents = 'none';
    clickText.style.display = 'block';
    clickText.textContent = '';

    let i = 0;

    typingInterval = setInterval(() => {

        if (i < responseText.length) {

            clickText.textContent += responseText[i];

            if (responseText[i] !== " ") {
                playTalkSound();
            }

            i++;

        } else {

            clearInterval(typingInterval);
            typingInterval = null;

            isTalking = false;
            img.src = "kim.png";
            kidContainer.style.pointerEvents = 'auto';
        }

    }, 50);
}

