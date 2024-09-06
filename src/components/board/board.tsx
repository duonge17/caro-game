import { BoardProps, ScreenProps, SquareProps } from "./interface";
import './board.css';
import { useState } from "react";
import { url } from "inspector";
const OLink= 'https://img.freepik.com/premium-vector/graffiti-spray-paint-alphabet-o-isolated-vector_804425-731.jpg';
const XLink= 'https://media.istockphoto.com/id/1201202836/vector/dirty-grunge-hand-drawn-with-brush-strokes-cross-x-vector-illustration-isolated-on-white.jpg?s=612x612&w=0&k=20&c=gt_7zKbzu7yaUhtA10wzTSfIdkdqHrOlNAY65lqYWa8=';
const rowCount = 5, colCount = 5;
const winCondition= 4;
const data=( row :number, col :number)=>{
    const grid=[];
    for(let i=0; i< row; i++){
        const line= [];
        for(let y=0; y<col; y++){
            line.push('');
        }
        grid.push( line);
    }
    return grid;
}
const checkWin = ( grid: string[][], player: string, row :number, col : number): boolean => {
    const circumstances=[
        {
            key: 'vertical',
            up: {xUp:1,yUp:1},
            down: {xDown:-1,yDown:-1}      
        },
        {
            key: 'horizontal',
            up: {xUp:1,yUp:0},
            down: {xDown:-1,yDown:0}
        },
        {
            key: 'diagonal',
            up: {xUp:1,yUp:1},
            down: {xDown:-1,yDown:-1}
        },
        {
            key: 'antiDiagonal',
            up: {xUp:1,yUp:-1},
            down: {xDown:-1,yDown:1}
           
        }
    ];
    let count=1, tempRow=row, tempCol=col;
    for(let circumstance of circumstances){
        count=1;
        const {xUp,yUp}= circumstance.up;
        while(true){
            tempRow+= xUp;
            tempCol+= yUp;
            if(( tempRow <0 || tempRow >= rowCount ) || ( tempCol <0 || tempCol >= colCount )) break;
            if( grid[tempRow][tempCol] !== player) break;
            if( grid[tempRow][tempCol] === player) count+=1;
            
        }
        tempRow= row;
        tempCol= col;
        const { xDown, yDown}= circumstance.down;
        while(true){
            tempRow+= xDown;
            tempCol+= yDown;
            if(( tempRow < 0 || tempRow >= rowCount ) || ( tempCol < 0 || tempCol >= colCount )) break;
            if( grid[tempRow][tempCol] !== player ) break;
            if( grid[tempRow][tempCol] === player) count+=1;
           
        }
        tempRow= row;
        tempCol= col;
        if( count === winCondition) 
            return true;
    }
    return false;

    
    
}
  
const Game=()=>{
    const [ grid, setGrid]=useState( data( rowCount, colCount));
    const [ turn, setTurn]=useState( true);
    function handleReset(){
        setGrid( data( rowCount, colCount));
    }
    
    return (
        <div>
            <Screen title={ turn ? 'X' : 'O'}/>
            <Board turn={ turn} setTurn={ setTurn} moves={ grid} handleCheck={ setGrid}/>
            <button onClick={ handleReset }> Reset</button>
        </div>
    )
}
const Screen=({
    title
}:ScreenProps)=>{
    return(
        <h1> Turn { title }</h1>
    );
}
const Board=({
    turn, setTurn,
    moves,
    handleCheck
}:BoardProps)=>{
    const handleBoard= (row: number, col: number )=>{
        const newData= [...moves];
        if( newData[row][col].length > 0 ) return;
        const mark = turn ? 'X' : 'O';
        newData[row][col] = mark;
        handleCheck( newData);
        if(checkWin( newData, mark, row, col )){
            alert( mark+' is victory');
            return;
        }  
        setTurn( !turn );
    }

    const grid = moves.map(( row , rowIndex) => (
        <div key={ rowIndex} className= "board-row">
          {row.map(( cell , colIndex ) => (
            <Square
              key={ rowIndex + '-' + colIndex}
              value={ cell }
              onClick={ ()=>handleBoard( rowIndex, colIndex )}           
            />
          ))}
        </div>
    ));
    return(
        <div>
            {grid}
        </div>
    )
};


const Square=({
    value,
    onClick, ...rest
}: SquareProps)=>{
    return(
        <button style={
            {
                backgroundImage:value ? `url(${value ==='X'? XLink : OLink})`: 'none',
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }} className="square" onClick={ onClick} >
            
        </button>
    );
}

export default Game;


