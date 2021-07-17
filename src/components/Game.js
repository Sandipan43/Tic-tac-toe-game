import React ,{useEffect, useState}from 'react';
import Board from "./Board";
import {Button, Typography} from "@material-ui/core";
const initial={
  history:[{squares:Array(9).fill(null)}],
  stepNumber:0,
  xIsNext:true,
  current:{squares:Array(9).fill(null)},
  status:"",
  clear:false
};
function Game(props){
    const [history,setHistory]=useState(initial.history);
    const [stepNumber,setStepNumber]=useState(initial.stepNumber);
    const [xIsNext,setxIsNext]=useState(initial.xIsNext);
    const [current,setCurrent]=useState(initial.current);
    const [status,setStatus]=useState(initial.status);
    const [clear,setClear]=useState(initial.clear);
    const calculateWinner=(squares)=>{
      const lines=[
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }    

    const handleClick=(i)=>{              
      const historyP =history.slice(0,stepNumber + 1);
      const curr = historyP[historyP.length - 1];
      const squares=curr.squares.slice();
        if(calculateWinner(squares)||squares[i])
        return;
        squares[i]=xIsNext?'X':'O';
        const newHistory=[...history,{squares:squares}];
        //console.log(newHistory);
        setHistory(newHistory);
        setxIsNext((prev)=>!prev);
        setStepNumber(historyP.length);
        setCurrent(curr);                     
    }
    const jumpTo=(step)=> {        
      setStepNumber(step);
      let next=step%2===0
      setxIsNext(next);
    }
    const clearSt=()=>{
      setHistory(initial.history);
      setStepNumber(initial.stepNumber);
      setxIsNext(initial.xIsNext);
      setCurrent(initial.current);
      setStatus(initial.status);
      setClear(initial.clear);
    }
    useEffect(()=>{        
        let curr = history[stepNumber];      
        setCurrent(curr); 
        let winner = calculateWinner(curr.squares); 
        let status;
        if (winner) {
          status = "Winner: " + winner;  
          setClear(true);        
        }else if(stepNumber===9){
          status="Game Draw";   
          setClear(true);       
        } 
        else {
          status = "Next player: " + (xIsNext ? "X" : "O");      
        }   
        
        setStatus(status);
    },[stepNumber,history,xIsNext]);
    
  
    return(           
        <div className="game">
            <div className="game-board">
                <Board
                squares={current.squares}
                onClick={(i)=>handleClick(i)}
                />
            </div>
            <div className="game-info">
                <Typography variant='h2' style={{width:400}}>{status}</Typography>
                <ol>
                {
                history.map((step, move) => {
                    const desc = move ?
                      'Go to move #' + move :
                      'Go to game start';
                    return (                      
                      <li key={move}>
                        <Button style={{marginBottom:5,width:200}} variant='contained' color='secondary' onClick={() =>jumpTo(move)}>{desc}</Button>
                      </li>                      
                    );
                  })
                }
                {clear && <Button style={{backgroundColor:'lightgreen'}} variant='contained' onClick={()=>clearSt()}>Start New Game</Button>}
                </ol>                
            </div>
        </div>
         
    )
}

export default Game;