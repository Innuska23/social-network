import { render } from "@testing-library/react";
import App from "./App";
import ReactDOM from "react-dom";

test("renders withouts crashing", () => {
  const div = document.createElement("div");
  render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
