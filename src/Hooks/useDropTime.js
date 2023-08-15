import { useState, useCallback, useEffect } from "react";

const defaultDropTime = 1000;
const minimumDropTime = 100;
const speedIncrement = 50;
/* const defaultDropTime = 1000;里的1000系统怎么知道是1000毫秒而不是1000秒呢？

在这种情况下，系统默认解释的单位是毫秒。JavaScript 中的时间单位是以毫秒为基准的，因此在这里的 1000 被解释为毫秒。如果你要指定秒数，通常会在数字后面加上 s，例如 5s 表示 5 秒。

如果你在代码中使用类似于 defaultDropTime = 5s 这样的写法，JavaScript 并不会直接理解 s 代表秒，这不是 JavaScript 的标准语法。如果你想要使用秒作为单位，你需要手动将秒数转换为毫秒，例如 defaultDropTime = 5000 表示 5 秒。

*/

export const useDropTime = ({ gameStats }) => {
    /*useDropTime is the selfnamed hook name */
  const [dropTime, setDropTime] = useState(defaultDropTime);
  const [previousDropTime, setPreviousDropTime] = useState();

  const resumeDropTime = useCallback(() => {
    if (!previousDropTime) {
      return;
    }
    setDropTime(previousDropTime);
    setPreviousDropTime(null);
  }, [previousDropTime]);

  const pauseDropTime = useCallback(() => {
    if (dropTime) {
      setPreviousDropTime(dropTime);
    }
    setDropTime(null);
  }, [dropTime, setPreviousDropTime]);

  useEffect(() => {
    const speed = speedIncrement * (gameStats.level - 1);
    const newDropTime = Math.max(defaultDropTime - speed, minimumDropTime);
/*Math.max() 是 JavaScript 中的一个内置函数，用于返回一组数字中的最大值。
语法：Math.max(num1, num2, ...)。
它可以接受任意数量的参数，每个参数都是一个数字。函数会返回这些数字中的最大值。Math.max(defaultDropTime - speed, minimumDropTime) 的作用是从 defaultDropTime - speed 和 minimumDropTime 这两个值中选取较大的值作为结果。这是为了确保计算得到的新方块下落时间间隔不会低于 minimumDropTime
 */
    setDropTime(newDropTime);
  }, [gameStats.level, setDropTime]);

  return [dropTime, pauseDropTime, resumeDropTime];
};
