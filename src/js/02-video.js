import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframeEl = document.querySelector('iframe');

const player = new Player(iframeEl);

const VIDEO_TIME_KEY = 'videoplayer-current-time';

const currentVideoTime = e => {
  const elSrtingifi = JSON.stringify(e);
  localStorage.setItem(VIDEO_TIME_KEY, elSrtingifi);
};

const savedVideoTime = () => {
  const savedTime = localStorage.getItem(VIDEO_TIME_KEY);
  const parsedTime = JSON.parse(savedTime) ?? {};

  

  if (savedTime) {
    player.setCurrentTime(parsedTime.seconds);
  }
};

savedVideoTime();

player.on('timeupdate', throttle(currentVideoTime, 1000));
