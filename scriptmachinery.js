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

const greeting = "brrrr....buzzz....machine noises...";

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
       { text: "What can I even do here?", response: "Look around, Learn about machinery funfacts, or play the minigame!!"  },
       { text: "Any fun facts about painting?", response: "Click on the photos and you'll see!" },
       { text: "How do I navigate?", response: "Click on the different hobbies below to explore or go shopping. P.S. Click on 'Hobby Jungle' to go home." }
       ,{ text: "I NEED to get into machinery!!!", response: "Go check out our shop for supplies. *wink wink*" }
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



document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    title.addEventListener('click', () => {
        const infoParagraph = title.nextElementSibling; 
        if (infoParagraph.style.display === 'none') {
            infoParagraph.style.display = 'block'; 
        } else {
            infoParagraph.style.display = 'none'; 
        }
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    title.addEventListener('click', () => {
        const infoParagraph = title.nextElementSibling; 
        infoParagraph.classList.toggle('show'); t
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    title.addEventListener('click', () => {
        const infoParagraph = title.nextElementSibling; 
        const arrow = title.querySelector('.arrow'); 

        infoParagraph.classList.toggle('show'); 
        arrow.classList.toggle('rotate'); 
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    title.addEventListener('click', () => {
        const infoParagraph = title.nextElementSibling;
        const arrow = title.querySelector('.arrow');


        document.querySelectorAll('.gallery-info p.show').forEach(openParagraph => {
            if (openParagraph !== infoParagraph) {
                openParagraph.classList.remove('show');
            }
        });

        document.querySelectorAll('.arrow.rotate').forEach(openArrow => {
            if (openArrow !== arrow) {
                openArrow.classList.remove('rotate');
            }
        });

        
        infoParagraph.classList.toggle('show');
        if (arrow) arrow.classList.toggle('rotate');
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    const arrow = title.querySelector('.arrow');
    const infoParagraph = title.nextElementSibling;

    
    title.addEventListener('click', () => {
        infoParagraph.classList.toggle('show');
        arrow.classList.toggle('rotate');
    });

    
    if (arrow) {
        arrow.addEventListener('click', (event) => {
            event.stopPropagation(); 
            infoParagraph.classList.toggle('show');
            arrow.classList.toggle('rotate');
        });
    }
});
