import React from "react";
import SpecificPageSkeleton from "../layout/SpecificPageSkeleton";
import InfoCard from "../components/InfoCard";
import Program from "./Program";

export default function CurrentUniversity(props) {
  const universityName = props.Object ? props.Object.name : "all";

  const UniversityInfoCard = () => {
    return <InfoCard object={props.Object} cardType="university" />;
  };

  const ProgramTable = () => {
    return (
      <Program universityName={universityName} content={props.Content || []} />
    );
  };

  return (
    <SpecificPageSkeleton
      InfoCard={UniversityInfoCard}
      Table2={ProgramTable}
      type="university"
    />
  );
}
