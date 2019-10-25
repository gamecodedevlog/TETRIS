function log(text){
    if(GEngine.debug == false)return;
    console.log(text);   
}

function sleep(delay){
    var start =new Date().getTime();
    while(new Date().getTime()< start + delay);
}

function objToString(obj){
    JSON.stringify(obj);
}

function getRandom(a,b){
    return Math.floor(Math.random() * b) + a;
}

class GEngine {
    static KEY_LEFT = 37;
    static KEY_UP = 38;
    static KEY_RIGHT = 39;
    static KEY_DOWN = 40;
    static KEY_SPACE = 32;

    static loadObjectFile(length){
        OBJECT = new Array(length);
        IMAGE = new Array(length);
        STATE = new Array(length);

        log("GEngine.createCanvas() OBJECT : " + length);
        for(var i =0; i<length; i++){
            var jscript = document.createElement('script');
            jscript.type = 'text/javascript';
            jscript.src = "./Object/" + i + ".js";
            document.head.appendChild( jscript );
            log("OBJECT [" + i +"] : " +jscript.src);
        }
    }

    static debug = false;
    constructor(width,height) {
        this.canvas = GEngine.createCanvas(width,height,true);
        this.context= this.canvas.getContext('2d');

        this.bufferCanvas = GEngine.createCanvas(width,height,);
        this.bufferContext= this.bufferCanvas.getContext('2d');
   
        for(var i =0; i<OBJECT.length; i++){
            STATE[i] = new Enum(Object.keys(OBJECT[i]));
        }
    }

    static createCanvas(width,height,flag){
        var canvas = document.createElement( 'Canvas' );
        canvas.width=width;
        canvas.height=height;
       
        if(flag)document.body.appendChild( canvas );
        return canvas;
    }

    getCanvas(){
        return this.canvas;
    }

    getContext(){
        return this.context;
    }

    getBufferContext(){
        return this.bufferContext;
    }

    getImageCount(){
        return this.imageCount;
    }

    loadImageFile(callback){
        this.imageCount = 0;
        for(var i = 0; i<IMAGE.length; i++){
            IMAGE[i] = new Array(OBJECT[i].IMG);

            for(var j =0; j<IMAGE[i].length; j++){
                this.imageCount++;
            }
        }
        log("GEngine.loadImageFile() IMAGE : " + this.imageCount);
        var count = 0;
        for(var i = 0; i<IMAGE.length; i++){
            for(var j =0; j<IMAGE[i].length; j++){
                IMAGE[i][j] = new Image();
                IMAGE[i][j].src =  "./Image/" + i + "/" + j + ".png";
                IMAGE[i][j].onload = function () {
                    callback(count++);
                } 
                log("IMAGE[" + i + "][" + j + "] : " + IMAGE[i][j].src);
            }
        } 
    }

    draw(){
        this.context.drawImage(this.bufferCanvas, 0, 0);
        //sleep(100);
    }

    drawMap(map,image,sizeX,sizeY){
        for(var x=0; x<map[0].length; x++) {
            for(var y=0; y<map.length; y++) {
                this.bufferContext.drawImage(image[map[y][x]] , x * sizeX, y * sizeY);   
            }
        } 
    }
}

GEngine.debug = true;
GEngine.loadObjectFile(ID.length);