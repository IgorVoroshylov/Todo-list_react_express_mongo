import React, { useContext, useEffect } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import './authPage.scss'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/httpHook'
import { Field, Form, Formik } from 'formik';
import { InputFormEmail, InputFormPassword } from '../../components/customFormicField/customField'

const AuthPage = () => {
   const location = useLocation()
   const history = useHistory()
   const {login} = useContext(AuthContext)
   const isLogin = location.pathname === '/login' // сравниваем путь для выяснения что нам нужно: регистрация или логин

   const { error, request, clearError } = useHttp() // для работы с запросами

   useEffect(() => {
      clearError()
   }, [isLogin, clearError])

   const submit = async (values, { setSubmitting }) => {
      try {
         if(isLogin) {
            const data = await request('/api/auth/login', 'post', {email: values.email, password: values.password })

            const { token, userId, email } = data

            setSubmitting(false)

            login(token, userId, email)
         } else {
            await request('/api/auth/registration', 'post', {email: values.email, password: values.password })
            //console.log(data)
            setSubmitting(false)

            history.push('/')
         }
      } catch(err) {
         console.log('submitReq: ', err.message)
      }
   }

   return (
      <div className="container">
         <div className="auth-page">
            <h3>{isLogin ? 'Авторизация' : 'Регистрация'}</h3>
            <div>
               <Formik
                  initialValues={{ email: '', password: ''}}

                  validate={values => {
                     const errors = {};

                     if(!values.email) {
                        errors.email = 'Поле не должно быть пустым!'
                     } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = ' '
                     }

                     if(!values.password) {
                        errors.password = 'Поле не должно быть пустым!'
                     } else if(values.password.length < 6) {
                        errors.password = 'Пароль должен быть не мение 6 символов!'
                     }

                     return errors;
                  }}

                  onSubmit={submit} >
                     {({ isSubmitting }) => (
                        <Form className='form form-login'>
                           {/* className='form form-login' из materialize */}
                           <div className="row">
                              <div className="input-field col s12">
                                 <Field
                                    component={InputFormEmail} // InputFormEmail импортируем из другой папки
                                    type="email"
                                    name='email'
                                    placeholder='email...'
                                    className='validate'/>
                              </div>

                              <div className="input-field col s12">
                                 <Field
                                    component={InputFormPassword}
                                    type="password"
                                    name='password'
                                    placeholder='password...'
                                    className='validate'/>
                              </div>

                              <div className='auth_error'> 
                                 {/* ошибка приходящая с сервера */}
                                 {error}
                              </div>
                           </div>

                           <div className="row">
                              <button
                                 className='wawes-effect wawes-light btn btn blue'
                                 type="submit"
                                 disabled={isSubmitting}
                              >{isLogin ? "Войти" : "Регистрация"}</button>

                              {
                                 isLogin
                                 ? <div className='chenge_reg'>Нет аккаунта? <NavLink to='/registration'>Зарегестрируйтесь!</NavLink></div>
                                 : <div className='chenge_reg'>Есть аккаунт? <NavLink to='/login'>Войдите!</NavLink></div>
                              }
                           </div>
                        </Form>
                     )}
               </Formik>
            </div>
         </div>
      </div>
   );
}

export default AuthPage;
