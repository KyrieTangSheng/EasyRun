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

const InstitutionServices = {
  ListInstitutions,
  RateIns,
};

export default InstitutionServices;
