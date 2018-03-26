var yyy = document.getElementById('canvas');
var context = yyy.getContext('2d');

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
  context.lineWidth = 6;
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
        drawCircle(x,y,3)
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
        drawCircle(x,y,3)
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
      drawCircle(x,y,3)
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
        drawCircle(x,y,3)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
       }
    }
    canvas.onmouseup = function(){
      using = false;
    }
   }
  
  
}