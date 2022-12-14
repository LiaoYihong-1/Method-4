const r = 100;
const x = 175;
const y = 150;
var inputR = "1";
var inputX;
var inputY;
function drawBackground(id){
    let canvas = document.getElementById(id);
    let pen = canvas.getContext("2d");
    //background
    pen.fillStyle = "white" ;
    pen.beginPath();
    pen.rect(0,0,2*x, 2*y);
    pen.closePath();
    pen.fill();

    //axis
    pen.beginPath();
    pen.font = "20px Verdana";
    //y
    pen.moveTo(x, 0);
    pen.lineTo(x, 2*y);
    //x
    pen.moveTo(0, y);
    pen.lineTo(2*x, y);
    //arrow of y
    pen.moveTo(x-7,7);
    pen.lineTo(x,0);
    pen.moveTo(x+7,7);
    pen.lineTo(x,0);
    //arrow of x
    pen.moveTo(2*x-7,y-7);
    pen.lineTo(2*x,y);
    pen.moveTo(2*x-7,y+7);
    pen.lineTo(2*x,y);
    pen.stroke();

    //clear a range and set it's transparency
    pen.fillStyle = "orange";
    pen.clearRect(0,0,canvas.width,canvas.length);
    pen.globalAlpha = 0.5;

    //forth quadrant
    pen.beginPath();
    pen.rect(x,y,r,r);
    pen.closePath();
    pen.fill();

    //second quadrant
    pen.beginPath();
    pen.moveTo(x,y);
    pen.arc(x,y,r,Math.PI,1.5*Math.PI);
    pen.closePath();
    pen.fill();

    //third quadrant
    pen.beginPath();
    pen.moveTo(x,y);
    pen.lineTo(x,y+100);
    pen.lineTo(x-r/2,y);
    pen.fill();
    pen.closePath();

    //find R
    //onx
    let length = 2.5
    pen.beginPath();
    pen.font = "20px Verdana";
    pen.moveTo(x-3/2*r,y+length);
    pen.lineTo(x-3/2*r,y-length);
    pen.moveTo(x-r,y+length);
    pen.lineTo(x-r,y-length);
    pen.moveTo(x-r/2,y+length);
    pen.lineTo(x-r/2,y-length);
    pen.moveTo(x-r/2,y+length);
    pen.lineTo(x-r/2,y-length);
    pen.moveTo(x+r/2,y+length);
    pen.lineTo(x+r/2,y-length);
    pen.moveTo(x+r,y+length);
    pen.lineTo(x+r,y-length);
    pen.moveTo(x+3/2*r,y+length);
    pen.lineTo(x+3/2*r,y-length);
    //ony
    pen.moveTo(x-length,y-r);
    pen.lineTo(x+length,y-r);
    pen.moveTo(x-length,y-1/2*r);
    pen.lineTo(x+length,y-1/2*r);
    pen.moveTo(x-length,y+1/2*r);
    pen.lineTo(x+length,y+1/2*r);
    pen.moveTo(x-length,y+r);
    pen.lineTo(x+length,y+r);
    pen.stroke();
    //put R
    pen.fillStyle = "black";
    pen.font = "15px Verdana";
    pen.fillText("-"+(1.5*Number(inputR)+"").substr(0,3), x-1.5*r-20, y+8*length);
    pen.fillText("-"+Number(inputR).toFixed(2)+"", x-r-10, y+8*length);
    pen.fillText("-"+(0.5*Number(inputR)).toFixed(2)+"", x-0.5*r-15, y+8*length);
    pen.fillText((0.5*Number(inputR)).toFixed(2)+"", x+0.5*r-10, y+8*length);
    pen.fillText((Number(inputR)).toFixed(2)+"", x+r-5, y+8*length);
    pen.fillText((1.5*Number(inputR)).toFixed(2)+"", x+1.5*r-15, y+8*length);

    pen.fillText((Number(inputR)).toFixed(2)+"",x+8,y-r+5);
    pen.fillText((0.5*Number(inputR)).toFixed(2)+"",x+8,y-0.5*r+5);
    pen.fillText("-"+(0.5*Number(inputR)).toFixed(2)+"",x+8,y+0.5*r+5);
    pen.fillText("-"+Number(inputR).toFixed(2)+"",x+8,y+r+5);
    pen.stroke();
    pen.closePath();
}
function updateInput(id){
    clearGraph(id);//delete graph and then redraw
    getForm();//read your visible form
    drawBackground(id);// redraw background(nor includes dots)
    drawDots(id);//draw all dots
}
//input real absolute coordinate to the frame
function getForm(){
    inputR = document.getElementById("requestForm:R_input").value;
    inputX = document.getElementById("requestForm:X_input").value
    inputX = inputX.replace(/,/,".");
    inputR = inputR.replace(/,/,".");
    inputR = Number(inputR).toFixed(2)+"";
    inputX = Number(inputX).toFixed(2)+"";
    if(document.getElementById("requestForm:Y").value!==null &&document.getElementById("requestForm:Y").value!=="") {
        inputY = document.getElementById("requestForm:Y").value;
        inputY = inputY.replace(/,/,".");
        inputY = Number(document.getElementById("requestForm:Y").value).toFixed(2) + "";
    }else {
        inputY = 10000;
    }
}
function clearGraph(id){
    let canvas = document.getElementById(id);
    let rubbish = canvas.getContext("2d");
    rubbish.clearRect(0,0,2*x,2*y);
}
window.onload=function () {
    drawBackground("click-graph");
};
const dots = [];
class Dot {
    constructor(x,y,r) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.r = parseFloat(r);
        this.hit = validateRange(this.x,this.y,this.r)
    }
}
function validateRange(x, y, r){
    //0<x<r,-r<y<0  forth
    if( (x > 0 && x < r) && (y < 0 && y > -r) ){
        return true;
    }//-r/2<x<=0,-2rx-r<y<=0 third
    else if( (x >= -r/2 && x <= 0) && (y<= 0 && y >= (-2*x-r) ) ){
        return true;
    }//y>0,x<0,x^2+y^2<r*r second
    else return (x <= 0) && (y >= 0) && (x*x + y*y <= r*r);
}

function validateValue(x, y,r){
    return (x >= -5 && x <= 5) && (y >= -3 && y <= 3) && (r >= 0.1 && r <= 3);
}

function drawDots(id){
    if(validateValue(Number(inputX),Number(inputY),Number(inputR))) {
        dots.push(new Dot(inputX, inputY, inputR));
    }
    for(let i = 0; i<dots.length;i++){
        drawDot(id, dots[i])
    }
}

function drawDot(id,dot) {
    let canvas = document.getElementById(id);
    let pen = canvas.getContext("2d");
    let xDraw = translateX(dot.x);
    let yDraw = translateY(dot.y);
    pen.globalAlpha = 1;
    pen.beginPath()
    //setting of color
    if(validateRange(dot.x,dot.y,Number(inputR))){
        pen.fillStyle = "blue";
    }else{
        pen.fillStyle = "green";
    }
    pen.fillRect(xDraw, yDraw, 4, 4);
    pen.fill();
    pen.stroke();
    pen.closePath();
}

//translate input to absolute
//parameters are input r/x/y
function translateY(iy){
    return y-r*iy/Number(inputR);
}
function translateX(ix){
    return (r*ix/Number(inputR))+x;
}
//add click
document.getElementById("click-graph").addEventListener("click",function (event) {
    let can = document.getElementById("click-graph");
    let browser = can.getBoundingClientRect();
    let browserLeft = browser.left;
    let browserTop = browser.top;
    //absolute x/y
    let ax = event.x-browserLeft;
    let ay = event.y-browserTop;
    inputR = (document.getElementById("requestForm:R_input").value).replace(/,/,".");
    //translation to coordinate
    let cx = ((ax-x)*Number(inputR.replace(/,/,"."))/r).toFixed(2);
    let cy = ((y-ay)*Number(inputR.replace(/,/,"."))/r).toFixed(2);
    document.getElementById("canvasForm:canvasX").value = (cx+"").replace(/,/,".");
    document.getElementById("canvasForm:canvasY").value = (cy+"").replace(/,/,".");
    document.getElementById("canvasForm:canvasR").value = inputR;
    document.getElementById("canvasForm:submitClick").click();
});
function getInvisibleForm(){
    inputR = Number(document.getElementById("canvasForm:canvasR").value).toFixed(2)+"";
    inputX = Number(document.getElementById("canvasForm:canvasX").value).toFixed(2)+"";
    inputY = Number(document.getElementById("canvasForm:canvasY").value).toFixed(2)+"";
}
function clearGraph(id){
    let canvas = document.getElementById(id);
    let rubbish = canvas.getContext("2d");
    rubbish.clearRect(0,0,2*x,2*y);
}
window.onload=function () {
    drawBackground("click-graph");
};
function updateClick(id){
    clearGraph(id);//delete graph and then redraw
    getInvisibleForm();//read your visible form
    drawBackground(id);// redraw background(nor includes dots)
    drawDots(id);//draw all dots
    document.getElementById("checkForm:addButton").click();
    document.getElementById("perForm:perButton").click();
}
//???????????????Repeat??????
function get_values(){
    document.getElementById("checkForm:checkX").value = inputX;
    document.getElementById("checkForm:checkR").value = inputR;
    document.getElementById("checkForm:checkY").value = inputY;
}
function check_repeat(data){
    if(data.status == "success") {
        let repeated = document.getElementById("checkForm:checkBasic").value;
        if (repeated === 'true') {
            alert("You input 3 dot not in range")
        }
    }
}
//???????????????Percentage??????
function get_v_for_p(){
    document.getElementById("perForm:perX").value = inputX;
    document.getElementById("perForm:perR").value = inputR;
    document.getElementById("perForm:perY").value = inputY;
}