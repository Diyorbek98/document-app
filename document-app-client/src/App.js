import React from 'react';
import {Route, Switch} from "react-router-dom";
import DocumentForm from "./components/documentForm";

function App() {
  return (
      <Switch>
          <Route exact path="/" component={DocumentForm}/>
      </Switch>
  );
}

export default App;
