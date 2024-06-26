import React from 'react';
import { REQUEST_STATUS } from '../../constants/config';
import { useTranslation } from 'react-i18next';

const Status = ({ status }) => {
    const { t } = useTranslation();

    let backgroundColor = '';
    let statusText = '';

    switch (status) {
        case REQUEST_STATUS.PENDING:
            backgroundColor = 'red';
            statusText = 'Đang chờ';
            break;
        case REQUEST_STATUS.RESCUING:
            backgroundColor = '#4682B4';
            statusText = 'Đang cứu hộ';
            break;
        case REQUEST_STATUS.RESCUED:
            backgroundColor = '#008000';
            statusText = 'Đã cứu hộ';
            break;
        case REQUEST_STATUS.REJECTED:
            backgroundColor = '#FF0000';
            statusText = 'Đã từ chối';
            break;
    }

    return (
        <div className="flex shadow-md rounded-xl p-2" style={{ backgroundColor }}>
            <p className='text-sm font-bold text-white'>{t(statusText)}</p>
        </div>
    );
};

export default Status;
