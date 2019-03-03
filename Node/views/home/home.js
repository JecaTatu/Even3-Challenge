//Uploading and showing the template
var templateUpload = document.getElementById('templateUpload');
var canvas  = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           img.src = e.target.result;
           img.onload = function() {
             ctx.drawImage(img, 0, 0, 512, 512);
           };
        };       
        FR.readAsDataURL( this.files[0] );
    }
}

templateUpload.onchange = readImage;

function deleteBox(){
 ctx.clearRect(x-1, y-1, x2+2, y2+2);
}

var cont = 0;
var x = 0;
var y = 0;
var x2 = 0;
var y2 = 0;
canvas.onclick = function(e) {
  if (cont === 0){
    x = e.offsetX;
    y = e.offsetY;
    cont++;
  }

  else{
    x2 = e.offsetX - x;
    y2 = e.offsetY - y;
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.strokeRect(x, y, x2, y2);
    ctx.fill();
    cont = 0;
  }
};