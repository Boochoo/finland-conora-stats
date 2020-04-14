import React, { useState, useEffect, useRef, Fragment } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import Papa from 'papaparse';

import { CityLevelBarChart } from '../Charts/Charts';
import {
  DropDownContainer,
  DropDownHero
} from '../../organisms/DropDownContainer/';

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

const CityLevelData = () => {
  const [rows, setRows] = useState(null);
  const [city, setCity] = useState('Helsinki');

  const initialRowData = items =>
    items
      .filter(item => {
        return item['Row Labels'] === city;
      })
      .map((item, index) => {
        return item;
      })[0];

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://interactive.hs.fi/arkku/files/26431963citylevel-opendata-3-4-2020.csv'
      );
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);

      const results = Papa.parse(csv, { header: true });
      const rows = results.data;

      setRows(rows);
    };

    getData();
  }, []);

  const filtetDataBygroup = (fData, group) => {
    return fData.find(item => {
      return item[props].includes(group[props]);
    });
  };

  const groups = [
    'fever',
    'cough',
    'breathing_difficulties',
    'muscle_pain',
    'headache',
    'sore_throat',
    'rhinitis',
    'stomach_issues',
    'sensory_issues',
    'longterm_medication',
    'smoking',
    'corona_suspicion'
  ];

  const groupData = items => {
    return [items].map((item, index) => {
      return Object.keys(item).map(key => {
        return groups
          .filter(group => {
            const excludeKeys = ['cough_fine', 'cough_impaired', 'cough_bad'];

            return !excludeKeys.includes(key) && key.includes(group);
          })
          .map(currEl => {
            return {
              group: currEl,
              [key]: Number(item[key])
            };
          });
      });
    });
  };

  const getAllCities = items =>
    items.map(item => {
      return item['Row Labels'];
    });

  const getDataProps = items => {
    return groupData(initialRowData(items));
  };

  const mergeObjectsByGroup = (array, property) => {
    const newArray = new Map();

    array.forEach(element => {
      const propertyValue = element[property];

      newArray.has(propertyValue)
        ? newArray.set(propertyValue, {
            ...element,
            ...newArray.get(propertyValue)
          })
        : newArray.set(propertyValue, element);
    });

    return Array.from(newArray.values());
  };

  const dataReducer = dataProp => {
    const merged = getDataProps(dataProp).reduce((a, b) => a.concat(...b), []);

    return mergeObjectsByGroup(merged, 'group');
  };

  const handleCityChange = city => {
    setCity(city);
  };

  const mapDataForCharts = data =>
    Object.values(data).map((item, i) => {
      const keys = Object.keys(item)
        .map((key, index) => {
          if (key === 'group') return;
          return {
            name: key,
            cases: Object.values(item)[index]
          };
        })
        .filter(el => el);

      return keys;
    });

  return (
    rows && (
      <div>
        <DropDownContainer
          city={city}
          handleCityChange={event => handleCityChange(event.target.value)}
          citiesList={getAllCities(rows)}
        />

        <DropDownHero rowData={initialRowData(rows)} />

        <ChartWrapper className='blah'>
          {mapDataForCharts(dataReducer(rows))
            .map((item, index) => (
              <ChartContainer key={`city-level-chart-${index}`}>
                <h3>{groups[index].split('_').join(' ')} </h3>
                <CityLevelBarChart data={item} width='80%' />
              </ChartContainer>
            ))
            .reverse()}
        </ChartWrapper>
      </div>
    )
  );
};

export default CityLevelData;
