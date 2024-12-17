import { useParams } from 'react-router-dom';

import { Breadcrumb, Title } from '@components';

import { useListFiles } from '@common/api/services/objects';

import FileList from './components/FileList';
import UploadFile from './components/UploadFile';

const ObjectsFiles = () => {
  const { id } = useParams();

  const itemsBreadcrumb = [
    {
      title: 'Объект',
      href: `/objects/${id}/dashboard`,
    },
    {
      title: 'Файлы объекта',
    },
  ];

  const { data: files, isLoading } = useListFiles(+id!);

  return (
    <div className="container">
      <Breadcrumb items={itemsBreadcrumb} />
      <Title title="Файлы объекта" />
      <UploadFile />
      <FileList files={files} loading={isLoading} />
    </div>
  );
};

export default ObjectsFiles;
