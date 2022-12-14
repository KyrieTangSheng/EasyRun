const rootURL = "http://localhost:8080/homepage/instructor/";

const GetEnrolledStudents= (institutionId) => {
  return fetch(rootURL + "enrolledStudents/" + institutionId, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
}

const ViewInstitutionInfo= (institutionId) => {
  return fetch(rootURL + "institutionInfo/" + institutionId, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
}

const UpdateInstitutionInfo= (institutionInfo) => {
  return fetch(rootURL + "institutionInfo", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(institutionInfo)
  });
}

const SendContract = (contractInfo) => {
  return fetch(rootURL + "contract", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contractInfo)
  });
}

const InstructorHomepageServices = {
  GetEnrolledStudents,
  ViewInstitutionInfo,
  UpdateInstitutionInfo,
  SendContract
};

export default InstructorHomepageServices;