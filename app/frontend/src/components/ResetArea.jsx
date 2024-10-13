export const ResetArea = (props) => {
    const { resetButtonFlg, resetAlbumList, handleCapture } = props;
    return (
        <>
            {resetButtonFlg && (
                <div className='resetArea m-top-1em'>
                    <div className='resetWrapper ta-center'>
                        <button className='l-button action m-right-1em txt-white bg-turquoise reset action' onClick={resetAlbumList}>
                            <img src='../images/rotate.png' alt='resetIcon' />
                        </button>
                        <button className='l-button txt-white bg-turquoise capture action' onClick={handleCapture}>
                            <img src='../images/camera.png' alt='cameraIcon' />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}