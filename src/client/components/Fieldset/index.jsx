import React, {PropTypes} from 'react';

// locally style
import style from './style.styl';

let Fieldset = (props) => (
  <fieldset
    className={style.main + (props.className && ' ' + props.className)}>
      {props.children}
  </fieldset>
);

Fieldset.propTypes = {
  className: PropTypes.string,
};
Fieldset.defaultProps = {
  className: '',
};

export default Fieldset;
