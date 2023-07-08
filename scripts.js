const player = document.querySelector(`.player`);
const video = player.querySelector(`.viewer`);
const progreess = player.querySelector(`.progress`);
const progreessBar = player.querySelector(`.progress__filled`);
const toggle = player.querySelector(`.toggle`);
const skipButtons = player.querySelectorAll(`[data-skip]`);
const ranges = player.querySelectorAll(`.player__slider`);

const togglePlay = function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const toggleButton = function () {
  const icon = this.paused ? "►" : "-";
  toggle.textContent = icon;
};

const skip = function () {
  const skipValue = this.dataset.skip;
  video.currentTime += +skipValue;
};

const handleRangeUpdate = function () {
  console.log(this.value);
  video[this.name] = this.value;
};
const handleProgess = function () {
  const percent = (video.currentTime / video.duration) * 100;
  progreessBar.style.flexBasis = `${percent}%`;
};

const scrub = function (e) {
  const scrubTime = (e.offsetX / progreess.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};
video.addEventListener(`click`, togglePlay);
toggle.addEventListener(`click`, togglePlay);

video.addEventListener(`play`, toggleButton);
video.addEventListener(`pause`, toggleButton);

skipButtons.forEach((button) => button.addEventListener(`click`, skip));

ranges.forEach((range) => range.addEventListener(`change`, handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener(`mousemove`, handleRangeUpdate)
);

video.addEventListener(`timeupdate`, handleProgess);
let mousedown = false;
progreess.addEventListener(`click`, scrub);
progreess.addEventListener(`mousemove`, (e) => mousedown && scrub(e));
progreess.addEventListener(`mousedown`, () => (mousedown = true));
progreess.addEventListener(`mouseup`, () => (mousedown = false));
