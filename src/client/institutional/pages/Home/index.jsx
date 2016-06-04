import React from 'react';
//import DocumentTitle from 'react-document-title';
//import Helmet from 'react-helmet';


// app/components
//import {
  //FormLogin,
//} from 'app/components';


// config
import config from 'institutional/config.json';

// locally style
import style from './style.styl';
// locally image
//import logo32 from './images/ubuntu-logo32.png';


const Home = ({ route }) => (
  <div className={style.main}>
    <div className={style.wrapper}>
      <header className={style.header}>
        <h1>{config.site.title}</h1>
      </header>
    </div>
  </div>
);

export default Home;

