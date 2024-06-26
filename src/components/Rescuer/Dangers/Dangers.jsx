import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faLocation, faLocationDot, faLocationPin, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RequestService from '../../../services/RequestService';
import { DANGER_STATUS } from '../../../constants/config';

const Dangers = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { getDangerByRescuer } = RequestService();
    const [dangers, setDangers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlePostClick = (item) => {
        navigate(`detail/${item.requestId}`);
    };

    useEffect(() => {
        const fetchDangers = async () => {
            setLoading(true);
            const response = await getDangerByRescuer();
            setDangers(response);
            setLoading(false);
        };

        fetchDangers();
    }, []);

    return (
        <div className='flex flex-col h-screen px-20'>
            {dangers?.length > 0 && dangers.map((item, index) => (
                <div key={index}
                    className="flex flex-col bg-white hover:bg-slate-50 rounded-xl mx-5 mt-1 py-1 w-auto cursor-pointer"
                    onClick={() => handlePostClick(item)}>
                    <div className={`flex mb-3 shadow-md rounded-lg border m-2 p-4 bg-white justify-between`}>
                        <div className="flex flex-col">
                            <div className="flex justify-start items-center mt-4">
                                <FontAwesomeIcon icon={faLocationDot} color="red" />
                                <p className="text-[#F73334] font-medium ml-2">{item.address}</p>
                            </div>
                            <div className="flex justify-start items-center">
                                <div className="flex my-2 justify-start items-center">
                                    <FontAwesomeIcon icon={faWarning} color="red" />
                                    <p className='ml-2 font-semibold text-lg'>{item.message}</p>
                                </div>
                                <div className="flex justify-start items-center ml-10">
                                    <FontAwesomeIcon icon={faCircleDot} color="red" size='xl' />
                                    <p className="text-black font-bold ml-2">{item.radius} m</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className={`flex w-20 rounded-xl p-2 justify-center items-center text-white 
                                ${item.status === DANGER_STATUS.ACTIVE ? 'bg-blue-600 ' : 'bg-red-500 '}`} >
                                <p className='text-sm font-bold '>{item.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {loading && <div className='flex justify-center items-center h-96'>
                <p className='text-2xl'>{t("Đang tải dữ liệu...")}</p>
            </div>}
        </div>
    );
};

export default Dangers;
