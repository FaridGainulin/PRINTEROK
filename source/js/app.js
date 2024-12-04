function initAnchorBtn() {
  $('[data-scroll-top]').on('click', function () {
    $('.modal-scrollable').animate(
      {
        scrollTop: 0,
      },
      1000,
    )
  })
}

function filterInvalidCharacters() {
  $('input[name="name"]').on('input', function() {
    let value = $(this).val();
    $(this).val(value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, ''));
  });
}

function cityProgress(e) {
  e.preventDefault()
  if (!$(this).valid()) {
    return
  }
  var $input = $(this).find('.js-input-city')
  var $progress = $(this).find('.js-input-city-progress')
  var $percent = $(this).find('.js-input-city-percent')
  var value = 0
  var max = 100

  $input.addClass('active')

  var interval = setInterval(function () {
    value++
    $percent.text(value + '%')
    $progress.css({
      width: value + '%',
    })
    if (value === max) {
      clearInterval(interval)
      setTimeout(function () {
        $input.removeClass('active')
        $('[data-remodal-id=modal-form-city]').remodal().open()
      }, 700)
    }
  }, 40)
}

function initCityForm() {
  $('[data-city-form]').on('submit', cityProgress)
}

$(document).ready(function () {
  initAnchorBtn()
  filterInvalidCharacters()
  initCityForm()

  $('input').inputmask()
})




// const cards = document.querySelectorAll('.card-quantity');
// const input = document.getElementById('quantityInput');

// cards.forEach(card => {
//   card.addEventListener('click', () => {
//     cards.forEach(c => c.classList.remove('active'));
//     card.classList.add('active');
//     input.value = card.dataset.quantity;
//   });
// });



//////////////////////////////////////////////////////////////////////
//number animation
//////////////////////////////////////////////////////////////////////
// function animateCounter(counter) {
//   const target = +counter.getAttribute('data-number-animation');
//   const speed = 200;
//   let current = 0;

//   const increment = Math.ceil(target / speed);

//   const updateCounter = () => {
//     current += increment;
//     if (current > target) {
//       counter.textContent = target;
//     } else {
//       counter.textContent = current;
//       requestAnimationFrame(updateCounter);
//     }
//   };

//   updateCounter();
// }

// const counters = document.querySelectorAll('.counter');
// const observer = new IntersectionObserver(
//   (entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         animateCounter(entry.target);
//         observer.unobserve(entry.target);
//       }
//     });
//   },
//   {
//     // threshold: 0.5,
//     threshold: 1,
//   }
// );

// counters.forEach(counter => observer.observe(counter));
////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("population-select");
  const slider = document.getElementById("range-slider");
  const result = document.getElementById("result");
  const labels = document.querySelectorAll(".slider-labels span");

  // Цены для разных населений (в рублях)
  const prices = {
    "0": 0,
    "500000": 116000,
    "1000000": 159000,
    "1000001": 220000,
  };

  // Функция для обновления активного состояния
  function updateActiveLabel(position) {
    labels.forEach(label => label.classList.remove("active"));
    labels[position - 1].classList.add("active");
  }

  // Функция для обновления результата
  function updateResult() {
    const population = select.value;
    const months = Number(slider.value) * 3; // Позиции: 1 = 3 месяца, 2 = 6 месяцев...
    const basePrice = prices[population];
    const total = basePrice * months;
    result.textContent = `${total.toLocaleString()}`;
    updateActiveLabel(Number(slider.value));
  }

  // Событие для изменения результата при клике на метки
  labels.forEach(label => {
    label.addEventListener("click", () => {
      const index = Number(label.getAttribute("data-index"));
      slider.value = index;
      updateResult();
    });
  });

  // Событие для изменения результата при изменении ползунка или селекта
  select.addEventListener("change", updateResult);
  slider.addEventListener("input", updateResult);

  // Инициализация значения по умолчанию
  updateResult();
});



const slider = document.getElementById("range-slider");
const labels = document.querySelectorAll(".slider-labels span");

// Функция для обновления фона
const updateSliderBackground = () => {
  const min = parseInt(slider.min); // Минимальное значение (1)
  const max = parseInt(slider.max); // Максимальное значение (8)
  const value = parseInt(slider.value); // Текущее значение

  // Вычисляем процент
  const percentage = ((value - min) / (max - min)) * 100;

  // Обновляем фон
  slider.style.background = `linear-gradient(to right, #008dd2 ${percentage}%, rgba(1, 189, 240, 0.2) ${percentage}%)`;
};

// Сразу обновляем фон
updateSliderBackground();

// Обработчик для ползунка
slider.addEventListener("input", updateSliderBackground);

// Обработчик для кликов по цифрам
labels.forEach((label, index) => {
  label.addEventListener("click", () => {
    slider.value = index + 1; // Устанавливаем значение ползунка
    updateSliderBackground(); // Обновляем фон
  });
});
