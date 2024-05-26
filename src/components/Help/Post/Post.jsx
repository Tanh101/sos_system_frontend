import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faComment } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowUp, faCheck, faClose, faRemove, faSearch, faStreetView, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import avatar from '../../../assets/imgs/avatar.png';
import RequestService from '../../../services/RequestService';
import { Toastify } from '../../../toastify/Toastify';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../Context/UserContext/UserContext';
import Direction from '../../Direction/Direction';
import FormRequest from '../../Emergency/FormRequest/FormRequest';

const Post = ({ requests, realTimeRequest }) => {
    const images = [
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    ];

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { upvotePost, downvotePost } = RequestService();
    const { user, sendResponseToClient } = useContext(UserContext);

    const [upvoteClicked, setUpvoteClicked] = useState(null);
    const [downvoteClicked, setDownvoteClicked] = useState(null);
    const [isOpenStreetView, setIsOpenStreetView] = useState(false);
    const [requestPlace, setRequestPlace] = useState({});
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const handleUpvoteClick = async (event, item) => {
        event.stopPropagation();
        setLoading(true);
        try {
            await upvotePost(item.id);
            setUpvoteClicked(!upvoteClicked);
            if (downvoteClicked) setDownvoteClicked(false);
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
            await downvotePost(item.id);
            setDownvoteClicked(!downvoteClicked);
            if (upvoteClicked) setUpvoteClicked(false);
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
            location: {
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude),
            },
            info: item.address
        });
        setIsOpenStreetView(true);
    }

    const handleResponse = (event) => {
        const clientId = realTimeRequest[0]?.clientId;
        event.stopPropagation();
        const responseData = { clientId, message: 'Rescue on the way!' };
        sendResponseToClient(responseData);
    };

    const handlePostClick = (item) => {
        navigate(`detail/${item.id}`);
    };

    return (
        <div className='flex flex-col'>
            <div className="flex justify-between mx-5 sticky top-0 bg-white">
                <div className="flex justify-center items-center w-96 px-2 py-2 border outline-none focus:border-red-600 rounded-xl">
                    <FontAwesomeIcon icon={faSearch} color='red' size='lg' />
                    <input className="outline-none w-full ml-2"
                        type="text"
                        value={search}
                        placeholder={t("Tìm kiếm yêu cầu...")}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="flex justify-center items-center">
                    <Popup
                        trigger={

                            <button className="p-2 bg-red-600 text-white rounded-2xl">{t("Tạo yêu cầu")}</button>
                        }
                        modal
                        nested
                        contentStyle={{ borderRadius: '10px' }}
                    >
                        <FormRequest isEmergency={false} />
                    </Popup>
                </div>
            </div>
            {requests?.requests?.length > 0 && requests.requests.map((item, index) => (
                <div key={index}
                    className="flex flex-col bg-white hover:bg-slate-50 rounded-xl mx-5 mt-2 py-2 w-auto cursor-pointer"
                    onClick={() => handlePostClick(item)}>
                    <div className={`flex flex-col mb-3 shadow-md rounded-lg border m-2 p-4 bg-white ${item.isEmergency ? 'border-[#F73334] border' : ''}`}>
                        <div className="flex justify-between items-center">
                            <div className="flex">
                                <img width={58} src={item.user?.avatar || avatar} alt="" />
                                <div className="flex flex-col ml-2">
                                    <p>{item.user?.name}</p>
                                    <div className="flex text-slate-400">
                                        <p className='mr-2'>10km</p>
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
                            <div className="flex justify-start items-center mt-4">
                                <FontAwesomeIcon icon={faWarning} color="red" />
                                <p className="text-[#F73334] mx-2">{t("Khẩn cấp")}</p>
                            </div>
                        ) : null}
                        <div className="flex my-2">
                            <p>{item.content}</p>
                        </div>
                        {item?.media?.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                {item.media.map((media, index) => (
                                    <img key={index} width={400} src={media?.url} alt="Post" className="h-auto rounded-lg" />
                                ))}
                            </div>
                        )}
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                                <div className="flex rounded-2xl border border-slate-300">
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
                                <div className="flex m-4">
                                    <div className="flex justify-center items-center rounded-lg border border-slate-300">
                                        <FontAwesomeIcon
                                            className='cursor-pointer px-2 py-2 hover:bg-slate-100 rounded-2xl'
                                            icon={faComment} color="red" size='lg'
                                        />
                                        <p className='text-md text-slate-500 ml-2'>12 {t('bình luận')}</p>
                                    </div>
                                </div>
                            </div>
                            {user?.role === 'rescuer' && item.status === 0 && (
                                <div className="flex justify-center items-center">
                                    <button onClick={handleResponse}>
                                        <FontAwesomeIcon
                                            className='hover:text-blue-600 px-2 py-2 rounded-full hover:bg-blue-300 mx-2'
                                            icon={faCheck} color="red" size="xl"
                                        />
                                    </button>
                                    <button>
                                        <FontAwesomeIcon
                                            className='hover:text-black px-3 py-2 rounded-full hover:bg-slate-300'
                                            icon={faRemove} color="red" size="xl"
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            {isOpenStreetView && (
                <Popup
                    open={isOpenStreetView}
                    onClose={() => setIsOpenStreetView(false)}
                    modal
                    nested
                    contentStyle={{ borderRadius: '10px', width: '80%', height: '60%' }}
                >
                    <div className="flex flex-col items-center px-10">
                        <div className="flex justify-between items-center w-full">
                            <p>Chi tiết địa chỉ</p>
                            <button onClick={() => setIsOpenStreetView(false)} className="self-end px-4 py-2 text-red-600 hover:text-red-800">
                                <FontAwesomeIcon icon={faClose} size="lg" />
                            </button>
                        </div>
                        <Direction />
                    </div>
                </Popup>
            )}
        </div>
    );
};

Post.propTypes = {
    requests: PropTypes.object.isRequired,
    realTimeRequest: PropTypes.array
};

export default Post;
