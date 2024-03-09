import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Define form validation schema using Yup
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  confirm_password: Yup.string()
    .label('Confirm Password')
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const SignUp = () => {
  const [submitting, setSubmitting] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const response = await axios.post('https://api-base-url.com/user/signup/add', values); // Send form data to API endpoint
      console.log(response.data); // Handle the response from the API
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
      

    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Signup</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirm_password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {/* First Name */}
            <div className="mb-4 flex flex-col text-left">
              <label htmlFor="firstName" className="text-gray-700">First Name</label>
              <Field
                name="firstName"
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Last Name */}
            <div className="mb-4 flex flex-col text-left">
              <label htmlFor="lastName" className="text-gray-700">Last Name</label>
              <Field
                name="lastName"
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Email Address */}
            <div className="mb-4 flex flex-col text-left">
              <label htmlFor="email" className="text-gray-700">Email Address</label>
              <Field
                name="email"
                type="email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Password */}
            <div className="mb-4 flex flex-col text-left">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <Field
                name="password"
                type="password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Confirm Password */}
            <div className="mb-4 flex flex-col text-left">
              <label htmlFor="confirm_password" className="text-gray-700">Confirm Password</label>
              <Field
                name="confirm_password"
                type="password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errors.confirm_password && touched.confirm_password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="confirm_password" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:bg-blue-600"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
