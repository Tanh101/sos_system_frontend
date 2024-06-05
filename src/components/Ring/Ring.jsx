import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import FormRequest from "../Emergency/FormRequest/FormRequest";
import "./Ring.css";
import { UserMarkerPlaceProvider } from "../../Context/UserMarkerPlaceContext/UserMarkerPlaceContext";
import React, { useEffect, useState, useContext } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useTranslation } from "react-i18next";
import RequestService from "../../services/RequestService";
import { REQUEST_STATUS } from "../../constants/config";
import socketInstance from "../../utilities/socketInstance";
import { useDispatch, useSelector } from "react-redux";
import { removeEmergencyRequest } from "../../redux/action/emergencyAction";

const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Ring = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const emergencyRequests = useSelector(state => state.emergecy.emergencyRequests);

    const { emitWithToken } = socketInstance();

    const { updateRequestStatus, getRequests } = RequestService();


    const [open, setOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        if (emergencyRequests.length > 0) {
            setOpen(true);
            setOpenPopup(false);
        } else {
            setOpenPopup(true);
            setOpen(false);
        }
    };

    const handleUpdateStatus = async () => {
        const requestId = emergencyRequests[0].id;
        const response = await updateRequestStatus(requestId, REQUEST_STATUS.RESCUED);
        if (response) {
            emitWithToken("stopSharingLocation", { requestId: requestId });
            dispatch(removeEmergencyRequest())
            setOpenPopup(false);
        }
        setOpen(false);
    };

    return (
        <UserMarkerPlaceProvider>
            <div className="wrapper flex items-center justify-center flex-col">
                <div className="flex flex-col justify-center items-center ml-3 flex-wrap w-[600px]">
                    <p className="text-xl text-red-500">{t("Bạn đang gặp nguy hiểm? Hãy ấn nút bên dưới.")}</p>
                    <p className="text-lg">{t("Chúng tôi sẽ liên lạc với bạn ngay lập tức.")}</p>
                </div>
                <button className="ring my-10 mt-48" onClick={handleClickOpen}>
                    <div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show flex justify-center items-center">
                        <div className="coccoc-alo-ph-circle"></div>
                        <div className="coccoc-alo-ph-circle-fill"></div>
                        <div className="coccoc-alo-ph-img-circle flex justify-center items-center">
                            <p className="text-white font-bold text-3xl font-roboto">SOS</p>
                        </div>
                    </div>
                </button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{t("Xác nhận bạn đã được cứu hộ thành công")}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <span>{t("Bạn đang có một hỗ trợ khẩn cấp trong hệ thống.")}</span>
                            {t("Nếu chọn đồng ý hệ thống sẽ thay đổi trạng thái của bạn thành")}
                            <span className="text-red-600 font-bold">{t(" đã được cứu.")}</span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{t("Từ chối")}</Button>
                        <Button onClick={handleUpdateStatus}>{t("Đồng ý")}</Button>
                    </DialogActions>
                </Dialog>
                <Popup
                    open={openPopup}
                    onClose={() => setOpenPopup(false)}
                    modal
                    nested
                    contentStyle={{ borderRadius: '10px' }}
                >
                    <div>
                        <FormRequest isEmergency={true} />
                    </div>
                </Popup>
                <div className="flex justify-center ml-3 mt-3">
                    <p className="font-semibold text-lg text-red-600">{t("YÊU CẦU KHẨN CẤP")}</p>
                </div>
            </div>
        </UserMarkerPlaceProvider>
    );
};

export default Ring;
