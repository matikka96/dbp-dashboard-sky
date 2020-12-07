import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { HashRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { Line } from "react-chartjs-2";

export default class App extends Component {
  state = {
    data: undefined,
  };
  componentDidMount() {
    this.laodData();
  }

  laodData = () => {
    axios.get("http://localhost:5000/all_info/").then((r) => this.setState({ data: r.data }));
  };

  prepareData = (key, name) => {
    if (this.state.data) {
      const labels = this.state.data.map((e) =>
        e.datetime.replace("T", " ").replace("00:00", "00")
      );
      const dataset = this.state.data.map((e) => e[key]);
      const chartData = { labels, datasets: [{ label: name, data: dataset }] };
      return chartData;
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="menu" tabIndex="0">
            <header className="avatar">
              <img
                src="https://i.pinimg.com/originals/9d/a9/f6/9da9f660f03829f70f97b54f28900756.png"
                alt="image"
              />
              <h2>Dashboard</h2>
            </header>

            <ul className="list-unstyled" style={{ backgroundColor: "transparent" }}>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" exact to="/" activeClassName="fw-bold">
                  Main
                </NavLink>
              </li>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" to="/CO2" activeClassName="fw-bold">
                  CO2
                </NavLink>
              </li>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" to="/air_moisture_percent" activeClassName="fw-bold">
                  Air Moisture %
                </NavLink>
              </li>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" to="/air_quality_index" activeClassName="fw-bold">
                  Air quality index
                </NavLink>
              </li>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" to="/elevators_in_use_avg" activeClassName="fw-bold">
                  Elevators in use [%]
                </NavLink>
              </li>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" to="/inside_temperature" activeClassName="fw-bold">
                  Inside temperature
                </NavLink>
              </li>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" to="/outside_temperature" activeClassName="fw-bold">
                  Outside temperature
                </NavLink>
              </li>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" to="/people_count" activeClassName="fw-bold">
                  People count
                </NavLink>
              </li>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" to="/power_usage" activeClassName="fw-bold">
                  Power usage
                </NavLink>
              </li>
              <li className="py-1 px-3">
                <NavLink className="text-light text-decoration-none" to="/solar_panel_generation" activeClassName="fw-bold">
                  Solar panel generat
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="text-dark">
            <Switch>
              <Route exact path="/">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <Line data={this.prepareData("CO2", "CO2")} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <Line data={this.prepareData("air_moisture_percent", "Air Moisture %")} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <Line data={this.prepareData("air_quality_index", "Air quality index")} />
                  </div>

                  <div className="col-12 col-lg-6">
                    <Line
                      data={this.prepareData("elevators_in_use_avg", "Elevators in use [avg]")}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <Line data={this.prepareData("inside_temperature", "Inside temperature")} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <Line data={this.prepareData("outside_temperature", "Outside temperature")} />
                  </div>

                  <div className="col-12 col-lg-6">
                    <Line data={this.prepareData("people_count", "People count")} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <Line data={this.prepareData("power_usage", "Power usage")} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <Line
                      data={this.prepareData("solar_panel_generation", "Solar panel generation")}
                    />
                  </div>
                </div>
              </Route>

              <Route path="/CO2">
                <Line data={this.prepareData("CO2", "CO2")} />
              </Route>
              <Route path="/air_moisture_percent">
                <Line data={this.prepareData("air_moisture_percent", "Air Moisture %")} />
              </Route>
              <Route path="/air_quality_index">
                <Line data={this.prepareData("air_quality_index", "Air quality index")} />
              </Route>

              <Route path="/elevators_in_use_avg">
                <Line data={this.prepareData("elevators_in_use_avg", "Elevators in use [avg]")} />
              </Route>
              <Route path="/inside_temperature">
                <Line data={this.prepareData("inside_temperature", "Inside temperature")} />
              </Route>
              <Route path="/outside_temperature">
                <Line data={this.prepareData("outside_temperature", "Outside temperature")} />
              </Route>

              <Route path="/people_count">
                <Line data={this.prepareData("people_count", "People count")} />
              </Route>
              <Route path="/power_usage">
                <Line data={this.prepareData("power_usage", "Power usage")} />
              </Route>
              <Route path="/solar_panel_generation">
                <Line data={this.prepareData("solar_panel_generation", "Solar panel generation")} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
