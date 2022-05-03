const addComment = document.querySelector("#comment");
const writeComment = document.querySelector(".write-comment");
const commentButton = document.querySelector(".comment-button");
const commentText = document.querySelector(".comment-text");

const username = "GUEST";

addComment.addEventListener("click", () => {
	if (writeComment.getAttribute("style")) {
		writeComment.removeAttribute("style");	
	} else {
		writeComment.setAttribute("style", "display: none;");
	}
});

commentButton.addEventListener("click", () => {
	write();

	commentText.value = "";
	writeComment.setAttribute("style", "display: none;");
});

function write() {
	let comment = document.createElement("div");
	comment.className = "comment";
	let date = new Date();
	let dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;
	comment.innerHTML = `
		<div class="info">
			<div class="writer">${username}</div>
			<div class="date">${dateString}</div>
		</div>
		<div class="text">
			${commentText.value}
		</div>`;
	document.querySelector(".comments").appendChild(comment);
}

function resizeTA() {
	commentText.style.height = "auto";
	commentText.style.height = `${commentText.scrollHeight + 12}px`;
}

resizeTA();