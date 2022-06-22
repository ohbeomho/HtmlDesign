const username = $("#username"), email = $("#email"), password = $("#password"),
    confirmPassword = $("#confirmPassword")
const error = $(".error")

function check() {
    let inputs = [username, email, password, confirmPassword]

    for (let i = 0; i < inputs.length; i++) {
        let e = $(inputs[i])

        if (e.val() == "") {
            error.text(`Please fill in the '${e.prop("id")[0].toUpperCase() + e.prop("id").slice(1)}' field.`)
            return
        }
    }

    if (password.val() != confirmPassword.val()) {
        error.text("Passwords do not match.")
        return
    }

    location.href = "./login.html"
}