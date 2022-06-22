window.onload = function() {

    //il canvas e il suo contesto (2d in questo caso)
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = 1300;
    ctx.canvas.height = 700;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //altre variabili
    const punt = document.getElementById("puntino"); //pennello nero
    const rosso = document.getElementById("rosso"); //pennello debug
    const pixel = document.getElementById("pixel"); //matita pixel

    const colorPicker = document.getElementById("colore"); //selettore colore
    const pennello = document.getElementById("pennello"); //bottone seleziona pennello
    const riempi = document.getElementById("riempi"); //bottone seleziona riempi
    const matita = document.getElementById("matita"); //bottone seleziona matita
    const gomma = document.getElementById("gomma"); //bottone seleziona gomma
    const testo = document.getElementById("testo"); //bottone seleziona gomma

    let coloreScelto = ""; //il colore scelto

    const strumentiArray = ["pennello", "riempi", "matita", "gomma", "testo"]; //lo uso per girare gli strumenti e colorare le selezioni

    let lastPos = []; //ultima posizione del mouse

    let curPos = []; //posizione corrente cursore

    canvas.addEventListener("mousemove", update); //Listener per la posizione del cursore dentro il canvas

    //Listener nei bottoni degli strumenti
    pennello.addEventListener("click", () => seleziona("pennello"));
    riempi.addEventListener("click", () => seleziona("riempi"));
    matita.addEventListener("click", () => seleziona("matita"));
    gomma.addEventListener("click", () => seleziona("gomma"));
    testo.addEventListener("click", () => seleziona("testo"));

    //Tavolozza dei colori

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


    //cliccato?
    let cliccato = false;
    window.addEventListener("mousedown", () => cliccato = true);
    window.addEventListener("mouseup", () => {
        cliccato = false;
        lastPos = []; //se hai scliccato, resetta l'ultima posizione
    });


    //ottieni posizione mouse
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        }
    }

    function bottColoreSelect(colore) { //scegli il colore con il bottone
        colorPicker.value = colore;
    }

    //colora la selezione azzurra, gli altri grigini
    function coloraSelezStrum(selezionato) { //tra virgolette selezionato, è una stringa che voglio
        document.getElementById(selezionato).style.backgroundColor = "#c9e0f7";
        strumentiArray.forEach((e) => {
            console.log(e.localeCompare(selezionato) == 0);
            if (e.localeCompare(selezionato) != 0) {
                document.getElementById(e).style.backgroundColor = "#f5f6f7";
                console.log(document.getElementById(e));
            }
        });

    }

    //disegna una linea con una bruscia selezionata
    function linea(brush, oldX, oldY, newX, newY) {

        let distX = Math.abs(newX) - Math.abs(oldX); //cateto 1

        let distY = Math.abs(newY) - Math.abs(oldY); //cateto 2

        let diag = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)); //diagonale

        let quanti = Math.ceil(diag); //approssima per eccesso all'INT più vicino

        let pezzettino = diag / quanti;

        let i; //variabile per girare il ciclo di for
        for (i = 0; i <= quanti; i++) { //idea alternativa: producer crea i punti, consumer li disegna

            let ratioX = distX / diag;
            let ratioY = distY / diag;
            let auxX = distX - (pezzettino * ratioX * i) + oldX;
            let auxY = distY - (pezzettino * ratioY * i) + oldY;
            ctx.drawImage(brush, auxX, auxY);

        }
    }


    //strumento selezionato?
    let strumentoSelezionato = "pennello";

    function seleziona(strumento) {
        switch (strumento) {
            case "pennello":
                strumentoSelezionato = "pennello";
                canvas.style.cursor = "url('cursori/croce.png') 7 7, auto";
                break;
            case "riempi":
                strumentoSelezionato = "riempi";
                canvas.style.cursor = "url('cursori/secchiello.png') 0 14, auto";
                //devo ASSOLUTAMENTE DI CORSA fare una funzione per colorare l'ultimo strumento che era selelzionato, 
                //probabilmente tenendone traccia in una variabile
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

        }
        coloraSelezStrum(strumentoSelezionato);
    }



    function update(evt) {

        switch (strumentoSelezionato) {

            case "pennello":
                if (cliccato) {
                    if (!lastPos) {
                        ctx.drawImage(punt, curPos.x, curPos.y);
                    } else {
                        linea(punt, lastPos.x, lastPos.y, curPos.x, curPos.y);
                        /*
                                        ctx.moveTo(lastPos.x, lastPos.y);
                                        ctx.lineTo(pos.x, pos.y);
                                        ctx.stroke();
                        */
                    }

                    //ultima posizione
                    lastPos.x = curPos.x;
                    lastPos.y = curPos.y;


                } else {
                    //let pos = getMousePos(canvas, evt);
                    ctx.moveTo(curPos.x, curPos.y);
                }
                break;

            case "riempi":
                /* if (cliccato) {
                     floodFill(ctx, lastPos.x, lastPos.y, [255, 0, 0, 255]);
                 }*/
                break;

            case "matita":
                if (cliccato) {
                    if (!lastPos) {
                        ctx.drawImage(pixel, curPos.x, curPos.y);
                    } else {
                        linea(pixel, lastPos.x, lastPos.y, curPos.x, curPos.y);
                        /*
                                        ctx.moveTo(lastPos.x, lastPos.y);
                                        ctx.lineTo(pos.x, pos.y);
                                        ctx.stroke();
                        */
                    }

                    //ultima posizione
                    lastPos.x = curPos.x;
                    lastPos.y = curPos.y;


                } else {
                    //let pos = getMousePos(canvas, evt);
                    ctx.moveTo(curPos.x, curPos.y);
                }
                break;

            case "gomma":
                ctx.lineWidth = 5;
                if (cliccato) {
                    ctx.moveTo(lastPos.x, lastPos.y);
                    ctx.lineTo(curPos.x, curPos.y);
                    ctx.strokeStyle = "#ffffff";
                    ctx.lineWidth = 8;
                    ctx.stroke();

                } else {
                    ctx.moveTo(curPos.x, curPos.y);
                }
                break;
            case "testo":


                break;
        }

    }


    //ultima posizione
    window.addEventListener("mousemove", (evt) => {
        curPos.x = getMousePos(canvas, evt).x;
        curPos.y = getMousePos(canvas, evt).y;
    });

    //funcioni copiate


    function flood_fill(x, y, color) {
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
                //DEBUG SCURISCE IL COLORE
                scurisciColore();
                //selezionaNiente();
                //canFill = false; //non puoi fillare
                //setTimeout(() => { canFill = true; }, 1500); //se non aspetti
            } else {
                console.log("Sto riempiendo il secchio di vernice...");
            }
        }
    }

    function scurisciColore() { //funziona male dovrei dividere la stringa per 3 e togleire a ogni coso, se no tolgo solo al blu
        let coloreAux = "0x" + colore.value.substring(1);
        if (coloreAux.substring(4) == "00") {
            colore.value = "#" + (coloreAux + 3).toString(16); //riporta in base 16
        } else
            colore.value = "#" + (coloreAux - 1).toString(16); //riporta in base 16
    }

    function testoFunzione() {
        let testoAux = window.prompt("Testo da inserire", "");
        ctx.font = "26px Arial"; //in futuro sarà dinamico scelglibile dall'utente
        ctx.fillStyle = "black";
        ctx.fillText(testoAux.toString(), curPos.x, curPos.y);
    }

    function clickTools() {
        switch (strumentoSelezionato) {
            case "riempi":
                riempimi();
                break;
            case "testo":
                testoFunzione();
                break;
        }
    }

    canvas.addEventListener("click", clickTools);
}