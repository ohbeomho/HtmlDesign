import {
    mail_data,
    getToday,
    me
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
        let {
            writer,
            subject,
            date,
            type
        } = mail_data[i]
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

    document.querySelector("#dark_mode").addEventListener("change", () => document.body.classList.toggle("darkmode"))
    document.querySelector(".button.search").addEventListener("click", searchMail)
    document.querySelector(".button.write").addEventListener("click", () => modalVis(true, "write_mail"))
    document.querySelector(".button.settings").addEventListener("click", () => modalVis(true, "settings"))
    document.querySelector(".button.reset-settings").addEventListener("click", () => {
        document.querySelector("#dark_mode").checked = false
        document.body.classList.remove("darkmode")
    })
    document.querySelectorAll(".button.close").forEach(e => e.addEventListener("click",
        () => document.querySelectorAll(".modal").forEach(e1 => modalVis(false, e1.id))))
    document.querySelector(".button.send").addEventListener("click", () => {
        let recipient_email = [...new Set(recipient_input.value.split(/\s+/))]
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
        recipient_email.forEach(element => {
            if (!email_regex.test(element)) {
                is_email = false
                return
            }
        })
        let recipient = []
        recipient_email.forEach(element => recipient.push(element.split("@")[0][0].toUpperCase() + element.split("@")[0].slice(1)))

        if (!is_email) {
            errorMessage("Please enter recipient(s) in email format.")
            return
        }

        addMail("Me", subject_input.value, getToday(), "sent")
        writeMail(recipient, recipient_email, subject_input.value, content_input.value, getToday(), "sent")
        console.log(recipient)

        errorMessage("")
        recipient_input.value = ""
        subject_input.value = ""
        content_input.value = ""
        modalVis(false, "write_mail")
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
        if (mail_data[i].subject.includes(search_subject)) {
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

function modalVis(visibility, id) {
    document.querySelector("#" + id).style.visibility = visibility ? "visible" : "hidden"
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
        mail.addEventListener("mouseover", () => mail.classList.add("hshadow"))
        mail.addEventListener("mouseout", () => mail.classList.remove("hshadow"))

        document.querySelector(".mails").prepend(mail)
        mails.push(mail)

        let index = mails.length - 1
        mail.addEventListener("click", () => viewMail(mail_data[index]))
    }
}

function writeMail(recipient, recipient_email, subject, content, date, type) {
    mail_data.push({
        writer: "Me",
        writer_email: me.email,
        recipient,
        recipient_email,
        subject,
        content,
        date,
        type
    })
}

function viewMail(mail) {
    document.querySelector("#view_mail .title").textContent = mail.subject
    document.querySelector(".mail-content .text").innerHTML = mail.content
    document.querySelector(".writer .display-name").textContent = mail.writer
    document.querySelector(".writer .email").textContent = mail.writer_email

    let recipient = document.querySelectorAll(".mail-recipient .recipient")
    if (recipient != null) {
        recipient.forEach(e => document.querySelector(".mail-recipient").removeChild(e))
    }

    let createRecipientSpan = (display_name, email) => {
        let recipient_dom = `<span class="display-name">${display_name}</span>
        <span class="email">${email}</span>`
        let recipient_span = document.createElement("span")
        recipient_span.innerHTML = recipient_dom
        recipient_span.classList.add("recipient")
        return recipient_span
    }

    if (typeof mail.recipient == "object") {
        for (let i = 0; i < mail.recipient.length; i++) {
            document.querySelector(".mail-recipient").appendChild(createRecipientSpan(mail.recipient[i], mail.recipient_email[i]))
        }
    } else {
        document.querySelector(".mail-recipient").appendChild(createRecipientSpan(mail.recipient, mail.recipient_email))
    }

    modalVis(true, "view_mail")
}