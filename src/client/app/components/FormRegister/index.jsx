import React, {PropTypes} from 'react';
import { reduxForm } from 'redux-form';


// components
import {
  Form,
  FormActions,
  Fieldset,
  Input,
  Button,
} from 'components';


// locally scoped style
//import styles from './style';


// fields
const fields = ['email', 'pass'];

// Validate
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Obrigatório';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+(\.[A-Z]{2,4}){1,}$/i.test(values.email)) {
    errors.email = 'Deve ser um e-mail válido';
  }
  if (!values.pass) {
    errors.pass = 'Obrigatório';
  }

  return errors;
};


const FormRegister = (props) => {
  const {
    fields: {email, pass},
    handleSubmit,
    submitting,
  } = props;

  const onSubmit = handleSubmit(() => (console.log('submitted')));

  return (
    <div>
      <Form onSubmit={onSubmit} method='POST'>
        <Fieldset>
          <Input
            id='email'
            text='E-mail'
            field={email} />
          <Input
            id='pass'
            text='Senha'
            type='password'
            field={pass} />
        </Fieldset>
        <FormActions>
          <Button
            type='submit'
            size='large'
            disabled={submitting}>
              Cadastrar
          </Button>
        </FormActions>
      </Form>
      <Button
        href='/'>
          Já tenho cadastro
      </Button>
    </div>
  );
};

FormRegister.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'register',
  fields,
  validate,
})(FormRegister);

