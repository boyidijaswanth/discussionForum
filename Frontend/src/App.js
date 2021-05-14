import './App.css';
import SignupPage from './components/Registration';
import Discussion from './components/Discussion';
import DiscussionList from './components/DiscussionList';
import { BrowserRouter,Switch,Route,Redirect} from "react-router-dom";
import Form from './components/Form';
import axios from "axios";
axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Switch>
         <Route exact path='/' component={SignupPage}  />
         <Route  path='/discussion-list' component={DiscussionList}  />
         <Route  path='/discussion' component={Discussion} />
         
          <Route path="*" render={() => <Redirect to={{pathname: "/"}}/>} />
       </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
