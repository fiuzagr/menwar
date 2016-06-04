import React, {PropTypes} from 'react';

let Form = ({onSubmit, method, className, children}) => (
  <form
    onSubmit={onSubmit}
    method={method}
    className={className}>
      {children}
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  method: PropTypes.string,
  className: PropTypes.string,
};
Form.defaultProps = {
  method: 'GET',
  className: '',
};

export default Form;

