import { useEffect, useCallback, useState } from 'react'
import { Modal } from './components/modal';
import { Header } from './common/Header';
import { Introduction } from './components/Introduction';
import { AddButton } from './components/AddButton';
import { AlbumArtList } from './components/AlbumartList';
import { ResetArea } from './components/ResetArea';

export const App = () => {
  const [isSelectStart, setIsSelectStart] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [addButtonVisible, setAddButtonVisible] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [type, setType] = useState('all');
  const [responseArtist, setResponseArtist] = useState([]);
  const [responseAlbum, setResponseAlbum] = useState([]);
  const [filterResponseAlbum, setFilterResponseAlbum] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [albumArtList, setAlbumArtList] = useState([]);
  const [isCheckedArray, setIsCheckedArray] = useState([]);
  const [resetButtonVisible, setResetButtonVisible] = useState(false);

  const selectStart = () => {
    setIsSelectStart(!isSelectStart);
    setAddButtonVisible(true);
  }

  const toggleModal = (toggleFlg) => {
    clearModal();
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
    if (albumArtList.some((value) => value.id) === id) {
      deleteAlbum(id);
    } else {
      const newItem = [...albumArtList, { id: id, albumName: name, albumArt: image, albumArtist: artist }];
      setAlbumArtList(newItem);
    }
  };

  const addIsChecked = (id) => {
    setIsCheckedArray((prevCheckedArray) => {
      // すでに登録されているIDの場合配列から削除して一覧からも削除
      const isSameAlbum = prevCheckedArray.some((value) => value.id === id);
      if (!isSameAlbum) {
        return [...prevCheckedArray, { id: id }];
      } else {
        const deleteArray = albumArtList.filter(album => album.id !== id);
        setAlbumArtList(deleteArray);
        if (albumArtList.length < 10) {
          setResetButtonVisible(false);
          setAddButtonVisible(true);
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
    setResetButtonVisible(false);
    if (albumArtList.length <= 10) {
      setResetButtonVisible(false);
      setAddButtonVisible(true);
      setFilterResponseAlbum([]);
    }
  }

  const clearModal = () => {
    setArtistName('');
    setResponseArtist([]);
    setFilterResponseAlbum([]);
  }

  const resetAlbumList = () => {
    clearModal();
    setAlbumArtList([]);
    setIsCheckedArray([])
    setAddButtonVisible(true);
    setResetButtonVisible(false);
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
    setResponseAlbum([]);
    setFilterResponseAlbum([]);
    setType('all');
    const params = new URLSearchParams({
      'artistName': name,
      'type': 'all',
      'artistId': artistId
    });
    // TODO: サーバー側の実装もallメインで使用することを考慮した実装に修正する
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
      setResetButtonVisible(true);
      setAddButtonVisible(false);
      setModalIsOpen(false);
    }
  }, [albumArtList.length]);


  return (
    <>
      <Header />
      <main>
        <div className='contentWrapper'>
          <div className='l-contentWrapper'>
            {!isSelectStart && (
              <Introduction selectStart={selectStart} />
            )}
            {addButtonVisible && (
              <AddButton
                isModalOpen={isModalOpen}
                setModalIsOpen={setModalIsOpen}
              />)}
            {!isSelectStart && (
              < AlbumArtList
                isSelectStart={isSelectStart}
                albumArtList={albumArtList}
                deleteAlbum={deleteAlbum}
              />
            )}
          </div>
          {resetButtonVisible && (
            <ResetArea
              resetAlbumList={resetAlbumList}
              handleCapture={handleCapture}
            />
          )}
        </div>
        {isModalOpen && (
          <Modal
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
            clearModal={clearModal}
            artistName={artistName}
          />
        )}
      </main >
    </>
  )
}