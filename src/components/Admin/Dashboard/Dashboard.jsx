import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Gauge, gaugeClasses } from '@mui/x-charts';

import Account from '../Account/Account'
import statisticService from '../../../services/StatisticService';

const Dashboard = () => {
    const { t } = useTranslation();
    const { getStatistics } = statisticService();
    const [requestData, setRequestData] = useState({});

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await getStatistics();
                setRequestData(response);
            }
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const data = [
        { id: 0, value: requestData?.totalRequestPending, label: 'Đang chờ' },
        { id: 1, value: requestData?.totalRequestRecuing, label: 'Đang hỗ trợ' },
        { id: 2, value: requestData?.totalRequestRescued, label: 'Đã hỗ trợ' },
    ];

    return (
        <>
            {data ? (
                < div className="flex flex-col  h-screen justify-start items-start w-full pr-10 bg-slate-100 overflow-y-auto">
                    <div className="flex flex-col w-full bg-white m-5 p-5 px-10 rounded-lg shadow-sm mr-10">
                        <p className='font-bold'>
                            {t('Bảng điều khiển')}
                        </p>
                        <div className="flex">
                            <div className="flex justify-around p-2 w-full">
                                <div className="flex flex-col justify-start items-start bg-[#FFE2E5] rounded-2xl p-3">
                                    <div className="flex justify-center items-center">
                                        <div className="rounded-full px-2 py-2 bg-[#FA5A7D]">
                                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                                        </div>
                                        <p className='font-semibold text-base m-1'>{requestData?.totalUsers}</p>
                                    </div>
                                    <p className='opacity-60 text-sm'>{t("Tổng số người dùng")}</p>
                                </div>
                                <div className="flex flex-col justify-start items-start bg-[#FFF4DE] rounded-2xl p-4">
                                    <div className="flex">
                                        <div className="rounded-full px-2 py-1 bg-[#FF947A]">
                                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                                        </div>
                                        <p className='font-bold text-lg m-1'>{requestData?.totalRescuers}</p>
                                    </div>
                                    <p className='opacity-60 text-sm'>{t("Tổng số người cứu hộ")}</p>
                                </div>
                                <div className="flex flex-col justify-start items-start bg-[#DCFCE7] rounded-2xl p-4">
                                    <div className="flex">
                                        <div className="rounded-full px-2 py-1 bg-[#3CD856]">
                                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                                        </div>
                                        <p className='font-bold text-lg m-1'>{requestData?.totalRequests}</p>
                                    </div>
                                    <p className='opacity-60 text-sm'>{t("Tổng số yêu cầu")}</p>
                                </div>
                                <div className="flex flex-col justify-start items-start bg-[#F3E8FF] rounded-2xl p-4">
                                    <div className="flex">
                                        <div className="rounded-full px-2 py-1 bg-[#BF83FF]">
                                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                                        </div>
                                        <p className='font-bold text-lg m-1'>{requestData?.totalRequestRescued}</p>
                                    </div>
                                    <p className='opacity-60 text-sm'>{t("Tổng số yêu cầu đã hỗ trợ")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col items-start">
                                <p>{t("Thống kê yêu cầu")}</p>
                                <div className="flex justify-start items-start">
                                    <PieChart
                                        series={[
                                            {
                                                data,
                                                highlightScope: { faded: 'global', highlighted: 'item' },
                                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                            },
                                        ]}
                                        height={100}
                                        width={300}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-start">
                                <p>Tỉ lệ yêu cầu đã hỗ trợ</p>
                                <div className="flex w-full">
                                    <Gauge width={100} height={100} value={requestData?.totalRequestRescued} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex h-auto w-full flex-col bg-white mx-5 mb-16 p-3 px-10 rounded-lg shadow-md">
                        <Account />
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Dashboard
