import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faArrowLeft,
    faCheck,
    faClose,
    faComment,
    faEarth,
    faEllipsis,
    faLocationDot,
    faPaperPlane,
    faTrash,
    faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit, faMessage } from "@fortawesome/free-regular-svg-icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import { Dropdown, Image, message } from 'antd';
import { useTranslation } from "react-i18next";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

import "./PostDetail.css";
import avatar from '../../../assets/imgs/avatar.png';
import RequestService from "../../../services/RequestService";
import { Toastify } from "../../../toastify/Toastify";
import Loading from "../../Loading/Loading";
import Direction from "../../Direction/Direction";
import { REQUEST_STATUS, USER_ROLE, VOTE_TYPE } from "../../../constants/config";
import { formatHHmm } from "../../../utilities/formatDate";
import { UserContext } from "../../../Context/UserContext/UserContext";
import socketInstance, { socket } from '../../../utilities/socketInstance';
import Status from "../../Status/Status";
import UserDirection from "../../Direction/UserDirection/UserDirection";

const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PostDetail = () => {
    const navigate = useNavigate();
    const { emitWithToken } = socketInstance();

    const { id } = useParams();
    const { t } = useTranslation();

    const { getRequestDetail, vote, updateRequestStatus, isExistDangerInRequest, getDangerArea } = RequestService();

    const { user, location } = useContext(UserContext);

    const [post, setPost] = useState(null);
    const [isOpenStreetView, setIsOpenStreetView] = useState(false);
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [commentCount, setCommentCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [dangerInput, setDangerInput] = useState({
        radius: 0,
        message: ''
    });

    const [exitsDanger, setExitsDanger] = useState({});
    const [openEdit, setOpenEdit] = useState(false);

    const intervalRef = useRef(null);

    useEffect(() => {
        if (post) {
            setOrigin({
                lat: parseFloat(post.latitude),
                lng: parseFloat(post.longitude)
            });
        }
    }, [post]);

    useEffect(() => {
        if (post && socket) {
            const requestId = post.id;
            const rescuerId = post.rescuerId;

            const joinRoomAndListen = () => {
                emitWithToken('joinRequestRoom', { requestId: requestId });

                socket.on('locationUpdate', (data) => {
                    const location = {
                        lat: parseFloat(data.latitude),
                        lng: parseFloat(data.longitude)
                    };
                    setOrigin(location);
                });

                if (rescuerId && post.status !== REQUEST_STATUS.PENDING &&
                    post?.status !== REQUEST_STATUS.REJECTED) {
                    emitWithToken("getRescuerLocation", { rescuerId: rescuerId });
                    socket.on('returnRescuerLocation', (data) => {
                        const location = {
                            lat: parseFloat(data.latitude),
                            lng: parseFloat(data.longitude)
                        };

                        setDestination(location);
                    });
                }
            };

            const listenUpdateStatus = () => {
                emitWithToken('joinRequestDetailRoom', { requestId: requestId });

                socket.on('updatedStatus', (data) => {
                    setPost((prevPost) => ({
                        ...prevPost,
                        status: data.status
                    }));
                });
            };

            joinRoomAndListen();

            listenUpdateStatus();
        }

        return () => {
            clearInterval(intervalRef.current);
            socket.off('locationUpdate');
            socket.off('returnRescuerLocation');
            emitWithToken('leaveRequestRoom', { requestId: post?.id });
        };
    }, [post, socket]);

    const handleStreetViewClick = (event, item) => {
        event.stopPropagation();
        setIsOpenStreetView(true);
    }

    const handleMessageClick = (event) => {
        event.stopPropagation();
        navigate('/messages');
    };

    const handleUpdateStatus = async (status) => {
        try {
            const response = await updateRequestStatus(id, status);
            setPost((prevPost) => ({
                ...prevPost,
                status: response.status
            }));
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleSendWarning = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitDangerWarning = async () => {
        try {
            emitWithToken("createDangerArea", {
                requestId: id,
                radius: dangerInput.radius,
                message: dangerInput.message,
                latitude: post.latitude,
                longitude: post.longitude,
                address: post.address,
            });
            setOpen(false);
            message.success('Đã gửi cảnh báo');
            fetchExistDangerInRequest();
        } catch (error) {
            console.error('Failed to send danger warning:', error);
        }
    };

    const handleOpenUpdateDangerArea = () => {
        setOpenEdit(true);
    };

    const hanleUpdateDangerArea = async () => {
        try {
            const fetchExistDangerInRequest = async () => {
                try {
                    const response = await isExistDangerInRequest(id);
                    setExitsDanger(response);
                }
                catch (error) {
                    console.error('Failed to fetch exist danger in request:', error);
                }
            };

            emitWithToken("updateDangerArea", {
                requestId: id,
                radius: exitsDanger.radius,
                message: exitsDanger.message,
                latitude: post.latitude,
                longitude: post.longitude,
            });
            setOpenEdit(false);
            message.success('Đã sửa cảnh báo');
        } catch (error) {
            console.error('Failed to update danger warning:', error);
        }
    };

    const handleDeleteDangerArea = async () => {
        try {
            emitWithToken("deleteDangerArea", { requestId: id });
            setOpenEdit(false);
            message.success('Đã xóa cảnh báo');
        } catch (error) {
            console.error('Failed to delete danger warning:', error);
        }
    };

    const items = [
        ...(user.id === post?.userId ? [{
            key: '1',
            label: (
                <button className="text-base p-2" onClick={handleMessageClick}>
                    {t("Chỉnh sửa")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faEdit} style={{ fontSize: '16px', color: 'red' }} />,
        }] : []),
        ...(user.id !== post?.userId ? [{
            key: '2',
            label: (
                <button className="text-base p-2" onClick={handleMessageClick}>
                    {t("Nhắn tin")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faMessage} style={{ fontSize: '16px', color: 'red' }} />,
        }] : []),
        {
            key: '3',
            label: (
                <button className="text-base p-2" onClick={(event) => handleStreetViewClick(event, post)}>
                    {t("Xem vị trí")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: '16px', color: 'red' }} />,
        },
        ...(exitsDanger && user.role === USER_ROLE.RESCUER && exitsDanger?.rescuerId == user.id ? [{
            key: '4',
            label: (
                <button className="text-base p-2" onClick={handleOpenUpdateDangerArea}>
                    {t("Sửa cảnh báo nguy hiểm")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faEdit} style={{ fontSize: '16px', color: 'red' }} />,
        }] : []),
        ...(!exitsDanger && user.role === USER_ROLE.RESCUER ? [{
            key: '10',
            label: (
                <button className="text-base p-2" onClick={handleSendWarning}>
                    {t("Cảnh báo nguy hiểm")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faWarning} style={{ fontSize: '16px', color: 'red' }} />,
        }] : []),
        ...(user?.role === USER_ROLE.RESCUER && post?.status === REQUEST_STATUS.PENDING ? [{
            key: '5',
            label: (
                <button className="text-base p-2" onClick={() => { handleUpdateStatus(REQUEST_STATUS.RESCUING) }}>
                    {t("Xác nhận hỗ trợ")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faCheck} style={{ fontSize: '16px', color: 'red' }} />,
        }] : []),
        ...(user.role === USER_ROLE.USER && post?.status !== REQUEST_STATUS.RESCUED && user.id === post?.userId ? [{
            key: '6',
            label: (
                <button className="text-base p-2" onClick={() => { handleUpdateStatus(REQUEST_STATUS.RESCUED) }}>
                    {t("Xác nhận hoàn thành")}
                </button>
            ),
            icon: <FontAwesomeIcon icon={faCheck} style={{ fontSize: '16px', color: 'red' }} />,
        }] : []),
    ];

    const fetchExistDangerInRequest = async () => {
        try {
            const response = await isExistDangerInRequest(id);
            setExitsDanger(response);
        }
        catch (error) {
            console.error('Failed to fetch exist danger in request:', error);
        }
    };

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postData = await getRequestDetail(id);
                setPost(postData);
                setCommentCount(postData?.commentCount);
            } catch (error) {
                console.error('Failed to fetch post details:', error);
            }
        };

        fetchPostDetails();
        fetchExistDangerInRequest();
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

    const handleCommentClick = async () => {
        if (input) {
            try {
                emitWithToken("comment", { requestId: id, content: input });
                setCommentCount((prevCount) => prevCount + 1);
                setInput('');
            } catch (error) {
                console.error('Failed to create comment:', error);
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            emitWithToken("deleteComment", { commentId });

        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    useEffect(() => {
        emitWithToken("joinRequestDetailRoom", { requestId: id });
        socket.on("comment", (data) => {
            const { comment, commentCount } = data;
            setPost((prevPost) => ({
                ...prevPost,
                comments: [...prevPost.comments, comment]
            }));
            setCommentCount(commentCount);
        });

        socket.on("deleteComment", (data) => {
            const { commentCount, commentId } = data;
            setCommentCount(commentCount);
            setPost((prevPost) => ({
                ...prevPost,
                comments: prevPost.comments.filter((comment) => comment._id !== commentId)
            }));
        });

        socket.on("newVoteUpdate", (data) => {
            const { voteCount } = data;
            setPost((prevPost) => ({
                ...prevPost,
                voteCount: voteCount,
            }));
        });

        return () => {
            socket.off("comment");
            socket.off("deleteComment");
            socket.off("newVoteUpdate");
            emitWithToken("leaveRequestDetailRoom", { requestId: id });
        };
    }, [id]);

    return (
        <div>
            {
                post ? (
                    <div className='bg-white justify-center text-sm rounded-lg px-10 shadow-lg w-full flex flex-col' >
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
                                    <div className="flex">
                                        <div className="flex justify-center items-center">
                                            <img src={post?.user?.avatar ? post?.user?.avatar : avatar} alt="User Avatar" className="w-10 h-10 rounded-full" loading="lazy" />
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
                                        <div className="flex justify-center items-center mx-10">
                                            <Status status={post?.status} />
                                        </div>
                                    </div>
                                    <div className="flex font-medium">
                                        <Dropdown
                                            overlayStyle={{ fontSize: 'xl' }}
                                            menu={{
                                                items,
                                            }}
                                            placement="bottom"
                                        >
                                            <FontAwesomeIcon icon={faEllipsis} size="xl" className='text-red-500 cursor-pointer p-2'
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
                                {post.isEmergency ? (
                                    <div className="flex justify-start items-center my-4">
                                        <FontAwesomeIcon icon={faWarning} color="red" />
                                        <p className="text-[#F73334] ml-2 font-bold text-base">{t("Khẩn cấp")}</p>
                                    </div>
                                ) : null}
                                {post?.address && (
                                    <div className="flex items-center justify-center mt-2">
                                        <FontAwesomeIcon icon={faLocationDot} className="text-red-500" />
                                        <p className="text-base ml-2">{post?.address}</p>
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
                                        <p className='mx-2'>{commentCount} {t("comments")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 max-h-40">
                                {post?.comments.length > 0 && post?.comments?.map((comment, index) => {
                                    return (
                                        <div key={index} className="flex flex-col items-start my-2 px-4 w-1/2">
                                            <div className="flex items-start">
                                                <img src={comment.user.avatar ? comment.user.avatar : avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                                                <div className="flex">
                                                    <div className={`ml-2 p-4 text-base shadow-sm bg-gray-100 rounded-lg ${user.id === comment?.user?.id ? 'bg-blue-200' : ''}`}>
                                                        <p className="font-bold">{comment.user.name}</p>
                                                        <p>{comment.content}</p>
                                                        <div className="flex items-center mt-1 text-gray-600">
                                                            <p className="text-xs">{formatHHmm(comment.createdAt)}</p>
                                                        </div>
                                                    </div>
                                                    {comment.user.id === user.id && (
                                                        <div className="flex justify-end mx-2">
                                                            <button className="text-blue-500 hover:text-red-600"
                                                                onClick={() => { handleDeleteComment(comment._id) }}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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
                                <FontAwesomeIcon icon={faPaperPlane} size="lg" onClick={handleCommentClick}
                                    className="mx-2 text-blue-500 rounded-lg cursor-pointer hover:text-red-600" />
                            </div>
                        </div>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{t("Gửi cảnh báo cho người dùng")}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <label htmlFor="radius">
                                        {t("Nhập bán kính cảnh báo (m)")}
                                    </label>
                                    <input type="number" id="radius" className="border rounded-lg p-2 w-full my-2"
                                        value={dangerInput.radius} onChange={(e) => {
                                            setDangerInput((prevInput) => ({
                                                ...prevInput,
                                                radius: e.target.value
                                            }));
                                        }} />
                                    <label htmlFor="content">
                                        {t("Nội dung cảnh báo")}
                                    </label>
                                    <textarea id="content" className="border rounded-lg p-2 w-full my-2" value={dangerInput.message}
                                        onChange={(e) => {
                                            setDangerInput((prevInput) => ({
                                                ...prevInput,
                                                message: e.target.value
                                            }));
                                        }} />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>{t("Hủy")}</Button>
                                <Button onClick={submitDangerWarning}>{t("Gửi")}</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={openEdit}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <div className="flex justify-between px-10 items-center">
                                <DialogTitle>{t("Chỉnh sửa cảnh báo cho người dùng")}</DialogTitle>
                                <FontAwesomeIcon className="cursor-pointer hover:text-red-600" icon={faClose} size="lg" onClick={() => setOpenEdit(false)} />
                            </div>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <label htmlFor="radius">
                                        {t("Nhập bán kính cảnh báo (m)")}
                                    </label>
                                    <input type="number" id="radius" className="border rounded-lg p-2 w-full my-2"
                                        value={exitsDanger?.radius} onChange={(e) => {
                                            setExitsDanger((prevInput) => ({
                                                ...prevInput,
                                                radius: e.target.value
                                            }));
                                        }} />
                                    <label htmlFor="content">
                                        {t("Nội dung cảnh báo")}
                                    </label>
                                    <textarea id="content" className="border rounded-lg p-2 w-full my-2" value={exitsDanger?.message}
                                        onChange={(e) => {
                                            setExitsDanger((prevInput) => ({
                                                ...prevInput,
                                                message: e.target.value
                                            }));
                                        }} />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDeleteDangerArea}>{t("xóa")}</Button>
                                <Button onClick={hanleUpdateDangerArea}>{t("Sửa")}</Button>
                            </DialogActions>
                        </Dialog>
                    </div >
                ) : (
                    <Loading />
                )
            }
            {
                isOpenStreetView && (
                    <Popup
                        open={isOpenStreetView}
                        onClose={() => setIsOpenStreetView(false)}
                        modal
                        nested
                        contentStyle={{ borderRadius: '10px', width: '80%', height: '70%' }}
                    >
                        <div className="flex flex-1 flex-col items-center px-10">
                            <div className="flex justify-between items-center w-full mb-2">
                                <p className="font-bold text-red-600 text-xl">{t("Thông tin địa chỉ")}</p>
                                <button onClick={() => setIsOpenStreetView(false)} className="self-end px-4 py-2 text-red-600 hover:text-red-800">
                                    <FontAwesomeIcon icon={faClose} size="lg" />
                                </button>
                            </div>
                            {origin.lat && origin.lng && post.userId === user.id && post.status === REQUEST_STATUS.PENDING ? (
                                <div className="flex flex-1 w-full flex-col">
                                    <p className="font-bold my-1">{t("Vị trí của bạn")}</p>
                                    <UserDirection location={origin} address={post?.address} />
                                </div>
                            ) : (
                                origin.lat && origin.lng && destination.lat && destination.lng ? (
                                    <div className="flex flex-1 w-full flex-col">
                                        <p className="font-bold my-1">{t("Theo dõi cứu hộ (B) và người bị nạn (A)")}</p>
                                        <Direction origin={origin} destination={destination} />
                                    </div>
                                ) : (
                                    <div className="w-full flex flex-1 flex-col">
                                        <p className="font-bold my-1">{t("Theo dõi vị trí của bạn (B) và người bị nạn (A)")}</p>
                                        <Direction origin={origin} destination={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }} />
                                    </div>
                                )
                            )}

                        </div>
                    </Popup>
                )
            }
        </div >
    );
};

export default PostDetail;
