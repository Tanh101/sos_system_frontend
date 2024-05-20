import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowDown,
    faArrowUp, faClose,
    faComment, faEarth,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PropTypes from 'prop-types';

import avatar from '../../../assets/imgs/avatar.png';
import postImage from '../../../assets/imgs/image.png';
import RequestService from "../../../services/RequestService";
import "./PostDetail.css";
import { SPACE_CHARACTER } from "../../../constants/config";
import { Toastify } from "../../../toastify/Toastify";

const PostDetail = ({ close }) => {
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

    return (
        <div className='bg-white items-center justify-center text-sm rounded-lg p-3 shadow-lg w-full mx-auto relative'>
            <div className="flex justify-between items-center text-xl font-bold pb-4 border-b">
                <p>{`Ngoc Anh's Post`}</p>
                <FontAwesomeIcon icon={faClose} className='cursor-pointer text-gray-600 hover:text-red-600' onClick={close} />
            </div>
            <div className="flex flex-col overflow-y-auto">
                <div className="flex flex-col my-2">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center">
                            <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                            <div className="flex flex-col ml-2">
                                <p className="text-lg font-bold">{`Ngoc Anh's Post`}</p>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-600">20m</p>
                                    <FontAwesomeIcon icon={faEarth} className='text-slate-500 ml-2' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start ml-2">
                    <p className="text-base mt-2">Chúc mừng sinh nhật lần thứ 134 của Chủ tịch Hồ Chí Minh vĩ đại❤️</p>
                    <div className="flex justify-center w-full">
                        <img src={postImage} alt="Post" className="w-1/4 rounded-lg mt-4" />
                    </div>
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
                                    icon={faArrowUp}
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
                                    icon={faArrowDown}
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
                            <p>Xinh nhức cái nách nhức cái náchh</p>
                            <div className="flex items-center mt-1 text-gray-600">
                                <p className="text-xs">2h</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start my-2">
                        <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                        <div className="ml-2 bg-gray-100 p-2 rounded-lg">
                            <p className="font-bold">Cô Đại</p>
                            <p><img src="https://example.com/sticker.png" alt="Sticker" className="inline-block w-6 h-6" /></p>
                            <div className="flex items-center mt-1 text-gray-600">
                                <p className="text-xs">4h</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start my-2">
                        <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                        <div className="ml-2 bg-gray-100 p-2 rounded-lg">
                            <p className="font-bold">Nguyen Phuong Nhi</p>
                            <p>Lấy</p>
                            <div className="flex items-center mt-1 text-gray-600">
                                <p className="text-xs">3h</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start my-2">
                        <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                        <div className="ml-2 bg-gray-100 p-2 rounded-lg">
                            <p className="font-bold">Nguyen Phuong Nhi</p>
                            <p>Lấy</p>
                            <div className="flex items-center mt-1 text-gray-600">
                                <p className="text-xs">3h</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex mt-4 items-center">
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
        </div>
    );
};

PostDetail.propTypes = {
    close: PropTypes.func.isRequired,
};

export default PostDetail;
