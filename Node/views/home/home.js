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

canvas.onclick = function(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
};