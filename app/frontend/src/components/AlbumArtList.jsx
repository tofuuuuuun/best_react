export const AlbumArtList = (props) => {
    const { isStart, albumArtList, deleteAlbum } = props;
    return (
        <>
            {isStart && (
                <>
                    {albumArtList.length != 0 && (
                        <div className='l-albumList l-common'>
                            <ul className='albumArtList' id='target'>
                                {albumArtList.map((album, index) => (
                                    <li className='albumListItem action' id={album.id} key={index} >
                                        <img className='l-albumArt m-bottom-05em' src={album.albumArt} />
                                        <span className='selectName'>{album.albumName}</span>
                                        <span>{album.albumArtist}</span>
                                        <span className='albumRemove' onClick={() => deleteAlbum(album.id)}><span className='icon-close'></span></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </>
    )
}