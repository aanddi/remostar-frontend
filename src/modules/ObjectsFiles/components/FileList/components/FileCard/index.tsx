import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';

import { IFile, useDownloadFile } from '@common/api/services/objects';
import { formatContentSize, formatDate } from '@common/utils';

import { Button } from 'antd';

import styles from './FileCard.module.scss';

const FileCard = ({ file }: { file: IFile }) => {
  const { mutate: downloadFile, isPending } = useDownloadFile();

  const handleDownloadFile = (fileId: number, fileName: string) => {
    downloadFile({ fileId, fileName });
  };

  return (
    <div className={styles.file} title={file.name}>
      <div className={styles.content}>
        <div className={styles.iconItem}>
          <FileTextOutlined className={styles.icon} />
        </div>
        <div className={styles.info}>
          <div className={styles.fileName}> {file.name}</div>
          <div className={styles.desc}>
            <span className={styles.contentSize}>{formatContentSize(file.size)}</span>
            <span>{formatDate(file.createdAt, 'DD.MM.YYYY HH:mm')}</span>
          </div>
        </div>
      </div>
      <Button
        size="large"
        type="text"
        loading={isPending}
        icon={<DownloadOutlined style={{ fontSize: '18px' }} />}
        onClick={() => handleDownloadFile(file.id, file.name)}
      />
    </div>
  );
};

export default FileCard;
