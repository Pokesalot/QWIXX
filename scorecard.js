//Generate Card
let card = document.getElementById("Scoreboard");
let rows = ["#ed152f", "#fdbd0d","#0e68b4","#0ca950"];
let scores = [0,0,0,0];

let newHTML = "";

for(let row = 0; row<rows.length; row++){
    newHTML += `<tr style="background-color: ${rows[row]};">\n`

    if(row <= 1){
        //red and yellow, low to high
        for(let number = 2; number <= 12; number++){
            if(number < 12){
                newHTML += `<td id="${row}${number}" onClick="score(${row},${number-2})">${number}</td>`;
            }else{
                newHTML += `<td id="Lock${row}" style="background-color: gray;"></td>`
            }
        }
    }else{
        //blue and green, high to low
        for(let number = 2; number <= 12; number++){
            if(number < 12){
                newHTML += `<td id="${row}${number}" onClick="score(${row},${number-2})">${14-number}</td>`;
            }else{
                newHTML += `<td id="Lock${row}" style="background-color: gray;"></td>`
            }
        }
    }

    newHTML += `<td>🔓</td></tr>\n`
}

card.innerHTML = newHTML;


function score(row, cell){//row is [0,3], cell is [0,11]
    if(cell == 10){
        scores[row]+= 2;
    }else{
        let curcell = document.getElementById(`${row}${cell+2}`);
        if(curcell.innerText == ""){return};


        scores[row]++;

        curcell.innerText = "X";
        for(let i=cell+1; i>=2; i--){
            let cur = document.getElementById(`${row}${i}`)
            cur.innerText=="X"?i=0:cur.innerText = "";
        }

        if(scores[row] >= 5){
            let unlock = document.getElementById(`Lock${row}`);
            unlock.style.backgroundColor = rows[row];
            unlock.innerText = row>=2?"2":"12";
            unlock.onclick = function(){score(row,10);};
        }
    }
    
}