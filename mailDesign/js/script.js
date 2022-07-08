import {
    mail_data,
    getToday,
    me
} from "./mail_data.js"

const mails = []
const mail_types = ["all", "inbox", "sent"]
let current_type = "all"

const search_mail = $("#search_mail")
const recipient_input = $("#recipient_input")
const subject_input = $("#subject_input")
const content_input = $("#content_input")
const search_bar = $(".search-bar")
const menu_items = $(".item")

$(function () {
    for (let i = 0; i < mail_data.length; i++) {
        let {
            writer,
            subject,
            date,
            type
        } = mail_data[i]
        addMail(writer, subject, date, type)
    }

    $("#profile .name").text(me.name)
    $("#profile .email").text(me.email)

    search_mail.focus(() => search_bar.addClass("focus shadow"))
    search_mail.blur(() => search_bar.removeClass("focus shadow"))
    search_mail.keydown(event => {
        if (event.which == 13) {
            searchMail()
        }
    })

    menu_items.each(function () {
        let element = this
        $(element).click(() => {
            $(".mail-text").text($(element).innerText)
            search_mail.val("")

            current_type = getClassList(element)[1]

            menu_items.each(function () {
                $(this).removeClass("selected")
            })
            $(element).addClass("selected")

            $(".mail").each(function () {
                if ($(this).hasClass(current_type)) {
                    $(this).css("display", "flex")
                } else {
                    $(this).css("display", "none")
                }
            })

            if ($(element).hasClass("all")) {
                mailDisplay("flex")
            }
        })
    })

    $("#dark_mode").on("change", () => $("body").toggleClass("darkmode"))
    $(".button.search").click(searchMail)
    $(".button.write").click(() => modalVis(true, "write_mail"))
    $(".button.settings").click(() => modalVis(true, "settings"))
    $(".button.profile").click(() => modalVis(true, "profile"))
    $(".button.reset-settings").click(() => {
        $("#dark_mode").checked = false
        $("body").removeClass("darkmode")
    })
    $(".button.close").each(function () {
        $(this).click(() => $(".modal").each(function () {
            modalVis(false, $(this).prop("id"))
        }))
    })
    $(".button.send").click(() => {
        let recipient_email = [...new Set(recipient_input.val().split(/\s+/))]
        const email_regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

        if (recipient_input.val() == "") {
            errorMessage("Please enter recipient(s) of the mail.")
            return
        } else if (subject_input.val() == "") {
            errorMessage("Please enter the subject of the mail.")
            return
        } else if (content_input.val() == "") {
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

        addMail("Me", subject_input.val(), getToday(), "sent")
        writeMail(recipient, recipient_email, subject_input.val(), content_input.val(), getToday(), "sent")

        errorMessage("")
        recipient_input.val("")
        subject_input.val("")
        content_input.val("")
        modalVis(false, "write_mail")
    })
})

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
    $(".mail").each(function () {
        $(this).css("display", display_name)
    })
}

function errorMessage(message) {
    $(".error").text(message)
}

function modalVis(visibility, id) {
    $(".modal#" + id).css("visibility", visibility ? "visible" : "hidden")
}

function addMail(writer, subject, date, type) {
    if (mail_types.includes(type)) {
        const mail_dom = `
            <span class="name">${writer}</span>
            <span class="subject">${subject}</span>
            <span class="date">${date}</span>
        `
        const $mail = $(`<div class="mail ${type}"></div>`)
        $mail.html(mail_dom)
        $mail.hover(function () {
            $(this).toggleClass("hshadow")
        })

        $(".mails").prepend($mail)
        mails.push($mail)

        let index = mails.length - 1
        $mail.click(() => viewMail(mail_data[index]))
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
    $("#view_mail .title").text(mail.subject)
    $(".mail-content .text").html(mail.content)
    $(".writer .display-name").text(mail.writer)
    $(".writer .email").text(mail.writer_email)

    let recipient = $(".mail-recipient .recipient")
    if (recipient != null) {
        recipient.each(function () {
            $(this).remove()
        })
    }

    let createRecipientSpan = (display_name, email) => {
        let recipient_dom = `<span class="display-name">${display_name}</span>
        <span class="email">${email}</span>`
        let $recipient_span = $(`<span class="recipient"></span>`)
        $recipient_span.html(recipient_dom)
        return $recipient_span
    }

    if (typeof mail.recipient == "object") {
        for (let i = 0; i < mail.recipient.length; i++) {
            $(".mail-recipient").append(createRecipientSpan(mail.recipient[i], mail.recipient_email[i]))
        }
    } else {
        $(".mail-recipient").append(createRecipientSpan(mail.recipient, mail.recipient_email))
    }

    modalVis(true, "view_mail")
}

function getClassList(element) {
    return $(element).attr('class').split(/\s+/);
}