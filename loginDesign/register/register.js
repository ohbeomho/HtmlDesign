const nameInput = $(".name-input"),
    emailInput = $(".email-input"),
    passwordInput = $(".password-input"),
    confirmPassword = $(".password-confirm-input")
const inputs = [ nameInput, emailInput, passwordInput, confirmPassword ]
const error = $(".error")

$(document).ready(() => {
    $(".button.register").click((event) => {
        event.preventDefault()
        checkInput()
    })

    nameInput.on("keydown", () => error.text(""))
    emailInput.on("keydown", () => error.text(""))
    passwordInput.on("keydown", () => error.text(""))
    confirmPassword.on("keydown", () => error.text(""))
})

function checkInput() {
    console.log("click")

    if (nameInput.val() == "") {
        nameInput.focus()
        error.text("Please enter nickname.")
        return
    } else if (emailInput.val() == "") {
        emailInput.focus()
        error.text("Please enter your email address.")
        return
    } else if (passwordInput.val() == "") {
        passwordInput.focus()
        error.text("Please enter password.")
        return
    } else if (confirmPassword.val() == "") {
        confirmPassword.focus()
        error.text("Please confirm your password.")
        return
    }

    if (passwordInput.val() != confirmPassword.val()) {
        error.text("Passwords do not match.")
        return
    }

    location.href = "../login/login.html"
}