let imageNameList = ["./animals pic/animal-bear-fur-svgrepo-com.svg",
                    "./animals pic/fish-svgrepo-com.svg",
                    "./animals pic/giraffe-svgrepo-com.svg",
                    "./animals pic/seal-svgrepo-com.svg",
                    "./animals pic/lion-svgrepo-com (1).svg",
                    "./animals pic/jellyfish-svgrepo-com.svg"];
let cardsList = [[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let finished = false;
function runGame(){
    assignPicturesRandomly();
    countDown();
}
function assignPicturesRandomly(){
    if(finished == false){
        for (let i = 0; i < 6; i++){
            let row = Math.floor(Math.random()*3);
            let col = Math.floor(Math.random()*4);
            while (cardsList[row][col] != 0){ 
                row = Math.floor(Math.random()*3);
                col = Math.floor(Math.random()*4);
            }
            //place the 1st card of the pair
            cardsList[row][col] = imageNameList[i];
            document.getElementById(row + "" + col).setAttribute("src", ""+imageNameList[i]) 
    
            row = Math.floor(Math.random()*3);
            col = Math.floor(Math.random()*4);
            while (cardsList[row][col] != 0){
                row = Math.floor(Math.random()*3);
                col = Math.floor(Math.random()*4);
            }
            //place the 2st card of the pair
            cardsList[row][col] = imageNameList[i];
            document.getElementById(row + "" + col).setAttribute("src", ""+imageNameList[i])
        }
    }
}
let nthClick = 2;
let clickedCnt = 0;
let firstClickedCardName;
let secondClickedCardName;
let firstClickedElementId;
let secondClickedElementId;
function choose(obj){
    document.getElementById("clickAudio").play();
    if (finished == false){
        clickedCnt++;
    }
    if(nthClick == 1){
        nthClick = 2;
    } else if(nthClick == 2){
        nthClick = 1;
    }
    let position = obj.id.split(",");
    let selectedCard = document.getElementById(obj.id);
    selectedCard.querySelector("img:nth-child(1)").style.display = "none";// stop showing "?"
    selectedCard.querySelector("img:nth-child(2)").style.display = "inline";//show animal pic
    selectedCard.removeAttribute("onclick");//Make sure that user can't click the same picture.
    if(nthClick == 1){
        firstClickedCardName = cardsList[position[0]][[position[1]]];
        firstClickedElementId = obj.id;
    } else if(nthClick == 2) {
        secondClickedCardName = cardsList[position[0]][[position[1]]];
        secondClickedElementId = obj.id;
    }
    if (nthClick == 2){ //check if the pictures are the same when user clicks second time
        if (firstClickedCardName == secondClickedCardName){
            document.getElementById(firstClickedElementId).querySelector("img:nth-child(2)").style.background = "teal";//add color if two pictures are the same
            document.getElementById(secondClickedElementId).querySelector("img:nth-child(2)").style.background = "teal"; 
        } else {
            //back to normal if two pictures aren't the same
            setTimeout(function flipCard(){
                document.getElementById(firstClickedElementId).querySelector("img:nth-child(1)").style.display = "inline";
                document.getElementById(firstClickedElementId).querySelector("img:nth-child(2)").style.display = "none";
                document.getElementById(secondClickedElementId).querySelector("img:nth-child(1)").style.display = "inline";
                document.getElementById(secondClickedElementId).querySelector("img:nth-child(2)").style.display = "none";
            },500)
            document.getElementById(firstClickedElementId).setAttribute("onclick","choose(this)");
            document.getElementById(secondClickedElementId).setAttribute("onclick","choose(this)");
            clickedCnt -= 2;
        }   
    }
    checkfinished();  
    
}
function countDown(){
    let selected = document.querySelector("input[name = 'level']:checked").value;  
    let timeLeft;
    if (selected == "easy"){
        timeLeft = 40;
    } else if (selected == "medium"){
        timeLeft = 30;
    } else if (selected == "hard"){
        timeLeft = 20;
    }
        document.getElementById("countDown").innerHTML = "Time: " + timeLeft;;
        countdownInterval = setInterval(function() {
            if(finished === false){
                timeLeft--;
                document.getElementById("countDown").innerHTML = "Time: " + timeLeft;
            }
            if (timeLeft === 0) {
                clearInterval(countdownInterval);
                finished = true;
                gameLoseShow();
                
            }
        }, 1000);
}        
function checkfinished(){
    if (clickedCnt == 12){
        finished = true;
        gameWinShow();
    }
}
function gameWinShow() {
    document.getElementById("gameWinAudio").play();
    document.getElementsByClassName("container")[0].style.display = "none";
    document.getElementById("countDown").style.display = "none";
    document.getElementsByClassName("container2")[0].style.display = "flex";
}
function gameLoseShow() {
    document.getElementById("gameLoseAudio").play();
    document.getElementsByClassName("container")[0].style.display = "none";
    document.getElementById("countDown").style.display = "none";
    document.getElementsByClassName("container3")[0].style.display = "flex";
}
function restart(){
    location.reload(); 
}
function play(){
    document.getElementsByClassName("container")[0].style.display = "flex";
    document.getElementById("countDown").style.display = "block";
    document.getElementsByClassName("container4")[0].style.display = "none";
    runGame();
}