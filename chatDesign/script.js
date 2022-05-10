const messageInput = $(".message-input")
const sendButton = $(".send-button")
const chatArea = $(".chat-area")

const myUsername = "MyName"

messageInput.on("keypress", (event) => {
	if (event.keyCode == 13 && messageInput.val() != "") {
		sendMessage(myUsername, messageInput.val())
		messageInput.val("")
	}
});

sendButton.on("click", () => {
	sendMessage(myUsername, messageInput.val())
	messageInput.val("")
});

function sendMessage(username, message) {
	let messageDiv = document.createElement("div")
	messageDiv.className = "message me"
	messageDiv.innerHTML = `
		<div class="profile">
			<i class="fas fa-user-circle"></i>
			<p>${username}</p>
		</div>
		<div class="text">
			<p>${message}</p>
		</div>
	`;
	chatArea.append(messageDiv)

	scrollChat()
}

function scrollChat() {
	chatArea.scrollTop(chatArea.prop("scrollHeight"))
}