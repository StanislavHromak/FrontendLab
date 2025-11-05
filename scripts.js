// 1. Виведення девізу компанії
document.addEventListener("DOMContentLoaded", function() {
  const slogan = "Розширюємо горизонти космосу!";
  const sloganElement = document.getElementById("slogan");
  let index = 0;

  function typeWriter() {
    if (index < slogan.length) {
      sloganElement.textContent += slogan.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }

  // Стиль
  sloganElement.style.color = "darkred";
  sloganElement.style.fontWeight = "700";
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

// 4. Модальне вікно із загадкою ---
document.addEventListener("DOMContentLoaded", () => {
  const founderPhoto = document.getElementById("founder-photo");

  founderPhoto.addEventListener("mouseenter", () => {
    alert("🧩 Загадка від Івана Петренка:");
    const answer = prompt("Я вириваюсь із Землі, щоб не впасти назад. Мене створюють люди, щоб дістатись зірок. Хто я?");

    if (answer === null) {
      alert("Ви скасували відповідь. Може, наступного разу 😉");
      return;
    }

    if (answer.trim().toLowerCase() === "ракета") {
      alert("✅ Правильно!");
    } else {
      const tryAgain = confirm("❌ Неправильно. Хочете спробувати ще раз?");
      if (tryAgain) {
        // якщо користувач хоче спробувати ще — запустимо загадку знову
        founderPhoto.dispatchEvent(new Event("mouseenter"));
      } else {
        alert("Дякуємо за спробу! 🚀");
      }
    }
  });
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
