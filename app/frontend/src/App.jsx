import { useState } from 'react'
import { Modal } from './components/modal';
import { Header } from './common/Header';

export const App = () => {
  const [isStart, setIsSTart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [responseArtist, setResponseArtist] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = (toggleFlg) => setIsOpen(toggleFlg);
  const inputArtistName = (event) => setArtistName(event.target.value);

  const searchArtist = async () => {
    const params = new URLSearchParams({ 'artistName': artistName });
    try {
      const response = await fetch(`https://rahi-lab.com/js/ajax/searchArtists.php?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const responseData = await response.json();
        setResponseArtist([...responseArtist, ...responseData['items']])
        // console.log(responseData['items']);
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('アーティスト情報の取得に失敗しました。');
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className='contentWrapper'>
          <div className='l-contentWrapper'>
            {!isStart && (
              <div className='startText m-bottom-3em ta-center fadeIn'>
                <h2 className='txt-white m-bottom-05em'>あなたの音楽、あなたのベストアルバム</h2>
                <p className='txt-white'>今まで聴いてきた音楽の中から、<br />あなたのベスト10枚を選んでみませんか？</p>
                <p className='txt-white m-bottom-2em'>お気に入りのアルバムを選ぶだけで、<br />あなたの音楽遍歴が一目でわかる一覧が完成します。</p>
                <h3 className='txt-white m-bottom-05em'>あなたの音楽の歴史を振り返る</h3>
                <p className='txt-white'>シンプルに、そして直感的に、あなたの好きなアルバムを選択。</p>
                <p className='txt-white m-bottom-2em'>アルバムアートを一覧で表示して<br />「このアルバム、懐かしい！」なんて話題も広がるはず。</p>
                <h3 className='txt-white m-bottom-05em'>みんなにシェアしよう</h3>
                <p className='txt-white'>作ったリストは、みんなにシェアして<br />「このアルバム超オススメ！」って自慢しよう。</p>
                <p className='txt-white m-bottom-2em'>音楽の話題で盛り上がれること間違いなし！</p>
                <button className='startButton bg-turquoise txt-white font-wb' onClick={() => setIsSTart(!isStart)}>さあ、始めよう！</button>
              </div>
            )}
            {isStart && (
              <div className='l-albumList l-common'>
                <ul className='albumArtList' id='target'></ul>
                <div className='albumAddButton'>
                  <div className='l-albumArt albumAddButton addButton action disp-block' onClick={() => setIsOpen(!isOpen)}>
                    <span className='icon-add'></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='resetArea m-top-1em'></div>
        </div>
        <Modal
          isOpen={isOpen}
          toggleModal={toggleModal}
          searchArtist={searchArtist}
          inputArtistName={inputArtistName}
          responseArtist={responseArtist}
          errorMessage={errorMessage}
        />
      </main>
    </>
  )
}