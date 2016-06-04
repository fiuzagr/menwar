import React from 'react';
import Helmet from 'react-helmet';
import {
  MdAccountCircle,
} from 'react-icons/lib/md';


// app/components
import {
  FormRegister,
} from 'app/components';


// config
import config from 'app/config.json';

// locally style
import style from './style.styl';


const Register = ({ route }) => (
  <div className={style.main}>
    <Helmet
      title='Cadastrar' />
    <div className={style.wrapper}>
      <header className={style.header}>
        <MdAccountCircle width={100} height={100} color='white' />
        <h1>Cadastre em {config.site.title}</h1>
      </header>
      <div className={style.content}>
        <FormRegister />
      </div>
    </div>
  </div>
);

export default Register;

