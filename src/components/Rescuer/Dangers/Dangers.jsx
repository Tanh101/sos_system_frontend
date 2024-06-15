import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faLocationPin, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RequestService from '../../../services/RequestService';

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
        <div className='flex flex-col'>
            {dangers?.length > 0 && dangers.map((item, index) => (
                <div key={index}
                    className="flex flex-col bg-white hover:bg-slate-50 rounded-xl mx-5 mt-1 py-1 w-auto cursor-pointer"
                    onClick={() => handlePostClick(item)}>
                    <div className={`flex flex-col mb-3 shadow-md rounded-lg border m-2 p-4 bg-white`}>
                        <div className="flex justify-start items-center mt-4">
                            <FontAwesomeIcon icon={faLocationPin} color="red" />
                            <p className="text-[#F73334] ml-2">{item.addres}</p>
                        </div>
                        <div className="flex my-2">
                            <p>{item.message}</p>
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
