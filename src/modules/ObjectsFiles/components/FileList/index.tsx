import { Skeleton } from '@components';

import { IFile } from '@common/api/services/objects';

import { Empty, Flex } from 'antd';

import FileCard from './components/FileCard';

import styles from './FileList.module.scss';

const FileList = ({ files, loading }: { files?: IFile[]; loading: boolean }) => {
  return (
    <div className={styles.wrapper}>
      <Flex vertical>
        <div className={styles.list}>
          {files?.map((file) => <FileCard key={file.id} file={file} />)}
          {loading &&
            // eslint-disable-next-line react/no-array-index-key
            Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} height="100px" />)}
        </div>
      </Flex>

      {!files?.length && !loading && <Empty description="Услуги не найдены" />}
    </div>
  );
};

export default FileList;
