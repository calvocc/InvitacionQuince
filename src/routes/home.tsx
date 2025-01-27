import reactLogo from ".././assets/react.svg";
import { useNavigate } from "react-router-dom";
import ".././App.css";

function Home() {
  const navigate = useNavigate();

  const signOut = async () => {
    navigate("/login");
  };

  return (
    <div className="App">
      <div className="card">
        <div className="logo-react">
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <button onClick={signOut}>Login</button>
      </div>
    </div>
  );
}

export default Home;
