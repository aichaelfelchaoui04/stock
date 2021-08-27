import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom' 
import Respo from './layout/respo'
import './index.css'

class App extends React.Component{
  render(){
    return (
      <Router>
        
        <Route path='/respo' component={Respo} exact/>
        <Route path='/respo/commandes' component={Respo} exact/>
        <Route path='/respo/clients' component={Respo} exact/>
        <Route path='/respo/suppliers' component={Respo} exact/>
        <Route path='/respo/categories' component={Respo} exact/>
        <Route path='/respo/articles' component={Respo} exact/>
        <Route path='/respo/articles/edit/:name' component={Respo} exact/>
        <Route path='/respo/articles/view/:name' component={Respo} exact/>
        <Route path='/respo/suppliers/:id' component={Respo} exact/>
        <Route path='/respo/categories/:id' component={Respo} exact/>
        <Route path='/respo/clients/:id' component={Respo} exact/>  
        <Route path='/respo/commandes/:id' component={Respo} exact/>     

      </Router>
    );
  }
}

export default App;
