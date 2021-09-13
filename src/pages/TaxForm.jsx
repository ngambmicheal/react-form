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

export function TaxForm({modalIsOpen, closeModal, items}){
  console.log(items)
  return (
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
    items = {items}
  >
  <div className='flex'>
    <h2 >Hello</h2>
    <button onClick={closeModal}>close</button>
  </div>

    <Formik
    initialValues={{ name: '', rate: '', applicable_items:[] }}
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

        <div>
          <div>
          <input type='radio' id='all_items' value='all' name='applied_to'  onChange={handleChange} /> <label htmlFor='all_items'> Apply to all items in collection </label>
          </div>
          <div>
          <input type='radio' id='some_items' value='some' name='applied_to'  onChange={handleChange}/> <label htmlFor='some_items'> Apply to Specitif items</label>
          </div>
        </div>
        <hr />


        <input type='search' placeholder='search' />

        {Object.keys(items).map((group)=>{
          return (<div key={group} >
              <input type ='checkbox' value={group} onClick={handleChange} /> <label>{group}</label>
                <div className='p-5'>
                  {items[group].map((collection) => {
                    return (
                      <div key={collection.id}> 
                        <input type ='checkbox' value={collection.id} name='applicable_items'  onChange={handleChange} /> <label>{collection.name}</label>
                      </div> )
                  })
                }
              </div>
          </div>)
        })}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    )}
  </Formik>
  </Modal>
  )
}