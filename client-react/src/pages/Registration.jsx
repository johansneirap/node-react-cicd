import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Registration = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post('http://localhost:3001/auth', data)
      .then(data);
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            name="username"
            placeholder="(Ex. jon...)"
            id="inputCreatePost"
          />
          <label>Password:</label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreatePost"
            type="password"
            autoComplete="off"
            name="password"
            placeholder="*******"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
