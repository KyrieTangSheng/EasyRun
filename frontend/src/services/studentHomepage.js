const rootURL = "http://localhost:8080/homepage/student/";

const ViewStarredPrograms= (studentId) => {
  return fetch(rootURL + "stars/" + studentId, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
}

const GetContract = (studentId) => {
  return fetch(rootURL + "viewContract/" + studentId, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
}

const ChangeContractStatus = (contractInfo) => {
  return fetch(rootURL + "viewContract/", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contractInfo)
  });
}

const StudentHomepageServices = {
  ViewStarredPrograms,
  GetContract,
  ChangeContractStatus
};

export default StudentHomepageServices;