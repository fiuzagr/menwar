import React from 'react';
//import DocumentTitle from 'react-document-title';
import Helmet from 'react-helmet';
import {
  MdAccountCircle,
} from 'react-icons/lib/md';


// app/components
import {
  FormLogin,
} from 'app/components';


// config
import config from 'app/config.json';

// locally style
import style from './style.styl';
// locally image
//import logo32 from './images/ubuntu-logo32.png';


const Login = ({ route }) => (
  <div className={style.main}>
    <Helmet
      title='Entrar' />
    <div className={style.wrapper}>
      <header className={style.header}>
        <MdAccountCircle width={100} height={100} color='white' />
        <h1>Entre em {config.site.title}</h1>
      </header>
      <div className={style.content}>
        <FormLogin />
      </div>
    </div>
  </div>
);

export default Login;

