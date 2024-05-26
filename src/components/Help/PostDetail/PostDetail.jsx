import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faArrowDown,
    faArrowLeft,
    faArrowUp, faBackward, faClose,
    faComment, faDotCircle, faEarth,
    faEllipsis,
    faLocation,
    faLocationDot,
    faMapLocation,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown, Space, Image } from 'antd';


import avatar from '../../../assets/imgs/avatar.png';
import RequestService from "../../../services/RequestService";
import "./PostDetail.css";
import { Toastify } from "../../../toastify/Toastify";
import Loading from "../../Loading/Loading";
import { DownOutlined } from "@ant-design/icons";
import { faEdit, faMessage } from "@fortawesome/free-regular-svg-icons";
import Popup from "reactjs-popup";
import Direction from "../../Direction/Direction";

const PostDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { getRequestDetail } = RequestService();
    const [post, setPost] = useState(null);
    const [isOpenStreetView, setIsOpenStreetView] = useState(false);
    const [requestPlace, setRequestPlace] = useState({});

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

    const handleMessageClick = (event) => {
        event.stopPropagation();
        navigate('/message');
    };

    const items = [
        {
            key: '1',
            label: (
                <button onClick={handleMessageClick}>
                    Chỉnh sửa
                </button>
            ),
            icon: <FontAwesomeIcon icon={faEdit} color="red" />,
        },
        {
            key: '2',
            label: (
                <button onClick={handleMessageClick}>
                    Nhắn tin
                </button>
            ),
            icon: <FontAwesomeIcon icon={faMessage} color="red" />,
        },
        {
            key: '3',
            label: (
                <button onClick={(event) => handleStreetViewClick(event, post)}>
                    Xem vị trí
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


    const [upvoteClicked, setUpvoteClicked] = useState(false);
    const [downvoteClicked, setDownvoteClicked] = useState(false);
    const [voteCount, setVoteCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const { upvotePost, downvotePost } = RequestService();

    const handleUpvoteClick = async (event) => {
        event.stopPropagation();
        setLoading(true);
        try {
            // const newVoteCount = await upvotePost(item.id);
            // setVoteCount(newVoteCount);
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

    const handleDownvoteClick = async (event) => {
        event.stopPropagation();
        setLoading(true);
        try {
            // const newVoteCount = await downvotePost(item.id);
            // setVoteCount(newVoteCount);
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




    // useEffect(() => {
    //     const fetchPostDetail = async () => {
    //         const postDetail = await RequestService.getPostDetail(post.id);
    //         setVoteCount(postDetail.voteCount);
    //     };
    //     fetchPostDetail();
    // }, []);

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
                                <p className="font-medium text-base">Back</p>
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
                                                <p className="text-sm text-gray-600">20m</p>
                                                <FontAwesomeIcon icon={faEarth} className='text-slate-500 ml-2' />
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
                                            <FontAwesomeIcon icon={faEllipsis} size="lg" className='text-red-500 cursor-pointer' onClick={(e) => e.preventDefault()} />
                                        </Dropdown>


                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-start ml-2">
                                <p className="text-base mt-2">{post?.content}</p>
                                {post?.media?.length > 0 && (
                                    <div className="flex justify-start w-[1200px] flex-1 flex-wrap">
                                        {post?.media.map((media, index) => (
                                            <Image key={index} width={300} height={200} src={media.url} alt="Post" className="rounded-lg mt-4" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-start items-center mt-2 py-2 border-y">
                                <div className="flex rounded-2xl border border-slate-300">
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="hover:rounded-2xl hover:bg-slate-200 px-3 py-1"
                                            onClick={handleUpvoteClick}
                                            disabled={loading}
                                        >
                                            <FontAwesomeIcon
                                                icon={faAngleUp}
                                                color={upvoteClicked ? 'red' : 'black'}
                                                className="hover:text-red-500"
                                            />
                                        </button>
                                        <p className="mx-2">{voteCount}</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="hover:rounded-2xl hover:bg-slate-200 px-3 py-1"
                                            onClick={handleDownvoteClick}
                                            disabled={loading}
                                        >
                                            <FontAwesomeIcon
                                                icon={faAngleDown}
                                                color={downvoteClicked ? 'red' : 'black'}
                                                className="hover:text-red-500"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex mx-4 border rounded-2xl">
                                    <div className="flex justify-center items-center rounded-lg border-slate-300">
                                        <FontAwesomeIcon className='cursor-pointer px-2 py-2 hover:bg-slate-100 rounded-2xl'
                                            icon={faComment} color="red" size='sm' />
                                        <p className='mx-2'>15 comments</p>
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
                ) : (<Loading />)
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
                            <p>Chi tiết địa chỉ</p>
                            <button onClick={() => setIsOpenStreetView(false)} className="self-end px-4 py-2 text-red-600 hover:text-red-800">
                                <FontAwesomeIcon icon={faClose} size="lg" />
                            </button>
                        </div>
                        <Direction />
                    </div>
                </Popup>
            )}
        </div >
    );
};

export default PostDetail;
