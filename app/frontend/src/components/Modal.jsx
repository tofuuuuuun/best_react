import { useState } from 'react'
export const Modal = (props) => {
    const { isModalOpen, toggleModal, changeType, type, searchArtist, artistName, inputArtistName, responseArtist, searchAlbum, filteringAlbumData, filterResponseAlbum, addAlbumArt, isCheckedArray, addIsChecked, clearInput, errorMessage } = props;

    const selectType = (event) => changeType(event.target.value);
    const changeFlg = () => toggleModal(false);
    const addAlbumList = (id, name, image, artist) => { addAlbumArt(id, name, image, artist); }
    const isChecked = (id) => addIsChecked(id);

    const noArtistImage = '../../public/images/noImage.png';
    return (
        <>
            {isModalOpen && (
                <div className='modal-container'>
                    <div className='modal-body'>
                        <div className='modal-close' onClick={changeFlg}><span className='icon-close'></span></div>
                        <div className='modal-content'>
                            <div className='l-searchForm ta-left'>
                                <div className='l-selectType'>
                                    <input type='text' name='artist' id='artistName' placeholder='アーティスト名' data-artist_id='' value={artistName} onChange={inputArtistName} />
                                    <div className='clear' onClick={() => clearInput()}><span className='icon-close'></span></div>
                                </div>
                                <div className='l-autocomplete'></div>
                                <div className='p-left-1em'>
                                    <button className='l-buttonSearch txt-white bg-turquoise search action' onClick={() => searchArtist(artistName)}>
                                        <img src='../../public/images/search.png' alt='searchIcon' width='15' />
                                    </button>
                                </div>
                            </div>
                            {errorMessage && (
                                <>
                                    <div>{errorMessage}</div>
                                </>
                            )}
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
                            {filterResponseAlbum.length !== 0 && (
                                <>
                                    <div>
                                        <div className='ta-left m-bottom-05em p-top-1em'>
                                            <form id='type'>
                                                <input type='radio' name='typeLabel' id='typeAll' value='all' checked={type === 'all'} onChange={selectType} onClick={filteringAlbumData} />
                                                <label htmlFor='typeAll' className='l-subButton bg-gray typeAll m-right-05em'>すべて</label>
                                                <input type='radio' name='typeLabel' id='typeAlbum' value='album' checked={type === 'album'} onChange={selectType} onClick={filteringAlbumData} />
                                                <label htmlFor='typeAlbum' className='l-subButton bg-gray typeAlbum m-right-05em'>アルバム</label>
                                                <input type='radio' name='typeLabel' id='typeSingleEP' value='single' checked={type === 'single'} onChange={selectType} onClick={filteringAlbumData} />
                                                <label htmlFor='typeSingleEP' className='l-subButton bg-gray typeSingleEP'>シングルとEP</label>
                                            </form>
                                        </div>
                                        <ul className='modalList'>
                                            {filterResponseAlbum.map((album, index) => (
                                                <li className='albumItems' id={index === 0 ? 'firstItems' : ''} key={index} data-name={album.name} data-artist={album.artists.map((value) => value.name).join(', ')}>
                                                    <img className='albumImage' src={album.images.length !== 0 ? album.images[0].url : ''} loading='lazy' />
                                                    <div className='l-albumInfo'>
                                                        <span className='albumName font-wb'>{album.name} ({album.release_date.substring(0, 4)})</span>
                                                        <span className='artistsName'>{album.artists.map((value) => value.name).join(',')}</span>
                                                    </div>
                                                    <label id={album.id} className={isCheckedArray.some((value) => value.id === album.id) ? 'l-button bg-orange txt-white action ta-center' : 'l-button bg-turquoise txt-white action ta-center'}>
                                                        <input type='checkbox'
                                                            htmlFor={album.id}
                                                            className={isCheckedArray.some((value) => value.id === album.id) ? 'selected' : 'select'}
                                                            checked={isCheckedArray.some((value) => value.id === album.id)}
                                                            onChange={() => {
                                                                addAlbumList(album.id, album.name, album.images.length !== 0 ? album.images[0].url : '', album.artists.map((value) => value.name).join(', '));
                                                                isChecked(album.id);
                                                            }} />{isCheckedArray.some((value) => value.id === album.id) ? '選択中' : '選択'}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div >
                </div >
            )}
        </>
    )
}