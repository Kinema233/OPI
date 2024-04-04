const express = require('express');

class UserInterface {
    constructor() {
        this.loggedIn = false;
    }

    login(req) {
        this.loggedIn = true;
        console.log('Користувач увійшов до аккаунту.');
        return 'Користувач увійшов до аккаунту.';
    }

    logout(req) {
        this.loggedIn = false;
        console.log('Користувач вийшов з аккаунту.');
        return 'Користувач вийшов з аккаунту.';
    }

    signup(req) {
        this.loggedIn = true;
        console.log('Користувач зареєструвався та увійшов до аккаунту.');
        return 'Користувач зареєструвався та увійшов до аккаунту.';
    }
}

const userInterface = new UserInterface();

const app = express();

app.post('/logout', (req, res) => {
    const message = userInterface.logout(req);
    res.send(message);
});

app.post('/login', (req, res) => {
    const message = userInterface.login(req);
    res.send(message);
});

app.post('/signup', (req, res) => {
    const message = userInterface.signup(req);
    res.send(message);
});

app.listen(3000, () => {
    console.log('Сервер запущено на порті 3000');
});

