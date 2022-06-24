$(document).ready(() => {
    $(".item").each((index, item) => {
        $(item).click(() => {
            $(".item.selected").removeClass("selected")
            $(item).addClass("selected")
            $(".content").html(`<p>${$(item).text()}</p>`)
            $(".container").attr("class", "container " + $(item).text().toLowerCase())
        })
    })

    let visible = true
    $("#menuButton").click(() => {
        if (visible) {
            $(".menu").css("flex", "0")
        } else {
            $(".menu").css("flex", "1")
        }

        visible = !visible
    })
})