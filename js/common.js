let button = document.querySelector("button");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

button.addEventListener("click", ()=>{
    let div = document.createElement("div");
    div.style.width     = getRandomInt(10,200) + "px";
    div.style.height    = getRandomInt(10,200) + "px";
    div.style.backgroundColor     = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`;
    div.style.left      = getRandomInt(0, 1200) + "px";
    div.style.top       = getRandomInt(0, 500) + "px";
    document.body.appendChild(div);
})

let activeElem, offsetX, offsetY;
document.addEventListener("mousedown", (event)=>{
    if (event.target!==button) {
        activeElem=event.target;
        offsetX = event.offsetX;
        offsetY = event.offsetY;
        console.log(event.target);
    }
})
document.addEventListener("mouseup", (event)=>{
    if (event.target!==button) {
        activeElem=null;
    }
})
document.addEventListener("mousemove", (event)=>{
    if (activeElem) {
        activeElem.style.left=(event.clientX-offsetX)+"px";
        activeElem.style.top=(event.clientY-offsetY)+"px";
    };
})