const chatLinks = document.querySelectorAll(".bottom a")

for (let i = 0; i < chatLinks.length; i++) {
    chatLinks[i].setAttribute("href", `./chat.html?name=${chatLinks[i].querySelector(".name").innerText}`)
}