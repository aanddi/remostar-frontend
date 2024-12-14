import { Skeleton } from '@components';

import { PortfolioCard } from '@common/components';

import { Empty, Flex } from 'antd';

import Actions from './components/Actions';
import CreatePortfolio from './components/CreatePortfolio';

import { IPortfolioProps } from './types';

const Portfolio = ({ data, loading }: IPortfolioProps) => {
  return (
    <Flex style={{ width: '100%' }} vertical>
      <CreatePortfolio />
      <Flex vertical>
        {loading &&
          // eslint-disable-next-line react/no-array-index-key
          Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} height="100px" />)}

        <Flex gap={16} vertical>
          {data?.map((item) => {
            return (
              <Flex vertical gap={8} style={{ marginTop: '16px' }}>
                <Actions portfolioId={item.id} />
                <PortfolioCard key={item.id} data={item} />
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      {!data?.length && !loading && <Empty description="Услуги не найдены" />}
    </Flex>
  );
};

export default Portfolio;
