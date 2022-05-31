$(document).ready(() => {
    $(".item").each((index, item) => {
        $(item).click(() => {
            $(".item.selected").removeClass("selected")
            $(item).addClass("selected")
            $(".content").html(`<p>${$(item).text()}</p>`)
            $(".container").attr("class", "container " + $(item).text().toLowerCase())
        })
    })

    $("#menuButton").click(() => {
        if ($(".menu").css("display") == "block") {
            $(".menu").css("display", "none")
        } else {
            $(".menu").css("display", "block")
        }
    })
})