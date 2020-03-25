import {
  TableHeader,
  TableWrapper,
  TableLayoutContainer
} from '../TableLayout/TableLayout';

export const CommonTable = props => {
  return (
    <TableWrapper>
      <TableHeader headTitle={props.headers} />
      <ul>
        {props.data.map((rec, index) => {
          const district = rec.healthCareDistrict;
          return (
            props.districts[index] && (
              <TableLayoutContainer
                key={index}
                tableRows={[
                  district,
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
