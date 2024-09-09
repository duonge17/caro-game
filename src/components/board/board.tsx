import { BoardProps, ScreenProps, SquareProps } from "./interface";
import './board.css';
import { useState } from "react";
import { url } from "inspector";
const oLink= 'https://img.freepik.com/premium-vector/graffiti-spray-paint-alphabet-o-isolated-vector_804425-731.jpg';
const xLink= 'https://media.istockphoto.com/id/1201202836/vector/dirty-grunge-hand-drawn-with-brush-strokes-cross-x-vector-illustration-isolated-on-white.jpg?s=612x612&w=0&k=20&c=gt_7zKbzu7yaUhtA10wzTSfIdkdqHrOlNAY65lqYWa8=';
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
const checkDirection = ( grid: string[][], player: string, row: number, col: number, deltaRow :number, deltaCol: number) => {
    let count = 0;
    let tempRow = row, tempCol = col;

    while (true) {
        tempRow += deltaRow;
        tempCol += deltaCol;
        if (tempRow < 0 || tempRow >= rowCount || tempCol < 0 || tempCol >= colCount) break;
        if (grid[tempRow][tempCol] !== player) break;
        count++;
    }
    return count;
};
const checkWin = (grid: string[][], player: string, row: number, col: number) => {
    const directions = [
        { row: 1, col: 0 }, 
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 1, col: -1 } 
    ];
    
    for (const { row: deltaRow, col: deltaCol } of directions) {
        const totalCount = checkDirection(grid, player, row, col, deltaRow, deltaCol)
                        + checkDirection(grid, player, row, col, -deltaRow, -deltaCol) + 1; 
        if (totalCount >= winCondition) return true;
    }
    return false;
};

const Square=({
    value,
    onClick, ...rest
}: SquareProps)=>{
    return(
        <button style={
            {
                backgroundImage:value ? `url(${value ==='X'? xLink : oLink})`: 'none',
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }} className="square" onClick={ onClick} >
            
        </button>
    );
}

const Screen=({
    message,victory
}:ScreenProps)=>{
    return(
        <h1>
            {victory? "Winnder "+victory : 'Turn '+message}
        </h1>
    );
}


const Board=({
    grid,
    setGrid,
    turn, 
    setTurn,
    victory, 
    setVictory
}:BoardProps)=>{
    const handleBoard= (row: number, col: number )=>{
        if(victory)return;
        if( grid[row][col].length > 0 ) return;
        const newData= [...grid]; 
        const mark = turn ? 'X' : 'O';
        newData[row][col] = mark;
        setGrid( newData);
        if(checkWin( newData, mark, row, col )){
            alert(turn ? 'X' : 'O')
            setVictory(turn ? 'X' : 'O');
        }  
        setTurn( !turn );
    }

    const currGrid = grid.map(( row , rowIndex) => (
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
            {currGrid}
        </div>
    )
};

const Game=()=>{
    const [ grid, setGrid]=useState<string[][]>(data( rowCount, colCount));
    const [victory, setVictory]= useState<string>();
    const [ turn, setTurn]=useState( true);
    function handleReset(){
        setGrid( data( rowCount, colCount));
        setVictory(undefined);
        setTurn(true);
    }
    return (
        <div>
            <Screen 
                message={ turn ? 'X' : 'O'}
                victory={victory ? (turn ? 'X' : 'O'): undefined}
            />
            <Board 
                turn={ turn} 
                setTurn={ setTurn} 
                grid={ grid} 
                setGrid={ setGrid}
                victory={victory}
                setVictory={setVictory}
                />
            <button onClick={ handleReset }> Reset</button>
        </div>
    )
}

export default Game;


