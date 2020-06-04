class Player{
    constructor(){
        this.dashes = 3;
        this.charges = 2;
        return this;
    }

    useDashLeft(){
        if (this.dashes > 0){
            this.dashes -= 1;
            setTimeout(() => {this.dashes += 1;}, 5000)
            return true;
        }else{
            return false;
        }
    }

    useDashRight(){
        if (this.dashes > 0){
            this.dashes -= 1;
            setTimeout(() => {this.dashes += 1;}, 5000)
            return true;
        }else{
            return false;
        }
    }

    useCharge(){
        if (this.charges > 0){
            this.charges -= 1;
            setTimeout(() => {this.charges += 1;}, 1000)
            return true;
        }else{
            return false;
        }
    }
}

export default Player;
