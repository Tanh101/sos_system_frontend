import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: false,
    customRequest({ file, onSuccess, onError }) {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                onSuccess(response.data, file);
                message.success(`${file.name} file uploaded successfully.`);
            })
            .catch(error => {
                onError(error);
                message.error(`${file.name} file upload failed.`);
            });
    },
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const UploadFile = () => (
    <Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
            Support for a single file upload. Strictly prohibited from uploading company data or other
            banned files.
        </p>
    </Dragger>
);
export default UploadFile;
