import {
    mail_data,
    getToday
} from "./mail_data.js"

const mails = []
const mail_types = ["all", "inbox", "sent"]
let current_type = "all"

const search_mail = document.querySelector("#search_mail")
const recipient_input = document.querySelector("#recipient_input")
const subject_input = document.querySelector("#subject_input")
const content_input = document.querySelector("#content_input")
const search_bar = document.querySelector(".search-bar")
const menu_items = document.querySelectorAll(".item")

window.onload = () => {
    for (let i = 0; i < mail_data.length; i++) {
        let { writer, subject, date, type } = mail_data[i]
        addMail(writer, subject, date, type)
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
    document.querySelectorAll(".button.close").forEach(e => e.addEventListener("click",
        () => document.querySelectorAll(".black").forEach(e1 => e1.style.visibility = "hidden")))
    document.querySelector(".button.send").addEventListener("click", () => {
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

        addMail("Me", subject_input.value, getToday(), "sent")

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
            if (mails[indexes[i]].classList.contains(current_type)) {
                mails[indexes[i]].style.display = "flex"
            }
        } else {
            mails[indexes[i]].style.display = "flex"
        }
    }
}

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
    document.querySelector("#write_mail").style.visibility = visibility ? "visible" : "hidden"
}

function addMail(writer, subject, date, type) {
    if (mail_types.includes(type)) {
        const mail_dom = `
            <span class="name">${writer}</span>
            <span class="subject">${subject}</span>
            <span class="date">${date}</span>
        `
        const mail = document.createElement("div")
        mail.classList.add("mail", type)
        mail.innerHTML = mail_dom
        mail.addEventListener("mouseover", () => mail.classList.add("shadow"))
        mail.addEventListener("mouseout", () => mail.classList.remove("shadow"))
        
        document.querySelector(".mails").prepend(mail)
        mails.push(mail)

        let index = mails.length - 1
        mail.addEventListener("click", () => viewMail(mail_data[index]))
    }
}

function viewMail(mail) {
    document.querySelector(".mail-subject").textContent = mail["subject"]
    document.querySelector(".mail-content .text").innerHTML = mail["content"]
    document.querySelector(".writer .display-name").textContent = mail["writer"]
    document.querySelector(".writer .email").textContent = mail["writer-email"]

    let receivers = document.querySelectorAll(".mail-receiver .receiver")
    if (receivers != null) {
        receivers.forEach(e => document.querySelector(".mail-receiver").removeChild(e))
    }

    let createReceiverSpan = (display_name, email) => {
        let receiver_dom = `<span class="display-name">${display_name}</span>
        <span class="email">${email}</span>`
        let receiver_span = document.createElement("span")
        receiver_span.innerHTML = receiver_dom
        receiver_span.classList.add("receiver")
        return receiver_span
    }

    if (typeof mail["receiver"] == "object") {
        for (let i = 0; i < mail["receiver"].length; i++) {
            document.querySelector(".mail-receiver").appendChild(createReceiverSpan(mail["receiver"][i], mail["receiver-email"][i]))
        }
    } else {
        document.querySelector(".mail-receiver").appendChild(createReceiverSpan(mail["receiver"], mail["receiver-email"]))
    }

    document.querySelector("#view_mail").style.visibility = "visible"
}
