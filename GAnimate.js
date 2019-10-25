class Animate{
    constructor(id,object,state,x,y,callback){
        this.id = id;
        this.object = object;
        this.state = state;
        this.x = x;
        this.y = y;
        this.callback = callback;
        this.objectState = Object.values(object)[state];
    }

    nextFrame(index){
        if(this.index < this.objectState[0].length-1){
            this.index++;
        }else{
            this.index=0;
            this.callback(index);
        }
    }
    
    setState(state,x,y){
        this.x = x;
        this.y = y;
        this.state = state;
        this.index = 0;
        this.objectState = Object.values(this.object)[state];
    }
}

class AnimateContainer{
    constructor(){
        this.objectArray = new Array(0);
    }

    nextFrame(context){
        for (var index = 0; index < this.objectArray.length; index++) {
            this.objectArray[index].nextFrame(index);
            var element = this.objectArray[index];
            var image = IMAGE[element.id][element.objectState[0][element.index]];
            element.x += element.objectState[1][element.index];
            element.y += element.objectState[2][element.index];
            context.drawImage(image, element.x , element.y);
        }
    }

    newAnimate(animate){
        this.objectArray.push(animate);
        return this.getIndex(animate.id);
        //log("newAnimate() objectArray length : " + this.objectArray.length);
    }

    deleteAnimate(index){
       this.objectArray.splice(index,1);
       //log("deleteAnimate() objectArray length : " + this.objectArray.length);
    }

    setState(index,state,x,y){
        this.objectArray[index].setState(state,x,y);
        //log("setState() objectArray length : " + this.objectArray.length);
    }
    
    getState(index){
        return this.objectArray[index];
    }

    getIndex(id){
        for (var index = 0; index < this.objectArray.length; index++) {
            var element = this.objectArray[index];
            if(id == element.id)return index;
        }
    }
}
