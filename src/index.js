import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/headers.component';
import CardList from './components/card-list.component';
import './styles.sass';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
      <section className="section">
        <div className="container">
         <CardList/>        
        </div>
    </section>
  </React.StrictMode>,
  document.getElementById('root')
);
