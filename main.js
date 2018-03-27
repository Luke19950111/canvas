

var yyy = document.getElementById('canvas');
var context = yyy.getContext('2d');
var lineWidth = 2;
var radius = 1;

autoSiteCanvasSize(yyy)

listenToUser(yyy)

var eraserEnabled = false;
pen.onclick = function(){
  eraserEnabled = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
}
eraser.onclick = function(){
  eraserEnabled = true;
  pen.classList.remove('active');
  eraser.classList.add('active');
}
clear.onclick = function(){
  context.clearRect(0,0,yyy.width,yyy.height)
}
save.onclick = function(){
  var url = yyy.toDataURL('image/png');
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = 'myPainting';
  a.target = '_blank';
  a.click()
}
black.onclick = function(){
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  black.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  yellow.classList.remove('active');
  blue.classList.remove('active');
}
red.onclick = function(){
  context.strokeStyle = 'red';
  context.fillStyle = 'red';
  black.classList.remove('active');
  red.classList.add('active');
  green.classList.remove('active');
  yellow.classList.remove('active');
  blue.classList.remove('active');
}
green.onclick = function(){
  context.strokeStyle = 'green';
  context.fillStyle = 'green';
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.add('active');
  yellow.classList.remove('active');
  blue.classList.remove('active');
}
yellow.onclick = function(){
  context.strokeStyle = 'yellow';
  context.fillStyle = 'yellow';
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
  yellow.classList.add('active');
  blue.classList.remove('active');
}
blue.onclick = function(){
  context.strokeStyle = 'blue';
  context.fillStyle = 'blue';
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
  yellow.classList.remove('active');
  blue.classList.add('active');
}
thin.onclick = function(){
  lineWidth = 2;
  radius = 1;
  thin.classList.add('active');
  thinPlus.classList.remove('active');
  thick.classList.remove('active');
  thicker.classList.remove('active');
  thickerPlus.classList.remove('active');
}
thinPlus.onclick = function(){
  lineWidth = 4;
  radius = 2;
  thin.classList.remove('active');
  thinPlus.classList.add('active');
  thick.classList.remove('active');
  thicker.classList.remove('active');
  thickerPlus.classList.remove('active');
}
thick.onclick = function(){
  lineWidth = 6;
  radius = 3;
  thin.classList.remove('active');
  thinPlus.classList.remove('active');
  thick.classList.add('active');
  thicker.classList.remove('active');
  thickerPlus.classList.remove('active');
}
thicker.onclick = function(){
  lineWidth = 8;
  radius = 4;
  thin.classList.remove('active');
  thinPlus.classList.remove('active');
  thick.classList.remove('active');
  thicker.classList.add('active');
  thickerPlus.classList.remove('active');
}
thickerPlus.onclick = function(){
  lineWidth = 10;
  radius = 5;
  thin.classList.remove('active');
  thinPlus.classList.remove('active');
  thick.classList.remove('active');
  thicker.classList.remove('active');
  thickerPlus.classList.add('active');
}


/********/
function autoSiteCanvasSize(canvas){
  siteCanvasSize()
  window.onresize = function(){
  siteCanvasSize()
  }
  function siteCanvasSize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill()
}
function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1);
  context.lineWidth = lineWidth;
  context.lineTo(x2,y2);
  context.stroke();
  context.closePath();
}
function listenToUser(canvas){
  
  var using = false;
  var lastPoint = {x:undefined, y:undefined}
  
  //特性检测
  if(document.body.ontouchstart!==undefined){
    //触屏设备
    canvas.ontouchstart = function(aaa){
      
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)
      }else{
        lastPoint = {x:x,y:y}
        drawCircle(x,y,radius)
       }
   }
    canvas.ontouchmove = function(aaa){
      
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      if(!using){return}
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)
      }else{
        var newPoint = {x:x,y:y}
        drawCircle(x,y,radius)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
       }
    }
    canvas.ontouchend = function(){
      using = false;
    }
  }else{
    //非触屏设备
    canvas.onmousedown = function(aaa){
    var x = aaa.clientX;
    var y = aaa.clientY;
    using = true;
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint = {x:x,y:y}
      drawCircle(x,y,radius)
     }
    }
    canvas.onmousemove = function(aaa){
      var x = aaa.clientX;
      var y = aaa.clientY;
      if(!using){return}
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)
      }else{
        var newPoint = {x:x,y:y}
        drawCircle(x,y,radius)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
       }
    }
    canvas.onmouseup = function(){
      using = false;
    }
   }
  
  
}