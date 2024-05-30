import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faArrowLeft,
    faClose,
    faComment,
    faEarth,
    faEllipsis,
    faLocationDot,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit, faMessage } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import { Dropdown, Image } from 'antd';
import { useTranslation } from "react-i18next";

import "./PostDetail.css";
import avatar from '../../../assets/imgs/avatar.png';
import RequestService from "../../../services/RequestService";
import { Toastify } from "../../../toastify/Toastify";
import Loading from "../../Loading/Loading";
import Direction from "../../Direction/Direction";
import { VOTE_TYPE } from "../../../constants/config";
import { formatHHmm } from "../../../utilities/formatDate";
import { UserContext } from "../../../Context/UserContext/UserContext";

const PostDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();

    const { getRequestDetail, vote } = RequestService();
    const { location } = useContext(UserContext);

    const [post, setPost] = useState(null);
    const [isOpenStreetView, setIsOpenStreetView] = useState(false);
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const handleStreetViewClick = (event, item) => {
        event.stopPropagation();
        setOrigin({ lat: parseFloat(item?.latitude), lng: parseFloat(item?.longitude) });
        setDestination({ lat: location?.lat, lng: location?.lng });
        setIsOpenStreetView(true);
    }

    const handleMessageClick = (event) => {
        event.stopPropagation();
        navigate('/message');
    };

    const items = [
        {
            key: '1',
            label: (
                <button onClick={handleMessageClick}>
                    {t("Chỉnh sửa")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faEdit} color="red" />,
        },
        {
            key: '2',
            label: (
                <button onClick={handleMessageClick}>
                    {t("Nhắn tin")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faMessage} color="red" />,
        },
        {
            key: '3',
            label: (
                <button onClick={(event) => handleStreetViewClick(event, post)}>
                    {t("Xem vị trí")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faLocationDot} color="red" />,
        }
    ];


    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postData = await getRequestDetail(id);
                setPost(postData);
            } catch (error) {
                console.error('Failed to fetch post details:', error);
            }
        };

        fetchPostDetails();
    }, []);



    const handleVote = async (event, post, voteType) => {
        event.stopPropagation();
        setLoading(true);
        try {
            const newVoteType = post.voteType === voteType ? VOTE_TYPE.none : voteType;
            const response = await vote(id, newVoteType);
            post.voteCount = response;
            post.voteType = newVoteType;
            setPost((prevPost) => ({
                ...prevPost,
                voteCount: response,
                voteType: newVoteType
            }));

        } catch (err) {
            Toastify.error('Failed to upvote');
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    }

    return (
        <div>
            {
                post ? (
                    <div className='bg-white justify-center text-sm rounded-lg px-3 shadow-lg w-full flex flex-col' >
                        <div className="flex justify-between w-1/2 items-center text-xl font-bold pb-4">
                            <div className="flex justify-center items-center">
                                <FontAwesomeIcon icon={faArrowLeft} className="text-red-500 cursor-pointer px-2 py-1 rounded-full hover:bg-slate-100"
                                    onClick={handleBackClick} />
                                <p className="font-medium text-base">{t("Trở về")}</p>
                            </div>
                            <p className="translate-x-1/2">{post?.user?.name}'s Post</p>
                        </div>
                        <p className="border-b"></p>
                        <div className="flex flex-col overflow-y-auto h-screen">
                            <div className="flex flex-col my-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex justify-center items-center">
                                        <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                                        <div className="flex flex-col ml-2">
                                            <p className="text-lg font-bold">{post?.user?.name}</p>
                                            <div className="flex items-center">
                                                <p className="text-sm text-gray-600">
                                                    {post?.distance !== null && parseInt(post?.distance) >= 1 ? `${post.distance}km` : `${post.distance * 1000}m`}
                                                </p>
                                                <FontAwesomeIcon icon={faEarth} className='text-slate-500 mx-1' />
                                                <p className="text-sm text-gray-600">{formatHHmm(post.updatedAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <Dropdown
                                            menu={{
                                                items,
                                            }}
                                            placement="bottom"
                                        >
                                            <FontAwesomeIcon icon={faEllipsis} size="lg" className='text-red-500 cursor-pointer'
                                                onClick={(e) => e.preventDefault()} />
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-start ml-2">
                                {!post.isEmergency && (
                                    <div className="flex justify-center items-center border rounded-lg p-1 shadow-md">
                                        <img className="border-red-500" width={30} src={post.requestTypeIcon} alt="" />
                                        <p className="mx-1 font-bold text-red-600">{post.requestType}</p>
                                    </div>
                                )}
                                <p className="text-base mt-2">{post?.content}</p>
                                {post?.media?.length > 0 && (
                                    <div className="flex justify-start w-[1200px] flex-1 flex-wrap">
                                        {post?.media.map((media, index) => (
                                            <Image key={index} width={300} src={media.url} alt="Post"
                                                className="rounded-lg mt-4" loading="lazy" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-start items-center mt-2 py-2 border-y">
                                <div className="flex rounded-2xl border border-slate-300">
                                    <div className="flex justify-center items-center">
                                        <button
                                            className={`hover:rounded-2xl hover:bg-slate-200 px-2 py-1 ${post.voteType === VOTE_TYPE.upvote ? 'text-red-500' : ''}`}
                                            onClick={(event) => handleVote(event, post, VOTE_TYPE.upvote)}
                                            disabled={loading}
                                        >
                                            <FontAwesomeIcon
                                                icon={faAngleUp}
                                                color={post.voteType === VOTE_TYPE.upvote ? 'red' : 'black'}
                                                className="hover:text-red-500"
                                            />
                                        </button>
                                        <p className="mx-2">{post.voteCount}</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button
                                            className={`hover:rounded-2xl hover:bg-slate-200 px-2 py-1 ${post.voteType === VOTE_TYPE.downvote ? 'text-red-500' : ''}`}
                                            onClick={(event) => handleVote(event, post, VOTE_TYPE.downvote)}
                                            disabled={loading}
                                        >
                                            <FontAwesomeIcon
                                                icon={faAngleDown}
                                                color={post.voteType === VOTE_TYPE.downvote ? 'red' : 'black'}
                                                className="hover:text-red-500"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex mx-4 border rounded-2xl">
                                    <div className="flex justify-center items-center rounded-lg border-slate-300">
                                        <FontAwesomeIcon className='cursor-pointer px-2 py-2 hover:bg-slate-100 rounded-2xl'
                                            icon={faComment} color="red" size='sm' />
                                        <p className='mx-2'>15 {t("comments")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 max-h-40">
                                <div className="flex items-start my-2">
                                    <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                                    <div className="ml-2 bg-gray-100 p-2 rounded-lg">
                                        <p className="font-bold">Nguyễn Thu</p>
                                        <p>Có ai tới cứu bạn chưa</p>
                                        <div className="flex items-center mt-1 text-gray-600">
                                            <p className="text-xs">2h</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start my-2">
                                    <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                                    <div className="ml-2 bg-gray-100 p-2 rounded-lg">
                                        <p className="font-bold">Nguyễn Văn A</p>
                                        <p>Bạn hãy gọi cho cơ quan chức năng đi</p>
                                        <div className="flex items-center mt-1 text-gray-600">
                                            <p className="text-xs">4h</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start my-2">
                                    <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                                    <div className="ml-2 bg-gray-100 p-2 rounded-lg">
                                        <p className="font-bold">Nguyen Phuong Nhi</p>
                                        <p>Bạn có cần hỗ trợ không</p>
                                        <div className="flex items-center mt-1 text-gray-600">
                                            <p className="text-xs">3h</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex z-10 bottom-0 mt-4 items-center sticky bg-white">
                            <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                            <div className="flex flex-1 ml-2 p-2 border rounded-lg mx-2">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    rows={1}
                                    className="flex-1  outline-none resize-none overflow-y-auto"
                                    style={{ maxHeight: '100px' }}
                                    placeholder="Write a comment..."
                                />
                                <FontAwesomeIcon icon={faPaperPlane} size="lg"
                                    className="mx-2 text-blue-500 rounded-lg cursor-pointer hover:text-red-600" />
                            </div>
                        </div>
                    </div >
                ) : (
                    <Loading />
                )
            }
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
                            <p>{t("Thông tin địa chỉ")}</p>
                            <button onClick={() => setIsOpenStreetView(false)} className="self-end px-4 py-2 text-red-600 hover:text-red-800">
                                <FontAwesomeIcon icon={faClose} size="lg" />
                            </button>
                        </div>
                        {origin && destination && (
                            <Direction origin={origin} destination={destination} />
                        )}
                    </div>
                </Popup>
            )}
        </div >
    );
};

export default PostDetail;
