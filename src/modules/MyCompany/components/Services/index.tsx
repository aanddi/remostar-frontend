import { Skeleton } from '@components';

import { ServiceItem } from '@common/components';

import { Empty, Flex } from 'antd';

import Actions from './components/Actions';
import CreateServices from './components/CreateServices';

import { IServicesProps } from './types';

const Services = ({ data, loading }: IServicesProps) => {
  return (
    <Flex style={{ width: '100%' }} vertical>
      <CreateServices />
      <Flex vertical>
        {loading &&
          // eslint-disable-next-line react/no-array-index-key
          Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} height="100px" />)}

        <Flex gap={16} vertical>
          {data?.map((item) => {
            return (
              <Flex vertical gap={8} style={{ marginTop: '16px' }}>
                <Actions serviceId={item.id} />
                <ServiceItem key={item.id} service={item} />
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      {!data?.length && !loading && <Empty description="Услуги не найдены" />}
    </Flex>
  );
};

export default Services;
