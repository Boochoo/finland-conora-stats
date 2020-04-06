import {
  TableHeader,
  TableWrapper,
  TableLayoutContainer
} from '../TableLayout/TableLayout';

export const ConfirmedByRegionTable = props => {
  return (
    <TableWrapper tableSize={props.headers.length}>
      <TableHeader headTitle={props.headers} />
      <ul>
        {props.data.map((item, index) => (
          <TableLayoutContainer
            key={index}
            tableRows={[
              item[0] && item[0] !== 'null' ? item[0] : 'No details',
              item[1]
            ]}
          />
        ))}
      </ul>
    </TableWrapper>
  );
};

export const CommonBottomTable = props => {
  return (
    <TableWrapper tableSize={props.headers.length}>
      <TableHeader headTitle={props.headers} />

      <ul>
        {props.data
          .map((item, index) => {
            const time = new Date(item[0]).toLocaleString().slice(0, -10);

            return (
              <TableLayoutContainer key={index} tableRows={[time, item[1]]} />
            );
          })
          .reverse()}
      </ul>
    </TableWrapper>
  );
};
