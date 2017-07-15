(function() {
    let createBtn = document.getElementById("create");
    let saveBtn = document.getElementById("save");
    let cookie = document.cookie;
    let coloredFig={length:0,
                    elements:[]};
    const maxWidthFig=200;
    const maxHeightFig=200;
    const minWidthFig=10;
    const minHeightFig=10;

    if (cookie) {
        cookie=cookie.split(";");
        cookie=cookie.map(item=>{return item.trim()});
        for (let i=0; i<cookie.length;i++) {
            if (cookie[i].indexOf("coloredFig=")==0) {
                coloredFig=JSON.parse(cookie[i].substring(11));
                break;
            }
        }
    }
    
    if (coloredFig.length>0) {
        // console.log(coloredFig);
        for (let i=0; i<coloredFig.length; i++) {
            createFigure(coloredFig.elements[i]);
        }
    }

    function createFigure(obj){
        let div = document.createElement("div");
        div.style.width     = obj.width + "px";
        div.style.height    = obj.height + "px";
        div.style.backgroundColor     = obj.color;
        div.style.left      = obj.left + "px";
        div.style.top       = obj.top + "px";
        document.body.appendChild(div);       
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    createBtn.addEventListener("click", ()=>{
        let div = document.createElement("div");
        coloredFig.length++;
        coloredFig.elements.push({color: `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`, width: getRandomInt(minWidthFig,maxWidthFig), height: getRandomInt(minHeightFig,maxHeightFig), left: getRandomInt(0, screen.availWidth-maxWidthFig), top: getRandomInt(0, screen.availHeight-maxHeightFig-50)});
        createFigure(coloredFig.elements[coloredFig.length-1]);
        document.body.appendChild(div);
    })

    saveBtn.addEventListener("click", ()=>{
        document.cookie="coloredFig="+JSON.stringify(coloredFig);
    })
    let activeElem, offsetX, offsetY;
    document.addEventListener("mousedown", (event)=>{
        if (event.target.tagName!=="BUTTON") {
            activeElem=event.target;
            offsetX = event.offsetX;
            offsetY = event.offsetY;
        }
    })
    document.addEventListener("mouseup", (event)=>{
        if (event.target.tagName!=="BUTTON") {
            activeElem=null;
        }
    })
    document.addEventListener("mousemove", (event)=>{
        if (activeElem) {
            activeElem.style.left=(event.clientX-offsetX)+"px";
            activeElem.style.top=(event.clientY-offsetY)+"px";
        };
    })
})()