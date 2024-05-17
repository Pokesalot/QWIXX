//Generate Card
let card = document.getElementById("Scoreboard");
let rows = ["#ed152f", "#fdbd0d","#0e68b4","#0ca950"];
let scores = [0,0,0,0,0];
let scoreVals = [0,1,3,6,10,15,21,28,36,45,55,66,78]

let newHTML = "";

for(let row = 0; row<rows.length; row++){
    newHTML += `<tr style="background-color: ${rows[row]};">\n`

    if(row <= 1){
        //red and yellow, low to high
        for(let number = 2; number <= 12; number++){
            if(number < 12){
                newHTML += `<td id="${row}${number}" onClick="score(${row},${number-2})">${number}</td>`;
            }else{
                newHTML += `<td id="${row}${number}" onClick="score(${row},${number-2})" style="background-color: gray;"></td>`
            }
        }
    }else{
        //blue and green, high to low
        for(let number = 2; number <= 12; number++){
            if(number < 12){
                newHTML += `<td id="${row}${number}" onClick="score(${row},${number-2})">${14-number}</td>`;
            }else{
                newHTML += `<td id="${row}${number}" onClick="score(${row},${number-2})" style="background-color: gray;"></td>`
            }
        }
    }

    newHTML += `<td id="${row}13" onclick="score(${row},11)">🔓</td></tr>\n`
}

card.innerHTML = newHTML;


function score(row, cell){//row is [0,3], cell is [0,11]

    let curcell = document.getElementById(`${row}${cell+2}`);
    if(curcell.innerText == "" || curcell.innerText == "X"){console.log("already scored");return};

    if(cell == 11){

    }else if(cell == 10){
        scores[row]+= 2;
        let getLock = document.getElementById(`${row}13`)
        getLock.innerText = "X";
    }else{
        scores[row]++;
        if(scores[row] >= 5){
            let unlock = document.getElementById(`${row}12`);
            unlock.style.backgroundColor = rows[row];
            unlock.innerText = row>=2?"2":"12";
            unlock.onclick = function(){score(row,10);};
        }
    }

    curcell.innerText = "X";
    for(let i=cell+1; i>=2; i--){
        let cur = document.getElementById(`${row}${i}`)
        cur.innerText=="X"?i=0:cur.innerText = "";
    }
    showScore();
}

function penalty(){
    if(scores[4] == 4){return}
    let penalties = document.getElementById("penaltyRow");
    let curPen = penalties.getElementsByTagName("td")[scores[4]];
    curPen.innerText = "X";
    curPen.style.color = "red";

    scores[4]++;
    showScore();
}

function showScore(){
    let totalScore = 0;
    for(let i=0;i<4;i++){
        let curScore = document.getElementById(`score${i}`);
        curScore.innerText = scoreVals[scores[i]];
        totalScore += scoreVals[scores[i]];
    }

    let curScore = document.getElementById(`score4`);
    curScore.innerText = 5*scores[4];
    totalScore -= 5*scores[4];

    curScore = document.getElementById(`total`);
    curScore.innerText = totalScore;
}