import { Table } from 'antd'
import React from 'react'
import Account from '../Account/Account'

const Dashboard = () => {
    return (
        <div className="flex flex-col flex-1  h-screen justify-start items-start w-full bg-slate-100">
            <div className="flex flex-col w-full bg-white m-5 p-5 px-10 rounded-lg shadow-sm mr-10">
                <p>
                    Dashboard
                </p>
                <div className="flex justify-between w-full">
                    <div className="flex">
                        <p>Bieu do cot</p>
                    </div>

                    <div className="flex">
                        Bieu do tron
                    </div>
                </div>

            </div>
            <div className="flex w-full flex-col bg-white m-5 p-5 px-10 rounded-lg shadow-md">
                <Account />
            </div>
        </div>
    )
}

export default Dashboard
