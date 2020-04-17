import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
import styled from 'styled-components';

import SymptomsSurveyPieChart from '../Charts/SymptomsSurveyPieChart';
import {
  DropDownContainer,
  DropDownHero,
  DropDownHeader,
} from '../../organisms/DropDownContainer';
import {
  groups,
  groupData,
  mergeObjectsByGroup,
  mapDataForCharts,
  getAllCities,
} from './utils';

const ChartWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
`;

const ChartContainer = styled.div`
  flex: 0 0 50%;
  margin-bottom: 1.5rem;
  h3 {
    margin: 0;
    text-transform: capitalize;
  }
`;

const SymptomsSurveyComponent = () => {
  const [rows, setRows] = useState(null);
  const [currentCity, setCity] = useState('Helsinki');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { OIRETUTKA_API } = getConfig().publicRuntimeConfig;
      const response = await fetch(OIRETUTKA_API);
      const { data, meta } = await response.json();

      setRows(data);
      setDescription(meta.description);
    };

    getData();
  }, []);

  const getSingleCityData = (items) =>
    items
      .filter((item) => {
        return item.city === currentCity;
      })
      .map((item, index) => {
        return item;
      })[0];

  const getDataByGroup = (items) => {
    return groupData(getSingleCityData(items));
  };

  const mergedDataByGroup = (data) => {
    const mergedData = getDataByGroup(data).reduce(
      (a, b) => a.concat(...b),
      []
    );

    return mergeObjectsByGroup(mergedData, 'group');
  };

  const handleCityChange = (city) => {
    setCity(city);
  };

  return (
    rows && (
      <div>
        <DropDownHeader description={description} />
        <DropDownContainer
          city={currentCity}
          handleCityChange={(event) => handleCityChange(event.target.value)}
          citiesList={getAllCities(rows)}
        />

        <DropDownHero rowData={getSingleCityData(rows)} />

        <ChartWrapper>
          {mapDataForCharts(mergedDataByGroup(rows))
            .map((item, index) => (
              <ChartContainer key={`city-level-chart-${index}`}>
                <h3>{groups[index].split('_').join(' ')}</h3>
                <SymptomsSurveyPieChart data={item} width='80%' />
              </ChartContainer>
            ))
            .reverse()}
        </ChartWrapper>
      </div>
    )
  );
};

export default SymptomsSurveyComponent;
