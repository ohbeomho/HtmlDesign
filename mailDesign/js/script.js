import mail_data from "./mail_data.js"

const mail_divs = []
let current_type = "all"

$(document).ready(function() {
    $("#search_mail").on("focus", () => $(".search-bar").addClass("focus shadow"))
    $("#search_mail").on("blur", () => $(".search-bar").removeClass("focus shadow"))

    $(".item").each(function(index, element) {
        $(element).click(() => {
            $(".mail-text").text($(element).text())
        })

        $(element).click(() => {
            let type = $(element).attr("class").split(/\s+/)[1]
            current_type = type

            $("#search_mail").val("")

            $(".item").removeClass("selected")
            $(element).addClass("selected")

            $(".mail").each(function() {
                if ($(this).hasClass(type)) {
                    $(this).css("display", "flex")
                } else {
                    $(this).css("display", "none")
                }
            })

            if ($(element).hasClass("all")) {
                $(".mail").css("display", "flex")
            }
        })
    })

    for (let i = 0; i < mail_data.length; i++) {
        const mail_dom = `
            <span class="name">${mail_data[i]["writer"]}</span>
            <span class="subject">${mail_data[i]["subject"]}</span>
            <span class="date">${mail_data[i]["date"]}</span>
        `
        const $mail = $(`<div class='mail ${mail_data[i]["type"]}'></div>`)
        $mail.html(mail_dom)
        $(".bottom .right").append($mail)
        $($mail).hover(function() {
            $(this).toggleClass("shadow")
        })

        mail_divs.push($mail)
    }

    $("#search_mail").keydown(function(event) {
        if (event.which == 13) {
            searchMail()
        }
    })

    $(".button.search").click(searchMail)
    $(".button.write").click(() => $(".write-mail").css("visibility", "visible"))
})

function searchMail() {
    if ($("#search_mail").val() == "") {
        $(".mail").css("display", "flex")
    }

    let indexes = search($("#search_mail").val())

    $(".mail").css("display", "none")

    if (indexes == -1) {
        return
    }

    for (let i = 0; i < indexes.length; i++) {
        if (current_type != "all") {
            if (mail_divs[indexes[i]].hasClass(current_type)) {
                mail_divs[indexes[i]].css("display", "flex")
            }
        } else {
            mail_divs[indexes[i]].css("display", "flex")
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
