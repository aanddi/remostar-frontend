import { useParams } from 'react-router-dom';

import { Breadcrumb, Title } from '@components';

import { useObjectInfo } from '@common/api/services/objects';
import { formatStatusObject } from '@common/utils';

const ObjectStepInfo = () => {
  const { id, step } = useParams();

  const { data: object } = useObjectInfo(+id!);

  const itemsBreadcrumb = [
    {
      title: object?.name || 'Название',
      href: `/objects/${id}/dashboard`,
    },
    {
      title: 'Этапы работа и отчетность',
      href: `/objects/${id}/steps`,
    },
    {
      title: formatStatusObject(+step!),
    },
  ];

  return (
    <div className="container">
      <Breadcrumb items={itemsBreadcrumb} />
      <Title title={`Отчеты по этапу «${formatStatusObject(+step!)}»`} />
    </div>
  );
};

export default ObjectStepInfo;
