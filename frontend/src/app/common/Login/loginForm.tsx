import React from 'react';
import Input from '@app/components/formInputField/FloatingPlaceholder';
import Button from '@app/components/formInputField/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
// import { useAppSelector } from '@app/hooks';
import { toast } from 'react-toastify';
// import { loginService } from 'src/graphql/queries';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'src/graphql/mutations';

const validationSchema = yup.object().shape({
  username: yup.string().required('*Required'),
  password: yup.string().required('*Required').min(6, 'min 6 characters')
});

const LoginForm = () => {
  const initialValues = {
    username: '',
    password: ''
  };

  const navigation = useNavigate();
  const [loginUser, { loading }] = useMutation(LOGIN);
  // const login = useAppSelector((state) => state.login);

  const onSubmit = async (values: any) => {
    if (!navigator.onLine) {
      toast.error('Network error');
      return;
    }
    // const { data, error, loading } = loginService(values);
    loginUser({
      variables: {
        input: values
      },
      onCompleted(data) {
        if (data?.login) {
          navigation('/dashboard');
        }
      },
      onError(error) {
        console.log(error);
        toast.error(error?.message);
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <FormContainer>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <Input
              label="Username"
              name="username"
              type="text"
              text="Enter Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
            />
          </div>
          <div className="mb-3">
            <Input
              label="Password"
              name="password"
              type="password"
              text="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
            />
          </div>

          <div className="mt-6">
            <Button
              text="Login"
              loading={loading}
              backgroundColor="#0E82F6"
              color="white"
              type="submit"
              borderRadius="22px"
              disabled={
                formik.errors.username ||
                formik.errors.password ||
                !formik.values.username ||
                !formik.values.password
              }
            />
          </div>
        </form>
        {/* <p className="mb-5 mt-5 text-center">Don't have an account? <Link to="/" >Register</Link> </p> */}
        <p className="mb-5 mt-5 text-center">
          <Link data-cy="forgotPassword" to="/forgot-password">
            Forgot password
          </Link>{' '}
        </p>
      </div>
    </FormContainer>
  );
};

export default LoginForm;

const FormContainer = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  .form-container {
    width: 440px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 2rem;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #000000;
    a {
      color: rgba(14, 130, 246, 1);
    }
  }
`;
