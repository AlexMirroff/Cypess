class LoginForm {

    get title() {
        return cy.contains("app-signin-modal h4", "Log in");
    }

    get emailField() {
        return cy.get("#signinEmail");
    }

    get passwordField() {
        return cy.get("#signinPassword");
    }

    get loginButton() {
        return cy.get(".modal-footer .btn-primary");
    }

    enterEmail(email) {
        this.emailField.type(email);
    }

    enterPassword(password) {
        this.passwordField.type(password);
    }

    clickLoginButton() {
        this.loginButton.click();
    }

    signInWithCredentials(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLoginButton();
    }
}

export default new LoginForm();