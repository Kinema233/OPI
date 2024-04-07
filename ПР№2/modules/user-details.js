const express = require('express');

class UserInterface {
    constructor() {
        this.loggedIn = false;
    }

    toggleUserDetails() {
        if (this.userIsLoggedIn()) {
            this.showUserProfile();
        } else {
            console.log('Зареєструйтесь або увійдіть до аккаунту.');
        }
    }

    userIsLoggedIn() {
        return this.loggedIn;
    }

    showUserProfile() {
        console.log('Ім\'я користувача та кнопка "Вийти з аккаунту"');
    }

    logout() {
        this.loggedIn = false;
        console.log('Ви вийшли з аккаунту.');
    }
}

// Створення екземпляру класу UserInterface для використання в мікросервісі
const userInterface = new UserInterface();
const app = express();

app.use(express.json());

// Обробник маршруту POST /logout для виходу з аккаунту користувача
app.post('/logout', (req, res) => {
    const message = userInterface.logout(req);
    res.send(message);
});

// Прослуховування запитів на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});
