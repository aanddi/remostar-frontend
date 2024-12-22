import { LoadingOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumb, Title } from '@components';

import { useObjectInfo } from '@common/api/services/objects';
import { useRoles } from '@common/hooks';

import { Flex, Steps } from 'antd';

import EditStatus from './EditStatus';

const ObjectSteps = () => {
  const { id } = useParams();

  const { isEmployee } = useRoles();

  const { data: object } = useObjectInfo(+id!);

  const itemsBreadcrumb = [
    {
      title: 'Объект',
      href: `/objects/${id}/dashboard`,
    },
    {
      title: 'Этапы работ и отчетность',
    },
  ];

  const items = [
    {
      title: 'Планирование ремонта',
      icon: object?.status === 1 && <LoadingOutlined />,
      description: (
        <Flex vertical>
          <div>Составление договора, закупка материалов, оборудования, подготовительные работы</div>
          {object?.status! >= 1 && <Link to={`/objects/${id}/steps/1`}>Отчеты</Link>}
        </Flex>
      ),
    },
    {
      title: 'Черновые работы',
      icon: object?.status === 2 && <LoadingOutlined />,
      description: (
        <Flex vertical>
          <div>Электропроводка, сантехника. Выравнивание стен, пола</div>
          {object?.status! >= 2 && <Link to={`/objects/${id}/steps/2`}>Отчеты</Link>}
        </Flex>
      ),
    },
    {
      title: 'Чистовая отделка',
      icon: object?.status === 3 && <LoadingOutlined />,
      description: (
        <Flex vertical>
          <div>
            Укладка плитки, покраска, оклейка стен обоями. <br /> Укладка напольного покрытия.
            Установка дверей, окон. Установка освещения и розеток. Установка сантехники и мебели
          </div>
          {object?.status! >= 3 && <Link to={`/objects/${id}/steps/3`}>Отчеты</Link>}
        </Flex>
      ),
    },
    {
      title: 'Завершающие работы',
      icon: object?.status === 4 && <LoadingOutlined />,
      description: (
        <Flex vertical>
          <div>Уборка помещений, расстановка мебели и аксессуаров. Подключение бытовой техники</div>
          {object?.status! >= 4 && <Link to={`/objects/${id}/steps/4`}>Отчеты</Link>}
        </Flex>
      ),
    },
    {
      title: 'Завершен',
      description: (
        <Flex vertical>
          {object?.status! >= 5 && <Link to={`/objects/${id}/steps/5`}>Результаты</Link>}
        </Flex>
      ),
    },
  ];

  return (
    <div className="container">
      <Breadcrumb items={itemsBreadcrumb} />
      <Flex align="center" justify="space-between">
        <Title title="Этапы работ и отчетность" />
        {isEmployee && <EditStatus objectId={+id!} currentStatus={object?.status} />}
      </Flex>
      <Steps
        status={object?.status === 5 ? 'finish' : 'process'}
        current={object?.status}
        labelPlacement="horizontal"
        direction="vertical"
        items={items}
      />
    </div>
  );
};

export default ObjectSteps;
