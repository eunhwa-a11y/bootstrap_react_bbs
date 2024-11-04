import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./App.css";

import BoardList from "./BoardList";

function App() {
  return (
    <div className="container mt-3">
      <h1 className="mb-3">React Board</h1>
      <BoardList />
    </div>
  );
}

export default App;
