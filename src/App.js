import React from 'react';


import 
{
BrowserRouter as Router,
Route,
Switch

}

from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';

import Headers from './components/Header';
import Generos from './components/Generos';
import NovoGenero from './components/NovoGenero';
import EditarGenero from './components/EditarGenero';
import Series from './components/Series';
import NovaSerie from './components/NovaSerie';
import InfoSerie from './components/InfoSerie';



function App() {

  return (
    <>
    
    
    <Router>
      <Headers />
      <Switch>
          <Route path='/' exact  component={()=> <Home />} />

          <Route path='/generos' exact  component={()=><Generos />} />

          <Route path='/generos/novogenero' exact   component={()=><NovoGenero />} />
          
          <Route path='/generos/:id' exact  component={()=><EditarGenero />} />


          <Route path='/series' exact  component={()=><Series />} />

          <Route path='/series/nova' exact  component={()=><NovaSerie />} />

          <Route path='/series/info/:id' exact  component={(props)=><InfoSerie props={props} />} />

      </Switch>
    </Router>

    </>
    
   
  );
}

export default App;
