import React from 'react'

export const InputFormEmail = ({field, form, ...props}) => {
   const errorText = form.touched.email && form.errors.email
   return (
      <div>
         <input {...props} {...field} className={!!errorText ? 'input_form error' : 'input_form'}/>
         {!!errorText && <div className='formik_error_field'>{errorText}</div>}
      </div>
   )
}

export const InputFormPassword = ({field, form, ...props}) => {
   const errorText = form.touched.password && form.errors.password
   return (
      <div>
         <input {...props} {...field} className={!!errorText ? 'input_form error' : 'input_form'}/>
         {!!errorText && <div className='formik_error_field'>{errorText}</div>}
      </div>
   )
}