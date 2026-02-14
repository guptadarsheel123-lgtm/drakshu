# drakshu
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Our Valentine Story</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Quicksand:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header class="hero">
      <div class="hero__hearts" aria-hidden="true">
        <span>💗</span><span>💖</span><span>💘</span><span>💕</span>
      </div>
      <h1 id="hero-title">For My Favorite Person 💌</h1>
      <p id="hero-subtitle">
        A tiny website for us — our story, our little memories, and one big
        question at the end.
      </p>
      <a href="#timeline" class="btn">Start Our Story</a>
    </header>

    <main>
      <section id="timeline" class="section">
        <h2>1) Timeline of Our Story</h2>
        <div class="timeline" id="timeline-list"></div>
      </section>

      <section id="letter" class="section">
        <h2>2) Love Letter Reveal</h2>
        <p id="typewriter" class="typewriter" aria-live="polite"></p>
        <button id="replay-letter" class="btn btn--soft">Replay Letter</button>
      </section>

      <section id="reasons" class="section">
        <h2>3) Reasons I Love You</h2>
        <div class="deck">
          <button id="prev-reason" class="deck__nav" aria-label="Previous reason">◀</button>
          <article class="card" id="reason-card">
            <h3 id="reason-title">Reason #1</h3>
            <p id="reason-text"></p>
          </article>
          <button id="next-reason" class="deck__nav" aria-label="Next reason">▶</button>
        </div>
      </section>

      <section id="map" class="section">
        <h2>4) Interactive Map of Memories</h2>
        <div class="map-grid" id="map-pins"></div>
        <article id="memory-popup" class="memory-popup">
          <h3>Tap a memory pin 💞</h3>
          <p>Each place has a tiny story from us.</p>
        </article>
      </section>

      <section id="quiz" class="section">
        <h2>5) Mini Couple Quiz</h2>
        <form id="quiz-form"></form>
        <p id="quiz-result" class="quiz-result"></p>
      </section>

      <section id="countdown" class="section">
        <h2>9) Countdown to Our Next Date</h2>
        <p class="countdown" id="countdown-text">Calculating...</p>
        <p class="muted" id="countdown-note"></p>
      </section>

      <section id="final" class="section final">
        <h2>One Last Question...</h2>
        <p id="final-question">Will u be my valentine? 💘</p>
        <div class="final__buttons">
          <button id="yes-btn" class="btn">Yes 💖</button>
          <button id="always-btn" class="btn btn--soft">Always yes ✨</button>
        </div>
        <p id="final-message" class="final-message"></p>
      </section>
    </main>

    <script src="script.js"></script>
  </body>
</html>
