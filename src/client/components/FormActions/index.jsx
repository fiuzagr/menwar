import React from 'react';

// locally style
import style from './style.styl';

let FormActions = (props) => (
  <div className={style.main}>
    {props.children}
  </div>
);

export default FormActions;

