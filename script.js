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
        answers: [
          { label: "Long talks + comfort food", points: 3 },
          { label: "Fancy place", points: 1 },
          { label: "Anywhere together", points: 2 },
        ],
      },
      {
        prompt: "Pick our couple emoji:",
        answers: [
          { label: "💞", points: 3 },
          { label: "😂", points: 2 },
          { label: "🌹", points: 1 },
        ],
      },
    ],
    highScoreMessage: "A+ girlfriend energy. You know us perfectly 💖",
    lowScoreMessage: "No score matters. We still win because it's us 💗",
  },
  countdown: {
    targetDate: "2027-02-14T00:00:00",
    helperText: "Edit PERSONALIZATION.countdown.targetDate in script.js",
    finishedText: "It's today! Surprise time 💝",
  },
  finalSection: {
    question: "Will u be my valentine? 💘",
    yesMessage: "YAYYY 💖 You just made this the best slide ever.",
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
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });
    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
    counter.textContent = `Slide ${index + 1} / ${slides.length}`;
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;

    if (index === 2) runTypewriter();
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
  const title = document.getElementById("reason-title");
  const text = document.getElementById("reason-text");
  let reasonIndex = 0;

  function renderReason() {
    title.textContent = `Reason #${reasonIndex + 1}`;
    text.textContent = PERSONALIZATION.reasons[reasonIndex];
  }

  document.getElementById("prev-reason").addEventListener("click", () => {
    reasonIndex = (reasonIndex - 1 + PERSONALIZATION.reasons.length) % PERSONALIZATION.reasons.length;
    renderReason();
  });
  document.getElementById("next-reason").addEventListener("click", () => {
    reasonIndex = (reasonIndex + 1) % PERSONALIZATION.reasons.length;
    renderReason();
  });

  renderReason();
}

function setupMapAndQuiz() {
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

  const form = document.getElementById("quiz-form");
  const result = document.getElementById("quiz-result");

  PERSONALIZATION.quiz.questions.forEach((question, questionIndex) => {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = question.prompt;
    fieldset.appendChild(legend);

    question.answers.forEach((answer) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" required name="q${questionIndex}" value="${answer.points}"> ${answer.label}`;
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
    const score = PERSONALIZATION.quiz.questions.reduce(
      (sum, _question, questionIndex) => sum + Number(data.get(`q${questionIndex}`)),
      0,
    );
    result.textContent =
      score >= PERSONALIZATION.quiz.questions.length * 2.5
        ? PERSONALIZATION.quiz.highScoreMessage
        : PERSONALIZATION.quiz.lowScoreMessage;
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

  const finalMessage = document.getElementById("final-message");
  ["yes-btn", "always-btn"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
      finalMessage.textContent = PERSONALIZATION.finalSection.yesMessage;
    });
  });
}

document.getElementById("replay-letter").addEventListener("click", runTypewriter);
renderStaticContent();
setupSlideDeck();
setupReasons();
setupMapAndQuiz();
setupCountdownAndFinal();


