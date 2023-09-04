Amplitude.init({
  "debug": true,
	"bindings": {
		37: 'prev',
		39: 'next',
		32: 'play_pause'
	},
	/*"callbacks": {
		timeupdate: function () {
			// 애니메이션을 시작할 시간 (초)
			const triggerTime = 15;

			// 애니메이션을 수행할 SVG 요소
			const svgElement = document.getElementById('train');

			// 애니메이션 상태
			let animationStarted = false;

			const currentTime = Amplitude.getSongPlayedSeconds();

			// 현재 시간이 트리거 시간을 초과하고 애니메이션이 아직 시작되지 않았다면
			if (currentTime >= triggerTime && !animationStarted) {
				// 애니메이션 시작
				svgElement.classList.add('start-animation');

				// 애니메이션 상태 업데이트
				animationStarted = true;
			}
		}
	},*/
	"songs": [
		{
			"name": "조선철도창가",
			"artist": "",
			"url": "https://521dimensions.com/songs/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
			"cover_art_url": "./resources/album-art/we-are-to-answer.jpg"
		},
		{
			"name": "철도창가",
      "artist": "",
			"url": "https://521dimensions.com/songs/08 The Gun.mp3",
			"cover_art_url": "./resources/album-art/ask-the-dust.jpg"
		},
		{
			"name": "경부철도가",
      "artist": "",
			"album": "",
			"url": "https://521dimensions.com/songs/LORN - ANVIL.mp3",
			"cover_art_url": "./resources/album-art/anvil.jpg"
		},
	]
});
