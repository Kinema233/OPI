const express = require('express');
const fetch = require('node-fetch');

// Об'єкт, що містить відповідність мовних кодів і назв мов
const language = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    // Додайте інші мови за необхідності
};

// Клас Translator для виконання перекладу тексту
class Translator {
    constructor() {}

    // Метод для виконання перекладу тексту
    translateText(content, fromLang, toLang) {
        return new Promise((resolve, reject) => {
            // Побудова URL для запиту до API для перекладу
            const transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromLang}|${toLang}`;
            // Виконання запиту та обробка відповіді
            fetch(transLINK)
                .then(response => response.json())
                .then(data => resolve(data.responseData.translatedText))
                .catch(error => reject(error));
        });
    }
}

// Створення екземпляру класу Translator для використання в мікросервісі
const translator = new Translator();
const app = express();

app.use(express.json());

// Обробник маршруту POST /translate для виконання перекладу тексту
app.post('/translate', (req, res) => {
    const { content, fromLang, toLang } = req.body;
    // Виклик методу для виконання перекладу та відправка результату
    translator.translateText(content, fromLang, toLang)
        .then(translatedText => {
            res.json({ translatedText });
        })
        .catch(error => {
            res.status(500).json({ error: 'Translation failed' });
        });
});

// Прослуховування запитів на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});

app.post('/translate', (req, res) => {
    const { content, fromLang, toLang } = req.body;
    translator.translateText(content, fromLang, toLang)
        .then(translatedText => {
            res.json({ translatedText });
        })
        .catch(error => {
            res.status(500).json({ error: 'Translation failed' });
        });
});

app.listen(3000, () => {
    console.log('Сервер запущено на порті 3000');
});
