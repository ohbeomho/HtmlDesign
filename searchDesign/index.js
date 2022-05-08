const searchText = $(".search-text");
const searchButton = $(".search-button");

searchText.on("keydown", (event) => {
	if (event.keyCode == 13) {
		location.href = "./result.html";
	}
});

searchButton.on("click", () => location.href = "./result.html");