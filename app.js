// jsCanvas라는 ID에 접근
const canvas = document.getElementById("jsCanvas");
// 2D로 설정
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "##2c2c2c";
// styles.css에서 설정한 canvas의 width와 height를 설정
canvas.width = 700;
canvas.height = 700;

// 초기 배경화면 흰색으로 설정
ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);

// 선 색깔
ctx.strokeStyle=INITIAL_COLOR;
// 채우기 색깔
ctx.fillSytle = INITIAL_COLOR;
// 선의 굵기
ctx.lineWidth= 2.5;

let painting = false;
let filling = false;

function startPainting()
{
    painting = true;
}

function stopPainting()
{
    painting = false;
}

function onMouseMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;
    // 클릭하지 않았을때
    if(!painting)
    {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    // 클릭했을때
    else
    {
        // 선 만들기
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

if(canvas)
{
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown" ,startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

function handleCM(event)
{
    // console.log(event);
    event.preventDefault();
}

function handleColorClick(event)
{
    const color = event.target.style.backgroundColor;
    // console.log(event.target.style.backgroundColor);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event)
{
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleCanvasClick()
{
    if(filling)
    {
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleModeClick()
{
    if(filling == true)
    {
        filling = false;
        mode.innerText = "채우기";
    }
    else
    {
        filling = true;
        mode.innerText = "그리기";
    }
}

function handleSaveClick()
{
    const image = canvas.toDataURL("");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJs";
    link.click();
    console.log(link);
}

Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick)
     );

if(range)
{
    range.addEventListener("input", handleRangeChange)
    
}

if(mode)
{
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn)
{
    saveBtn.addEventListener("click", handleSaveClick);
}

// console.log(colors);