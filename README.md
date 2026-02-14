# drakshu
 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..3770e2b382436e9a3f41f1a4b88bf65375200b9f
--- /dev/null
+++ b/script.js
@@ -0,0 +1,102 @@
+const letterText =
+  "Every day with you feels like my favorite part of life. Thank you for your laugh, your kindness, and for making ordinary moments feel magical. I love you more than words can say.";
+const typewriterEl = document.getElementById("typewriter");
+const replayLetterButton = document.getElementById("replay-letter");
+
+function runTypewriter() {
+  typewriterEl.textContent = "";
+  let i = 0;
+  const timer = setInterval(() => {
+    typewriterEl.textContent += letterText[i];
+    i += 1;
+    if (i >= letterText.length) clearInterval(timer);
+  }, 24);
+}
+
+replayLetterButton.addEventListener("click", runTypewriter);
+runTypewriter();
+
+const reasons = [
+  "You make me feel safe, seen, and loved.",
+  "Your smile can fix even my toughest day.",
+  "You believe in me when I overthink.",
+  "You are beautiful inside and out.",
+  "Life is better, softer, and happier with you.",
+];
+let reasonIndex = 0;
+const reasonTitle = document.getElementById("reason-title");
+const reasonText = document.getElementById("reason-text");
+
+function renderReason() {
+  reasonTitle.textContent = `Reason #${reasonIndex + 1}`;
+  reasonText.textContent = reasons[reasonIndex];
+}
+
+document.getElementById("prev-reason").addEventListener("click", () => {
+  reasonIndex = (reasonIndex - 1 + reasons.length) % reasons.length;
+  renderReason();
+});
+
+document.getElementById("next-reason").addEventListener("click", () => {
+  reasonIndex = (reasonIndex + 1) % reasons.length;
+  renderReason();
+});
+renderReason();
+
+const memoryNotes = {
+  Cafe: "The day we sat forever talking and forgot the time.",
+  Park: "That golden-hour walk where we laughed nonstop.",
+  Beach: "Windy hair, warm hands, and a perfect sky.",
+  Cinema: "One popcorn, two straws, and your shoulder as my pillow.",
+};
+
+const popup = document.getElementById("memory-popup");
+document.querySelectorAll(".pin").forEach((pin) => {
+  pin.addEventListener("click", () => {
+    const place = pin.dataset.place;
+    popup.innerHTML = `<h3>${pin.textContent}</h3><p>${memoryNotes[place]}</p>`;
+  });
+});
+
+const quizForm = document.getElementById("quiz-form");
+const quizResult = document.getElementById("quiz-result");
+quizForm.addEventListener("submit", (event) => {
+  event.preventDefault();
+  const data = new FormData(quizForm);
+  const score = Number(data.get("q1")) + Number(data.get("q2"));
+  if (score >= 5) {
+    quizResult.textContent =
+      "Perfect score — you know us too well. Our love language is laughter + comfort 💞";
+  } else {
+    quizResult.textContent =
+      "No matter the score, we still win because we have each other 💗";
+  }
+});
+
+const countdownTarget = new Date("2026-02-14T00:00:00");
+const countdownText = document.getElementById("countdown-text");
+
+function updateCountdown() {
+  const now = new Date();
+  const remaining = countdownTarget - now;
+  if (remaining <= 0) {
+    countdownText.textContent = "It's today! Surprise unlocked 💝";
+    return;
+  }
+
+  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
+  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
+  const mins = Math.floor((remaining / (1000 * 60)) % 60);
+  countdownText.textContent = `${days} days, ${hours} hours, ${mins} mins until our special date ⏳`;
+}
+
+updateCountdown();
+setInterval(updateCountdown, 60000);
+
+const finalMessage = document.getElementById("final-message");
+["yes-btn", "always-btn"].forEach((id) => {
+  document.getElementById(id).addEventListener("click", () => {
+    finalMessage.textContent =
+      "YAY! 💖 Best answer ever. I can't wait for all the memories still coming.";
+  });
+});
 
EOF
)
