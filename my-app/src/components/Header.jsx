import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';
import GoogleLogin from "react-google-login";

function Header() {
  const responseGoogle = (response) => {
    console.log(response);
  }
  return (
    <header>
      <h1>
      <HighlightIcon />
      Keeper</h1>
      <GoogleLogin
      className="google"
    clientId="1002774052215-th31mcfbdjavad2s6k6qc5udfq5602eo.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </header>
  );
}

export default Header;
