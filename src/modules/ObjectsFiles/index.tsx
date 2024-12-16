import { useParams } from 'react-router-dom';

import { Breadcrumb, Title } from '@components';

const ObjectsFiles = () => {
  const { id } = useParams();

  const itemsBreadcrumb = [
    {
      title: 'Объект',
      href: `/objects/${id}/dashboard`,
    },
    {
      title: 'Файлы проекта',
    },
  ];

  return (
    <div className="container">
      <Breadcrumb items={itemsBreadcrumb} />
      <Title title="Файлы проекта" />
    </div>
  );
};

export default ObjectsFiles;
