import starboy_logo from './logo.png';

export function Logo({ onRouteChange }) {

  const updateRoute = () => {
    onRouteChange("sign-in");
  }

  return (
    <div>
      <div className='flex flex-start pointer'>
        <img src={starboy_logo}
          alt="Starboy Logo"
          style={{ height: 200, marginLeft: "1%" }}
          onClick={updateRoute}>
        </img>
      </div>
    </div>
  )
}
