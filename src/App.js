import { useState } from "react";
import React from "react";

function Square({value,onSquareClick})
  {    
    return (<button className="square" onClick={onSquareClick} style={{width: 60 , height:60, font:24,textAlign:"center",marginBottom:0 ,border:"2px solid black",boxSizing:"border-box",cursor:"pointer", backgroundColor:"#fff", borderRadius:2,outline:"none",display:"flex",justifyContent:"center",alignItems:"center"}}>
        {value}
      </button>
    );
  }

var  action="Start";

function Board({xIsNext,squares,onPlay}) {

  const handleRefresh=()=>{
    window.location.reload();
  };
  function handleClick(i)
  {
    if(squares[i] || calculateWinner(squares))
    {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext)
    {
      nextSquares[i]='X';
    }
    else{
      nextSquares[i]='O';
    }   
    onPlay(nextSquares);
  } 

  var wish="";
  const winner=calculateWinner(squares);
  let status ;

  if(winner)
  {
    status="Winner : "+winner;
    action="Restart";
    wish="Congrats Player '"+winner+ "'";
  }
  else{
    status="Next Player : "+(xIsNext?"X":"O");
  }
    return (
   <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <div className="status" style={{margin:"0px 10px 30px 10px",color:"red"}}>
        {status}
      </div>
      <div className="board-row" style={{display:"grid",gridTemplateColumns:"repeat(3,60px)",gridTemplateRows:"repeat(3,60px)",gap:"0px"}}>
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)} />
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
      <div style={{margin:"20px 10px",color:"darkviolet",fontSize:"24px",fontFamily:"monospace"}}>
        {wish}
      </div>
      <div>
        <button onClick={handleRefresh} style={{padding:"10px 30px",borderRadius:"20px",backgroundColor:"green",border:"1px solid transparent",color:"white" }}>
          {action}
        </button>
      </div>
           
   </div>
  );
}

function calculateWinner(squares)
{
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0;i<lines.length;i++)
  {
    const [a,b,c]=lines[i];
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c])
    {
      return squares[a];
    }
  }
  return null;
}

function Game()
{
  const [history,setHistory]=useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove]=useState(0);
  const xIsNext=currentMove%2===0;
  const currentSquares=history[currentMove];

 // var action="start";

  function handlePlay(nextSquares)
  {
    const nextHistory=[...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove)
  {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares,move)=>{
    let description;
    if(move>0)
    {
      description='Go To move #'+move;
    }
    else{
      description='Go To game start';
    }
    return(
      <li key={move}>
        <button onClick={()=>jumpTo(move) }  style={{backgroundColor:"lightgrey",marginBottom:"10px",padding:"5px",border:"1px solid transparent",borderRadius:"5px"}}>{description}</button>
      </li>
    );
  });
  
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      
      <div style={{color:"pink",fontSize:"42px",fontFamily:"monospace"}}>
        TIC-TAC-TOE
      </div>

      <div className="Game" style={{width:"100%",backgroundColor: "white", maxWidth: "540px",margin: "100px auto 20px", padding:"40px 30px 70px",border: "10px" ,borderRadius:"20px",display:"flex",alignItems:"center",justifyContent:"space-around"}}>
        <div className="game-board">
         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info" >
         <ol >
          {moves}
        </ol>
        </div>     
      </div>
      
    </div>   
  );
}


export default Game;
