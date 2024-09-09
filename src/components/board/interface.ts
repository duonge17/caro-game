export interface BoardProps{
    grid: string[][]|undefined
    setGrid:(moves :string[][])=>void
    turn:boolean
    setTurn:(turn: boolean)=>void
    victory:string| undefined
    setVictory:(player: string)=>void
}

export interface SquareProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    value:string
}
export interface ScreenProps {
    message:string
    victory:string | undefined
}