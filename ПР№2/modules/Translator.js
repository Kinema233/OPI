const express = require('express');
const fetch = require('node-fetch');

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
};

class Translator {
    constructor() {}

    translateText(content, fromLang, toLang) {
        return new Promise((resolve, reject) => {
            const transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromLang}|${toLang}`;
            fetch(transLINK)
                .then(response => response.json())
                .then(data => resolve(data.responseData.translatedText))
                .catch(error => reject(error));
        });
    }
}

const translator = new Translator();
const app = express();

app.use(express.json());

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
