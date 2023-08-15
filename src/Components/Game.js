import Menu from "./Menu";
import Tetris from "./Tetris";
import { useGameOver } from "../Hooks/useGameOver";

const Game = ({ rows, columns }) => {
    const [gameOver, setGameOver, resetGameover] = useGameOver();
    /* const [gameOver, setGameOver, resetGameover] = useGameOver();
和
 const [gameOver, setGameOver] = useGameOver();
中有什么不同？

综合起来，两者的区别在于第一个代码行多了一个变量 resetGameover，
它可能用于执行某些重置游戏状态的操作，而第二个代码行只关注了游戏状态的
获取和设置。具体的功能取决于 useGameOver() 函数的实现。*/ 
const start = () => resetGameover();

return (
    <div className="Game">
        {gameOver ? (
            <Menu onClick={start} />
        ) : (
            <Tetris rows={rows} columns = {columns} setGameOver={setGameOver} />
         )}
    </div>
);
};
export default Game;