const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const CANVAS_SIZE = 500;
const saveBtn = document.getElementById("jsSave");

canvas.width  = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0 , 0 , CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth =2.5;


let painting = false; 
let filling = false;

function stopPainting(){
    painting = false;
}

function startPaiting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y); /* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo */
        ctx.stroke();
        }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event){
    if(filling ===true){
        filling = false;
        mode.innerText ="Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
        
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE)}
        
}

function handleCM(event){
    event.preventDefault(); /* "contextmenu" 라는 event . 우클릭 방지.*/
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "paint";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPaiting);
    canvas.addEventListener("mouseup" , stopPainting);
    canvas.addEventListener("mouseleave" , stopPainting);
    canvas.addEventListener("click" , handleCanvasClick);
    canvas.addEventListener("contextmenu" , handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if(range){
    range.addEventListener("input" , handleRangeChange);
}

if(mode){
    mode.addEventListener("click" , handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click" , handleSaveClick);
}