import React from 'react';
import history from './history';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { getCurrentUser } from './actions/session';
import SplashPage from './components/SplashPage/SplashPage';
import Main from './components/Main/Main';
import SignUp from './components/Auth/SignUp';
import LogIn from './components/Auth/LogIn';
import PlainLogin from './components/Auth/PlainLogin';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
import LoadScreen from './components/LoadScreen/LoadScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: 'none'
    }
  }

  componentDidMount = () => {
    this.props.getCurrentUser().then(() => {
      this.setState({
        load: 'done'
      })
    })
  }
  
  renderMainPage = () => {
    if (this.props.loggedIn) {
      return (
        <ProtectedRoute path="/" component={Main} />
      )
    } else {
      return <Route path="/" exact component={SplashPage} />
    }
  }
  
  render(){
    switch(this.state.load) {
      case 'none':
        return (
          <LoadScreen />
        )
      case 'done':
        return (
          <div className="App">
            <Router history={history}>
              <Switch>
                <Route path="/login" exact component={PlainLogin} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signup/login" exact component={LogIn} />
                {this.renderMainPage()}
              </Switch>
            </Router>
          </div>
        )
      default:
        return <div></div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.currentUser.info)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
