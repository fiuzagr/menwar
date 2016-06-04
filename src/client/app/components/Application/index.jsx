import React from 'react';
//import Helmet from 'react-helmet';


//import config from 'app/config.json';

// locally style
import style from './style.styl';


const Application = (props) => (
  <div className={style.main}>
    <div className={style.wrapper}>
      {/* <h1 className={style.title}>{title}</h1> */}
      <main className={style.content}>
        {props.children}
      </main>
    </div>
  </div>
);

export default Application;
