import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar from '../../../assets/imgs/avatar.png'
import { faComment, faMessage } from '@fortawesome/free-regular-svg-icons'
import {
    faArrowDown,
    faArrowUp,
    faStreetView, faWarning
} from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types';

const Post = ({ requestData }) => {
    return (
        <>
            {!requestData && <div className='flex justify-center items-center h-96'>
                <p className='text-2xl'>No requests available</p>
            </div>
            }
            {requestData && requestData?.requests?.length && requestData.requests.map((item, index) => (
                <div className={`flex flex-col shadow-xl bg-white my-3 rounded-lg border p-8 ${item.isEmergency && 'border-[#F73334] border-2'} `} key={index}>
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <img width={58} src={item.user?.avatar || avatar} alt="" />
                            <div className="flex flex-col">
                                <p>{item.user?.name}</p>
                                <div className="flex text-slate-400">
                                    <p>10km</p>
                                    <p>18:30</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <button className='mx-4'>
                                <FontAwesomeIcon icon={faMessage} color='red' size='lg' />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faStreetView} color='red' size='xl' />
                            </button>
                        </div>

                    </div>
                    {item.isEmergency ? (<div className="flex justify-start items-center">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faWarning} color='red' />
                            <p className='text-[#F73334] mx-2'>EMERGENCY REQUEST</p>
                        </div>
                    </div>) : ''}
                    <div className="flex my-2">
                        <p>{item.content}</p>
                    </div>
                    <div className="flex flex-wrap xl:min-w-[1000px] lg:min-w-[800px] md:min-w-[600px] min-h-10">
                        {item?.media && item?.media?.length > 0 &&
                            item?.media.map((img, index) => (
                                <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/3 p-2" key={index}>
                                    <img className='m-2' width={500} src={img} alt="" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex rounded-lg border-1 border-slate-300 border px-3 ">
                            <div className='flex justify-center items-center mx-2'>
                                <button>
                                    <FontAwesomeIcon icon={faArrowUp} color='black'/>
                                </button>
                                <p className='mx-2'>{item.voteCount}</p>
                            </div>
                            <p className='text-slate-400'>|</p>
                            <div className='flex justify-center items-center mx-2'>
                                <button>
                                    <FontAwesomeIcon icon={faArrowDown} />
                                </button>
                            </div>
                        </div>
                        <div className="flex my-4">
                            <div className="flex justify-center items-center rounded-lg border-1 border-slate-300">
                                <FontAwesomeIcon icon={faComment} color='red' />
                                <p>12 comments</p>
                            </div>
                        </div>
                    </div >
                </div >
            ))}
        </>

    )
}

export default Post

Post.propTypes = {
    requestData: PropTypes.object
}
