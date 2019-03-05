//Uploading and showing the template
let templateUpload = document.getElementById('templateUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

function readImage() {
  if (this.files && this.files[0]) {
    let FR = new FileReader();
    FR.onload = function (e) {
      let img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 512, 512);
      };
    };
    FR.readAsDataURL(this.files[0]);
  }
}

templateUpload.onchange = readImage;

function createBox() {
  ctx.fillStyle = document.getElementById('color').value;
  ctx.fillRect(x - 1, y - 1, x2 + 2, y2 + 2);
}

let cont = 0;
let x = 0;
let y = 0;
let x2 = 0;
let y2 = 0;

const pontos = [];

function preencher() {
  let nome = document.getElementById('nome').value;
  ctx.font = document.getElementById('text').value;
  ctx.fillStyle = 'black';
  ctx.fillText(nome, x + 25, y + 25);
}

canvas.onclick = function (e) {
  if (cont === 0) {
    x = e.offsetX;
    y = e.offsetY;
    pontos.push({ x, y });
    cont++;
  }

  else {
    x2 = e.offsetX - x;
    y2 = e.offsetY - y;
    pontos.push({ x:x2, y:y2 });
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.strokeRect(x, y, x2, y2);
    ctx.fill();
    cont = 0;
  }
};

const textToData = () => {
  const rawData = gel('#nomes').value.split('\n').map(line => line.split('\t'));
  const data = [];
  rawData.forEach((line, i) => {
    if (!i) return;
    data.push({});
    line.forEach((column, j) => {
      data[i - 1][rawData[0][j]] = rawData[i][j];
    });
  });
  return data;
};

const gel = element => document.querySelector(element);

const crachas = [];

gel('#download-button').addEventListener('click', () => {
  const data = textToData();
  console.log(data);
  data.forEach((each, i) => {
    createCracha(data, i);
  })
});

const createCracha = (data, i) => {
  ctx.fillRect(pontos[0].x, pontos[0].y, pontos[1].x, pontos[1].y);
  ctx.fillRect(pontos[2].x, pontos[2].y, pontos[3].x, pontos[3].y);

  ctx.font = document.getElementById('text').value;
  ctx.fillStyle = '#ffffff';

  ctx.strokeText(data[i][gel('#nome').value], pontos[0].x + 85, pontos[0].y + 15);
  ctx.strokeText(data[i][gel('#seg').value], pontos[2].x + 75, pontos[2].y + 15);

  $.post('/crachas', { image: { index: i, data: canvas.toDataURL() } }, (res) => {
    console.log(res);
  });

  crachas.push(canvas.toDataURL());

  var doc = new jsPDF()
  doc.addImage(crachas[i], 'JPEG', 15, 40, 180, 160)
  doc.save('cracha.pdf');

}