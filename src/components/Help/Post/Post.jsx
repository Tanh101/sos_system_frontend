import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faComment, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowUp, faCheck, faClose, faRemove, faStreetView, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import avatar from '../../../assets/imgs/avatar.png';
import RequestService from '../../../services/RequestService';
import { Toastify } from '../../../toastify/Toastify';
import PostDetail from '../PostDetail/PostDetail';
import { useTranslation } from 'react-i18next';
import StreetView from '../../StreetView/StreetView';
import { UserContext } from '../../../Context/UserContext/UserContext';

const Post = ({ requests }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { upvotePost, downvotePost } = RequestService();
    const { user, sendResponseToClient } = useContext(UserContext);

    const [upvoteClicked, setUpvoteClicked] = useState(null);
    const [downvoteClicked, setDownvoteClicked] = useState(null);
    const [isOpenStreetView, setIsOpenStreetView] = useState(false);
    const [requestPalce, setRequestPlace] = useState({});

    const [loading, setLoading] = useState(false);

    const handleUpvoteClick = async (event, item) => {
        event.stopPropagation();
        setLoading(true);
        try {
            // const newVoteCount = await upvotePost(item.id);
            // item.voteCount = newVoteCount;

            setUpvoteClicked(!upvoteClicked);
            if (downvoteClicked) {
                setDownvoteClicked(false);
            }
        } catch (err) {
            Toastify.error('Failed to upvote');
        } finally {
            setLoading(false);
        }
    };

    const handleDownvoteClick = async (event, item) => {
        event.stopPropagation();
        setLoading(true);
        try {
            // const newVoteCount = await downvotePost(item.id);
            // item.voteCount = newVoteCount;
            setDownvoteClicked(!downvoteClicked);
            if (upvoteClicked) {
                setUpvoteClicked(false);
            }
        } catch (err) {
            Toastify.error('Failed to downvote');
        } finally {
            setLoading(false);
        }
    };

    const handleMessageClick = (event) => {
        event.stopPropagation();
        navigate('/message');
    };

    const handleStreetViewClick = (event, item) => {
        event.stopPropagation();
        setRequestPlace({
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
            address: item.address
        });
        setIsOpenStreetView(true);
    }

    const handleResponse = (event, clientId) => {
        event.stopPropagation();
        const responseData = { clientId, message: 'Rescue on the way!' };
        console.log('Response to client:', responseData);
        sendResponseToClient(responseData);
    };

    return (
        <>
            {requests && requests?.requests?.length > 0 && requests?.requests?.map((item, index) => (
                <Popup
                    key={index}
                    trigger={
                        <div className="flex flex-col bg-white hover:bg-slate-50 rounded-xl m-5 py-2  w-auto cursor-pointer">
                            <div className={`flex flex-col mb-3 shadow-md rounded-lg border m-2 p-4 bg-white ${item.isEmergency ? 'border-[#F73334] border' : ''}`}>
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
                                        <button className="mx-4" onClick={handleMessageClick}>
                                            <FontAwesomeIcon icon={faMessage} color="red" size="lg" />
                                        </button>
                                        <button onClick={(event) => handleStreetViewClick(event, item)}>
                                            <FontAwesomeIcon icon={faStreetView} color="red" size="xl" />
                                        </button>
                                    </div>
                                </div>
                                {item.isEmergency ? (
                                    <div className="flex justify-start items-center">
                                        <div className="flex items-center">
                                            <FontAwesomeIcon icon={faWarning} color="red" />
                                            <p className="text-[#F73334] mx-2">{t("Khẩn cấp")}</p>
                                        </div>
                                    </div>
                                ) : (null)}
                                <div className="flex my-2">
                                    <p>{item.content}</p>
                                </div>
                                <div className="flex flex-col w-full justify-center items-start ml-2">
                                    {item?.media?.length > 0 && (
                                        <div className="grid grid-cols-3 gap-4">
                                            {item?.media.map((media, index) => (
                                                <img key={index} src={media.url} alt="Post" className="w-full h-auto rounded-lg" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="flex rounded-2xl border-1 border-slate-300 border">
                                            <div className="flex justify-center items-center">
                                                <button
                                                    className="hover:rounded-2xl hover:bg-slate-200 px-3 py-1"
                                                    onClick={(event) => handleUpvoteClick(event, item)}
                                                    disabled={loading}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faArrowUp}
                                                        color={upvoteClicked ? 'red' : 'black'}
                                                        className="hover:text-red-500"
                                                    />
                                                </button>
                                                <p className="mx-2">{item.voteCount}</p>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <button
                                                    className="hover:rounded-2xl hover:bg-slate-200 px-3 py-1"
                                                    onClick={(event) => handleDownvoteClick(event, item)}
                                                    disabled={loading}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faArrowDown}
                                                        color={downvoteClicked ? 'red' : 'black'}
                                                        className="hover:text-red-500"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex m-4">
                                            <div className="flex justify-center items-center rounded-lg border-1 border-slate-300">
                                                <FontAwesomeIcon className='cursor-pointer px-2 py-2 hover:bg-slate-100 rounded-2xl'
                                                    icon={faComment} color="red" size='lg'
                                                />
                                                <p className='text-md text-slate-500'>12 {t('bình luận')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {user?.role === 'rescuer' && (
                                        <div className="flex justify-center items-center">
                                            <button onClick={handleResponse}>
                                                <FontAwesomeIcon className='hover:text-blue-600 px-2 py-2 rounded-full hover:bg-blue-300 mx-2' icon={faCheck} color="red" size="xl" />
                                            </button>
                                            <button>
                                                <FontAwesomeIcon className='hover:text-black px-3 py-2 rounded-full hover:bg-slate-300' icon={faRemove} color="red" size="xl" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                    modal
                    nested
                    contentStyle={{ borderRadius: '10px' }}
                >
                    {close => (
                        <PostDetail post={item} close={close} />
                    )}
                </Popup>
            ))}
            {isOpenStreetView && (
                <Popup
                    open={isOpenStreetView}
                    onClose={() => setIsOpenStreetView(false)}
                    modal
                    nested
                    contentStyle={{ borderRadius: '10px', width: '80%', height: '60%' }}
                >
                    {close => (
                        <div className="flex flex-col items-center j px-10">
                            <div className="flex justify-between items-center w-full">
                                <p>Chi tiết địa chỉ</p>
                                <button onClick={() => setIsOpenStreetView(false)} className="self-end px-4 py-2 text-red-600 hover:text-red-800">
                                    <FontAwesomeIcon icon={faClose} size="lg" />
                                </button>
                            </div>
                            <div className="flex">

                            </div>
                            <StreetView requestPlace={requestPalce} />
                        </div>
                    )}
                </Popup>
            )}
        </>
    );
};

Post.propTypes = {
    requests: PropTypes.object.isRequired,
};

export default Post;
