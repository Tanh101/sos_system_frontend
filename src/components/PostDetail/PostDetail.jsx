import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./PostDetail.css"
import { faClose } from "@fortawesome/free-solid-svg-icons"

const PostDetail = () => {
    return (
        <div className='bg-white items-center justify-center rounded-lg shadow-lg px-6 pb-6 min-w-96 w-full'>
            <div className="flex justify-center items-center">
                <p className="">Vantanhly's Post</p>
                <FontAwesomeIcon icon={faClose} className='cursor-pointer ' />
            </div>
        </div>
    )
}

export default PostDetail
