const cells=document.querySelectorAll(".game-cell");
const display=document.querySelector(".result-display");
const winningConditions=[
    [6,4,2],
    [0,3,6],
    [7,4,1],
    [2,5,8],
    [8,4,0],
    [5,4,3],
    [2,1,0],
    [2,4,6],
]
let turn;
function newGame(){
    setTimeout(()=>{
        location.reload();
    },3000)
}
function checkWinners(){
    const moves= Array.from(cells).map((cell)=>{
        if(cell.classList.contains("inactive"))return "Unplayed";
        else{
            return cell.textContent;
        }
    })
    if(moves.find(v=>v=="Unplayed")==undefined){
        display.textContent="Its a draw"
        newGame();
    }
    winningConditions.forEach((condition,i)=>{
        if(moves[condition[0]]==moves[condition[1]]&&moves[condition[0]]==moves[condition[2]]&&moves[condition[0]]!="Unplayed"){
            display.textContent=`${moves[condition[0]]} won the Game`;
            cells.forEach((cell)=>{
                cell.classList.remove("inactive");
            })
            newGame();
        }
    })
}
function updateTurn(){
    display.textContent=`${turn}'s Turn`;
    document.documentElement.style.setProperty("--turn",`"${turn}"`);
    checkWinners();
}


document.addEventListener("DOMContentLoaded",()=>{
    turn=["O","X"][Math.floor(Math.random()*2)]
    updateTurn()
});


cells.forEach((cell)=>{
    cell.addEventListener("click",(e)=>{
        const target=e.currentTarget;
        if(target.classList.contains("inactive")){
            target.classList.remove("inactive");
            e.currentTarget.textContent=turn
            turn=(turn=="X")?"O":"X";
            updateTurn()
        }
    })
})