export const AddButton = (props) => {
    const { addButtonFlg, isModalOpen, setModalIsOpen } = props;
    return (
        <>
            {addButtonFlg && (
                <div className='albumAddButton'>
                    <div className='l-albumArt albumAddButton addButton action' onClick={() => { setModalIsOpen(!isModalOpen) }}>
                        <span className='icon-add'></span>
                    </div>
                </div>
            )}
        </>
    )
}