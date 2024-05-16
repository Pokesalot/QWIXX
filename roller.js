let actives = [true, true, true, true, true, true];

function RollDice(){
    visualDelay();
    
    setTimeout(() => {
        for(let i=2;i<8;i++){
            if(actives[i-2]){
    
                for(let j=0; j<5;j++){ //Add like, way more randomness by shaking the dice a bunch more
                    document.getElementsByClassName(`item${i}`)[0].innerText = Math.ceil(Math.random() * 6);
                }
                
            }else{
                document.getElementsByClassName(`item${i}`)[0].innerText = "X";
            }
            
        }
    }, 450);
}

function visualDelay(){
    for(let i=2;i<8;i++){
        document.getElementsByClassName(`item${i}`)[0].innerText = "*";
    }
}

function toggle(index){
    actives[index] = !actives[index];
    if(actives[index]){
        document.getElementsByClassName(`item${index+2}`)[0].innerText = Math.ceil(Math.random() * 6);
    }else{
        document.getElementsByClassName(`item${index+2}`)[0].innerText = "X";
    }
}