import "react-native-gesture-handler";
import React, { Component } from "react";
import Routes from "./routes/routes";
import { StatusBar } from "react-native";

export default class App extends Component {
  render() {
    return <>
    <Routes />
    <StatusBar />
    </>;
  }
}
