import { FilterValue } from 'antd/es/table/interface';
import { DataIndex } from 'rc-table/es/interface';

export interface ITableParams {
  currentPage: number,
  filters: Record<string, FilterValue | null>,
  sortParams: { columnKey: DataIndex, order: 'ascend' | 'descend' } | null
}