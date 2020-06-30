import React from 'react';

function Login() {
    return <div className="login-bg">
        <div className="login-bar">
            <div className="col-md-6" style={{ paddingLeft: "4%" }}> <form><div class="form-group" style={{ width: "80%", marginTop: "40%" }} >
                <input type="text" className="form-control" id="email" placeholder="Your Email" />
            </div>
                <div class="form-group" style={{ width: "80%" }}>
                    <input type="password" className="form-control" id="password" placeholder="Your Password" />
                </div><div class="form-group" style={{ width: "80%" }}>
                    <input type="submit" className="form-control btn btn-warning" id="signin" value="Sign In" />
                </div></form></div>
            <div className="col-md-6 social-login" > 
            <div className="sl-top">
                
            </div>
            <div className="sl-bottom"><input type="submit" className="sl btn btn-danger" id="google" value="Sign In With Google" />
            <input type="submit" className="sl btn btn-primary" id="facebook" value="Sign In With Facebook" />
            </div>
            </div>
        </div>
    </div>;
}

export default Login;