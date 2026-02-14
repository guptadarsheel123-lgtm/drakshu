const PERSONALIZATION = {
  hero: {
    title: "A small Valentine's gift for the love of my life",
    subtitle: "Happy Valentine's Day cutu",
  },
  timeline: [
    { title: "First Text", text: "I still remember the moment I received that text from you, confused whether u want to confess ur love or if u were gonna ask me out." },
    { title: "First Meet", text: "I was so nervous, and seeing the prettiest girl in the world didn't help it." },
    { title: "First Date", text: "Honestly, this was the most nervous I have ever been in life, but that day will top the best days of my life" },
    { title: "First Kiss", text: "Not too far from our first date, I was the happiest man in the world that day" },
  ],
  letterText:
    "Hello cutupie, bhai mai sachmai bahot bura you have told me a million times that u like love letters and u have even told me to send u letters but you are sadly dating the laziest guy in the world :(. So this is a small compensation honestly I have no clue what people write in a love letter. I will try my best so pls don't tell me even if u dont like the letter. Drakshu u genuinely are the love of my life, u have no clue how much I love you, I am sorry for everything that I have ever done that hurt you cant say it enough times, you definitely deserve a better guy but u won't find a guy who would love u more than I do. You might not agree with me but you are the most beautiful girl in this world u know I have had a crush on you since so long, and you mumma swear made every other girl unattractive no matter how they look who they are even when I moved to London. I didnt find anyone attractive except u I used to stalk u so much. So pls stop looking soooooo pretty warna you will dump me for a hotter guy. I know i have told u this enough times but still u are the most most most beautiful kind and i dont have enough words to describe soul i have ever had a chance to know you can brighten up anyone's life. tujhe pata nahi tu mazak karti hai par tu sachmai devi hai u have got divine powers. i miss u so much i cant wait to seeeeee youuu hugg youuuu kisssss youuuuuuuuu meri jaaaaaaaaaaaaaan :))",
  reasons: [
    "You dont judge me, I can tell you everything without even thinking twice.",
    "Talking to you feels like a remedy, If I wanted I would wish bhagwanji that I could 24*7 with u.",
    "You care about me, you might not show it but I can feel it",
    "Whenever Im w you I dont feel time as if the world ceases to exist it is only about u",
    "You are so understandable, hahahaahaha kidding paagal hai kya u and understandable cant come in the same sentence but I love ur gussa pls never stop doing gussa",
  ],
  mapMemories: [
    { label: "LOC 40", note: "Our first spot, the sunset was so scenic and beautiful, but as always u were outshining the sunset by miles, I couldn't keep my eyes off you. It felt like a dream dating you." },
    { label: "The Car Drive", note: "This is the drive we had after dropping off other ppl, that was the first u opened up so much and I felt so good that for the first time ever u were telling me ur problems, and ur head on my shoulder, i misss it so muchhhhhhh" },
    { label: "The rubber band", note: "Remember our way home from the first date, tune mujhe tera rubber band pehnaya and u told me I cant take it off, I had so many butterflies at that time u cannot imagine" },
  ],
  quiz: {
    questions: [
      {
        prompt: "What was ur first text to me?",
        answers: ["darsheel", "listen to me", "listen to me darsheel", "darsheel listen to me"],
        correctIndex: 3,
      },
      {
        prompt: "What was the date that u texted me for the first time?",
        answers: ["17/10/2024", "14/10/2024", "12/10/2024", "23/10/2024"],
        correctIndex: 1,
      },
      {
        prompt: "When was the first time we met?",
        answers: ["17/12/2024", "14/4/2022", "21/10/2023", "02/05/2021"],
        correctIndex: 1,
      },
      {
        prompt: "Which car did we have the first drive in?",
        answers: ["Scorpio", "Defender", "Santro", "Mercedes"],
        correctIndex: 3,
      },
      {
        prompt: "What was the first song I have ever played on a drive with u?",
        answers: ["Instant Crush", "Stolen Dance", "Stumblin in" , "Chicago"],
        correctIndex: 0,
      },
    ],
    messagesByScore: {
      0: "0/5 — do u hate me?",
      1: "1/5 — someone's got alzheimer",
      2: "2/5 — not too bad, expected better :(",
      3: "3/5 — decent hai, needs improvement",
      4: "4/5 — kya baaat haii, almost there",
      5: "5/5 — wowowowoowowow, congratulations, you get 3 wishes",
    },
  },
  countdown: {
    targetDate: "2026-03-22T12:00:00",
    finishedText: "It's today! Surprise time 💝",
  },
  finalSection: {
    question: "Will you be my valentine? 💘 (Try saying no)",
    yesMessage: "YAYYY I love youuuuu sooo much, meri jaan, meri cutu, meri drakshuuuuu",
  },
};

function renderStaticContent() {
  document.getElementById("hero-title").textContent = PERSONALIZATION.hero.title;
  document.getElementById("hero-subtitle").textContent = PERSONALIZATION.hero.subtitle;
  document.getElementById("final-question").textContent = PERSONALIZATION.finalSection.question;
  document.getElementById("countdown-note").textContent = PERSONALIZATION.countdown.helperText;

  document.getElementById("timeline-list").innerHTML = PERSONALIZATION.timeline
    .map((item) => `<article><h3>${item.title}</h3><p>${item.text}</p></article>`)
    .join("");
}

let typewriterTimer;
function runTypewriter() {
  const text = PERSONALIZATION.letterText;
  const el = document.getElementById("typewriter");
  clearInterval(typewriterTimer);
  el.textContent = "";
  let i = 0;
  typewriterTimer = setInterval(() => {
    el.textContent += text[i] || "";
    i += 1;
    if (i >= text.length) clearInterval(typewriterTimer);
  }, 22);
}

function setupLetterReveal() {
  let revealed = false;
  const revealBtn = document.getElementById("reveal-letter");
  const replayBtn = document.getElementById("replay-letter");
  replayBtn.disabled = true;

  revealBtn.addEventListener("click", () => {
    runTypewriter();
    revealed = true;
    replayBtn.disabled = false;
    revealBtn.textContent = "Revealed 💌";
  });

  replayBtn.addEventListener("click", () => {
    if (revealed) runTypewriter();
  });
}

function setupSlideDeck() {
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const dotsContainer = document.getElementById("dots");
  const counter = document.getElementById("slide-counter");
  const progress = document.getElementById("progress-bar");
  let index = 0;

  slides.forEach((_slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  });

  function showSlide(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    Array.from(dotsContainer.children).forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    counter.textContent = `Slide ${index + 1} / ${slides.length}`;
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  }

  document.getElementById("next-slide").addEventListener("click", () => showSlide(index + 1));
  document.getElementById("prev-slide").addEventListener("click", () => showSlide(index - 1));
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") showSlide(index + 1);
    if (event.key === "ArrowLeft") showSlide(index - 1);
  });

  showSlide(0);
}

function setupReasons() {
  const stack = document.getElementById("reasons-stack");
  const nextReasonBtn = document.getElementById("next-reason");
  let shownCount = 0;

  function revealNextReason() {
    if (shownCount >= PERSONALIZATION.reasons.length) return;

    const reasonCard = document.createElement("article");
    reasonCard.className = "card reason-card";
    reasonCard.innerHTML = `<h3>Reason #${shownCount + 1}</h3><p>${PERSONALIZATION.reasons[shownCount]}</p>`;
    stack.appendChild(reasonCard);
    shownCount += 1;

    if (shownCount >= PERSONALIZATION.reasons.length) {
      nextReasonBtn.textContent = "I will have to write continously for the next 1-2 year to list all the reasons, sorry for not writing all of them. 💞";
      nextReasonBtn.disabled = true;
    }
  }

  nextReasonBtn.addEventListener("click", revealNextReason);
  revealNextReason();
}

function setupMap() {
  const map = document.getElementById("map-pins");
  const popup = document.getElementById("memory-popup");

  PERSONALIZATION.mapMemories.forEach((memory) => {
    const pin = document.createElement("button");
    pin.type = "button";
    pin.className = "pin";
    pin.textContent = memory.label;
    pin.addEventListener("click", () => {
      popup.innerHTML = `<h3>${memory.label}</h3><p>${memory.note}</p>`;
    });
    map.appendChild(pin);
  });
}

function setupQuiz() {
  const form = document.getElementById("quiz-form");
  const result = document.getElementById("quiz-result");
  const feedback = document.getElementById("quiz-feedback");

  PERSONALIZATION.quiz.questions.forEach((question, questionIndex) => {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = `${questionIndex + 1}. ${question.prompt}`;
    fieldset.appendChild(legend);

    question.answers.forEach((answer, answerIndex) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" required name="q${questionIndex}" value="${answerIndex}"> ${answer}`;
      fieldset.appendChild(label);
    });

    form.appendChild(fieldset);
  });

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "btn";
  submit.textContent = "Check Score";
  form.appendChild(submit);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    let score = 0;
    feedback.innerHTML = "";

    PERSONALIZATION.quiz.questions.forEach((question, questionIndex) => {
      const selectedIndex = Number(data.get(`q${questionIndex}`));
      const correct = selectedIndex === question.correctIndex;
      if (correct) score += 1;

      const li = document.createElement("li");
      const correctText = question.answers[question.correctIndex];
      li.textContent = correct
        ? `Q${questionIndex + 1}: Correct ✅`
        : `Q${questionIndex + 1}: Incorrect ❌;
      feedback.appendChild(li);
    });

    result.textContent = `Score: ${score}/${PERSONALIZATION.quiz.questions.length} — ${PERSONALIZATION.quiz.messagesByScore[score]}`;
  });
}

function setupCountdownAndFinal() {
  const target = new Date(PERSONALIZATION.countdown.targetDate);
  const countdown = document.getElementById("countdown-text");

  function updateCountdown() {
    const diff = target - new Date();
    if (diff <= 0) {
      countdown.textContent = PERSONALIZATION.countdown.finishedText;
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const mins = Math.floor((diff / 60000) % 60);
    countdown.textContent = `${days} days ${hours} hours ${mins} mins left ⏳`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);

  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const finalMessage = document.getElementById("final-message");
  const actions = document.getElementById("final-actions");
  let yesScale = 1;

  function dodgeNo() {
    const rangeX = Math.max(30, actions.clientWidth / 3);
    const rangeY = 16;
    const randomX = Math.floor(Math.random() * rangeX) - rangeX / 2;
    const randomY = Math.floor(Math.random() * rangeY) - rangeY / 2;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    yesScale = Math.min(1.9, yesScale + 0.08);
    yesBtn.style.transform = `scale(${yesScale})`;
  }

  noBtn.addEventListener("mouseenter", dodgeNo);
  noBtn.addEventListener("focus", dodgeNo);
  noBtn.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      dodgeNo();
    },
    { passive: false },
  );

  yesBtn.addEventListener("click", () => {
    finalMessage.textContent = PERSONALIZATION.finalSection.yesMessage;
  });
}

renderStaticContent();
setupSlideDeck();
setupLetterReveal();
setupReasons();
setupMap();
setupQuiz();
setupCountdownAndFinal();




