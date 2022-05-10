const addComment = $("#comment")
const writeComment = $(".write-comment")
const commentButton = $(".comment-button")
const commentText = $(".comment-text")

const profileButton = $(".items #profile")
const profileModal = $(".profile-modal")
const closeProfileButton = $(".profile-modal #close")

addComment.on("click", () => {
	if (writeComment.css("display") == "none") {
		writeComment.css("display", "block")
	} else {
		writeComment.css("display", "none")
	}
})

commentButton.on("click", () => {
	commentText.value = ""
	writeComment.css("display", "none")
})

profileButton.on("click", () => {
	profileModal.css("display", "block")
	$("body").css("overflow-y", "hidden")
})

closeProfileButton.on("click", () => {
	profileModal.css("display", "none")
	$("body").css("overflow-y", "scroll")
})

function resizeTA() {
	let height = commentText.css("height")
	height = height.substr(0, height.length - 2)

	if (height >= 200) {
		commentText.css("overflow-y", "scroll")
	} else {
		commentText.css("overflow-y", "hidden")
	}

	commentText.css("height", "auto")
	commentText.css("height", `${commentText.prop("scrollHeight") + 2}px`)
}

resizeTA()