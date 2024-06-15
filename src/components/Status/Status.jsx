import React from 'react';
import { REQUEST_STATUS } from '../../constants/config';

const Status = ({ status }) => {
    let backgroundColor = '';
    let statusText = '';

    switch (status) {
        case REQUEST_STATUS.PENDING:
            backgroundColor = 'red';
            statusText = 'Pending';
            break;
        case REQUEST_STATUS.RESCUING:
            backgroundColor = '#4682B4';
            statusText = 'Rescuing';
            break;
        case REQUEST_STATUS.RESCUED:
            backgroundColor = '#008000';
            statusText = 'Rescued';
            break;
        case REQUEST_STATUS.REJECTED:
            backgroundColor = '#FF0000';
            statusText = 'Rejected';
            break;
    }

    return (
        <div className="flex shadow-md rounded-xl p-2" style={{ backgroundColor }}>
            <p className='text-sm font-bold text-white'>{statusText}</p>
        </div>
    );
};

export default Status;
