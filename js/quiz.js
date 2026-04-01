/**
 * クラシック音楽クイズ - クイズロジック
 */
(function () {
  const params = new URLSearchParams(window.location.search);
  const level = params.get("level") || "beginner";
  const data = quizData[level];

  if (!data) {
    window.location.href = "index.html";
    return;
  }

  // DOM
  const startScreen = document.getElementById("quiz-start");
  const playScreen = document.getElementById("quiz-play");
  const resultScreen = document.getElementById("quiz-result");
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");

  // スタート画面セットアップ
  document.getElementById("start-icon").textContent = data.icon;
  document.getElementById("start-level-name").textContent = data.name + "レベル";
  document.getElementById("start-level-desc").textContent = data.description;

  // 状態
  let currentIndex = 0;
  let score = 0;
  let timerInterval = null;
  let elapsedSeconds = 0;
  let questions = [];

  // 問題をシャッフル
  function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // タイマー
  function startTimer() {
    elapsedSeconds = 0;
    updateTimerDisplay();
    timerInterval = setInterval(function () {
      elapsedSeconds++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function updateTimerDisplay() {
    const min = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const sec = String(elapsedSeconds % 60).padStart(2, "0");
    document.getElementById("timer").textContent = min + ":" + sec;
  }

  function formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return min + ":" + sec;
  }

  // 問題表示
  function showQuestion() {
    const q = questions[currentIndex];
    document.getElementById("current-question").textContent = currentIndex + 1;
    document.getElementById("total-questions").textContent = questions.length;
    document.getElementById("score").textContent = score;
    document.getElementById("question-number").textContent = "Q" + (currentIndex + 1);
    document.getElementById("question-text").textContent = q.question;

    // プログレスバー
    const progress = ((currentIndex) / questions.length) * 100;
    document.getElementById("progress-fill").style.width = progress + "%";

    // 選択肢
    const choicesEl = document.getElementById("choices");
    choicesEl.innerHTML = "";
    q.choices.forEach(function (choice, i) {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;
      btn.addEventListener("click", function () {
        handleAnswer(i);
      });
      choicesEl.appendChild(btn);
    });

    // フィードバック非表示
    document.getElementById("answer-feedback").classList.add("hidden");
  }

  // 回答処理
  function handleAnswer(selectedIndex) {
    const q = questions[currentIndex];
    const isCorrect = selectedIndex === q.answer;

    if (isCorrect) score++;

    // 選択肢の色分け
    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === q.answer) {
        btn.classList.add("correct");
      } else if (i === selectedIndex && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    // フィードバック表示
    const feedback = document.getElementById("answer-feedback");
    const feedbackIcon = document.getElementById("feedback-icon");
    const feedbackText = document.getElementById("feedback-text");
    const feedbackExplanation = document.getElementById("feedback-explanation");

    feedbackIcon.textContent = isCorrect ? "\u2B50" : "\u274C";
    feedbackText.textContent = isCorrect ? "\u6B63\u89E3\uFF01" : "\u4E0D\u6B63\u89E3...";
    feedbackText.className = "feedback-text " + (isCorrect ? "correct" : "wrong");
    feedbackExplanation.textContent = q.explanation;

    // 最後の問題なら「次の問題」→「結果を見る」
    if (currentIndex >= questions.length - 1) {
      nextBtn.textContent = "\u7D50\u679C\u3092\u898B\u308B";
    }

    feedback.classList.remove("hidden");
    document.getElementById("score").textContent = score;
  }

  // 次の問題 or 結果表示
  nextBtn.addEventListener("click", function () {
    currentIndex++;
    if (currentIndex >= questions.length) {
      showResult();
    } else {
      showQuestion();
    }
  });

  // 結果表示
  function showResult() {
    stopTimer();

    playScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    // プログレスバー100%
    document.getElementById("progress-fill").style.width = "100%";

    // 結果データ
    document.getElementById("result-score").textContent = score;
    document.getElementById("result-total").textContent = questions.length;
    document.getElementById("result-time").textContent = formatTime(elapsedSeconds);

    // レベル表示
    const levelEl = document.getElementById("result-level");
    levelEl.textContent = data.name;
    levelEl.style.background = data.color;

    // メッセージ
    const ratio = score / questions.length;
    let message = "";
    if (ratio === 1) {
      message = "\u30D1\u30FC\u30D5\u30A7\u30AF\u30C8\uFF01\u5168\u554F\u6B63\u89E3\u3067\u3059\uFF01\u3042\u306A\u305F\u306F\u30AF\u30E9\u30B7\u30C3\u30AF\u97F3\u697D\u306E\u9054\u4EBA\u3067\u3059\u306D\uFF01";
    } else if (ratio >= 0.8) {
      message = "\u7D20\u6674\u3089\u3057\u3044\uFF01\u304B\u306A\u308A\u306E\u77E5\u8B58\u3092\u304A\u6301\u3061\u3067\u3059\u306D\u3002\u6B21\u306F\u5168\u554F\u6B63\u89E3\u3092\u76EE\u6307\u3057\u307E\u3057\u3087\u3046\uFF01";
    } else if (ratio >= 0.6) {
      message = "\u826F\u3044\u7D50\u679C\u3067\u3059\uFF01\u3082\u3046\u5C11\u3057\u3067\u30DE\u30B9\u30BF\u30FC\u3067\u3059\u3002\u3082\u3046\u4E00\u5EA6\u6311\u6226\u3057\u3066\u307F\u307E\u305B\u3093\u304B\uFF1F";
    } else if (ratio >= 0.4) {
      message = "\u60DC\u3057\u3044\uFF01\u3042\u3068\u5C11\u3057\u3067\u3059\u3002\u30AF\u30E9\u30B7\u30C3\u30AF\u97F3\u697D\u3092\u3082\u3063\u3068\u8074\u3044\u3066\u518D\u6311\u6226\u3057\u307E\u3057\u3087\u3046\uFF01";
    } else {
      message = "\u30AF\u30E9\u30B7\u30C3\u30AF\u97F3\u697D\u306E\u4E16\u754C\u306F\u5965\u6DF1\u3044\u3067\u3059\u306D\u3002\u3053\u308C\u3092\u6A5F\u4F1A\u306B\u3082\u3063\u3068\u77E5\u3063\u3066\u3044\u304D\u307E\u3057\u3087\u3046\uFF01";
    }
    document.getElementById("result-message").textContent = message;

    // リトライボタン
    document.getElementById("retry-btn").href = "quiz.html?level=" + level;
  }

  // スタート
  startBtn.addEventListener("click", function () {
    questions = shuffleArray(data.questions);
    currentIndex = 0;
    score = 0;

    startScreen.classList.add("hidden");
    playScreen.classList.remove("hidden");

    startTimer();
    showQuestion();
  });

})();
