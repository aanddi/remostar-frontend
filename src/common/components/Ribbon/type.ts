import { ReactNode } from 'react';

import { DefaultOptionType } from 'antd/es/select';

interface IribbonProps {
  children: ReactNode;
  listCount?: number;
  classNameList?: string;
  pagination?: boolean;
  totalPage?: number;
  perPage?: number;
  sortOptions?: DefaultOptionType[];
}

export default IribbonProps;
