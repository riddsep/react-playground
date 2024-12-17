import Sidebar from "./Sidebar";
import FileList from "./File";
import { PlayGround } from "./PlayGround";
import "./index.css";
const App = () => {
  return (
    <>
      <Sidebar />
      <FileList />
      <PlayGround />
    </>
  );
};

export default App;
