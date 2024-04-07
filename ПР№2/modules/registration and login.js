const express = require('express');

// Клас для управління станом входу користувача
class UserInterface {
    constructor() {
        this.loggedIn = false;
    }

    // Метод для входу користувача
    login(req) {
        this.loggedIn = true;
        console.log('Користувач увійшов до аккаунту.');
        return 'Користувач увійшов до аккаунту.';
    }

    // Метод для виходу користувача
    logout(req) {
        this.loggedIn = false;
        console.log('Користувач вийшов з аккаунту.');
        return 'Користувач вийшов з аккаунту.';
    }

    // Метод для реєстрації нового користувача
    signup(req) {
        this.loggedIn = true;
        console.log('Користувач зареєструвався та увійшов до аккаунту.');
        return 'Користувач зареєструвався та увійшов до аккаунту.';
    }
}

// Створення екземпляру класу UserInterface для керування входом користувачів
const userInterface = new UserInterface();
const app = express();

app.use(express.json());

// Обробник маршруту POST /logout для виходу користувача
app.post('/logout', (req, res) => {
    const message = userInterface.logout(req);
    res.send(message);
});

// Обробник маршруту POST /login для входу користувача
app.post('/login', (req, res) => {
    const message = userInterface.login(req);
    res.send(message);
});

// Обробник маршруту POST /signup для реєстрації нового користувача
app.post('/signup', (req, res) => {
    const message = userInterface.signup(req);
    res.send(message);
});

// Прослуховування запитів на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});
