function addComment(id, name, text) {
	const commentDOM = `<div class="profile">
		<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="">
		<div class="name">${name}</div>
	</div>
	<div class="content">
		<div class="text">${text}</div>
		<div class="buttons">
			<button class="like">
				<i class="fas fa-heart"></i>
				Like
			</button>
			<button class="unlike">
				<i class="fas fa-thumbs-down"></i>
				Unlike
			</button>
		</div>
	</div>`;
	const commentElement = document.createElement('div');
	commentElement.className = 'comment';
	commentElement.innerHTML = commentDOM;
	document.getElementsByClassName('comment-write')[id - 1].before(commentElement);

	const like = commentElement.getElementsByClassName('like')[0];
	const unlike = commentElement.getElementsByClassName('unlike')[0];

	like.addEventListener('click', () => {
		like.classList.toggle('active');
		like.nextElementSibling.classList.remove('active');
	});

	unlike.addEventListener('click', () => {
		unlike.classList.toggle('active');
		unlike.previousElementSibling.classList.remove('active');
	});
}

Array.from(document.getElementsByClassName('blog')).forEach((e) => {
	e.getElementsByClassName('add-comment')[0].addEventListener('click', () => {
		const name = 'Blogger';
		const text = e.getElementsByClassName('comment-content')[0];

		if (text.value) {
			addComment(Number(e.id), name, text.value);
			text.value = '';
		}
	});
});

Array.from(document.getElementsByClassName('like')).forEach((e) => {
	e.addEventListener('click', () => {
		e.classList.toggle('active');
		e.nextElementSibling.classList.remove('active');
	});
});

Array.from(document.getElementsByClassName('unlike')).forEach((e) => {
	e.addEventListener('click', () => {
		e.classList.toggle('active');
		e.previousElementSibling.classList.remove('active');
	});
});

Array.from(document.getElementsByClassName('write-time')).forEach((e) => {
	const date = new Date();
	e.innerText = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
});
