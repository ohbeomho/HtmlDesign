const chatLinks = $('.bottom a');

for (let i = 0; i < chatLinks.length; i++) {
	let link = `./chat.html?name=${$(chatLinks[i]).find('.name').text().trim()}`;
	let userCount = $(chatLinks[i]).find('.user-count').text().trim();

	if (userCount) {
		link += `&uc=${userCount}`;
	}
	$(chatLinks[i]).attr('href', link);
}
