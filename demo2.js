window.onload=function(){
var yyy = document.getElementById('canvas');
var context = yyy.getContext('2d');

autoSiteCanvasSize(yyy)

listenToMouse(yyy)

var eraserEnabled = false;
eraser.onclick = function(){
  eraserEnabled = true;
  actions.className = 'actions x'
}
brush.onclick = function(){
  eraserEnabled = false;
  actions.className = 'actions'
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
function listenToMouse(canvas){
  
  var using = false;
  var lastPoint = {x:undefined, y:undefined}
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
