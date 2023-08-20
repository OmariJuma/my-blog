import "./App.css";
import HomeFeed from "./components/HomeFeed";
import NavigationBar from "./components/NavigationBar";
import ThemeToggler from "./components/ThemeToggler";

function App() {
  return (
    <>
      {/* <ThemeToggler /> */}
      <NavigationBar/>
      <HomeFeed/>
    </>
  );
}

export default App;
