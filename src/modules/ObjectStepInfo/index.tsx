import { useParams } from 'react-router-dom';

import { Breadcrumb, Skeleton, Title } from '@components';

import { useGetReports, useObjectInfo } from '@common/api/services/objects';
import { useRoles } from '@common/hooks';
import { formatStatusObject } from '@common/utils';

import { Empty, Flex } from 'antd';

import CreateReport from './components/Create';
import ReportCard from './components/ReportCard';

const ObjectStepInfo = () => {
  const { id, step } = useParams();

  const { isEmployee } = useRoles();

  const { data: object } = useObjectInfo(+id!);

  const { data: reports, isLoading } = useGetReports(+id!, +step!);

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
      <Flex vertical gap={4} style={{ margin: '8px 0' }}>
        <Title title={`Отчеты по этапу «${formatStatusObject(+step!)}»`} />
        {isEmployee && <CreateReport />}
      </Flex>
      <Flex gap={16} vertical>
        {isLoading &&
          [...Array(3)].map((_, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <Skeleton key={index} width="100%" height="300px" />;
          })}
      </Flex>

      <Flex vertical style={{ marginTop: '16px' }} gap={32}>
        {reports?.map((report) => {
          return <ReportCard data={report} />;
        })}
      </Flex>

      {!reports?.length && !isLoading && <Empty description="Отчеты не найдены" />}
    </div>
  );
};

export default ObjectStepInfo;
