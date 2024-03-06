import './ImageBox.css';

export const ImageBox = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className="f3 white-80 mt5">
                {"Here you can detect faces in your pictures, Give it a try... :)"}
            </p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input
                        className="w-100 f4 pa2 center br4 ba red b--red bg-transparent hover-green mr3"
                        type="text"
                        placeholder="Enter Image URL..."
                        onChange={onInputChange}>
                    </input>
                    <button
                        className="w-30 grow f4 link ph3 pv2 dib bg-transparent red hover-green br4 ba b--green ml3"
                        onClick={onPictureSubmit}> Detect Face!
                    </button>
                    <br />
                </div>
            </div>
        </div>
    )
}
