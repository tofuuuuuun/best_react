import rotateIcon from '../../public/images/rotate.png';
import cameraIcon from '../../public/images/camera.png';

export const ResetArea = (props) => {
    const { resetAlbumList, handleCapture } = props;
    return (
        <div className='resetArea m-top-1em'>
            <div className='resetWrapper ta-center'>
                <button className='l-button action m-right-1em txt-white bg-turquoise reset action' onClick={resetAlbumList}>
                    <img src={rotateIcon} alt='リセットボタののアイコン' />
                </button>
                <button className='l-button txt-white bg-turquoise capture action' onClick={handleCapture}>
                    <img src={cameraIcon} alt='キャプチャボタンのアイコン' />
                </button>
            </div>
        </div>
    )
}