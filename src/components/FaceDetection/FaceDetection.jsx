import './FaceDetection.css';

export const FaceDetection = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className="absolute mt2">
                <img id='inputimage'
                    src={imageUrl}
                    alt="Not Found!"
                    width={600}
                    height={'auto'}
                />
                <div className='bounding-box'
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol
                    }}>
                </div>
            </div>

        </div>

    );
}
