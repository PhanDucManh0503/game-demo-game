import React, { useEffect, useState } from 'react';
import useDebounce from '@hooks/useDebounce';
import type { TableProps } from 'antd';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import classNames from 'classnames/bind';
import type { ResizeCallbackData } from 'react-resizable';
import { Resizable } from 'react-resizable';

import LoadingApp from '../loading-app';
import styles from './table_app.module.scss';

const cx = classNames.bind(styles);

interface RecordType {}

interface ITableApp extends TableProps<RecordType> {
  dataSource: any[];
  columns: any[];
  pagination: any;
  tableId: string; // Create tableId use command npx uuid
  className?: any;
  loading?: boolean;
}

const RenderCellContent = React.memo(
  function Comp({ col, value, record, index }: any) {
    const renderContent = () => {
      if (col.render) {
        const renderedContent = col.render(value, record, index);

        if (Array.isArray(renderedContent)) {
          return renderedContent;
        }

        if (React.isValidElement(renderedContent)) {
          return (
            <div
              style={{
                minWidth: 30,
              }}
            >
              {renderedContent}
            </div>
          );
        } else {
          return (
            <Tooltip
              title={String(renderedContent)}
              overlayStyle={{ maxWidth: '500px' }}
            >
              <div className={cx('custom-cell')}>
                {String(renderedContent) || ''}
              </div>
            </Tooltip>
          );
        }
      } else {
        return (
          <Tooltip title={String(value)} overlayStyle={{ maxWidth: '500px' }}>
            <div className={cx('custom-cell')}>
              {value ? String(value) : ''}
            </div>
          </Tooltip>
        );
      }
    };

    return (
      <div
        className={cx('custom-cell')}
        style={{
          maxWidth: col.width === 0 ? undefined : col.width,
        }}
      >
        {renderContent()}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Add custom logic to determine whether re-render is necessary
    // This assumes that col, value, record, and index are primitive values or immutable objects
    return (
      prevProps.col === nextProps.col &&
      prevProps.value === nextProps.value &&
      prevProps.record === nextProps.record &&
      prevProps.index === nextProps.index
    );
  },
);

const ResizableTitle = (
  props: React.HTMLAttributes<any> & {
    onResize: (
      e: React.SyntheticEvent<Element>,
      data: ResizeCallbackData,
    ) => void;
    width: number;
  },
) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className={cx('react-resizable-handle', 'handle-item')}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          |
        </span>
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const renderMyColumns = (columns: any, tableId: string) => {
  columns[columns.length - 1].width = 0;

  const tableWidth: any = JSON.parse(
    localStorage.getItem('tableWidth') || '{}',
  );
  if (!tableWidth?.[tableId]) return columns;

  return columns.map((column: any) => ({
    ...column,
    width: tableWidth?.[tableId][column.dataIndex] || column.width,
  }));
};

const TableApp = ({
  dataSource,
  columns,
  pagination,
  className,
  tableId, // Create tableId use command npx uuid
  loading = false,
  ...props
}: ITableApp) => {
  const [myColumns, setMyColumns] = useState<ColumnsType<any>>(() =>
    renderMyColumns(columns, tableId),
  );

  const myColumnsDebounce = useDebounce(myColumns);

  const handleResize: Function =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      // minimum width = 30
      if (size.width <= 30) return;
      const newColumns = [...myColumns];

      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setMyColumns(newColumns);
    };

  const mergeColumns: ColumnsType<any> = myColumns.map((col, index) => {
    return {
      ...col,
      onHeaderCell: (column: ColumnsType<any>[number]) => {
        return {
          width: column.width === 0 ? undefined : column.width,
          onResize: handleResize(index) as React.ReactEventHandler<any>,
        };
      },
      render(value, record, index) {
        return (
          <RenderCellContent
            col={col}
            value={value}
            record={record}
            index={index}
          />
        );
      },
      title: (
        <div
          className={cx('custom-cell')}
          style={{
            maxWidth: col.width === 0 ? undefined : col.width,
          }}
        >
          {typeof col.title === 'string' ? (
            <Tooltip title={col.title}>{col.title}</Tooltip>
          ) : (
            (col.title as any)
          )}
        </div>
      ),
    };
  });

  useEffect(() => {
    setMyColumns(() => renderMyColumns(columns, tableId));
  }, [columns, tableId]);

  useEffect(() => {
    const result: any = {};

    myColumnsDebounce.forEach((item: any) => {
      result[item.dataIndex] = item.width;
    });

    const tableWidth: any = JSON.parse(
      localStorage.getItem('tableWidth') || '{}',
    );

    tableWidth[tableId] = result;

    localStorage.setItem('tableWidth', JSON.stringify(tableWidth));
  }, [myColumnsDebounce, tableId, columns]);

  return (
    <div className={cx('root', className?.split(' '))}>
      <Table
        dataSource={dataSource}
        columns={mergeColumns as any}
        pagination={pagination}
        className={cx(className?.split(' '))}
        components={{
          header: {
            cell: mergeColumns.length !== 1 ? ResizableTitle : undefined,
          },
        }}
        loading={{
          spinning: loading,
          indicator: (
            <LoadingApp heightBox={dataSource?.length === 1 ? 200 : 250} />
          ),
        }}
        {...props}
      />
    </div>
  );
};

export default TableApp;
