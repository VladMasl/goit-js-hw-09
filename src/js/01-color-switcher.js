const btnStartRef = document.querySelector('[data-start]');
const bttStopRef = document.querySelector('[data-stop]');

let backgroundColor = null;

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const onStartChangeColor = ()=> {
  backgroundColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomColor();
    btnStartRef.setAttribute('disabled', '');
  }, 1000);
};

const onStopChangeColor = () => {
  clearInterval(backgroundColor);
  btnStartRef.removeAttribute('disabled', '');
};

btnStartRef.addEventListener('click', onStartChangeColor);
bttStopRef.addEventListener('click', onStopChangeColor);
