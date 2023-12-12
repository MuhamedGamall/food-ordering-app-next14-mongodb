import { Field } from 'formik'
import React from 'react'

function Lol({formik}:any) {
  return (
    <Field
        fullWidth
        variant="filled"
        type="text"
        label="Title"
        name="title"
        // error={!!formik.touched.title && !!formik.errors.title}
        // value={formik.values.title}
        // onBlur={formik.handleBlur}
        // onChange={formik.handleChange}
        // helperText={formik.touched.title && formik.errors.title}
      />
  )
}

export default Lol