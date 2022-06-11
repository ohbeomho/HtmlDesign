document.querySelector(".search-bar").addEventListener("focus", function() {
    document.querySelector(".white-bg").classList.add("visible")
})

document.querySelector(".search-bar").addEventListener("focusout", function() {
    document.querySelector(".white-bg").classList.remove("visible")
})