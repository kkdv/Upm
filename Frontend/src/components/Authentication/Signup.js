import { Input, Button, Title } from './Input';

import '../style/login.css';

function Signup() {
    return (
        <div class = "loginbox-v4 modal-content-wrapper">
        <Title title = "Sign Up For Learing Today"/>
        <div class = "loginbox-v4__content">
        <Input name = "name" type = "text" placeholder = "Name"/>
        <Input name = "email" type = "Email" placeholder = "@Gmail.com"/>
        <Input name = "password" type = "Password" placeholder = "Password"/>
        <Button name = "submit" type = "submit" value = "Sign In" info = "Already Have Account" data = "Login" />
        </div>
        <div class="loginbox-v4__secondary-text">
        </div>
        <div class="loginbox-v4__separator"></div>
       
       </div>
    );
}

export default Signup;