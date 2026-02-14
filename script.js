const PERSONALIZATION = {
  hero: {
    title: "For My Favorite Person 💌",
    subtitle:
      "A tiny website for us — our story, our little memories, and one big question at the end.",
  },
  timeline: [
    {
      title: "First Conversation",
      text: "The moment we started talking and everything got brighter.",
    },
    {
      title: "First Date",
      text: "Nervous smiles, laughs, and that instant feeling of ‘this is special.’",
    },
    {
      title: "Favorite Trip",
      text: "New places, silly photos, and memories I still replay all the time.",
    },
    {
      title: "Today",
      text: "Still choosing you every day — and still very in love with you.",
    },
  ],
  letterText:
    "Every day with you feels like my favorite part of life. Thank you for your laugh, your kindness, and for making ordinary moments feel magical. I love you more than words can say.",
  reasons: [
    "You make me feel safe, seen, and loved.",
    "Your smile can fix even my toughest day.",
    "You believe in me when I overthink.",
    "You are beautiful inside and out.",
    "Life is better, softer, and happier with you.",
  ],
  mapMemories: [
    {
      label: "☕ First Coffee Spot",
      note: "The day we sat forever talking and forgot the time.",
    },
    {
      label: "🌳 Sunset Park Walk",
      note: "That golden-hour walk where we laughed nonstop.",
    },
    {
      label: "🌊 Beach Day",
      note: "Windy hair, warm hands, and a perfect sky.",
    },
    {
      label: "🎬 Cozy Movie Night",
      note: "One popcorn, two straws, and your shoulder as my pillow.",
    },
  ],
  quiz: {
    questions: [
      {
        prompt: "What is our ideal date vibe?",
        answers: [
          { label: "Food + long talks", points: 2 },
          { label: "Fancy restaurant", points: 1 },
          { label: "Anywhere as long as we're together", points: 3 },
        ],
      },
      {
        prompt: "Which emoji feels most like us?",
        answers: [
          { label: "💕", points: 2 },
          { label: "😂", points: 3 },
          { label: "🌹", points: 1 },
        ],
      },
    ],
    highScoreMessage:
      "Perfect score — you know us too well. Our love language is laughter + comfort 💞",
    lowScoreMessage:
      "No matter the score, we still win because we have each other 💗",
  },
  countdown: {
    targetDate: "2027-02-14T00:00:00",
    helperText: "Set PERSONALIZATION.countdown.targetDate in script.js.",
    finishedText: "It's today! Surprise unlocked 💝",
  },
  finalSection: {
    question: "Will u be my valentine? 💘",
    yesMessage:
      "YAY! 💖 Best answer ever. I can't wait for all the memories still coming.",
  },
};

function renderHero() {
  document.getElementById("hero-title").textContent = PERSONALIZATION.hero.title;
  document.getElementById("hero-subtitle").textContent =
    PERSONALIZATION.hero.subtitle;
}

function renderTimeline() {
  const timelineList = document.getElementById("timeline-list");
  timelineList.innerHTML = PERSONALIZATION.timeline
    .map(
      (item) =>
        `<article><h3>${item.title}</h3><p>${item.text}</p></article>`,
    )
    .join("");
}

function setupTypewriter() {
  const letterText = PERSONALIZATION.letterText;
  const typewriterEl = document.getElementById("typewriter");

  function runTypewriter() {
    typewriterEl.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      typewriterEl.textContent += letterText[i];
      i += 1;
      if (i >= letterText.length) clearInterval(timer);
    }, 24);
  }

  document.getElementById("replay-letter").addEventListener("click", runTypewriter);
  runTypewriter();
}

function setupReasonsDeck() {
  const reasons = PERSONALIZATION.reasons;
  const reasonTitle = document.getElementById("reason-title");
  const reasonText = document.getElementById("reason-text");
  let reasonIndex = 0;

  function renderReason() {
    reasonTitle.textContent = `Reason #${reasonIndex + 1}`;
    reasonText.textContent = reasons[reasonIndex];
  }

  document.getElementById("prev-reason").addEventListener("click", () => {
    reasonIndex = (reasonIndex - 1 + reasons.length) % reasons.length;
    renderReason();
  });

  document.getElementById("next-reason").addEventListener("click", () => {
    reasonIndex = (reasonIndex + 1) % reasons.length;
    renderReason();
  });

  renderReason();
}

function setupMapMemories() {
  const pinsContainer = document.getElementById("map-pins");
  const popup = document.getElementById("memory-popup");

  PERSONALIZATION.mapMemories.forEach((memory) => {
    const pin = document.createElement("button");
    pin.className = "pin";
    pin.type = "button";
    pin.textContent = memory.label;
    pin.addEventListener("click", () => {
      popup.innerHTML = `<h3>${memory.label}</h3><p>${memory.note}</p>`;
    });
    pinsContainer.appendChild(pin);
  });
}

function setupQuiz() {
  const quizForm = document.getElementById("quiz-form");
  const quizResult = document.getElementById("quiz-result");

  PERSONALIZATION.quiz.questions.forEach((question, questionIndex) => {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = question.prompt;
    fieldset.appendChild(legend);

    question.answers.forEach((answer) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${questionIndex}" value="${answer.points}" required /> ${answer.label}`;
      fieldset.appendChild(label);
    });

    quizForm.appendChild(fieldset);
  });

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "btn";
  submit.textContent = "See Result";
  quizForm.appendChild(submit);

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(quizForm);
    const score = PERSONALIZATION.quiz.questions.reduce(
      (sum, _question, questionIndex) => sum + Number(data.get(`q${questionIndex}`)),
      0,
    );

    if (score >= PERSONALIZATION.quiz.questions.length * 2 + 1) {
      quizResult.textContent = PERSONALIZATION.quiz.highScoreMessage;
    } else {
      quizResult.textContent = PERSONALIZATION.quiz.lowScoreMessage;
    }
  });
}

function setupCountdown() {
  const countdownTarget = new Date(PERSONALIZATION.countdown.targetDate);
  const countdownText = document.getElementById("countdown-text");
  document.getElementById("countdown-note").textContent =
    PERSONALIZATION.countdown.helperText;

  function updateCountdown() {
    const now = new Date();
    const remaining = countdownTarget - now;
    if (remaining <= 0) {
      countdownText.textContent = PERSONALIZATION.countdown.finishedText;
      return;
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((remaining / (1000 * 60)) % 60);
    countdownText.textContent = `${days} days, ${hours} hours, ${mins} mins until our special date ⏳`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
}

function setupFinalSection() {
  document.getElementById("final-question").textContent =
    PERSONALIZATION.finalSection.question;

  const finalMessage = document.getElementById("final-message");
  ["yes-btn", "always-btn"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
      finalMessage.textContent = PERSONALIZATION.finalSection.yesMessage;
    });
  });
}

renderHero();
renderTimeline();
setupTypewriter();
setupReasonsDeck();
setupMapMemories();
setupQuiz();
setupCountdown();
setupFinalSection();
