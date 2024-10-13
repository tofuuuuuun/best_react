export const Introduction = (props) => {
    const { isStart, start } = props;

    return (
        <>
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
                    <button className='startButton bg-turquoise txt-white font-wb' onClick={() => start()}>さあ、始めよう！</button>
                </div>
            )}
        </>
    )
}