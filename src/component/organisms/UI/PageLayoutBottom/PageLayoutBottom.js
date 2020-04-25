import React from 'react';
import PropTypes from 'prop-types';

import LogarithmicLinearComponent from '../LogarithmicLinearComponent/';
import CommonLineChart from '../../../templates/Charts/CommonLineChart';

const PageLayoutBottom = ({
  children,
  isActive,
  linearLogHandler,
  data,
  isLinear,
}) => {
  return (
    <>
      <div className='hero-desktop'>{children}</div>

      <>
        <div>
          <LogarithmicLinearComponent
            isActive={isActive}
            linearLogHandler={linearLogHandler}
            buttons={['Linear', 'Logarithmic']}
          />
          <CommonLineChart
            data={data}
            isLinear={isLinear}
            xAxisName='name'
            dataKey='cases'
          />
        </div>
      </>
    </>
  );
};

PageLayoutBottom.propTypes = {
  children: PropTypes.object.isRequired,
  isActive: PropTypes.string,
  linearLogHandler: PropTypes.func,
  data: PropTypes.array,
  isLinear: PropTypes.bool,
};

export default PageLayoutBottom;
