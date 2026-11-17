let tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем окно на весь экран

// Настройка MainButton (главной кнопки внизу)
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let selectedSongId = null; // Здесь храним ID выбранной песни

// Находим все карточки
const cards = document.querySelectorAll('.card');

// Добавляем обработчик клика на каждую карточку
cards.forEach(card => {
    card.addEventListener('click', () => {
        const songId = card.getAttribute('data-id');
        const songTitle = card.querySelector('.card-title').innerText;

        // Если нажали на ту же самую карточку повторно - отменяем выбор
        if (selectedSongId === songId) {
            card.classList.remove('selected');
            tg.MainButton.hide();
            selectedSongId = null;
            return;
        }

        // Убираем выделение со всех карточек
        cards.forEach(c => c.classList.remove('selected'));

        // Выделяем текущую карточку
        card.classList.add('selected');
        selectedSongId = songId;

        // Показываем MainButton
        tg.MainButton.setText(`Получить путь для «${songTitle}»`);
        tg.MainButton.show();
    });
});

// Обработка нажатия на главную кнопку (внизу экрана)
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    if (selectedSongId) {
        // Отправляем данные боту (строку с ID песни)
        tg.sendData(selectedSongId);
    }
});