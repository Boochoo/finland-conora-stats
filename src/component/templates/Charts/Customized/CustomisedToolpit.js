import { Tooltip } from 'recharts';
import { themeColors } from '../../../organisms/Layout/Layout.style';

const CustomisedToolPit = (content) => (
  <Tooltip
    content={content ? content : null}
    contentStyle={{ backgroundColor: themeColors.black }}
    labelStyle={{
      color: themeColors.creamWhite,
      fontSize: '1.24rem',
      marginBottom: '0.5rem',
      fontWeight: '800',
    }}
    itemStyle={{ color: themeColors.creamWhite }}
  />
);

export default CustomisedToolPit;
