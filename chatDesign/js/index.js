const chatLinks = document.querySelectorAll(".bottom a")

for (let i = 0; i < chatLinks.length; i++) {
    let link = `./chat.html?name=${chatLinks[i].querySelector(".name").innerText}`
    let userCount = chatLinks[i].querySelector(".user-count")

    if (userCount) {
        link += `&uc=${userCount.innerText}`
    }

    chatLinks[i].setAttribute("href", link)
}