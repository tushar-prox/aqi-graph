import React from 'react';
import MUIDataTable, { TableBodyCell, TableBodyRow } from 'mui-datatables';

const columns = [
  { label: 'City', name: 'city' },
  { label: 'Current AQI', name: 'aqi' },
  { label: 'Last Updated', name: 'timestamp' },
];

const CustomFooter = () => <React.Fragment></React.Fragment>;

const customRow = (data, dataIndex, rowIndex) => {
  let style = {};
  switch (true) {
    case data[1] <= 50:
      style.backgroundColor = '#008000';
      break;
    case data[1] <= 100:
      style.backgroundColor = '#AAFF00';
      break;
    case data[1] <= 200:
      style.backgroundColor = '#DFFF00';
      break;
    case data[1] <= 300:
      style.backgroundColor = '#FA5F55';
      break;
    case data[1] <= 400:
      style.backgroundColor = '#FAA0A0';
      break;
    case data[1] <= 500:
      style.backgroundColor = '#FF2400';
      break;
    default:
      style.backgroundColor = 'white';
      break;
  }

  const renderTime = () => {
    let result;
    const currentTime = parseInt(new Date().getTime() / 1000);
    if (!data[2] || data[2] - currentTime <= 60) {
      result = 'A few seconds ago!';
    } else if (data[2] - currentTime <= 60) {
      console.log('checking date diff', data[2] - currentTime);
      result = `A minute ago!`; // && new Date(data[2]).toISOString().substr(11, 8);
    }
    return result;
  };
  return (
    <TableBodyRow options={rowOptions} style={style} key={`${data[0]}-${dataIndex}`}>
      <TableBodyCell options={cellOptions}>{data[0]}</TableBodyCell>
      <TableBodyCell options={cellOptions}>{data[1].toFixed(2)}</TableBodyCell>
      <TableBodyCell options={cellOptions}>{renderTime()}</TableBodyCell>
    </TableBodyRow>
  );
};

const rowOptions = {
  rowHover: false,
};

const cellOptions = {
  onCellClick: () => {},
};

const DataTable = ({ data }) => {
  return (
    <div className='table_wrapper'>
      {data?.length > 0 && (
        <MUIDataTable
          columns={columns}
          data={data}
          options={{
            download: false,
            filter: false,
            sort: false,
            viewColumns: false,
            count: data.length,
            rowHover: false,
            rowsPerPage: data.length,
            search: false,
            selectableRowsHeader: false,
            selectableRowsHideCheckboxes: true,
            print: false,
            customRowRender: customRow,
            customFooter: CustomFooter,
          }}
        />
      )}
    </div>
  );
};

export default DataTable;
