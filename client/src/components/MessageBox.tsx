// import the Alert component from the react-bootstrap library
import Alert from "react-bootstrap/Alert";

// This component renders a message box using React Bootstrap Alert component
// The MessageBox component accepts two props: variant and children.
const MessageBox = ({
  variant = "info", // default to "info"
  children, // represents the content to be displayed inside the message box
}: {
  variant?: string; // is optional
  children: React.ReactNode; //  is required
}) => {
  return (
    // the Alert component from react-bootstrap is used to render the message box.
    <Alert
      // This allows the user to customize the color variant of the message box.
      variant={
        variant || //true - is set to the variant prop received from the component's props
        "info" // false - it defaults to "info"
      }
    >
      {
        // The children prop is passed as the content inside the Alert component,
        // allowing any valid React nodes to be displayed within the message box
        children
      }
    </Alert>
  );
};

// MessageBox component is exported as the default export of the module, making it available for use in other parts of the application.
export default MessageBox;
