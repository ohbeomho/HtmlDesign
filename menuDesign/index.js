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
        if ($(".menu").css("max-width") == "0px") {
            $(".menu").css("max-width", "20%")
            $(".content").width("80%")
        } else {
            $(".menu").css("max-width", "0px")
            $(".content").width("100%")
        }
    })
})