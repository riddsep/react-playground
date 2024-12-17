import { useState, useEffect } from "react";
export const PlayGround = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function resizeHandler() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }
    // This code will cause a memory leak, more on that soon
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  return (
    <div>
      <p>Height: {height}</p>
      <p>Width: {width}</p>
    </div>
  );
};
