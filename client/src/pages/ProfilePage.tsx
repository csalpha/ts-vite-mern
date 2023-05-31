// import necessary dependencies
import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import LoadingBox from '../components/LoadingBox'
import { useUpdateProfileMutation } from '../hooks/userHooks'
import { Store } from '../Store'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'

// Define the ProfilePage component
const ProfilePage = () => {
  // access the state and dispatch function from the Store
  const { state, dispatch } = useContext(Store) // state is the global state, dispatch is the function to dispatch actions to the reducer
  const { userInfo } = state // get userInfo from state
  
  // define variables to store the user's name, email, password, and confirm password
  const [name, setName] = useState(userInfo!.name) 
  const [email, setEmail] = useState(userInfo!.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // use the useUpdateProfileMutation hook to update the user's profile
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation()

  // define the submitHandler function to handle the form submission
  const submitHandler = async (e: React.SyntheticEvent) => { // e is the event object
    e.preventDefault() // prevent the default form submission behavior
    
    try {
      // check if the password and confirm password match
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      // call the updateProfile function to update the user's profile
      const data = await updateProfile({
        name,
        email,
        password,
      })

      // dispatch the USER_SIGNIN action to update the global state
      dispatch({ type: 'USER_SIGNIN', payload: data })

      // update the user's info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data))

      // show a success toast message
      toast.success('User updated successfully')

    } catch (err) { // if there is an error
      // show an error toast message
      toast.error(getError(err as ApiError))
    }
  }

  // return the JSX elements to render
  return (
    <div className="container small-container">
      {/* set the page title */}
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      {/* display the page header */}
      <h1 className="my-3">User Profile</h1>
      {/* display the form */}
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Update
          </Button>
          { // if the isLoading variable is true, display the LoadingBox component
          isLoading && <LoadingBox></LoadingBox>}
        </div>
      </form>
    </div>
  )
}

export default ProfilePage