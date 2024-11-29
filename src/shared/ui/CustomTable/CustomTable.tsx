'use client';
import { createContext, CSSProperties, FC, HTMLAttributes, useContext, useState } from 'react';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { Pagination, Table, Tag, TreeSelect } from 'antd';
import {
  DEFAULT_TABLE_PAGE_SIZE,
  IAvailableColumns,
  IColumn,
  ITableData,
  ITableParams,
} from '@/shared/ui/CustomTable/index';
import styles from './CustomTable.module.css';
import { usePathname, useRouter } from 'next/navigation';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { Empty } from '@/shared/ui/Empty';


interface props {
  baseColumns: IColumn[];
  availableColumns: IAvailableColumns[];
  data: ITableData;
  tableParams: ITableParams;

  setTableParams(data: ITableParams): void;

  saveColumns(columns: { table_columns: { dataIndex: string, hidden: boolean }[] }): void;

  getRecordLink(recordId: number): string;
}

interface HeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  id: string;
}

interface BodyCellProps extends HTMLAttributes<HTMLTableCellElement> {
  id: string;
}

interface DragIndexState {
  active: UniqueIdentifier;
  over: UniqueIdentifier | undefined;
  direction?: 'left' | 'right';
}

const DragIndexContext = createContext<DragIndexState>({ active: -1, over: -1 });

const dragActiveStyle = (dragState: DragIndexState, id: string) => {
  const { active, over, direction } = dragState;
  // drag active style
  let style: CSSProperties = {};
  if (active && active === id) {
    style = { backgroundColor: 'gray', opacity: 0.5 };
  }
  // dragover dashed style
  else if (over && id === over && active !== over) {
    style =
        direction === 'right'
            ? { borderRight: '1px dashed gray' }
            : { borderLeft: '1px dashed gray' };
  }
  return style;
};
const TableBodyCell: FC<BodyCellProps> = (props) => {
  const dragState = useContext<DragIndexState>(DragIndexContext);
  return <td {...props} style={{ ...props.style, ...dragActiveStyle(dragState, props.id) }} />;
};
const TableHeaderCell: FC<HeaderCellProps> = (props) => {
  const dragState = useContext(DragIndexContext);
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useSortable({ id: props.id });
  const style: CSSProperties = {
    ...props.style,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999, userSelect: 'none' } : {}),
    ...dragActiveStyle(dragState, props.id),
  };
  return <th {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const locale = {
  emptyText: <Empty />,
};

export function CustomTable({
  baseColumns,
  availableColumns,
  data,
  tableParams,
  saveColumns,
  setTableParams,
  getRecordLink,
}: props) {
  const [dragIndex, setDragIndex] = useState<DragIndexState>({ active: -1, over: -1 });
  const [columns, setColumns] = useState(() =>
    baseColumns.map((column, i) => ({
      ...column,
      key: column.dataIndex,
      id: i,
      onHeaderCell: () => ({ id: i }),
      onCell: () => ({ id: i }),
    })),
  );
  const [selectedColumns, setSelectedColumns] = useState(columns.map(column => {
    if (!column.hidden) {
      return column.dataIndex;
    }
  }));
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setColumns((prevState) => {
        const activeIndex = prevState.findIndex((i) => i.id === active?.id);
        const overIndex = prevState.findIndex((i) => i.id === over?.id);
        const newColumns = arrayMove(prevState, activeIndex, overIndex);
        saveColumns({
          table_columns: newColumns.map(column => ({
            dataIndex: column.dataIndex,
            hidden: !!column.hidden,
          })),
        });
        return newColumns;
      });
    }
    setDragIndex({ active: -1, over: -1 });
  };
  const onDragOver = ({ active, over }: DragOverEvent) => {
    const activeIndex = columns.findIndex((i) => i.id === active.id);
    const overIndex = columns.findIndex((i) => i.id === over?.id);
    setDragIndex({
      active: active.id,
      over: over?.id,
      direction: overIndex > activeIndex ? 'right' : 'left',
    });
  };
  const router = useRouter();
  const pathName = usePathname();
  const handlePaginationChange = (current: number,) => {
    router.push(pathName + (current == 1) ? '' : ('?page=' + current));
    setTableParams(
      {
        ...tableParams,
        currentPage: current,
      },
    );
  };
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sortParams: SorterResult<any> | SorterResult<any>[]
  ) => {
  setTableParams(
    {
      ...tableParams,
      filters: {
        ...tableParams.filters,
        ...filters,
      },
    sortParams: sortParams instanceof Array
      ? null
      : sortParams.order && sortParams.column?.dataIndex
        ? { columnKey: sortParams.column.dataIndex, order: sortParams.order, }
        : null,
      },
    );
  };
  const visibleColumns: IColumn[] = columns.map(item => ({
    ...item,
    hidden: !selectedColumns.includes(item.dataIndex),
  }));

  return (
      <div className={'flex flex-col'}>
        {/*<TreeSelect*/}
        {/*    className={styles.selector}*/}
        {/*    treeData={availableColumns}*/}
        {/*    value={selectedColumns}*/}
        {/*    tagRender={(props) => (*/}
        {/*        <Tag*/}
        {/*            closable={props.closable}*/}
        {/*            onClose={props.onClose}*/}
        {/*        >*/}
        {/*          {props.label}*/}
        {/*        </Tag>)}*/}
        {/*    onChange={(value) => {*/}
        {/*      setSelectedColumns(value);*/}
        {/*      saveColumns({*/}
        {/*        table_columns: columns.map(column => ({*/}
        {/*          dataIndex: column.dataIndex,*/}
        {/*          hidden: !value.includes(column.dataIndex),*/}
        {/*        })),*/}
        {/*      });*/}
        {/*    }}*/}
        {/*    showSearch={false}*/}
        {/*    treeCheckable={true}*/}
        {/*    variant={'outlined'}*/}
        {/*/>*/}
        <DndContext
            sensors={sensors}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            collisionDetection={closestCenter}
        >
          <SortableContext
            items={columns.map(i => i.id)}
            strategy={horizontalListSortingStrategy}
          >
            <DragIndexContext.Provider value={dragIndex}>
              <Table
                locale={locale}
                className={styles.table}
                columns={visibleColumns}
                rowKey={(record) => record.id}
                loading={data.isLoading}
                onRow={(record, index) => {
                  return {
                    onClick: () => {
                      router.push(getRecordLink(record.id));
                    },
                  };
                }}
                components={{
                  header: { cell: TableHeaderCell },
                  body: { cell: TableBodyCell },
                }}
                rowClassName={styles.tableRow}
                dataSource={data.data}
                pagination={false}
                onChange={handleTableChange}
                scroll={{ x: 900, y: 600 }}
                virtual={true}
                size={'middle'}
                bordered={false}
              />
            </DragIndexContext.Provider>
          </SortableContext>
          <DragOverlay>
            <th style={{ backgroundColor: 'gray', padding: 16 }}>
              {visibleColumns[visibleColumns.findIndex((i) => i.id === dragIndex.active)]?.title as React.ReactNode}
            </th>
          </DragOverlay>
        </DndContext>
        <Pagination
          className={styles.pagination}
          current={tableParams.currentPage}
          pageSize={DEFAULT_TABLE_PAGE_SIZE}
          total={data.total}
          onChange={handlePaginationChange}
          itemRender={(
              page,
              type,
              originalItem,
          ) => {
            if (type == 'prev' || type == 'next') {
              return (<div className={styles.paginationItemNav}>{originalItem}</div>);
            }
            if (page == tableParams.currentPage) {
              return (<span className={styles.paginationItemActive}>{originalItem}</span>);
            }
            return (<span className={styles.paginationItem}>{originalItem}</span>);
          }}
        />
      </div>
  );
}