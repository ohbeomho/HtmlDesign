import {
    mail_data,
    me
} from "./mail_data.js"
import {
    month_31,
    getToday
} from "./date.js"

const mails = []
const mail_types = ["all", "inbox", "sent"]
let current_type = "all"
let search_by = "subject"
let search_date = {
    year: "",
    month: "",
    date: ""
}

const search_mail = $("#search_mail")
const receiver_input = $("#receiver_input")
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
        addMail(writer, subject, date.string, type)
    }

    $("#profile .name").text(me.name)
    $("#profile .email").text(me.email)

    let date = new Date()
    $("#search_year").prop("max", date.getFullYear())
    $("#search_month").prop("max", date.getMonth() + 1)
    if (date.getMonth() + 1 == 2) {
        $("#search_date").prop("max", 28)
    } else if (month_31.includes(date.getMonth + 1)) {
        $("#search_date").prop("max", 31)
    } else {
        $("#search_date").prop("max", 30)
    }

    $("#search_by").on("change", function () {
        search_by = $(this).children("option:selected").val()
    })
    $("#search_year").on("change", function () {
        search_date.year = $(this).val()
    })
    $("#search_month").on("change", function () {
        search_date.month = $(this).val()
    })
    $("#search_date").on("change", function () {
        search_date.date = $(this).val()
    })

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
            $(".mail-text").text($(element).text())
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
        $("#dark_mode").prop("checked", false)
        $("body").removeClass("darkmode")
    })
    $(".button.search-filter").click(() => modalVis(true, "search_filter"))
    $(".button.reset-search-filter").click(() => {
        $("#search_by").val("subject").prop("selected", true)
        $("#search_year").val("")
        $("#search_month").val("")
        $("#search_date").val("")

        search_by = "subject"
        for (let p in search_date) {
            search_date[p] = ""
        }
    })
    $(".button.close").each(function () {
        $(this).click(() => $(".modal").each(function () {
            modalVis(false, $(this).prop("id"))
        }))
    })
    $(".button.send").click(() => {
        let receiver_email = [...new Set(receiver_input.val().split(/\s+/))]
        const email_regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

        if (receiver_input.val() == "") {
            errorMessage("Please enter receiver(s) of the mail.")
            return
        } else if (subject_input.val() == "") {
            errorMessage("Please enter the subject of the mail.")
            return
        } else if (content_input.val() == "") {
            errorMessage("Please enter the content of the mail")
            return
        }

        let is_email = true
        receiver_email.forEach(element => {
            if (!email_regex.test(element)) {
                is_email = false
                return
            }
        })
        let receiver = []
        receiver_email.forEach(element => receiver.push(element.split("@")[0][0].toUpperCase() + element.split("@")[0].slice(1)))

        if (!is_email) {
            errorMessage("Please enter receiver(s) in email format.")
            return
        }

        addMail("Me", subject_input.val(), getToday().string, "sent")
        writeMail(receiver, receiver_email, subject_input.val(), content_input.val(), getToday(), "sent")

        errorMessage("")
        receiver_input.val("")
        subject_input.val("")
        content_input.val("")
        modalVis(false, "write_mail")
    })
})

function searchMail() {
    let indexes = search(search_mail.val())

    mailDisplay("none")

    if (indexes == -1) {
        return
    }

    for (let i = 0; i < indexes.length; i++) {
        if (current_type != "all") {
            if (mails[indexes[i]].hasClass(current_type)) {
                mails[indexes[i]].css("display", "flex")
            }
        } else {
            mails[indexes[i]].css("display", "flex")
        }
    }
}

function search(search_subject) {
    let indexes = []

    for (let i = 0; i < mail_data.length; i++) {
        let flag = false

        if (typeof mail_data[i][search_by] != "object") {
            if (mail_data[i][search_by].includes(search_subject)) {
                flag = true
            }
        } else {
            mail_data[i][search_by].forEach(item => {
                if (item.includes(search_subject)) {
                    flag = true
                }
            })
        }

        if (flag) {
            for (let p in search_date) {
                if (search_date[p] == "") {
                    continue
                }

                if (search_date[p] != mail_data[i].date[p]) {
                    flag = false
                    break
                }
            }
        } else {
            continue
        }

        if (flag) {
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
            <span class="name">${writer == me.name ? "Me" : writer}</span>
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

function writeMail(receiver, receiver_email, subject, content, date, type) {
    mail_data.push({
        writer: me.name,
        writer_email: me.email,
        receiver,
        receiver_email,
        subject,
        content,
        date,
        type
    })
}

function viewMail(mail) {
    $("#view_mail .title").text(mail.subject)
    $(".mail-content .text").html(mail.content)
    $(".writer .display-name").text(mail.writer == me.name ? mail.writer + " (Me)" : mail.writer)
    $(".writer .email").text(mail.writer_email)
    $(".mail-date").text(mail.date.string)

    let receiver = $(".mail-receiver .receiver")
    if (receiver != null) {
        receiver.each(function () {
            $(this).remove()
        })
    }

    let createReceiverSpan = (display_name, email) => {
        let receiver_dom = `<span class="display-name">${display_name == me.name ? display_name + " (Me)" : display_name}</span>
        <span class="email">${email}</span>`
        let $receiver_span = $(`<span class="receiver"></span>`)
        $receiver_span.html(receiver_dom)
        return $receiver_span
    }

    if (typeof mail.receiver == "object") {
        for (let i = 0; i < mail.receiver.length; i++) {
            $(".mail-receiver").append(createReceiverSpan(mail.receiver[i], mail.receiver_email[i]))
        }
    } else {
        $(".mail-receiver").append(createReceiverSpan(mail.receiver, mail.receiver_email))
    }

    modalVis(true, "view_mail")
}

function getClassList(element) {
    return $(element).attr('class').split(/\s+/);
}