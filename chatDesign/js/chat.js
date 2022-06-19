const url = new URL(location.href)
const urlParams = url.searchParams;
const username = urlParams.get("name")
const chatInput = document.querySelector(".chat-input")
const messageName = document.querySelector(".message .name")

if (username.includes("GroupChat")) {
    document.querySelector(".image img").setAttribute("src", "./images/users.png")
    messageName.innerText = "Member"
} else {
    messageName.innerText = username
}

document.querySelector(".top .name").innerText = username

document.querySelector(".send").addEventListener("click", sendMessage)
chatInput.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        sendMessage()
    }
})

function sendMessage() {
    if (chatInput.value == "") {
        return
    }

    const message = document.createElement("li")
    message.classList.add("message", "me")
    message.innerHTML = `
        <div class="text">
            <span class="mt">
                <span class="time">PM 1:00</span>
                <span class="message-text">
                    ${chatInput.value}
                </span>
            </span>
        </div>`
    document.querySelector(".messages").appendChild(message)

    chatInput.value = ""
}