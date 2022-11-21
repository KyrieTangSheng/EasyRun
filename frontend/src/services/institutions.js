const rootURL = "http://localhost:8080/institutions/";

const ListInstitutions = (name) => {
  return fetch(rootURL + name, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
};

const RateIns = (rateInfo) => {
  return fetch(rootURL + "specificInstitution/rating", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rateInfo),
  });
};

const SpecificInstutionInfo = (institutionName, studentId) => {
  return fetch(rootURL + `specificInstitution/${institutionName}/${studentId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
}

const PostComment = (comment) => {
  return fetch(rootURL + "specificInstitution/comment", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};

const InstitutionServices = {
  ListInstitutions,
  RateIns,
  PostComment,
  SpecificInstutionInfo

};

export default InstitutionServices;
