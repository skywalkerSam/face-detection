export function Navigation({ onRouteChange, isSignedIn }) {

    return (
        (isSignedIn) ?
            <div>
                <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                    <a className="f5 link dim underline pa3 white-70 pointer mt2 mr2"
                        onClick={() => onRouteChange('sign-out')}>Sign Out
                    </a>
                </nav>
            </div>
            : <div>
                <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                    <a className="f5 link dim underline pa3 white-70 pointer mt2 mr2"
                        onClick={() => onRouteChange('sign-out')}>Sign In/Sign Up   {/* Sign Out! */}
                    </a>
                    <a className="f5 link dim underline pa3 white-70 pointer mt2 mr2"
                        onClick={() => onRouteChange('face-detect')}>Guest Log In
                    </a>
                </nav>
            </div>
    )
}
