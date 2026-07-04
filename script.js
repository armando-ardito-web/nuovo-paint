//window.onload = function() {}

//il canvas e il suo contesto (2d in questo caso)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.canvas.width = 1300;
ctx.canvas.height = 700;
ctx.imageSmoothingEnabled = false;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); //DEBUG idea di miglioramento, eseguire questo solo se non c'è nulla nel localstorage

//pennelli immagini
const pennelloImgData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAJklEQVQImRXJsQ0AIAgAsBJec+BEEw51MhqGTk0UGgEHb8xcLOwPXWYFufSGyawAAAAASUVORK5CYII=";
const pixelImgData ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAANSURBVBhXY2BgYPgPAAEEAQBwIGULAAAAAElFTkSuQmCC";
const gommaImgData ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAFUlEQVQYlWNkYGD4z4AHMOGTHD4KAAxTAQ+OWA1IAAAAAElFTkSuQmCC";


//altre variabili
const annullaButton = document.getElementById("annullaButton"); //bottone annulla
const ripetiButton = document.getElementById("ripetiButton"); //bottone ripeti
const salvaButton = document.getElementById("salva"); //salva
const deleteAllButton = document.getElementById("eliminaTutto"); //elimina tutto
const downloadButton = document.getElementById("download"); //download


//strumenti
const colorPicker = document.getElementById("colore"); //selettore colore
const colorPicker2 = document.getElementById("colore2"); //selettore colore secondario
colorPicker.value="#000000";
colorPicker2.value="#ffffff";

//immagini da spiattellare sul canvas proprio l'immagine del pallino che produce lo strumento 
const rosso = document.getElementById("rosso"); //pennello debug
const pixel = document.getElementById("pixel"); //matita pixel
const punt = document.getElementById("puntino"); //pennello
const gommaImg = document.getElementById("gommaImg"); //immagine gomma

const pennello = document.getElementById("pennello"); //bottone seleziona pennello
const riempi = document.getElementById("riempi"); //bottone seleziona riempi
const matita = document.getElementById("matita"); //bottone seleziona matita
const gomma = document.getElementById("gomma"); //bottone seleziona gomma
const testo = document.getElementById("testo"); //bottone testo
const path = document.getElementById("path"); //bottone path
const scegliColore = document.getElementById("scegliColore"); //bottone scegli colore

let coloreScelto = ""; //il colore scelto

let modificato = false;
const titoloBase = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname) ? "(local) Paint nuovo" : "Paint nuovo";

function aggiornaTitolo() {
    document.title = modificato ? `[*] ${titoloBase}` : titoloBase;
}

function setModificato(valore) {
    modificato = valore;
    aggiornaTitolo();
}

aggiornaTitolo();

const strumentiArray = ["pennello", "riempi", "matita", "gomma", "testo"]; //lo uso per girare gli strumenti e colorare le selezioni

let lastPos = []; //ultima posizione del mouse

let curPos = []; //posizione corrente cursore

canvas.addEventListener("mousemove", update); //Listener per la posizione del cursore dentro il canvas

//strumento selezionato
let strumentoSelezionato = "pennello";

//Listener nei bottoni degli strumenti
pennello.addEventListener("click", () => seleziona("pennello"));
riempi.addEventListener("click", () => seleziona("riempi"));
matita.addEventListener("click", () => seleziona("matita"));
gomma.addEventListener("click", () => seleziona("gomma"));
testo.addEventListener("click", () => seleziona("testo"));
path.addEventListener("click", () => seleziona("path"));
salvaButton.addEventListener("click",()=> salva());
deleteAllButton.addEventListener("click",()=>deleteAll());
downloadButton.addEventListener("click",()=> downloadCanvas());
scegliColore.addEventListener("click",()=> seleziona("scegliColore"));
annullaButton.addEventListener("click",()=> annulla());
ripetiButton.addEventListener("click",()=> console.log("TODO: ripeti"));


//Tavolozza dei colori
    const colori = ["#000000", "#7f7f7f", "#880015", "#ed1c24", "#ff7f27", "#fff200", "#22b14c", "#00a2e8", "#3f48cc", "#a349a4",
        "#ffffff", "#c3c3c3", "#b97a57", "#ffaec9", "#ffc90e", "#efe4b0", "#b5e61d", "#99d9ea", "#7092be", "#c8bfe7"
    ];

    //ti prego cicla i .bottoniColori e assegna i colori dall'array ti prego in qualche modo
    
    

     document.getElementById("bottCol0").addEventListener("click", () => { bottColoreSelect('#000000') });
     document.getElementById("bottCol1").addEventListener("click", () => { bottColoreSelect('#7f7f7f') });
     document.getElementById("bottCol2").addEventListener("click", () => { bottColoreSelect('#880015') });
     document.getElementById("bottCol3").addEventListener("click", () => { bottColoreSelect('#ed1c24') });
     document.getElementById("bottCol4").addEventListener("click", () => { bottColoreSelect('#ff7f27') });
     document.getElementById("bottCol5").addEventListener("click", () => { bottColoreSelect('#fff200') });
     document.getElementById("bottCol6").addEventListener("click", () => { bottColoreSelect('#22b14c') });
     document.getElementById("bottCol7").addEventListener("click", () => { bottColoreSelect('#00a2e8') });
     document.getElementById("bottCol8").addEventListener("click", () => { bottColoreSelect('#3f48cc') });
     document.getElementById("bottCol9").addEventListener("click", () => { bottColoreSelect('#a349a4') });
    document.getElementById("bottCol10").addEventListener("click", () => { bottColoreSelect('#ffffff') });
    document.getElementById("bottCol11").addEventListener("click", () => { bottColoreSelect('#c3c3c3') });
    document.getElementById("bottCol12").addEventListener("click", () => { bottColoreSelect('#b97a57') });
    document.getElementById("bottCol13").addEventListener("click", () => { bottColoreSelect('#ffaec9') });
    document.getElementById("bottCol14").addEventListener("click", () => { bottColoreSelect('#ffc90e') });
    document.getElementById("bottCol15").addEventListener("click", () => { bottColoreSelect('#efe4b0') });
    document.getElementById("bottCol16").addEventListener("click", () => { bottColoreSelect('#b5e61d') });
    document.getElementById("bottCol17").addEventListener("click", () => { bottColoreSelect('#99d9ea') });
    document.getElementById("bottCol18").addEventListener("click", () => { bottColoreSelect('#7092be') });
    document.getElementById("bottCol19").addEventListener("click", () => { bottColoreSelect('#c8bfe7') });


    //FUNZIONI

    function load(){
        var dataURL = localStorage.getItem(canvas);
        var img = new Image;
        img.src = dataURL;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        };
    }

    //carica il canvas appena parte il programma
    load()

    //salva
    function salva(){
        localStorage.setItem(canvas, canvas.toDataURL());
        setModificato(false);
        alert("immagine salvata, verrà ricaricata la prossima volta")
    }

    function downloadCanvas() {
        const now = new Date();
        const timestamp = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0"),
            String(now.getHours()).padStart(2, "0"),
            String(now.getMinutes()).padStart(2, "0"),
            String(now.getSeconds()).padStart(2, "0")
        ].join("");
        const link = document.createElement("a");
        link.download = `immagine-${timestamp}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    function deleteAll(){
        let decision=confirm("Sei sicuro che vuoi cancellare tutto? Non si torna indietro.");

        if(decision==true){
            localStorage.removeItem(canvas);
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        else{
            return
        }

    }


    let bufferFrame = [];  // Buffer per salvare gli stati del canvas
    const maxBufferLength = 10;  // Massimo numero di stati da salvare
    

    //cliccato?
    let cliccato = false;
    window.addEventListener("mousedown", () => {
        cliccato = true;
    });
    window.addEventListener("mouseup", () => {
        cliccato = false;
        lastPos = []; //se hai scliccato, resetta l'ultima posizione
        
    });

    

    canvas.addEventListener("mousedown",(evt)=>{
        cliccato = true;
        curPos.x = getMousePos(canvas, evt).x;
        curPos.y = getMousePos(canvas, evt).y;
        salvaUltimoFrame();
        update(evt);
    });


    
    function salvaUltimoFrame() {
        const currentState = canvas.toDataURL();
        bufferFrame.push(currentState);
        console.log('Frame salvati:', bufferFrame.length);
    }
    
    function annulla() {
        if (bufferFrame.length >= 1) {
            // Ottiene l'ultimo frame senza rimuoverlo per mostrare lo stato corrente
            const statoPrecedente = bufferFrame[bufferFrame.length-1];
    
            var img = new Image();
            img.src = statoPrecedente;
            img.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                setModificato(true);
                
                // Ora che abbiamo mostrato lo stato precedente, possiamo rimuovere l'ultimo frame
                bufferFrame.pop();
            };
        }
    }

    function ripeti() {
        console.log("TODO: ripeti");
    }

    //ottieni posizione mouse
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        }
    }

    function bottColoreSelect(colore) { //scegli il colore con il bottone + associa al puntino //AA WARNING (da fare altri strumenti, da gestire meglio)
        colorPicker.value = colore;
        updateTools();
    }

    //funzione per aggiornare gli strumenti dopo la selezione del colore
    function updateTools(){
        punt.src = colorize(pennelloImgData, colorPicker.value, 1.0); //qua colorizzo il pennello
        pixel.src = colorize(pixelImgData, colorPicker.value, 1.0); //qua colorizzo la matita
        gommaImg.src = colorize(gommaImgData, colorPicker2.value, 1.0); //qua colorizzo la gomma
    }

    //funzione colorizza immagine
    //gli dai immagine in base64 e ti sputa fuori l'immagine colorizzata per cambiare colore agli strumenti tipo
   //COPSI NON VA BENE
   //DEVO FARLO ASINCRONO
   //DEVO FARLO ASINCRONO
   //DEVO FARLO ASINCRONO
   //DEVO FARLO ASINCRONO
   //DEVO FARLO ASINCRONO
   //DEVO FARLO ASINCRONO
   //DEVO FARLO ASINCRONO
   //DEVO FARLO ASINCRONO
   
    function colorize(dataUrlBase64, hexColor, intensity = 1.0) {
  if (typeof dataUrlBase64 !== "string" || !dataUrlBase64.startsWith("data:")) {
    throw new Error("dataUrlBase64 must be a data URL string (base64)");
  }
  function parseHex(hex) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    if (hex.length !== 6) throw new Error("hexColor must be 3 or 6 hex digits");
    return {
      r: parseInt(hex.slice(0,2), 16),
      g: parseInt(hex.slice(2,4), 16),
      b: parseInt(hex.slice(4,6), 16)
    };
  }
  function clampByte(v){ return v < 0 ? 0 : (v > 255 ? 255 : (v|0)); }

  const color = parseHex(hexColor);
  const fgR = color.r * intensity;
  const fgG = color.g * intensity;
  const fgB = color.b * intensity;

  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = dataUrlBase64;
  //Faccio caricare sync l'immagine
  img.decoding = "sync";

  if (!img.complete || img.naturalWidth === 0) {
    throw new Error("Image data URL not immediately available synchronously. Use an async variant or ensure data URL is decoded/cached.");
  }

  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = clampByte(fgR);
    data[i + 1] = clampByte(fgG);
    data[i + 2] = clampByte(fgB);
    // preserve alpha
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

window.addEventListener("load", updateTools);


    //colora la selezione azzurra, gli altri grigini
    //TODO: rifare usando una class con questo style e togliendo dagli altri strumenti la class
    function coloraSelezStrum(selezionato) { //tra virgolette selezionato, è una stringa che voglio
        document.getElementById(selezionato).classList.add("strumentoSelezionato");
        strumentiArray.forEach((e) => {
            console.log(e.localeCompare(selezionato) == 0);
            if (e.localeCompare(selezionato) != 0) {
                document.getElementById(e).classList.remove("strumentoSelezionato");
                console.log(document.getElementById(e));
            }
        });

    }

    //disegna una linea con una bruscia selezionata
    function linea(brush, oldX, oldY, newX, newY, offsetX = 0, offsetY = 0) {

        let distX = Math.abs(newX) - Math.abs(oldX); //cateto 1

        let distY = Math.abs(newY) - Math.abs(oldY); //cateto 2

        let diag = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)); //diagonale

        let quanti = Math.ceil(diag); //approssima per eccesso all'INT più vicino

        if (!Number.isFinite(diag) || diag === 0) {
            ctx.drawImage(brush, newX - offsetX, newY - offsetY);
            return;
        }

        let pezzettino = diag / quanti;

        let i; //variabile per girare il ciclo di for
        for (i = 0; i <= quanti; i++) { //idea alternativa: producer crea i punti, consumer li disegna

            let ratioX = distX / diag;
            let ratioY = distY / diag;
            let auxX = distX - (pezzettino * ratioX * i) + oldX;
            let auxY = distY - (pezzettino * ratioY * i) + oldY;
            ctx.drawImage(brush, auxX - offsetX, auxY - offsetY);

        }
    }

    function disegnaPixelMatita(x, y) {
        ctx.fillStyle = colorPicker.value;
        ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
    }

    function lineaMatita(oldX, oldY, newX, newY) {
        let distX = Math.abs(newX) - Math.abs(oldX);
        let distY = Math.abs(newY) - Math.abs(oldY);
        let diag = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

        if (!Number.isFinite(diag) || diag === 0) {
            disegnaPixelMatita(newX, newY);
            return;
        }

        let quanti = Math.ceil(diag);
        let pezzettino = diag / quanti;

        for (let i = 0; i <= quanti; i++) {
            let ratioX = distX / diag;
            let ratioY = distY / diag;
            let auxX = distX - (pezzettino * ratioX * i) + oldX;
            let auxY = distY - (pezzettino * ratioY * i) + oldY;
            disegnaPixelMatita(auxX, auxY);
        }
    }



    function seleziona(strumento) {
        switch (strumento) {
            case "pennello":
                strumentoSelezionato = "pennello";
                canvas.style.cursor = "url('cursori/croce.png') 7 7, auto";
                break;
            case "riempi":
                strumentoSelezionato = "riempi";
                canvas.style.cursor = "url('cursori/secchiello.png') 0 14, auto";
                break;
            case "matita":
                strumentoSelezionato = "matita";
                canvas.style.cursor = "url('cursori/matita.png') 0 15, auto";
                break;
            case "gomma":
                strumentoSelezionato = "gomma";
                canvas.style.cursor = "url('cursori/gomma.png') 4 4, auto";
                break;
            case "testo":
                strumentoSelezionato = "testo";
                canvas.style.cursor = "url('cursori/testo.png') 7 15, auto";
                break;
            case "path":
                strumentoSelezionato = "path";
                canvas.style.cursor = "url('cursori/croce.png') 7 7, auto";
                break;

        }
        coloraSelezStrum(strumentoSelezionato);
    }

function drawHandler(strumentoImmagineCoso, centrato = false){ //invece di riscrivere sta cosa mille volte la rendo una fuinzione SPERANDO che funziona
    const offsetX = centrato ? (strumentoImmagineCoso.naturalWidth || strumentoImmagineCoso.width) / 2 : 0;
    const offsetY = centrato ? (strumentoImmagineCoso.naturalHeight || strumentoImmagineCoso.height) / 2 : 0;

    if (cliccato) {
                    if (typeof lastPos.x !== "number" || typeof lastPos.y !== "number") {
                        ctx.drawImage(strumentoImmagineCoso, curPos.x - offsetX, curPos.y - offsetY);
                    } else {
                        linea(strumentoImmagineCoso, lastPos.x, lastPos.y, curPos.x, curPos.y, offsetX, offsetY);
                        /*
                                        ctx.moveTo(lastPos.x, lastPos.y);
                                        ctx.lineTo(pos.x, pos.y);
                                        ctx.stroke();
                        */
                    }

                    //ultima posizione
                    lastPos.x = curPos.x;
                    lastPos.y = curPos.y;
                    setModificato(true);


                } else {
                    //let pos = getMousePos(canvas, evt);
                    ctx.moveTo(curPos.x, curPos.y);
                }
}

function drawMatitaHandler(){
    if (cliccato) {
        if (typeof lastPos.x !== "number" || typeof lastPos.y !== "number") {
            disegnaPixelMatita(curPos.x, curPos.y);
        } else {
            lineaMatita(lastPos.x, lastPos.y, curPos.x, curPos.y);
        }

        lastPos.x = curPos.x;
        lastPos.y = curPos.y;
        setModificato(true);
    } else {
        ctx.moveTo(curPos.x, curPos.y);
    }
}

    function update(evt) {

        switch (strumentoSelezionato) {

            case "riempi":

                break;

            case "pennello":

            drawHandler(punt);
                  
                break;


            case "matita":
            drawMatitaHandler();
                break;

            case "gomma": //WARNING usare lo stesso sistema degli 
            drawHandler(gommaImg, true);

               break;

            case "testo":
                break;
            case "path":

                /*
                                let clickAux=0;
                                if(cliccato)clickAux=1;

                                if(clickAux){
                                    ctx.beginPath();
                                }
                                */

                if (cliccato) {
                    ctx.beginPath();
                    ctx.moveTo(lastPos.x, lastPos.y);
                    ctx.lineTo(curPos.x, curPos.y);
                    ctx.stroke();
                }
                break;
        }

    }


    //ultima posizione
    window.addEventListener("mousemove", (evt) => {
        curPos.x = getMousePos(canvas, evt).x;
        curPos.y = getMousePos(canvas, evt).y;
    });

    //funcioni copiate


    function flood_fill_old(x, y, color) {
        var pixelData = ctx.getImageData(x, y, 1, 1).data;
        var currentColor = { r: pixelData[0], g: pixelData[1], b: pixelData[2], a: pixelData[3] };
    
        // Controlla se il colore attuale del pixel è lo stesso di quello desiderato.
        if (currentColor.r === color.r && currentColor.g === color.g && currentColor.b === color.b && currentColor.a === color.a) {
            console.log("Il colore del pixel è già quello desiderato. Operazione annullata.");
            return; // Esce dalla funzione se i colori corrispondono.
        }

        pixel_stack = [{ x: x, y: y }];
        pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var linear_cords = (y * canvas.width + x) * 4;
        original_color = {
            r: pixels.data[linear_cords],
            g: pixels.data[linear_cords + 1],
            b: pixels.data[linear_cords + 2],
            a: pixels.data[linear_cords + 3]
        };

        while (pixel_stack.length > 0) {
            new_pixel = pixel_stack.shift();
            x = new_pixel.x;
            y = new_pixel.y;

            //console.log( x + ", " + y ) ;

            linear_cords = (y * canvas.width + x) * 4;
            while (y-- >= 0 &&
                (pixels.data[linear_cords] == original_color.r &&
                    pixels.data[linear_cords + 1] == original_color.g &&
                    pixels.data[linear_cords + 2] == original_color.b &&
                    pixels.data[linear_cords + 3] == original_color.a)) {
                linear_cords -= canvas.width * 4;
            }
            linear_cords += canvas.width * 4;
            y++;

            var reached_left = false;
            var reached_right = false;
            while (y++ < canvas.height &&
                (pixels.data[linear_cords] == original_color.r &&
                    pixels.data[linear_cords + 1] == original_color.g &&
                    pixels.data[linear_cords + 2] == original_color.b &&
                    pixels.data[linear_cords + 3] == original_color.a)) {
                pixels.data[linear_cords] = color.r;
                pixels.data[linear_cords + 1] = color.g;
                pixels.data[linear_cords + 2] = color.b;
                pixels.data[linear_cords + 3] = color.a;

                if (x > 0) {
                    if (pixels.data[linear_cords - 4] == original_color.r &&
                        pixels.data[linear_cords - 4 + 1] == original_color.g &&
                        pixels.data[linear_cords - 4 + 2] == original_color.b &&
                        pixels.data[linear_cords - 4 + 3] == original_color.a) {
                        if (!reached_left) {
                            pixel_stack.push({ x: x - 1, y: y });
                            reached_left = true;
                        }
                    } else if (reached_left) {
                        reached_left = false;
                    }
                }

                if (x < canvas.width - 1) {
                    if (pixels.data[linear_cords + 4] == original_color.r &&
                        pixels.data[linear_cords + 4 + 1] == original_color.g &&
                        pixels.data[linear_cords + 4 + 2] == original_color.b &&
                        pixels.data[linear_cords + 4 + 3] == original_color.a) {
                        if (!reached_right) {
                            pixel_stack.push({ x: x + 1, y: y });
                            reached_right = true;
                        }
                    } else if (reached_right) {
                        reached_right = false;
                    }
                }

                linear_cords += canvas.width * 4;
            }
        }
        ctx.putImageData(pixels, 0, 0);
    }


    function flood_fill(x, y, color) {
    const w = canvas.width, h = canvas.height;
    const pixels = ctx.getImageData(0, 0, w, h);
    const data = pixels.data;
    const startOff = (y * w + x) << 2;
    const sr = data[startOff], sg = data[startOff + 1], sb = data[startOff + 2];

    // se rgb di partenza sono già uguali al fill, esci
    if (sr === color.r && sg === color.g && sb === color.b) return;

    const matchRGB = (off) =>
        data[off] === sr && data[off + 1] === sg && data[off + 2] === sb;

    const writeRGB = (off) => {
        data[off] = color.r;
        data[off + 1] = color.g;
        data[off + 2] = color.b;
        // non toccare data[off+3] (alpha = 255 già impostato)
    };

    const stack = [];
    stack.push(x, y);

    while (stack.length) {
        const cy = stack.pop();
        const cx = stack.pop();

        if (cx < 0 || cx >= w || cy < 0 || cy >= h) continue;
        let off = ((cy * w) + cx) << 2;
        if (!matchRGB(off)) continue;

        // espandi sinistra
        let lx = cx;
        let loff = off;
        while (lx >= 0 && matchRGB(loff)) {
            lx--;
            loff -= 4;
        }
        lx++; loff += 4;

        // espandi destra e riempi
        let rx = lx;
        let roff = loff;
        while (rx < w && matchRGB(roff)) {
            writeRGB(roff);

            const upY = cy - 1;
            if (upY >= 0) {
                const upOff = (((upY * w) + rx) << 2);
                if (matchRGB(upOff)) stack.push(rx, upY);
            }
            const downY = cy + 1;
            if (downY < h) {
                const downOff = (((downY * w) + rx) << 2);
                if (matchRGB(downOff)) stack.push(rx, downY);
            }

            rx++;
            roff += 4;
        }
    }

    ctx.putImageData(pixels, 0, 0);
}

    function is_in_pixel_stack(x, y, pixel_stack) {
        for (var i = 0; i < pixel_stack.length; i++) {
            if (pixel_stack[i].x == x && pixel_stack[i].y == y) {
                return true;
            }
        }
        return false;
    }

    // adapted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function color_to_rgba(color) {
        if (color[0] == "#") { // hex notation
            color = color.replace("#", "");
            var bigint = parseInt(color, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;
            return {
                r: r,
                g: g,
                b: b,
                a: 255
            };
        } else if (color.indexOf("rgba(") == 0) { // already in rgba notation
            color = color.replace("rgba(", "").replace(" ", "").replace(")", "").split(",");
            return {
                r: color[0],
                g: color[1],
                b: color[2],
                a: color[3] * 255
            };
        } else {
            console.error("warning: can't convert color to rgba: " + color);
            return {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            };
        }
    }

    //quando premo F
    window.addEventListener("keydown", (evt) => {
        switch (evt) {
            case "R": //FILL
                riempi.click();
                break;
            case "P": //BRUSH
                pennello.click();
                break;
            case "M": //MATITA
                matita.click();
                break;
            case "G": //GOMMA
                gomma.click();
                break;
        }
    });

    function selezionaNiente() { //DEBUG
        strumentoSelezionato = "";
        for (s in strumentiArray) { //DESELEZIONA COL COLORE
            s.style.backgroundColor = "#f5f6f7"
        }
    }


    let canFill = true; //posso riempire?
    function riempimi() {

        if (strumentoSelezionato == "riempi") { //ridondante
            if (canFill) {
                console.log("riempi");
                coloreScelto = color_to_rgba(colore.value);
                flood_fill(curPos.x, curPos.y, coloreScelto);
            } else {
                console.log("Sto riempiendo il secchio di vernice...");
            }
        }
    }
    
    function testoFunzione() {
        let testoAux = window.prompt("Testo da inserire", "");
        ctx.font = "26px Arial"; //in futuro sarà dinamico scelglibile dall'utente
        ctx.fillStyle = "black";
        ctx.fillText(testoAux.toString(), curPos.x, curPos.y);
    }

    function clickTools() {
        setModificato(true);
        switch (strumentoSelezionato) {
            case "riempi":
                riempimi();
                break;
            case "testo":
                testoFunzione();
                break;
        }
    }




// Il RESTO


    document.addEventListener('keydown', function(event) {
        // Controlla se il tasto premuto è 'Z' (key code 90) e se il tasto CTRL è attivo
        if (event.ctrlKey && event.key === 'z') {
            event.preventDefault(); // Previene l'azione di default di CTRL+Z
            
            // Inserisci qui il codice che vuoi eseguire quando viene premuto CTRL+Z
            annulla()
        }
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            downloadCanvas();
        }
    });



    window.onbeforeunload = function() {
        if(modificato==true){
            return 'Non hai salvato, sei sicuro di voler lasciare la pagina?';
        }
        else{
            return
        }
    };


    canvas.addEventListener("click", clickTools);

    document.getElementById('scegliColore').addEventListener('click', async () => {
  if (!window.EyeDropper) {
    alert("Il tuo browser non supporta l'API EyeDropper");
    return;
  }
  
  const eyeDropper = new EyeDropper();
  try {
    const result = await eyeDropper.open();
    colorPicker.value = result.sRGBHex;
    bottColoreSelect(result.sRGBHex);
    console.log("Colore scelto: " + result.sRGBHex);
    //document.getElementById('result').textContent = "Colore scelto: " + result.sRGBHex;
    //document.body.style.backgroundColor = result.sRGBHex;
  } catch (err) {
    console.log('Annullato');
  }
});

