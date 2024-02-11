const box = document.querySelector('#box');
const ring = document.querySelector('#ring');
const pb = document.querySelector('#pb');
const inc = document.querySelector('#inc');
const dec = document.querySelector('#dec');
const newLine = document.querySelector('#newLine');
const addLine = document.querySelector('#addLine');
const removeLine = document.querySelector('#removeLine');
const clearInput = document.querySelector('#clearInput');
const alertBox = document.querySelector('#alertBox');
const clearAll = document.querySelector('#clearAll');

let cachedLines;

!localStorage.getItem('lines')
  ? (cachedLines = [])
  : (cachedLines = JSON.parse(localStorage.getItem('lines')));

function renderLines() {
  if (cachedLines.length > 0) {
    cachedLines.forEach((line) => {
      const newLine = document.createElement('li');
      newLine.textContent = line;
      box.appendChild(newLine);
    });
  }
}

renderLines();

addLine.addEventListener('click', () => addLineToBox(newLine.value));
ring.addEventListener('click', addRingToInput);
pb.addEventListener('click', addPbToInput);
inc.addEventListener('click', addIncToInput);
dec.addEventListener('click', addDecToInput);
removeLine.addEventListener('click', removeLastLine);
clearInput.addEventListener('click', clearInputFromBox);
clearAll.addEventListener('click', clearAllFromBox);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addLine.click();
  }
});

function addLineToBox(inputText) {
  const line = document.createElement('li');
  const newLineContent = inputText;
  cachedLines.push(newLineContent);
  localStorage.setItem('lines', JSON.stringify(cachedLines));
  line.textContent = newLineContent;
  line.setAttribute('class', 'line');
  box.appendChild(line);
  newLine.value = '';
}

function removeLastLine() {
  if (cachedLines.length > 0) {
    cachedLines.pop();
    localStorage.setItem('lines', JSON.stringify(cachedLines));
    box.removeChild(box.lastElementChild);
  } else {
    alertBox.classList.add('active');
    alertBox.textContent = 'No hay más líneas';
    setTimeout(() => {
      alertBox.classList.remove('active');
      alertBox.textContent = '';
    }, 2000);
  }
}

function clearAllFromBox() {
  localStorage.removeItem('lines');
  cachedLines = [];
  box.innerHTML = '';
}

function addRingToInput() {
  newLine.value += 'Anillo 6pts.';
}

function addPbToInput() {
  newLine.value += '1pb, ';
}

function addIncToInput() {
  newLine.value += '1aum, ';
}

function addDecToInput() {
  newLine.value += '1dis, ';
}

function clearInputFromBox() {
  newLine.value = '';
}
