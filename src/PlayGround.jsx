import { useState, useEffect } from "react";

const Child = () => {
  // Pass a function that React will run for you
  useEffect(() => {
    console.log("I am rendering");
    // Pass an array of items to track changes of
    return () => console.log("I am unmounting");
  }, []);

  return <p>I am the child</p>;
};

export const PlayGround = () => {
  const [showChild, setShowChild] = useState(true);
  return (
    <div>
      <button onClick={() => setShowChild(!showChild)}>Toggle Child</button>
      {showChild && <Child />}
    </div>
  );
};
