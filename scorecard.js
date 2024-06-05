//Generate Card
let card = document.getElementById("Scoreboard");
let rows = ["#ed152f", "#fdbd0d","#0e68b4","#0ca950"];
let scores = [0,0,0,0,0];
let scoreVals = [0,1,3,6,10,15,21,28,36,45,55,66,78];
let moves = [];

let newHTML = "";

for(let row = 0; row<rows.length; row++){
    newHTML += `<tr style="background-color: ${rows[row]};">\n`

    if(row <= 1){
        //red and yellow, low to high
        for(let number = 2; number <= 12; number++){
            if(number < 12){
                newHTML += `<td id="${row}${number}" onClick="pushScore(${row},${number-2})">${number}</td>`;
            }else{
                newHTML += `<td id="${row}${number}" onClick="pushScore(${row},${number-2})" style="background-color: gray;"></td>`
            }
        }
    }else{
        //blue and green, high to low
        for(let number = 2; number <= 12; number++){
            if(number < 12){
                newHTML += `<td id="${row}${number}" onClick="pushScore(${row},${number-2})">${14-number}</td>`;
            }else{
                newHTML += `<td id="${row}${number}" onClick="pushScore(${row},${number-2})" style="background-color: gray;"></td>`
            }
        }
    }

    newHTML += `<td id="${row}13" onclick="score(${row},11)">🔓</td></tr>\n`
}

card.innerHTML = newHTML;

function pushScore(row, cell){
    moves.push([row,cell]);
    displayScores();
}

function popScore(){
    if(moves.length >= 1){
        moves.pop();
    }
    displayScores();
}

function displayScores(){
    scores = [0,0,0,0,0];
    for(let row=0;row<=1;row++){
        for(let cell=2;cell<=11;cell++){
            let curCell = document.getElementById(`${row}${cell}`);
            curCell.innerText = cell;
        }
        let curCell = document.getElementById(`${row}12`);
        curCell.style.backgroundColor = "gray";
        curCell.innerText = "";

        curCell = document.getElementById(`${row}13`);
        curCell.innerText = "🔓";
    }
    for(let row=2;row<=3;row++){
        for(let cell=2;cell<=11;cell++){
            let curCell = document.getElementById(`${row}${cell}`);
            curCell.innerText = 14-cell;
        }
        let curCell = document.getElementById(`${row}12`);
        curCell.style.backgroundColor = "gray";
        curCell.innerText = "";
        
        curCell = document.getElementById(`${row}13`);
        curCell.innerText = "🔓";
    }
    let penalties = document.getElementById("penaltyRow");
    for(let curPen=0; curPen<4; curPen++){
        penalties.getElementsByTagName("td")[curPen].innerText = "1";
        penalties.getElementsByTagName("td")[curPen].style.color = "white";
    }

    for(let i=0; i<moves.length; i++){
        if(moves[i][0] == 5){
            penalty();
        }else{
            score(moves[i][0], moves[i][1]);
        }
        
    }
    if(moves.length >= 10){
        document.getElementById("spaceBuffer").innerText = "";
    }else{
        document.getElementById("spaceBuffer").innerText = "0";
    }
    showScore();
}


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