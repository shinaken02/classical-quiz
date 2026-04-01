/**
 * クラシック音楽クイズ - ランキング機能
 */
(function () {
  const levels = ["beginner", "intermediate", "advanced"];
  const levelNames = { beginner: "初級", intermediate: "中級", advanced: "上級" };
  let currentLevel = "beginner";

  const rankingBody = document.getElementById("ranking-body");
  const rankingEmpty = document.getElementById("ranking-empty");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const clearBtn = document.getElementById("clear-ranking");

  // URLパラメータでレベル指定
  const params = new URLSearchParams(window.location.search);
  const paramLevel = params.get("level");
  if (paramLevel && levels.includes(paramLevel)) {
    currentLevel = paramLevel;
  }

  // タブ初期状態
  tabButtons.forEach(function (btn) {
    if (btn.dataset.level === currentLevel) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // ランキング表示
  function renderRanking(level) {
    const key = "classicQuizRanking_" + level;
    const rankings = JSON.parse(localStorage.getItem(key) || "[]");

    rankingBody.innerHTML = "";

    if (rankings.length === 0) {
      rankingEmpty.classList.remove("hidden");
      return;
    }

    rankingEmpty.classList.add("hidden");

    rankings.forEach(function (record, i) {
      const tr = document.createElement("tr");

      // 順位（メダル付き）
      const rankTd = document.createElement("td");
      rankTd.className = "rank-col";
      if (i === 0) {
        rankTd.innerHTML = '<span class="rank-medal">\uD83E\uDD47</span>';
      } else if (i === 1) {
        rankTd.innerHTML = '<span class="rank-medal">\uD83E\uDD48</span>';
      } else if (i === 2) {
        rankTd.innerHTML = '<span class="rank-medal">\uD83E\uDD49</span>';
      } else {
        rankTd.textContent = i + 1;
      }

      // 名前
      const nameTd = document.createElement("td");
      nameTd.className = "name-col";
      nameTd.textContent = record.name;

      // スコア
      const scoreTd = document.createElement("td");
      scoreTd.className = "score-col";
      scoreTd.textContent = record.score + " / " + record.total;

      // タイム
      const timeTd = document.createElement("td");
      timeTd.className = "time-col";
      timeTd.textContent = record.timeFormatted;

      // 日付
      const dateTd = document.createElement("td");
      dateTd.className = "date-col";
      dateTd.textContent = record.date;

      tr.appendChild(rankTd);
      tr.appendChild(nameTd);
      tr.appendChild(scoreTd);
      tr.appendChild(timeTd);
      tr.appendChild(dateTd);
      rankingBody.appendChild(tr);
    });
  }

  // タブ切り替え
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentLevel = btn.dataset.level;
      renderRanking(currentLevel);
    });
  });

  // ランキングリセット
  clearBtn.addEventListener("click", function () {
    if (confirm(levelNames[currentLevel] + "\u306E\u30E9\u30F3\u30AD\u30F3\u30B0\u3092\u30EA\u30BB\u30C3\u30C8\u3057\u307E\u3059\u304B\uFF1F")) {
      localStorage.removeItem("classicQuizRanking_" + currentLevel);
      renderRanking(currentLevel);
    }
  });

  // 初期表示
  renderRanking(currentLevel);
})();
