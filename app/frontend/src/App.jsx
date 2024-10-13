import { useEffect, useCallback, useState } from 'react'
import { Modal } from './components/modal';
import { Header } from './common/Header';
import { Introduction } from './components/Introduction';
import { AddButton } from './components/AddButton';

export const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [addButtonFlg, setAddButtonFlg] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [type, setType] = useState('all');
  const [responseArtist, setResponseArtist] = useState([]);
  const [responseAlbum, setResponseAlbum] = useState([]);
  const [filterResponseAlbum, setFilterResponseAlbum] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [albumArtList, setAlbumArtList] = useState([]);
  const [isCheckedArray, setIsCheckedArray] = useState([]);
  const [resetButtonFlg, setResetButtonFlg] = useState(false);

  const start = () => {
    setIsStart(!isModalOpen);
    setAddButtonFlg(true);
  }

  const toggleModal = (toggleFlg) => {
    clearInput();
    setModalIsOpen(toggleFlg);
  }

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debounceSearch = useCallback(
    debounce((name) => {
      if (name) {
        searchArtist(name);
      }
    }, 500),
    []
  );

  const inputArtistName = (event) => {
    setArtistName(event.target.value);
    debounceSearch(event.target.value);
  }

  const changeType = (typeValue) => {
    setType(typeValue);
    if (typeValue != 'all') {
      const filtered = responseAlbum.filter(album => album.album_type === typeValue);
      setFilterResponseAlbum([]);
      setFilterResponseAlbum(filtered);
    } else {
      setFilterResponseAlbum(responseAlbum);
    }
    scrollTop();
  };

  const scrollTop = () => {
    const modalWindow = document.getElementById('firstItems');
    modalWindow.scrollIntoView(true);
  }

  const addAlbumArt = (id, name, image, artist) => {
    if (id === albumArtList.some((value) => value.id)) {
      deleteAlbum(id);
    } else {
      const newItem = [...albumArtList, { id: id, albumName: name, albumArt: image, albumArtist: artist }];
      setAlbumArtList(newItem);
    }
  };

  const addIsChecked = (id) => {
    setIsCheckedArray((prevCheckedArray) => {
      // すでに登録されているIDの場合配列から削除して一覧からも削除
      const flg = prevCheckedArray.some((value) => value.id === id);
      if (!flg) {
        return [...prevCheckedArray, { id: id }];
      } else {
        const deleteArray = albumArtList.filter(album => album.id !== id);
        setAlbumArtList(deleteArray);
        if (albumArtList.length < 10) {
          setResetButtonFlg(false);
          setAddButtonFlg(true);
        }
        return prevCheckedArray.filter(value => value.id !== id);
      }
    });
  }

  const deleteAlbum = (id) => {
    const deleteArray = albumArtList.filter(album => album.id !== id);
    setAlbumArtList(deleteArray);
    const deleteIsChecked = isCheckedArray.filter(album => album.id !== id);
    setIsCheckedArray(deleteIsChecked);
    setResetButtonFlg(false);
    if (albumArtList.length <= 10) {
      setResetButtonFlg(false);
      setAddButtonFlg(true);
      setFilterResponseAlbum([]);
    }
  }
  const clearInput = () => {
    setArtistName('');
    setResponseArtist([]);
    clearSearchResult();
  }

  const clearSearchResult = () => {
    setAlbumArtList([]);
    setFilterResponseAlbum([]);
  }

  const clearAlbumList = () => {
    clearSearchResult();
    setAddButtonFlg(true);
    setResetButtonFlg(false);
  }

  const searchArtist = async (artistName) => {
    setResponseArtist([]);
    const params = new URLSearchParams({ 'artistName': artistName });
    try {
      const response = await fetch(`https://rahi-lab.com/js/ajax/searchArtists.php?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const responseData = await response.json();
        setResponseArtist([...responseArtist, ...responseData['items']]);
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('アーティスト情報の取得に失敗しました。');
    }
  };

  const searchAlbum = async (artistId, name) => {
    setResponseArtist([]);
    clearSearchResult();
    const params = new URLSearchParams({
      'artistName': name,
      'type': type,
      'artistId': artistId
    });
    try {
      const response = await fetch(`https://rahi-lab.com/js/ajax/searchSpotify.php?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const responseAlbumData = await response.json();
        setResponseAlbum((prevAlbum) => [...prevAlbum, ...responseAlbumData['items']]);
        setFilterResponseAlbum((prevAlbum) => [...prevAlbum, ...responseAlbumData['items']]);
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('アルバム情報の取得に失敗しました。');
    }
  }

  const handleCapture = () => {
    html2canvas(document.querySelector('.l-contentWrapper'), {
      useCORS: true
    }).then(canvas => {
      var dataURL = canvas.toDataURL("image/png");
      const blob = toBlob(dataURL);
      const imageFile = new File([blob], "image.png", {
        type: "image/png",
      });
      navigator.share({
        text: "共有",
        files: [imageFile],
      }).then(() => {
        console.log("success.");
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  const toBlob = (base64) => {
    const decodedData = atob(base64.replace(/^.*,/, ""));
    const buffers = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      buffers[i] = decodedData.charCodeAt(i);
    }
    try {
      const blob = new Blob([buffers.buffer], {
        type: "image/png",
      });
      return blob;
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    if (albumArtList.length === 10) {
      setResetButtonFlg(true);
      setAddButtonFlg(false);
      setIsOpen(false);
    }
  }, [albumArtList]);


  return (
    <>
      <Header />
      <main>
        <div className='contentWrapper'>
          <div className='l-contentWrapper'>
            <Introduction
              isStart={isStart}
              start={start}
            />
            <AddButton
              addButtonFlg={addButtonFlg}
              isModalOpen={isModalOpen}
              setModalIsOpen={setModalIsOpen}
            />
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
          </div>
          {resetButtonFlg && (
            <div className='resetArea m-top-1em'>
              <div className='resetWrapper ta-center'>
                <button className='l-button action m-right-1em txt-white bg-turquoise reset action' onClick={clearAlbumList}>
                  <img src='../images/rotate.png' alt='resetIcon' />
                </button>
                <button className='l-button txt-white bg-turquoise capture action' onClick={handleCapture}>
                  <img src='../images/camera.png' alt='cameraIcon' />
                </button>
              </div>
            </div>
          )}
        </div>
        <Modal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          searchArtist={searchArtist}
          inputArtistName={inputArtistName}
          changeType={changeType}
          type={type}
          responseArtist={responseArtist}
          searchAlbum={searchAlbum}
          responseAlbum={responseAlbum}
          filterResponseAlbum={filterResponseAlbum}
          errorMessage={errorMessage}
          addAlbumArt={addAlbumArt}
          albumArtList={albumArtList}
          addIsChecked={addIsChecked}
          isCheckedArray={isCheckedArray}
          clearInput={clearInput}
          artistName={artistName}
        />
      </main >
    </>
  )
}