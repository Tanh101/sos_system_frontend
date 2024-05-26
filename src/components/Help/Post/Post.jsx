import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faAngleDown, faAngleUp, faCheck, faRemove, faSearch, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import avatar from '../../../assets/imgs/avatar.png';
import RequestService from '../../../services/RequestService';
import { Toastify } from '../../../toastify/Toastify';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../Context/UserContext/UserContext';
import FormRequest from '../../Emergency/FormRequest/FormRequest';
import { VOTE_TYPE } from '../../../constants/config';

const Post = ({ requests, setRequests, realTimeRequest }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { vote } = RequestService();
    const { user, sendResponseToClient } = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const handleVoteClick = async (event, item, voteType) => {
        event.stopPropagation();
        setLoading(true);
        try {
            // Check if the current voteType is the same as the clicked voteType
            const newVoteType = item.voteType === voteType ? VOTE_TYPE.none : voteType;
            const response = await vote(item.id, newVoteType);
            item.voteCount = response;
            item.voteType = newVoteType;
            setRequests((prevRequests) => ({
                ...prevRequests,
                requests: prevRequests.requests.map((req) =>
                    req.id === item.id ? { ...req, voteCount: response, voteType: newVoteType } : req
                ),
            }));
        } catch (err) {
            Toastify.error('Failed to vote');
        } finally {
            setLoading(false);
        }
    };

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
                        placeholder={t("Tìm kiếm yêu cầu...")}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="flex justify-center items-center">
                    <Popup
                        trigger={<button className="p-2 bg-red-600 text-white rounded-2xl">{t("Tạo yêu cầu")}</button>}
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
                            <div className="flex"></div>
                        </div>
                        {item.isEmergency && (
                            <div className="flex justify-start items-center mt-4">
                                <FontAwesomeIcon icon={faWarning} color="red" />
                                <p className="text-[#F73334] mx-2">{t("Khẩn cấp")}</p>
                            </div>
                        )}
                        <div className="flex my-2">
                            <p>{item.content}</p>
                        </div>
                        {item?.media?.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                {item.media.map((media, index) => (
                                    <img key={index} width={300} height={300} src={media?.url} alt="Post" className="rounded-lg" />
                                ))}
                            </div>
                        )}
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center ">
                                <div className="flex justify-center items-center rounded-2xl border border-slate-300">
                                    <button
                                        className={`hover:rounded-2xl hover:bg-slate-200 px-2 py-1 ${item.voteType === VOTE_TYPE.upvote ? 'text-red-500' : ''}`}
                                        onClick={(event) => handleVoteClick(event, item, VOTE_TYPE.upvote)}
                                        disabled={loading}
                                    >
                                        <FontAwesomeIcon
                                            icon={faAngleUp}
                                        />
                                    </button>
                                    <p className="mx-1 text-md">{item.voteCount}</p>
                                    <button
                                        className={`hover:rounded-2xl hover:bg-slate-200 px-2 py-1 ${item.voteType === VOTE_TYPE.downvote ? 'text-red-500' : ''}`}
                                        onClick={(event) => handleVoteClick(event, item, VOTE_TYPE.downvote)}
                                        disabled={loading}
                                    >
                                        <FontAwesomeIcon
                                            icon={faAngleDown}
                                        />
                                    </button>
                                </div>
                                <div className="flex m-4">
                                    <div className="flex justify-center items-center rounded-2xl border border-slate-300 px-2">
                                        <FontAwesomeIcon
                                            className='cursor-pointer pl-2 py-2 rounded-2xl'
                                            icon={faComment} color="red" size='lg'
                                        />
                                        <p className='text-sm font-bold text-slate-500 px-2'>12</p>
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
        </div>
    );
};

Post.propTypes = {
    requests: PropTypes.object.isRequired,
    setRequests: PropTypes.func.isRequired,
    realTimeRequest: PropTypes.array
};

export default Post;
