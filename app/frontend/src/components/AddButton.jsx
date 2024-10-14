export const AddButton = (props) => {
    const { setModalIsOpen } = props;
    return (
        <div className='albumAddButton'>
            <button className='l-albumArt albumAddButton addButton action' onClick={() => { setModalIsOpen(prevState => !prevState) }}>
                <span className='icon-add'></span>
            </button>
        </div>
    )
}