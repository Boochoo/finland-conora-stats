// import Layout from '../component/templates/Layout'
import styled from './Index.style';

const fetch = require('node-fetch');

const displayDate = date => new Date(date).toGMTString().slice(0, -7);

const getConfirmedByDate = data => 
data.reduce((prev, curr) =>  (prev[displayDate(curr.date)] = ++prev[displayDate(curr.date)] || 1, prev), {});

const getConfirmedByDistrict = data => 
data.reduce((prev, curr) =>  {
  let district = curr.healthCareDistrict;
  let location = district === 'HUS' ? 'Helsinki' : district;
  return (prev[location] = ++prev[location] || 1, prev);
}, {});

const getConfirmedBySource = data => 
data.reduce((prev, curr) =>  {
  let sources = curr.infectionSourceCountry;
  let source = sources ? sources : 'Unknown';
  return (prev[source] = ++prev[source] || 1, prev);
}, {});

const sortData = data => Object.entries(data).sort((a, b) => b[1] - a[1]);

const Index = ({ data }) => {
  const { confirmed, deaths, recovered } = data;
  
  const confirmedByDistrict = getConfirmedByDistrict(confirmed);
  const recoveredByDistrict = getConfirmedByDistrict(recovered);
  const confirmedBySource = getConfirmedBySource(confirmed);
  const sortedConfirmedByDistrict = sortData(confirmedByDistrict);
  const sortedConfirmedBySource = sortData(confirmedBySource);
  
  const confirmedByDate = getConfirmedByDate(confirmed);

  console.log(data)
  
  return (
    <div style={{margin: '2rem'}}>
    <h1>Finland Corona stats</h1>
    <p>Confirmed cases:<b> {confirmed.length}</b></p>
    <p>Recovered:<b> {recovered.length}</b></p>
    <p>Deaths:<b> {deaths.length}</b></p>
    
    <div>
    <h2>Recovered</h2>
    
    {
      recovered.map((rec, index) => {
        const district = rec.healthCareDistrict === 'HUS' ? 'Helsinki' : rec.healthCareDistrict;

        return (
        <div key={index}>
        {Object.entries(recoveredByDistrict)[index] && 
          <div>
          <p>{district}<b> : {Object.entries(recoveredByDistrict)[index][1]}</b></p> 
          <i>{displayDate(rec.date)}</i>
          </div>
        }
        </div>
        )
      })
      }
      </div>
      
      <div>
      <h2>Confirmed by cities</h2>
        {     
          sortedConfirmedByDistrict.map((item, index) => (
            <p key={index}>{item[0]} :<b> {item[1]}</b></p>
          ))
        }

        </div>
        <div>
        <h2>Confirmed by Date</h2>
        {    
          Object.entries(confirmedByDate).map((item, index) => (
            <p key={index}>{item[0]} :<b> {item[1]}</b></p>
          )).reverse()
        }
        </div>

        <div>
        <h2>Infection source by country</h2>
        {    
          sortedConfirmedBySource.map((item, index) => (
            <p key={index}>{item[0]} :<b> {item[1]}</b></p>
          ))
        }
        </div>

        <style jsx>{`
          h1, h2,h3, p {
            font-family: sans-serif;
          }
        `}
        </style>
    </div>
  );
};

export async function getServerSideProps() {
  const url = `https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData`
  const response = await fetch(url)
  const data = await response.json()
  
  return { props: { data } }
}

export default Index;
