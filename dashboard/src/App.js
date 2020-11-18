import "./App.css";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav class="menu" tabindex="0">
        <div class="smartphone-menu-trigger"></div>
        <header class="avatar">
          <img src="https://i.pinimg.com/originals/9d/a9/f6/9da9f660f03829f70f97b54f28900756.png" />
          <h2>Dashboard</h2>
        </header>
        <ul>
          <li tabindex="0" class="icon-dashboard">
            <span>Dashboard</span>
          </li>
          <li tabindex="0" class="icon-customers">
            <span>Customers</span>
          </li>
          <li tabindex="0" class="icon-users">
            <span>Users</span>
          </li>
          <li tabindex="0" class="icon-settings">
            <span>Settings</span>
          </li>
        </ul>
      </nav>

      <main>
        <div class="helper">Content here</div>
      </main>
    </div>
  );
}

export default App;
