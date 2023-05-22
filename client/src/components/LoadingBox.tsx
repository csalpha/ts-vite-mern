//imports the Spinner component from the react-bootstrap library
import Spinner from "react-bootstrap/Spinner";

// Defines a functional component called 'LoadingBox'
const LoadingBox = () => {
  return (
    // This component renders a loading spinner using React Bootstrap Spinner component
    <Spinner
      animation='border' // display a spinner with a border animation
      role='status' // help screen readers understand the purpose of the spinner
    >
      <span
        className='visually-hidden' // displaying the text "Loading..." that is visually hidden but accessible to screen readers
      >
        Loading...
      </span>
    </Spinner>
  );
};

// Component is exported as the default export of the module ( available for use in other parts of the application )
export default LoadingBox;
