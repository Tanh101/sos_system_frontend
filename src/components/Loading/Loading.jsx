import 'primeicons/primeicons.css';

const Loading = () => {
    return (
        <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
            <div className="flex flex-1 justify-center items-center">
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem', color: '#0095FF' }}></i>
            </div>
        </div >
    )
}

export default Loading
