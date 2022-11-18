import React from "react";
import RateBox from "../components/RateBox";

export default function RateInstitution(props) {
  console.log(localStorage.contractInfo);
  const [testvalue, setTestValue] = React.useState(null);
  const [criteria, setCriteria] = React.useState({
    overallRating: null,
    criterion1rating: null,
    criterion2rating: null,
    criterion3rating: null,
    criterion4rating: null,
    criterion5rating: null,
    criterion6rating: null,
  });

  return (
    <React.Fragment>
      {Object.entries(criteria).map(([key]) => {
        return <RateBox value={testvalue} setValue={setTestValue} setCriteria={setCriteria} key={key}/>
      })}
    </React.Fragment>
  );
}
