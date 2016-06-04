import React, {PropTypes} from 'react';

// locally style
import style from './style.styl';


let Input = (props) => {
  const {
    mainClassName,
    labelClassName,
    inputClassName,
    id,
    text,
    type,
    field,
  } = props;

  let errMsg = null;
  let errClass = '';

  if (field.touched && field.error) {
    errClass = ' invalid';
    errMsg = (
      <div className='err-msg'>{field.error}</div>
    );
  }

  return (
    <div className={style.main
      + (mainClassName && ' ' + mainClassName)
      + (errClass)}>
      <input
        className={style.input
          + (inputClassName && ' ' + inputClassName)}
        type={type}
        id={id}
        {...field} />
      <label
        className={style.label
          + (labelClassName && ' ' + labelClassName)}
        htmlFor={id}>
        {text}
      </label>
      {errMsg}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  type: PropTypes.string,
  mainClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};
Input.defaultProps = {
  type: 'text',
  mainClassName: '',
  labelClassName: '',
  inputClassName: '',
};

export default Input;

