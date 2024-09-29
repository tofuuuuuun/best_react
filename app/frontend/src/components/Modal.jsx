
export const Modal = (props) => {
    const { isOpen, toggleModal, searchArtist, inputArtistName, responseArtist, errorMessage } = props;
    const changeFlg = () => toggleModal(false);
    const noArtistImage = '../../public/images/noimage.png';
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
                                    <input type='radio' name='typeLabel' id='typeAlbum' value='album' />
                                    <label htmlFor='typeAlbum' className='l-subButton bg-gray typeAlbum'>アルバム</label>
                                    <input type='radio' name='typeLabel' id='typeSingleEP' value='single' />
                                    <label htmlFor='typeSingleEP' className='l-subButton bg-gray typeSingleEP'>シングルとEP</label>
                                    <input type='radio' name='typeLabel' id='typeAll' value='all' />
                                    <label htmlFor='typeAll' className='l-subButton bg-gray typeAll'>すべて</label>
                                </form>
                            </div>

                            {responseArtist.length !== 0 && (
                                <div className='l-autocomplete'>
                                    <ul className='autocompleteList padding-all-1em'>
                                        {responseArtist.map((artist, index) => (
                                            <li className='artistItems action' data-artist_id={artist.id} key={index}>
                                                <img className='l-searchArtistImage artistImage' src={artist.images[0] ? artist.images[0].url : noArtistImage} loading='lazy' />
                                                <div className='l-artistInfo'>
                                                    <span className='searchArtistName font-wb'>{artist.name}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}