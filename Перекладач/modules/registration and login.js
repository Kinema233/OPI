class UserInterface {
    constructor() {
        this.avatar = document.querySelector('.avatar');
        this.userDetails = document.querySelector('.user-details');
        this.userNameElement = document.getElementById('user-name');
        this.userEmailElement = document.getElementById('user-email');
        this.logoutButton = document.createElement('button');
        this.logoutButton.textContent = 'Вийти з аккаунту';
        this.logoutButton.addEventListener('click', this.logout.bind(this));
        this.avatar.addEventListener('click', this.toggleUserDetails.bind(this));
        this.loggedIn = false;
    }

    toggleUserDetails() {
        if (this.userDetails.style.display === 'none' || this.userDetails.style.display === '') {
            this.userDetails.style.display = 'block';
            if (this.userIsLoggedIn()) {
                this.showUserProfile();
            } else {
                this.userNameElement.innerText = 'Зареєструйтесь';
                this.userEmailElement.style.display = 'none';
                this.logoutButton.style.display = 'none';
                this.showLoginAndSignupButtons();
            }
        } else {
            this.userDetails.style.display = 'none';
        }
    }

    userIsLoggedIn() {
        return this.loggedIn;
    }

    showUserProfile() {
        this.userNameElement.innerText = 'Ім\'я користувача';
        this.userEmailElement.style.display = 'none';
        this.logoutButton.style.display = 'block';
    }

    logout() {
        this.loggedIn = false;
        console.log('Ви вийшли з аккаунту.');
        this.toggleUserDetails();
    }

    showLoginAndSignupButtons() {
        const loginButton = document.createElement('button');
        loginButton.textContent = 'Увійти';
        loginButton.addEventListener('click', this.login.bind(this));
        const signupButton = document.createElement('button');
        signupButton.textContent = 'Зареєструватися';
        signupButton.addEventListener('click', this.signup.bind(this));
        this.userDetails.appendChild(loginButton);
        this.userDetails.appendChild(signupButton);
    }

    login() {
        // Логіка для входу користувача
        this.loggedIn = true;
        console.log('Користувач увійшов до аккаунту.');
        this.toggleUserDetails();
    }

    signup() {
        // Логіка для реєстрації користувача
        this.loggedIn = true;
        console.log('Користувач зареєструвався та увійшов до аккаунту.');
        this.toggleUserDetails();
    }
}

const userInterface = new UserInterface();
document.querySelector('.user-details').appendChild(userInterface.logoutButton);
