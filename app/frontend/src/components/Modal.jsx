
export const Modal = (props) => {
    const { isOpen, toggleModal, searchArtist, inputArtistName, responseArtist, changeType, type, searchAlbum, responseAlbum, buttonText, addAlbumArt, errorMessage } = props;
    const changeFlg = () => toggleModal(false);
    const selectType = (event) => changeType(event.target.value);
    const addAlbumList = (id, name, image, artist) => addAlbumArt(id, name, image, artist)

    const noArtistImage = '../../public/images/noImage.png';
    return (
        <>
            {isOpen && (
                <div className='modal-container'>
                    <div className='modal-body'>
                        <div className='modal-close' onClick={changeFlg}><span className='icon-close'></span></div>
                        <div className='modal-content'>
                            <div className='l-searchForm ta-left m-bottom-1em'>
                                <div className='l-selectType'>
                                    <input type='text' name='artist' id='artistName' placeholder='アーティスト名' data-artist_id='' onChange={inputArtistName} />
                                    <div className='clear'><span className='icon-close'></span></div>
                                </div>
                                <div className='l-autocomplete'></div>
                                <div className='p-left-05em'>
                                    <button className='l-buttonSearch txt-white bg-turquoise search action' onClick={searchArtist}>
                                        <img src='../../public/images/search.png' alt='searchIcon' width='15' />
                                    </button>
                                </div>
                            </div>
                            <div className='ta-left m-bottom-1em'>
                                <form id='type'>
                                    <input type='radio' name='typeLabel' id='typeAlbum' value='album' checked={type === 'album'} onChange={selectType} />
                                    <label htmlFor='typeAlbum' className='l-subButton bg-gray typeAlbum'>アルバム</label>
                                    <input type='radio' name='typeLabel' id='typeSingleEP' value='single' checked={type === 'single'} onChange={selectType} />
                                    <label htmlFor='typeSingleEP' className='l-subButton bg-gray typeSingleEP'>シングルとEP</label>
                                    <input type='radio' name='typeLabel' id='typeAll' value='all' checked={type === 'all'} onChange={selectType} />
                                    <label htmlFor='typeAll' className='l-subButton bg-gray typeAll'>すべて</label>
                                </form>
                            </div>
                            {responseArtist.length !== 0 && (
                                <div className='l-autocomplete'>
                                    <ul className='autocompleteList padding-all-1em'>
                                        {responseArtist.map((artist, index) => (
                                            <li className='artistItems action' data-artist_id={artist.id} key={index} onClick={() => searchAlbum(artist.id, artist.name)}>
                                                <img className='l-searchArtistImage artistImage' src={artist.images[0] ? artist.images[0].url : noArtistImage} loading='lazy' />
                                                <div className='l-artistInfo'>
                                                    <span className='searchArtistName font-wb'>{artist.name}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {responseAlbum.length !== 0 && (
                                <ul className="modalList">
                                    {/* ここの繰り返し処理では1回ALLでデータを取得して、それをフィルタリングしたほうがいいんのでは */}
                                    {responseAlbum.map((album, index) => (
                                        <li className="albumItems" key={index} id={album.id} data-name={album.name} data-artist={album.artists.map((value) => value.name).join(',')}>
                                            <img className="albumImage" src={album.images.length !== 0 ? album.images[0].url : ''} loading="lazy" />
                                            <div className="l-albumInfo">
                                                <span className="albumName font-wb">${album.name} ({album.release_date})</span>
                                                <span className="artistsName">{album.artists.map((value) => value.name).join(',')}</span>
                                            </div>
                                            <button className="l-button txt-white ${buttonClass} ${selectClass} action" onClick={() => addAlbumList(album.id, album.name, album.images.length !== 0 ? album.images[0].url : '', album.artists.map((value) => value.name).join(', '))}>{buttonText}</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}