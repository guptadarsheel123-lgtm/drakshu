const PERSONALIZATION = {
  hero: {
    title: "Our Little Love Presentation 💌",
    subtitle: "One slide at a time, just for you.",
  },
  timeline: [
    { title: "First Conversation", text: "The day everything started." },
    { title: "First Date", text: "Nervous smiles and nonstop laughs." },
    { title: "Favorite Memory", text: "That day we never wanted to end." },
    { title: "Today", text: "Still my favorite person, always." },
  ],
  letterText:
    "You make life warmer, brighter, and better. Thank you for being my peace, my laughter, and my best memory every day.",
  reasons: [
    "You make me feel understood.",
    "Your smile resets my whole day.",
    "You are kind in the little things.",
    "I love how we laugh together.",
    "You feel like home.",
  ],
  mapMemories: [
    { label: "☕ First Coffee", note: "We talked so much we lost track of time." },
    { label: "🌇 Evening Walk", note: "Perfect sky, perfect company." },
    { label: "🎬 Movie Night", note: "Shared snacks, shared hoodie, shared smiles." },
  ],
  quiz: {
    questions: [
      {
        prompt: "Our best date vibe?",
        answers: ["Long talks + comfort food", "Fancy place", "Anywhere together"],
        correctIndex: 0,
      },
      {
        prompt: "Pick our couple emoji:",
        answers: ["💞", "😂", "🌹"],
        correctIndex: 0,
      },
      {
        prompt: "What matters most to us?",
        answers: ["Being together", "Perfect plans", "Expensive gifts"],
        correctIndex: 0,
      },
      {
        prompt: "Our ideal Sunday is:",
        answers: ["Chilling together", "Separate errands", "Work all day"],
        correctIndex: 0,
      },
      {
        prompt: "What makes us strongest?",
        answers: ["Trust + communication", "Luck", "Only grand gestures"],
        correctIndex: 0,
      },
    ],
    messagesByScore: {
      0: "0/5 — goofy start 😂 rematch time.",
      1: "1/5 — warm-up round, still adorable 💗",
      2: "2/5 — getting there, cute effort 💞",
      3: "3/5 — solid score, you know us well ✨",
      4: "4/5 — almost perfect, amazing 💖",
      5: "5/5 — perfect score! soulmate-level answers 🏆💘",
    },
  },
  countdown: {
    targetDate: "2027-02-14T00:00:00",
    helperText: "Edit PERSONALIZATION.countdown.targetDate in script.js",
    finishedText: "It's today! Surprise time 💝",
  },
  finalSection: {
    question: "Will u be my valentine? 💘",
    yesMessage: "YAYYY 💖 Best answer. I love you forever.",
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
      nextReasonBtn.textContent = "All Reasons Revealed 💞";
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
        : `Q${questionIndex + 1}: Incorrect ❌ (Correct: ${correctText})`;
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




