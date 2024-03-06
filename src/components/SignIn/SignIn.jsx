import React, { Component } from "react"

export class SignIn extends Component {

    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onsubmitSignIn = (event) => {
        // console.log(this.state);
        event.preventDefault();
        fetch('https://face-detection-backend-one.onrender.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.email) {
                    // console.log(user)
                    this.props.loadUser(user)
                    this.props.onRouteChange('face-detect')
                } else { alert(user) }
            })
            .catch(err => console.log(err))
    }


    render() {
        const { onRouteChange } = this.props;
        return (
            <div>
                <article className="br4 ba b--red mv4 w-100 w-50-m w-25-1 mw5 center pa3">
                    <main className="pa4">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0 red">Sign In</legend>
                                <div className="mt3">
                                    {/* <label className="db fw6 lh-copy f6" for="email-address">Email</label> */}
                                    <input className="pa2 br3 input-reset ba b--green red hover-green bg-transparent w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        placeholder='Email'
                                        onChange={this.onEmailChange}
                                    // required
                                    />
                                </div>
                                <div className="mv3">
                                    {/* <label className="db fw6 lh-copy f6" for="password">Password</label> */}
                                    <input className="b br3 pa2 input-reset ba b--green bg-transparent red hover-green w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder='Password'
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                                {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                            </fieldset>
                            <div>
                                <input className="b ph3 pv2 br3 input-reset ba red b--green bg-transparent grow pointer f6 dib hover-green"
                                    type="submit"
                                    value="Log in"
                                    onClick={this.onsubmitSignIn}
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <a href="#0" className="f6 link dim db underline pointer white-70"
                                    onClick={() => onRouteChange('sign-up')}>Sign up!
                                </a>
                                {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                            </div>
                        </form>
                    </main>
                </article>
            </div>
        )
    }
}
