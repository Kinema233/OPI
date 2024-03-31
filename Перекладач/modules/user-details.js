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
        console.log('Ви вийшли з аккаунту.');
    }
}

const userInterface = new UserInterface();
document.querySelector('.user-details').appendChild(userInterface.logoutButton);
