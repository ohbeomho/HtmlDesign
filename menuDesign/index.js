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
        if (Math.ceil(($(".menu").width() / $(window).width() * 100)) + "%" == "20%") {
            $(".menu").css("opacity", "0")
            $(".menu").width("0")
            $(".content").width("100%")
        } else {
            $(".menu").css("opacity", "1")
            $(".menu").width("20%")
            $(".content").width("80%")
        }
    })
})