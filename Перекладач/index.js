const User = require('./User');
const Translator = require('./Translator');
const UserInterface = require('./user-details');

const main = () => {
    const user = new User();
    user.signup({ username: 'JohnDoe' });
    user.signin({ username: 'JohnDoe' });
    user.buySubscription({ duration: 1 });
    user.buySubscription({ duration: 6 });
    user.buySubscription({ duration: 2 });
    user.getSubscriptions();

    const translator = new Translator();
    translator.initializeLanguageOptions();
    translator.translateText();
    translator.speakText();
    translator.copyTranslatedText();
    translator.updateCharacterCount();
    translator.exchangeLanguages();

    const userInterface = new UserInterface();
}

main();