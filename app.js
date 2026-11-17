let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let selectedSongId = null;

const SONGS = {
    "1": {
        title: "Кукушка",
        artist: "Виктор Цой",
        icon: "🎸",
        instrument: "Гитара",
        notes: "Em, Am, D, C — бой «шестёрка»",
        days: 14,
        plan: [
            "Выучи аккорды Em, Am, D, C",
            "Отработай переходы между аккордами",
            "Играй куплет медленно (60 BPM)",
            "Добавь бой «шестёрка»",
            "Соедини куплет и припев"
        ]
    },
    "2": {
        title: "Пачка сигарет",
        artist: "Виктор Цой",
        icon: "🎸",
        instrument: "Гитара",
        notes: "Am, F, C, G — бой «четвёрка»",
        days: 21,
        plan: [
            "Выучи аккорды Am, F, C, G",
            "Освой баррэ F",
            "Играй медленно под метроном",
            "Добавь бой «четвёрка»",
            "Спой вместе с игрой"
        ]
    },
    "3": {
        title: "Миллион алых роз",
        artist: "Раймонд Паулс",
        icon: "🎹",
        instrument: "Пианино",
        notes: "Am, Dm, E7, Am — аккомпанемент",
        days: 30,
        plan: [
            "Выучи левую руку (бас)",
            "Выучи правую руку (мелодия)",
            "Соедини руки медленно",
            "Добавь динамику",
            "Играй целиком"
        ]
    },
    "4": {
        title: "Shape of You",
        artist: "Ed Sheeran",
        icon: "🪕",
        instrument: "Укулеле",
        notes: "Am, F, C, G — бой «вниз-вверх»",
        days: 10,
        plan: [
            "Выучи 4 аккорда",
            "Отработай ритм",
            "Играй куплет",
            "Добавь припев",
            "Соедини всё"
        ]
    },
    "5": {
        title: "Nothing Else Matters",
        artist: "Metallica",
        icon: "🎸",
        instrument: "Гитара",
        notes: "Em, Am, C, D — перебор",
        days: 25,
        plan: [
            "Выучи перебор",
            "Выучи аккорды",
            "Соедини перебор и аккорды",
            "Играй вступление",
            "Играй всю песню"
        ]
    }
};

const cards = document.querySelectorAll('.card');
const overlay = document.getElementById('sheet-overlay');
const sheet = document.getElementById('song-sheet');
const sheetClose = document.getElementById('sheet-close');

const sheetIcon = document.getElementById('sheet-icon');
const sheetTitle = document.getElementById('sheet-title');
const sheetArtist = document.getElementById('sheet-artist');
const sheetInstrument = document.getElementById('sheet-instrument');
const sheetDays = document.getElementById('sheet-days');
const sheetNotes = document.getElementById('sheet-notes');
const sheetPlan = document.getElementById('sheet-plan');

function openSheet(songId) {
    const song = SONGS[songId];
    if (!song) return;

    sheetIcon.textContent = song.icon;
    sheetTitle.textContent = song.title;
    sheetArtist.textContent = song.artist;
    sheetInstrument.textContent = song.instrument;
    sheetDays.textContent = song.days + " дней";
    sheetNotes.textContent = song.notes;

    sheetPlan.innerHTML = "";
    song.plan.forEach(function (step) {
        const li = document.createElement('li');
        li.textContent = step;
        sheetPlan.appendChild(li);
    });

    overlay.classList.add('visible');
    sheet.classList.add('visible');
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function closeSheet() {
    overlay.classList.remove('visible');
    sheet.classList.remove('visible');
}

overlay.addEventListener('click', closeSheet);
sheetClose.addEventListener('click', closeSheet);

cards.forEach(function (card) {
    card.addEventListener('click', function () {
        const songId = card.getAttribute('data-id');
        const song = SONGS[songId];
        if (!song) return;

        if (selectedSongId === songId) {
            card.classList.remove('selected');
            tg.MainButton.hide();
            selectedSongId = null;
            closeSheet();
            return;
        }

        cards.forEach(function (c) { c.classList.remove('selected'); });
        card.classList.add('selected');
        selectedSongId = songId;

        openSheet(songId);

        tg.MainButton.setText('Получить путь для «' + song.title + '»');
        tg.MainButton.show();

        if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
    });
});

Telegram.WebApp.onEvent("mainButtonClicked", function () {
    if (selectedSongId) {
        tg.sendData(selectedSongId);
    }
});