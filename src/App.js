import React from "react";
import "./style.scss";

const CreateElementComponent = React.createElement(
  "h2",
  {},
  "Component using React.CreateElement method"
);

class Component extends React.Component {
  render() {
    return <h2>Component using React.Component method</h2>;
  }
}

class PureComponent extends React.PureComponent {
  render() {
    return <h2>Component using React.PureComponent method</h2>;
  }
}

const FunctionalComponent = () => <h2>Functional component</h2>;

function App() {
  return (
    <div className="app">
      <h2>Hello World</h2>
      {CreateElementComponent}
      <Component />
      <PureComponent />
      <FunctionalComponent />
    </div>
  );
}

export default App;
