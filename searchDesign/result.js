const searchText = $(".search-text")
const searchButton = $(".search-button")

$(document).ready(() => {
    searchButton.on("click", () => {
        let path = location.href.split("?")[0]
    
        if (searchText.val() == "") {
            return
        }
    
        location.href = `${path}?search=${searchText.val()}`
    })
    
    searchText.on("keydown", (event) => {
        if (event.keyCode == 13) {
            let path = location.href.split("?")[0]
    
            if (searchText.val() == "") {
                return
            }
    
            location.href = `${path}?search=${searchText.val()}`
        }
    })

    let search = getQS().search
    searchText.val(search)
    searchText.focus()
})

function getQS() {
    let url = document.location.href
    let qs = url.substring(url.indexOf("?") + 1).split("&")
    let result = {}
    for(let i = 0; i < qs.length; i++) {
        qs[i] = qs[i].split("=")
        result[qs[i][0]] = decodeURIComponent(qs[i][1])
    }

    return result
}