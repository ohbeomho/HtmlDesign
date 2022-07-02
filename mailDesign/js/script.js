import mail_data from "./mail_data.js"

const mail_divs = []
let current_type = "all"

const search_mail = document.querySelector("#search_mail")
const recipient_input = document.querySelector("#recipient_input")
const subject_input = document.querySelector("#subject_input")
const content_input = document.querySelector("#content_input")
const search_bar = document.querySelector(".search-bar")
const menu_items = document.querySelectorAll(".item")
const write_mail = document.querySelector(".write-mail")

window.onload = () => {
    for (let i = 0; i < mail_data.length; i++) {
        const mail_dom = `
            <span class="name">${mail_data[i]["writer"]}</span>
            <span class="subject">${mail_data[i]["subject"]}</span>
            <span class="date">${mail_data[i]["date"]}</span>
        `
        const mail = document.createElement("div")
        mail.classList.add("mail", mail_data[i]["type"])
        mail.innerHTML = mail_dom
        mail.addEventListener("mouseover", () => mail.classList.add("shadow"))
        mail.addEventListener("mouseout", () => mail.classList.remove("shadow"))

        document.querySelector(".bottom .right").appendChild(mail)
        mail_divs.push(mail)
    }

    search_mail.addEventListener("focus", () => search_bar.classList.add("focus", "shadow"))
    search_mail.addEventListener("blur", () => search_bar.classList.remove("focus", "shadow"))
    search_mail.addEventListener("keydown", (event) => {
        if (event.keyCode == 13) {
            searchMail()
        }
    })

    menu_items.forEach(element => {
        element.addEventListener("click", () => {
            document.querySelector(".mail-text").innerText = element.innerText
            search_mail.value = ""

            current_type = element.classList[1]

            menu_items.forEach(element => element.classList.remove("selected"))
            element.classList.add("selected")

            document.querySelectorAll(".mail").forEach(element => {
                if (element.classList.contains(current_type)) {
                    element.style.display = "flex"
                } else {
                    element.style.display = "none"
                }
            })

            if (element.classList.contains("all")) {
                mailDisplay("flex")
            }
        })
    })

    document.querySelector(".button.search").addEventListener("click", searchMail)
    document.querySelector(".button.write").addEventListener("click", () => writeMailVis(true))
    document.querySelector(".button.close").addEventListener("click", () => writeMailVis(false))
    document.querySelector(".button.send").addEventListener("click", () => {
        // remove duplicate recipients
        let recipients = [...new Set(recipient_input.value.split(/\s+/))]
        const email_regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

        if (recipient_input.value == "") {
            errorMessage("Please enter recipient(s) of the mail.")
            return
        } else if (subject_input.value == "") {
            errorMessage("Please enter the subject of the mail.")
            return
        } else if (content_input.value == "") {
            errorMessage("Please enter the content of the mail")
            return
        }

        let is_email = true
        recipients.forEach(element => {
            if (!email_regex.test(element)) {
                is_email = false
                return
            }
        })
        
        if (!is_email) {
            errorMessage("Please enter recipient(s) in email format.")
            return
        }

        errorMessage("")
        recipient_input.value = ""
        subject_input.value = ""
        content_input.value = ""
        writeMailVis(false)
    })
}

function searchMail() {
    let indexes = search(search_mail.value)

    mailDisplay("none")

    if (indexes == -1) {
        return
    }

    for (let i = 0; i < indexes.length; i++) {
        if (current_type != "all") {
            if (mail_divs[indexes[i]].classList.contains(current_type)) {
                mail_divs[indexes[i]].style.display = "flex"
            }
        } else {
            mail_divs[indexes[i]].style.display = "flex"
        }
    }
}

// Returns the index of mails with 'search_subject' in the subject
function search(search_subject) {
    let indexes = []

    for (let i = 0; i < mail_data.length; i++) {
        if (mail_data[i]["subject"].includes(search_subject)) {
            indexes.push(i)
        }
    }

    if (indexes.length == 0) {
        return -1
    }

    return indexes
}

function mailDisplay(display_name) {
    document.querySelectorAll(".mail").forEach(element => element.style.display = display_name)
}

function errorMessage(message) {
    document.querySelector(".error").innerText = message
}

function writeMailVis(visibility) {
    document.querySelector(".write-mail").style.visibility = visibility ? "visible" : "hidden"
}
