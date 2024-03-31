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
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

class Translator {
    constructor() {
        this.langOption = document.querySelectorAll('select');
        this.fromText = document.querySelector('.fromText');
        this.transText = document.querySelector('.toTranslate');
        this.fromVoice = document.querySelector('.from');
        this.toVoice = document.querySelector('.to');
        this.copyBtn = document.querySelector('.bx-copy');
        this.countValue = document.querySelector('.code_length');
        this.exchangeLang = document.querySelector('.bx-transfer');
    }

    initializeLanguageOptions() {
        this.langOption.forEach((select, index) => {
            for (let countryCode in language) {
                let selected = '';
                if ((index === 0 && countryCode === 'en-GB') || (index === 1 && countryCode === 'uk-UA')) {
                    selected = 'selected';
                }
                let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
                select.insertAdjacentHTML('beforeend', option);
            }
        });
    }

    translateText() {
        this.fromText.addEventListener('input', () => {
            let content = this.fromText.value;
            let formContent = this.langOption[0].value;
            let transContent = this.langOption[1].value;

            let transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${formContent}|${transContent}`;

            fetch(transLINK)
                .then(response => response.json())
                .then(data => {
                    this.transText.value = data.responseData.translatedText;
                });
        });
    }

    speakText() {
        this.fromVoice.addEventListener('click', () => {
            let formTalk = new SpeechSynthesisUtterance(this.fromText.value);
            formTalk.lang = this.langOption[0].value;
            speechSynthesis.speak(formTalk);
        });

        this.toVoice.addEventListener('click', () => {
            let formTalk = new SpeechSynthesisUtterance(this.transText.value);
            formTalk.lang = this.langOption[1].value;
            speechSynthesis.speak(formTalk);
        });
    }

    copyTranslatedText() {
        this.copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(this.transText.value);
        });
    }

    updateCharacterCount() {
        this.fromText.addEventListener('keyup', () => {
            this.countValue.innerHTML = `${this.fromText.value.length}/5,000`;
        });
    }

    exchangeLanguages() {
        this.exchangeLang.addEventListener('click', () => {
            let tempText = this.fromText.value;
            this.fromText.value = this.transText.value;
            this.transText.value = tempText;

            let tempOpt = this.langOption[0].value;
            this.langOption[0].value = this.langOption[1].value;
            this.langOption[1].value = tempOpt;
        });
    }
}

module.exports = Translator;
