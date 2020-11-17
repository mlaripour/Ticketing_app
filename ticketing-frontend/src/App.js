import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import mytickets from './mytickets';
import assign from './assign';
import Login from './Login';
import register from './register';

import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/images/bg-05.jpg';

class App extends Component {
  render() {
    return (
      <section class="_form_05">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="_form-05-box">
              <div class="row">
                <div class="col-sm-5 _lk_nb">
                  <div class="form-05-box-a">
                    <div class="_form_05_logo">
                      <h2>tickting system</h2>                      
                    </div>                   
                      <ol>                      
                        <li><Link to="/"><input class="_btn_04" type="submit" value="HOME"/></Link></li><br></br>
                        <li><Link to="/login"><input class="_btn_04" type="submit" value="LOGIN"/></Link></li><br></br>
                        <li><Link to="/register"><input class="_btn_04" type="submit" value="REGISTER"/></Link></li><br></br>
                        <li><Link to="/assign"><input class="_btn_04" type="submit" value="ASSIGN TICKET"/></Link></li><br></br>
                        <li><Link to="/mytickets"><input class="_btn_04" type="submit" value="MY TICKETS"/></Link></li>                                          
                      </ol>                   
                  </div>
                </div>
                <div class="col-sm-7 _nb-pl">
                <div class="_mn_df">
                <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/mytickets" component={withAuth(mytickets)} />
                <Route path="/assign" component={withAuth(assign)} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={register} />
                </Switch>                 
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  }
}

export default App;

