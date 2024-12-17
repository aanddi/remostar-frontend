import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@components';

import { useUploadFile } from '@common/api/services/objects';

import { Flex, Typography, Upload, UploadProps } from 'antd';

const UploadFile = () => {
  const { id } = useParams();

  const [errorUpload, setErrorUpload] = useState<string>('');

  const { mutate: uploadFile, isPending } = useUploadFile(+id!);

  const handleUpload: UploadProps['onChange'] = ({ fileList }) => {
    setErrorUpload('');

    let newFileList = [...fileList];
    newFileList = newFileList.slice(-1);

    if (!newFileList[0].size) {
      setErrorUpload('Файл пуст. Пожалуйста, попробуйте загрузить другой файл');
      return;
    }

    const formData = new FormData();
    if (newFileList[0].originFileObj)
      formData.append('multipartFile', newFileList[0].originFileObj);
    uploadFile(formData);
  };

  return (
    <Flex vertical>
      <Upload
        name="file"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleUpload}
        className="uploadFile"
      >
        <Button
          type="primary"
          ghost
          size="large"
          icon={<UploadOutlined />}
          loading={isPending}
          style={{ width: '100%' }}
        >
          Загрузить файл
        </Button>
      </Upload>
      {errorUpload && (
        <Typography.Text style={{ paddingTop: '4px' }} type="danger">
          {errorUpload}
        </Typography.Text>
      )}
    </Flex>
  );
};

export default UploadFile;
