// 1. Виведення девізу компанії
document.addEventListener("DOMContentLoaded", function() {
  const slogan = "Від Землі — до зірок!";
  const sloganElement = document.getElementById("slogan");
  let index = 0;

  function typeWriter() {
    if (index < slogan.length) {
      sloganElement.textContent += slogan.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }

  const baseFontWeight = 500;
  const requiredFactor = 1.2;
  const calculatedFontWeight = baseFontWeight * requiredFactor;

  sloganElement.style.color = "darkred";
  sloganElement.style.fontWeight = calculatedFontWeight.toString();
  sloganElement.style.fontSize = "1.8em";

  typeWriter();
});

// 2. Карусель
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(document.querySelectorAll('.carousel-item'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const viewport = document.querySelector('.carousel-viewport');

  if (!track || items.length === 0) return;

  let index = 0;
  let itemGap = parseInt(getComputedStyle(track).gap) || 16;

  function updateLayout() {
    const itemWidth = items[0].getBoundingClientRect().width;
    itemGap = parseInt(getComputedStyle(track).gap) || 16;
    return itemWidth + itemGap;
  }

  function goToIndex(i) {
    const step = updateLayout();
    index = (i + items.length) % items.length;
    const offset = step * index;
    track.style.transform = `translateX(-${offset}px)`;
  }

  prevBtn.addEventListener('click', () => {
    goToIndex(index - 1);
    resetAuto();
  });
  nextBtn.addEventListener('click', () => {
    goToIndex(index + 1);
    resetAuto();
  });

  // автопрокрутка
  let intervalId = null;
  function startAuto() {
    if (intervalId) return;
    intervalId = setInterval(() => {
      goToIndex(index + 1);
    }, 3000);
  }
  function stopAuto() {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  }
  function resetAuto() {
    stopAuto();
    startAuto();
  }

  // Паузи при наведенні
  viewport.addEventListener('mouseenter', stopAuto);
  viewport.addEventListener('mouseleave', startAuto);
  prevBtn.addEventListener('mouseenter', stopAuto);
  prevBtn.addEventListener('mouseleave', startAuto);
  nextBtn.addEventListener('mouseenter', stopAuto);
  nextBtn.addEventListener('mouseleave', startAuto);

  window.addEventListener('resize', () => {
    goToIndex(index);
  });

  goToIndex(0);
  startAuto();
});

// 3. tooltip
document.addEventListener("DOMContentLoaded", () => {
  const commentField = document.getElementById("comment");

  const tooltip = document.createElement("span");
  tooltip.textContent = "Вдячні за Ваш час! Конкретизуйте мету звернення, будь ласка.";
  tooltip.style.position = "absolute";
  tooltip.style.background = "#333";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "5px 10px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.fontSize = "0.9em";
  tooltip.style.display = "none";
  tooltip.style.marginLeft = "10px";
  tooltip.style.top = "10px";
  tooltip.style.left = "100%";


  commentField.parentNode.style.position = "relative";
  commentField.insertAdjacentElement("afterend", tooltip);

  commentField.addEventListener("mouseenter", () => {
    commentField.style.backgroundColor = "#222";
    commentField.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)";
    commentField.style.border = "2px solid #fff";
    commentField.style.color = "#fff";
    tooltip.style.display = "inline-block";
  });
  commentField.addEventListener("mouseleave", () => {
    commentField.style.backgroundColor = "";
    commentField.style.boxShadow = "";
    commentField.style.border = "";
    commentField.style.color = "";
    tooltip.style.display = "none";
  });
});

// 4. Модальне вікно із загадкою (Виправлено на кастомний popup)
document.addEventListener("DOMContentLoaded", () => {
  const founderPhoto = document.getElementById("founder-photo");
  // Отримання посилань на нові елементи
  const modalOverlay = document.getElementById("riddle-modal-overlay");
  const closeBtn = document.querySelector("#riddle-modal .close-btn");
  const answerInput = document.getElementById("riddle-answer-input");
  const checkBtn = document.getElementById("riddle-check-btn");
  const feedbackText = document.getElementById("riddle-feedback");

  const correct_answer = "ракета";

  // Функція для відкриття модального вікна
  function openModal() {
    // Скидання попереднього стану при відкритті
    answerInput.value = "";
    feedbackText.textContent = "";
    feedbackText.classList.remove("correct", "incorrect");
    checkBtn.disabled = false; // Активувати кнопку перевірки
    modalOverlay.style.display = "flex";
  }

  // Функція для закриття модального вікна
  function closeModal() {
    modalOverlay.style.display = "none";
  }

  // Функція для перевірки відповіді
  function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();

    if (userAnswer === correct_answer) {
      feedbackText.textContent = "✅ Правильно! Дякуємо за відповідь! 🚀";
      feedbackText.classList.remove("incorrect");
      feedbackText.classList.add("correct");
      checkBtn.disabled = true;
      // Закриття вікна через 2 секунди після правильної відповіді
      setTimeout(closeModal, 2000);
    } else {
      feedbackText.textContent = "❌ Неправильно. Спробуйте ще раз.";
      feedbackText.classList.remove("correct");
      feedbackText.classList.add("incorrect");
    }
  }

  // Обробники подій
  if (founderPhoto && modalOverlay) {
    // 1. Відкриття вікна при наведенні
    founderPhoto.addEventListener("mouseenter", openModal);

    // 2. Закриття при кліку на кнопку закриття
    closeBtn.addEventListener("click", closeModal);

    // 3. Закриття при кліку на оверлей
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // 4. Перевірка відповіді при кліку на кнопку
    checkBtn.addEventListener("click", checkAnswer);

    // 5. Перевірка відповіді при натисканні Enter у полі вводу
    answerInput.addEventListener("keypress", (e) => {
      if (e.key === 'Enter' && !checkBtn.disabled) {
        checkAnswer();
      }
    });
  }
});

// --- 5. Автоматичне перемикання теми ---
function applyThemeByTime() {
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 13) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}
window.addEventListener("DOMContentLoaded", applyThemeByTime);
