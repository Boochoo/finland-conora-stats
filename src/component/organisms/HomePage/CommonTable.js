import {
  TableHeader,
  TableWrapper,
  TableLayoutContainer
} from '../TableLayout/TableLayout';

export const CommonTable = props => {
  return (
    <TableWrapper tableSize={props.headers.length}>
      <TableHeader headTitle={props.headers} />
      <ul>
        {props.data.map((rec, index) => {
          return (
            props.districts[index] && (
              <TableLayoutContainer
                key={index}
                tableRows={[
                  props.districts[index][0] === 'null'
                    ? 'No details'
                    : props.districts[index][0],
                  props.districts[index][1],
                  props.parseDate(rec.date).slice(0, -7)
                ]}
              />
            )
          );
        })}
      </ul>
    </TableWrapper>
  );
};
