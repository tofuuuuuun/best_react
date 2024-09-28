
export const Modal = (props) => {
    const { isOpen, toggleModal, searchArtist, inputArtistName } = props;
    const changeFlg = () => toggleModal(false);
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
                        </div>
                    </div>
                </div >
            )};
        </>
    )
};