import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  console.log("errors", errors)

  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <>
      <Form>
        <div>
          <label htmlFor="name">
            <Field id="name" type="text" name="name" placeholder="name" />
            {touched.name && errors.name && (
              <p>{errors.name}</p>
            )}
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <Field id="email" type="email" name="email" placeholder="email" />
            {touched.email && errors.email && (
              <p>{errors.email}</p>
            )}
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <Field id="password" type="password" name="password" placeholder="password" />
            {touched.password && errors.password && (
              <p>{errors.password}</p>
            )}
          </label>
        </div>
        <div>
          <label htmlFor="ToS">
            Accept the Terms of Service
            <Field id="checkbox" type="checkbox" name="ToS" checked={values.ToS} />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
      <div>
        {users.map(user => {
          return (
            <ul key={user.id}>
              <li>Name: {user.name}</li>
              <li>Email: {user.email}</li>
              <li>Password: {user.password}</li>
            </ul>
          )
        })}
      </div>
    </>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      ToS: props.ToS || false
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string("Not a String").required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    ToS: Yup.boolean().required()
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log(res)
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response))
  }

})(UserForm);

export default FormikUserForm;
