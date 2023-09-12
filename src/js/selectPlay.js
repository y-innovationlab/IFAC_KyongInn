document.querySelectorAll('.amplitude-song-container').forEach((song, index) => {
	song.addEventListener('click', function () {
		selectedSongIndex = index;
		// 선택 표시를 위한 CSS 클래스 추가 (옵션)
		document.querySelectorAll('.amplitude-song-container').forEach(song => song.classList.remove('selected'));
		song.classList.add('selected');
		// console.log(selectedSongIndex)
		setTimeout(function() {
			// 선택한 노래의 SongIndex 값에 따라 페이지 이동
			switch (selectedSongIndex) {
				case 0:
					window.location.href = './1-josun.html';
					break;
				case 1:
					window.location.href = './2-chuldo.html';
					break;
				case 2:
					window.location.href = './3-kyongbu.html';
					break;
			}
		}, 400);
	});
});