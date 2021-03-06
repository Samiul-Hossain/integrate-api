import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Header from '../partials/Header'

function Profile({ checkAuth, currentUser, handleLogout, getUserDetails }) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profession, setProfession] = useState('')
  const [date, setDate] = useState('')
  useEffect(() => {
    localStorage.getItem('token')
      ? axios
          .get('http://localhost:5000/dashboard', {
            headers: { token: localStorage.getItem('token') },
          })
          .then((res) => {
            setId(res.data.user_id)
            setName(res.data.user_name)
            setEmail(res.data.user_email)
            setProfession(res.data.profession)
            let str = res.data.date_of_birth
            const dateArr = str.split('T')
            setDate(dateArr[0])
          })
          .catch((err) => {
            console.log(err.response)
            console.log('expired token')
          })
      : console.log('could not get user details')
  }, [])
  const onSubmit = async (e) => {
    e.preventDefault()
    axios
      .put(
        'http://localhost:5000/auth/update',
        {
          user_id: id,
          user_name: name,
          user_email: email,
          date_of_birth: date,
          profession: profession,
        },
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      .then((res) => {
        checkAuth(true)
        console.log('updated successfully')
        getUserDetails()
        window.location.assign('/profile')
      })
      .catch((err) => {
        console.log(err)
        console.log('frontend err')
      })
  }

  const onDelete = async (e) => {
    e.preventDefault()
    console.log(id)
    axios
      .delete(
        'http://localhost:5000/auth/delete',
        {
          headers: { token: localStorage.getItem('token') },
        },
        {
          data: {
            user_id: id,
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        handleLogout()
        getUserDetails()
        // window.location.assign('/')
      })
      .catch((err) => {
        console.log(err)
        console.log('frontend err')
      })
  }

  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      {/*  Site header */}
      <Header currentUser={currentUser} handleLogout={handleLogout} />

      {/*  Page content */}
      <main className='flex-grow'>
        <section className='bg-gradient-to-b from-gray-100 to-white'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
            <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
              {/* Page header */}
              <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
                <h1 className='h1'>
                  Welcome. We exist to make entrepreneurism easier.
                </h1>
              </div>

              {/* Form */}
              <div className='max-w-sm mx-auto'>
                <form onSubmit={onSubmit}>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <label
                        className='block text-gray-800 text-sm font-medium mb-1'
                        htmlFor='name'
                      >
                        Name <span className='text-red-600'>*</span>
                      </label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        id='name'
                        type='text'
                        className='form-input w-full text-gray-800'
                        placeholder={name}
                        value={name}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <label
                        className='block text-gray-800 text-sm font-medium mb-1'
                        htmlFor='email'
                      >
                        Email <span className='text-red-600'>*</span>
                      </label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        id='email'
                        type='email'
                        className='form-input w-full text-gray-800'
                        placeholder={email}
                        value={email}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <label
                        className='block text-gray-800 text-sm font-medium mb-1'
                        htmlFor='profession'
                      >
                        Profession <span className='text-red-600'>*</span>
                      </label>
                      <input
                        onChange={(e) => setProfession(e.target.value)}
                        id='profession'
                        type='text'
                        className='form-input w-full text-gray-800'
                        placeholder={profession}
                        value={profession}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <label
                        className='block text-gray-800 text-sm font-medium mb-1'
                        htmlFor='date'
                      >
                        Name <span className='text-red-600'>*</span>
                      </label>
                      <input
                        onChange={(e) => setDate(e.target.value)}
                        id='date'
                        type='date'
                        className='form-input w-full text-gray-800'
                        placeholder={date}
                        value={date}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mt-6'>
                    <div className='w-full px-3'>
                      <button
                        type='submit'
                        className='btn text-white bg-blue-600 hover:bg-blue-700 w-full'
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
                <form onSubmit={onDelete}>
                  <div className='flex items-center my-6 -mx-3 mb-4 -mr-6'>
                    <div className='w-full px-3'>
                      <button
                        type='submit'
                        className='btn text-white bg-red-600 hover:bg-red-700 w-full'
                      >
                        Delete
                      </button>
                    </div>
                    <div
                      className='border-t border-gray-300 flex-grow ml-3'
                      aria-hidden='true'
                    ></div>
                  </div>
                </form>
                <div className='flex items-center my-6'>
                  <div
                    className='border-t border-gray-300 flex-grow mr-3'
                    aria-hidden='true'
                  ></div>
                  <div className='text-gray-600 italic'>Or</div>
                  <div
                    className='border-t border-gray-300 flex-grow ml-3'
                    aria-hidden='true'
                  ></div>
                </div>
                <form>
                  <div className='flex flex-wrap -mx-3 mb-3'>
                    <div className='w-full px-3'>
                      <button className='btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center'>
                        <svg
                          className='w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4'
                          viewBox='0 0 16 16'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z' />
                        </svg>
                        <span className='flex-auto pl-16 pr-8 -ml-16'>
                          Continue with GitHub
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3'>
                    <div className='w-full px-3'>
                      <button className='btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center'>
                        <svg
                          className='w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4'
                          viewBox='0 0 16 16'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z' />
                        </svg>
                        <span className='flex-auto pl-16 pr-8 -ml-16'>
                          Continue with Google
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className='text-gray-600 text-center mt-6'>
                  Already using Simple?{' '}
                  <Link
                    to='/signin'
                    className='text-blue-600 hover:underline transition duration-150 ease-in-out'
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile
