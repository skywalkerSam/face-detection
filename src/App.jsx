/*
Dev: @skywalkerSam
Purpose: face-detection
Stardate: 12024.03.07.0213
*/
/*
TODOs:
- Render/Netlify Deployment

*/

import { Component } from "react";
import './App.css';
import ParticlesBg from "particles-bg";
import 'tachyons';
import { Logo } from "./components/Logo/Logo";
import { Navigation } from "./components/Navigation/Navigation";
import { ImageBox } from "./components/ImageBox/ImageBox";
import { Entries } from "./components/Entries/Entries";
import { FaceDetection } from "./components/FaceDetection/FaceDetection";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'sign-in',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    }
}

export default class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    onRouteChange = (route) => {
        (route === 'sign-out') ? this.setState(initialState)
            : this.setState({ route: route })
    }

    calculateFaceLocation = (data) => {
        // console.log('Clarifai Model Response:', data);
        const clarifaiFaceDetect = data.data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const imageWidth = Number(image.width);
        const imageHeight = Number(image.height);
        // console.log(clarifaiFaceDetect, imageWidth, imageHeight)
        return {
            topRow: clarifaiFaceDetect.top_row * imageHeight,
            leftCol: clarifaiFaceDetect.left_col * imageWidth,
            rightCol: imageWidth - (clarifaiFaceDetect.right_col * imageWidth),
            bottomRow: imageHeight - (clarifaiFaceDetect.bottom_row * imageHeight)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value })
        console.log('Image URL:', event.target.value);
    }

    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input })

        fetch('https://face-detection-backend-one.onrender.com/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
            .catch(err => console.log(err))

        console.log('Fetching the Image... ')

        fetch('https://face-detection-backend-one.onrender.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
            .then(response => response.json())
            .then(count => {
                // Object.assign doesn't creates a new object, it references to the original object!
                this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(err => console.log(err))
    }

    render() {
        const { imageUrl, box, route, isSignedIn } = this.state;
        return (
            <div className="App">
                <h1 className="red f3">Under Development!</h1>
                <ParticlesBg type="lines" num={3} bg={true} />
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}></Navigation>
                <Logo onRouteChange={this.onRouteChange}></Logo>
                {(route === 'face-detect') ?
                    <div>
                        <Entries name={this.state.user.name} entries={this.state.user.entries}></Entries>
                        <ImageBox
                            onInputChange={this.onInputChange}
                            onPictureSubmit={this.onPictureSubmit}>
                        </ImageBox>
                        <FaceDetection imageUrl={imageUrl} box={box}></FaceDetection>
                    </div>
                    : (route === 'sign-in') ?
                        <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}></SignIn>
                        : (route === 'sign-up') ?
                            <SignUp onRouteChange={this.onRouteChange} loadUser={this.loadUser}></SignUp>
                            : console.log('Routing Error Occoured...!')
                }
            </div>
        )
    }
}



/* 
Sample Images URLs:

https://samples.clarifai.com/metro-north.jpg

https://cdnb.artstation.com/p/assets/images/images/072/485/995/4k/chengwei-pan-1.jpg?1707463211

https://cdna.artstation.com/p/assets/images/images/072/167/834/large/eunice-ye-.jpg?1706752364

https://cdna.artstation.com/p/assets/images/images/072/178/120/large/alex-gray-tbrender-camera-38.jpg?1706781629

https://cdnb.artstation.com/p/assets/images/images/072/184/959/4k/hwng-edric-nguyen-tbrender-viewport-009.jpg?1706793715

*/
