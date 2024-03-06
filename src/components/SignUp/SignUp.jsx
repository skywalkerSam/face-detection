import React, { Component } from 'react';

export class SignUp extends Component {

    constructor(props) {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    onFirstNameChange = (event) => {
        this.setState({ firstName: event.target.value })
    }

    onLastNameChange = (event) => {
        this.setState({ lastName: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitSignUp = (event) => {
        event.preventDefault();
        fetch('https://face-detection-backend-one.onrender.com/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // firstName: this.state.firstName,
                // lastName: this.state.lastName,
                name: this.state.firstName + ' ' + this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    // console.log(user)
                    this.props.onRouteChange('face-detect')
                } else { alert(user) }
            })
            .catch(err => console.log(err))
        // console.log(this.state);
    }


    render() {
        return (
            <div>
                <article className="br4 ba b--red mv4 w-100 w-50-m w-25-l mw5 center ">
                    <main className="pa4">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0 red">Sign Up</legend>
                                <div className="mt3">
                                    <input className="pa2 br3 input-reset ba b--green bg-transparent hover-green red w-100"
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder='First Name'
                                        onChange={this.onFirstNameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <input className="pa2 br3 input-reset ba b--green bg-transparent hover-green red w-100"
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder='Last Name'
                                        onChange={this.onLastNameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <input className="pa2 br3 input-reset ba b--green bg-transparent hover-green red w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        placeholder='Email'
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <input className="b br3 pa2 input-reset ba b--green bg-transparent hover-green red w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder='Password'
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="">
                                <input className="b ph3 pv2 br3 input-reset ba b--green bg-transparent grow pointer f6 dib red hover-green"
                                    type="submit"
                                    value="SignUp"
                                    onClick={this.onSubmitSignUp}
                                />
                            </div>
                        </form>
                    </main>
                </article>
            </div>
        )
    }
}
