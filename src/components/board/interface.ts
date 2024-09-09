export interface BoardProps{
    moves:string[][]
    handleCheck:(moves :string[][])=>void
    turn:boolean
    setTurn:(turn: boolean)=>void
    victory:string| undefined
    setVictory:(player: string)=>void
}

export interface SquareProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    value:string
}
export interface ScreenProps {
    title:string
}