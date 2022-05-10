const searchText = $(".search-text")
const searchButton = $(".search-button")

$(document).ready(() => {
    searchText.on("keydown", (event) => {
        if (event.keyCode == 13 && searchText.val() != "") {
            location.href = "./result.html?search=" + searchText.val()
        }
    });
    
    searchButton.on("click", () => {
        if (searchText.val() != "") {
            location.href = "./result.html?search=" + searchText.val()
        }
    });

    searchText.focus()
})