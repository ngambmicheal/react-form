import { Formik } from 'formik';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import React from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height:'50%',
    width:'50%'
  },
};

Modal.setAppElement('#root');

export function TaxForm({modalIsOpen, closeModal, el}){
  console.log(modalIsOpen)
  return (
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
  <div className='flex'>
    <h2 >Hello</h2>
    <button onClick={closeModal}>close</button>
  </div>

    <Formik
    initialValues={{ name: '', rate: '' }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      /* and other goodies */
    }) => (
      <form onSubmit={handleSubmit}>

        <h3>Add Tax</h3> 
        <div className='flex'>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder='Name'
          />
          {errors.email && touched.email && errors.email}
          <input
            type="number"
            name="rate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.rate}
            placeholder='rate'
          />
        </div>

        <hr />

        <input type='search' placeholder='search' />

        {errors.rate && touched.rate && errors.rate}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    )}
  </Formik>
  </Modal>
  )
}