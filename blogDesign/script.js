const addComment = document.querySelector("#comment");
const writeComment = document.querySelector(".write-comment");
const commentButton = document.querySelector(".comment-button");
const commentText = document.querySelector(".comment-text");

addComment.addEventListener("click", () => {
	if (writeComment.getAttribute("style")) {
		writeComment.removeAttribute("style");	
	} else {
		writeComment.setAttribute("style", "display: none;");
	}
});

commentButton.addEventListener("click", () => {
	commentText.value = "";
	writeComment.setAttribute("style", "display: none;");
});

function resizeTA() {
	commentText.style.height = "auto";
	commentText.style.height = `${commentText.scrollHeight + 12}px`;
}

resizeTA();