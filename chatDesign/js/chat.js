const url = new URL(location.href)
const urlParams = url.searchParams;
const username = urlParams.get("name")
const userCount = urlParams.get("uc")
const chatInput = $(".chat-input")
const messageName = $(".message .name")
const messages = $(".messages")

if (username.includes("GroupChat")) {
    $(".image img").attr("src", "./images/users.png")
    messageName.text("Member")

    if (userCount) {
        $(".message.other .read").text(String(userCount - 2))
        $(".user-count").text(String(userCount))
    }
} else {
    messageName.text(username)
}

$(".top .name").text(username)

$(".send").click(sendMessage)
chatInput.on("keypress", function(event) {
    if (event.keyCode == 13) {
        sendMessage()
    }
})

function sendMessage() {
    chatInput.focus()

    if (chatInput.val() == "") {
        return
    }

    const $message = $(`
        <li class="message me">
            <div class="text">
                <span class="mt">
                    <span class="ct">
                        <span class="read">${userCount ? userCount - 1 : 1}</span>
                        <span class="time">PM 1:00</span>
                    </span>
                    <span class="message-text">
                        ${chatInput.val()}
                    </span>
                </span>
            </div>
        </li>`)
    messages.append($message)
    $(".middle").scrollTop(messages.prop("scrollHeight"))

    chatInput.val("")
}