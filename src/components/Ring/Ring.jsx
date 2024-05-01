import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

import FormRequest from "../Emergency/FormRequest/FormRequest";
import "./Ring.css";

const Ring = () => {
    return (
        <div className="wrapper flex items-center justify-center flex-col">
            <div className="flex flex-col justify-center items-center ml-3 flex-wrap w-[600px]">
                <p className="text-xl text-red-500">Bạn đang gặp nguy hiểm?
                    Hãy ấn nút bên dưới.
                </p>
                <p className="text-lg">
                    Chúng tôi sẽ liên lạc với bạn ngay lập tức.
                </p>
            </div>
            <Popup
                className="bg-white"
                trigger={
                    <button className="ring my-10 mt-48" onClick={() => { console.log('sos') }}>
                        <div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show flex justify-center items-center">
                            <div className="coccoc-alo-ph-circle"></div>
                            <div className="coccoc-alo-ph-circle-fill"></div>
                            <div className="coccoc-alo-ph-img-circle flex justify-center items-center">
                                <p className="text-white font-bold text-3xl font-roboto">SOS</p>
                            </div>
                        </div>
                    </button>
                }
                modal
                nested
                contentStyle={{ borderRadius: '10px' }} // Adjust the border radius value as needed
            >
                <div className='bg-white rounded-xl'>
                    <div className=''>
                        <FormRequest />
                    </div>
                </div>
            </Popup>
            <div className="flex justify-center ml-3 mt-3">
                <p className="font-semibold text-2xl">Emergency Request</p>
            </div>
        </div>
    );
}

export default Ring;
