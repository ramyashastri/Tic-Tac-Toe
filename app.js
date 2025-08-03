let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#newgame-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnMsg = document.querySelector("#turn-msg");
const winSound = new Audio('win-sound.mp3');
const clickSound = new Audio("mouse-click.mp3");

let turnO = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const updateTurnMsg=()=>{
    if(turnO){
        turnMsg.innerText="It's Player O's turn";
    }
    else
    {
        turnMsg.innerText="It's Player X's turn";
    }
}

newgamebtn.disabled = true;

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        clickSound.play();
        if(turnO){
            box.innerText="O";
            box.style.color="blue";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
            box.style.color="red";
        }
        box.disabled = true;//once a box has been clicked, it can't be clicked to change O or X again
        updateTurnMsg();

        let winnerexists = checkWinner();
        let allfilled= true;
        boxes.forEach(box =>{
            if(box.innerText==="") allfilled=false;
        })

        if(!winnerexists)
        {
            if(allfilled)
            {
                showDraw();
            }
        }
    });
});


const resetGame=()=>{
    turnO=true;
    enabledboxes();
    msgcontainer.classList.add("hide");
    newgamebtn.disabled = false ;
};
const disabledboxes=()=>{
    for(box of boxes)
    {
        box.disabled=true;
    }
}

const enabledboxes=()=>{
    for(box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}

const showDraw=()=>{
    msg.innerText="It's a draw!";
    msgcontainer.classList.remove("hide");
    newgamebtn.disabled = false;
    turnMsg.classList.add("hide"); 
    disabledboxes();

}

const showWinner=(winner,pattern)=>{
    msg.innerText=`Congratulations! Winner is ${winner}`; 
    msgcontainer.classList.remove("hide");
    newgamebtn.disabled = false;
    turnMsg.classList.add("hide"); 
    disabledboxes();

    pattern.forEach(index=>{
        boxes[index].style.backgroundColor="lightgreen";
    })
    winSound.play();

}

const checkWinner=()=>{
    for (let pattern of winPatterns){
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if(posval1!=="" && posval2!=="" && posval3!== ""){
            if(posval1===posval2 && posval2===posval3){
                showWinner(posval1,pattern);
                return true;
            }
        }
    }
    return false;
}

resetbtn.addEventListener("click",()=>{
    if(confirm("Are you sure you want to reset the game?")){
        resetGame();    
    }
});
newgamebtn.addEventListener("click",resetGame);