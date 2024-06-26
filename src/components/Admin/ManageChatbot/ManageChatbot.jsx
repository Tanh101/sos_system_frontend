import React from 'react'
import UploadFile from '../Upload/UploadFile'

const ManageChatbot = () => {
    return (
        <div className="flex flex-col flex-1 bg-white h-screen">
            <div className="flex flex-col justify-center items-center h-1/2">
            <div className="font-semibold text-base my-10">Upload file for chatbot saving and retrieval local data</div>
                <UploadFile />
            </div>
        </div>
    )
}

export default ManageChatbot
