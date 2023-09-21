// 페이지 로딩 중일 때 loading 클래스 추가
document.body.classList.add('loading');

// 페이지 로딩 완료 후 loading 클래스 제거
document.addEventListener('DOMContentLoaded', function() {
	requestAnimationFrame(function() {
		document.body.classList.remove('loading');
	});
});

function progressBar() {
  var isDragging = false; // 드래그 중인지 확인하는 플래그

  var progressBar = document.getElementById('song-played-progress');

  progressBar.addEventListener('mousedown', function (e) {
    isDragging = true; // 드래그 시작
    updatePlayTime(e); // 클릭한 위치에 따라 재생 시간 업데이트
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) { // 드래그 중일 때만
      updatePlayTime(e); // 드래그하는 위치에 따라 재생 시간 업데이트
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false; // 드래그 종료
  });

  function updatePlayTime(e) {
    var offset = progressBar.getBoundingClientRect();
    var x = e.pageX - offset.left;
    Amplitude.setSongPlayedPercentage((parseFloat(x) / parseFloat(progressBar.offsetWidth)) * 100);
  }
}

// progressBar();


/*function listControl() {

  /!*Handles a click on the down button to slide down the playlist.*!/
  document.getElementsByClassName('down-header')[0].addEventListener('click', function () {
    var list = document.getElementById('list');

    list.style.height = (parseInt(document.getElementById('flat-black-player-container').offsetHeight) - 135) + 'px';

    document.getElementById('list-screen').style.display = "block";
  });

  /!*Handles a click on the up arrow to hide the list screen.*!/
  document.getElementsByClassName('hide-playlist')[0].addEventListener('click', function () {
    document.getElementById('list-screen').style.display = "none";
  });

}*/

// listControl();

function goBack() {
  window.history.back();
}

// Touch Screen
let isUserDragging = false;

/*
function touchScreen() {
  let isDragging = false;
  let startY;
  let startScrollTop;

  document.getElementById('lyrics-container').addEventListener('mousedown', function (event) {
    isDragging = true;
    startY = event.clientY;
    startScrollTop = this.scrollTop;
  });

  document.getElementById('lyrics-container').addEventListener('mousemove', function (event) {
    if (!isDragging) return;
    const deltaY = startY - event.clientY;
    this.scrollTop = startScrollTop + deltaY;
  });

  document.getElementById('lyrics-container').addEventListener('mouseup', function () {
    isDragging = false;
  });

  document.getElementById('lyrics-container').addEventListener('mouseleave', function () {
    isDragging = false;
  });

// 모바일 및 터치 스크린을 위한 이벤트
  document.getElementById('lyrics-container').addEventListener('mousedown', function (event) {
    isDragging = true;
    isUserDragging = true; // 사용자가 드래그를 시작했음을 표시
    startY = event.clientY;
    startScrollTop = this.scrollTop;
  });

  document.getElementById('lyrics-container').addEventListener('mouseup', function () {
    isDragging = false;
    setTimeout(() => {
      isUserDragging = false; // 드래그가 종료된 후 약간의 딜레이를 준다.
    }, 100);
  });

// 모바일 및 터치 스크린을 위한 이벤트도 동일하게 적용
  document.getElementById('lyrics-container').addEventListener('touchstart', function (event) {
    isDragging = true;
    isUserDragging = true; // 사용자가 드래그를 시작했음을 표시
    startY = event.touches[0].clientY;
    startScrollTop = this.scrollTop;
  }, {passive: true});

  document.getElementById('lyrics-container').addEventListener('touchend', function () {
    isDragging = false;
    setTimeout(() => {
      isUserDragging = false; // 드래그가 종료된 후 약간의 딜레이를 준다.
    }, 100);
  });
}
*/

// touchScreen();

function adjustOpacityForSurroundingLines() {
  const highlightedLine = document.querySelector('.lyric-line.highlighted');
  if (highlightedLine) {
    const siblings = Array.from(highlightedLine.parentNode.children);
    const index = siblings.indexOf(highlightedLine);
    const threshold = siblings.length - 3; // 전체 가사 줄에서 마지막 3줄 전

    // TODO 프로덕션 버전에선 지우기
    // console.log('index : ' + index)
    // console.log('threshold : ' + threshold)
    // console.log('siblings : ' + siblings.length)



    // 모든 가사의 투명도를 초기화합니다.
    siblings.forEach(line => line.style.filter = 'blur(0)');

    // 현재 하이라이트된 가사의 투명도를 1로 설정합니다.
    highlightedLine.style.filter = 'blur(0)';

    // 이전 가사의 투명도 filter 적용
    if (index - 1 >= 0) {
      siblings[index - 2].style.filter = 'blur(2px)';
      siblings[index - 3].style.filter = 'blur(2px)';
      siblings[index - 4].style.filter = 'blur(2px)';
    }

    // 다음 가사의 투명도를 위한 filter 적용
    if (index + 1 < siblings.length) {
      siblings[index + 2].style.filter = 'blur(2px)';
      siblings[index + 3].style.filter = 'blur(2px)';
      siblings[index + 4].style.filter = 'blur(2px)';
    }

    // 마지막 줄에 도달했을 때
    if (index > threshold) {
      siblings[index - 4].style.filter = 'blur(2px)';
      siblings[index - 5].style.filter = 'blur(2px)';
    }

    // 첫 가사인 경우
    if (index === 0) {
      siblings[index + 2].style.filter = 'blur(0)';
      siblings[index + 3].style.filter = 'blur(2px)';
    }
    // 두 번째 다음 가사의 투명도는 이미 0.6으로 설정되어 있습니다.
  }
}

let start = null;
let currentScrollTop = 0;
let targetScrollTop = 0;

function smoothScroll(timestamp) {
  if (!start) {
    start = timestamp;
  }

  const progress = timestamp - start;
  const duration = 100; // 애니메이션의 지속 시간 (500ms)

  if (progress < duration) {
    const container = document.getElementById('lyrics-container');
    container.scrollTop = currentScrollTop + (targetScrollTop - currentScrollTop) * (progress / duration);
    window.requestAnimationFrame(smoothScroll);
  } else {
    start = null;
  }
}

function highlightLyric(currentTime) {
  const lyricLines = document.querySelectorAll('.lyric-line');
  let currentLine = null;

  lyricLines.forEach((line, index) => {
    const time = parseInt(line.getAttribute('data-time'));
    if (currentTime >= time) {
      currentLine = index;
    }
    line.classList.remove('highlighted'); // 모든 줄의 하이라이트를 먼저 제거
  });

  if (currentLine !== null) {
    lyricLines[currentLine].classList.add('highlighted'); // 현재 재생 중인 가사 줄만 활성화
  }

  if (!isUserDragging) {
    const activeLine = lyricLines[currentLine];
    if (activeLine) {
      const container = document.getElementById('lyrics-container');
      currentScrollTop = container.scrollTop;
      targetScrollTop = activeLine.offsetTop - container.offsetHeight / 2 + activeLine.offsetHeight / 2;

      window.requestAnimationFrame(smoothScroll);
    }
  }

  adjustOpacityForSurroundingLines()
}

// 각 가사 줄에 클릭 이벤트 리스너 추가
document.querySelectorAll('.lyric-line').forEach(line => {
  line.addEventListener('click', function () {
    const timeToSkip = parseInt(line.getAttribute('data-time'));
    Amplitude.setSongPlayedPercentage((timeToSkip / Amplitude.getSongDuration()) * 100);
  });
});


// Volume 클릭 시 컨트롤러 등장
function volumeControl() {
  const volumeBtn = document.getElementById('volume-container');

  volumeBtn.addEventListener('click', function () {
    this.querySelector('.amplitude-volume-slider').classList.toggle('active')
    console.log('volumeBtn clicked')

  })
}

// volumeControl()
