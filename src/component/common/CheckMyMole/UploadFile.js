import React, { useState } from 'react';
import { Upload, Alert, Button, notification } from 'antd';
import { TbCameraPlus } from 'react-icons/tb';
import { BsTrash } from 'react-icons/bs';
import { Storage } from 'aws-amplify'

const UploadFile = (props) => {

    const { setCurrent, current } = props;
    const [api, ContextHolder] = notification.useNotification();
    const [imgfile, setImgfile] = useState('');
    const [isDisable, setDisable] = useState(true);
    const [filelist, setFileList] = useState({});
    const [fileKey, setFileKey] = useState("");

    const onPhotoChange = (info) => {
        setImgfile(info);
    }
    const onDeleteImg = () => {
        setImgfile('');
        setDisable(true);
        Storage.remove(fileKey).then(result => console.log(result)).catch(err => console.log(err));
        window.localStorage.removeItem("fileName");
        setFileList([]);
    }

    const handlePhotoChange = () => {
        if (Object.keys(filelist).length) {
            setDisable(false);
            Storage.put('checkmyskin' + Date.now(), filelist, {
                contentType: filelist.type
            }).then(result => {
                setFileKey(result.key);
                window.localStorage.setItem("fileName", result.key);
            }).catch(err => console.log(err));
        }
    }

    return <React.Fragment>
        {ContextHolder}
        <div className='mb-4 upload-alert'><Alert showIcon type="warning" message="Please provide a high quality photo of your skin for diagnosis" /></div>
        {
            imgfile !== '' ? <div className='check-attach-photo-wrapper'>
                <img className='check-attach-photo-img' src={imgfile} alt="check-my-skin" />
                <div className='check-attach-photo-name'>{filelist.name}</div>
                <div onClick={onDeleteImg} className='check-attach-photo-remove-text'> <BsTrash /> Delete Image</div>
            </div> : <div className='check-attach-photo-wrapper'>
                <Upload className="upload-check" showUploadList={false} accept="image/*"
                    beforeUpload={file => {
                        if (file.type.includes("image")) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                onPhotoChange(reader.result)
                            };
                            reader.readAsDataURL(file);
                            setFileList(file)
                        } else {
                            api.error({
                                message: <label>Error</label>,
                                description: <label>{file.name} is not a image file.</label>
                            })
                        }
                        return false;
                    }} onChange={handlePhotoChange} >
                    <p className='ant-upload-drag-icon'><TbCameraPlus /></p>
                    <p className='ant-upload-text'>Click to browse or drag and drop your files</p>
                </Upload>
            </div>
        }

        <div className="steps-action mt-5 mb-5"><Button type="primary" size="large" variant="filled" onClick={e => { setCurrent(current + 1); window.scrollTo(0, 0); }} disabled={isDisable}>Continue</Button></div>
    </React.Fragment>
}

export default UploadFile;