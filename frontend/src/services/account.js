const rootURL = "http://localhost:8080/account/";

const login = (info, usertype) => {
  return fetch(rootURL + usertype + "/login", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
};

const signup = (info, usertype) => {
  return fetch(rootURL + usertype + "/register", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
};

const GETInstitutions = () => {
  return fetch(rootURL + "instructor/register", {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
};

const updateProfile = (info, usertype) => {
  return fetch(rootURL + usertype + "/profile", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
};

const AccountServices = {
  login,
  signup,
  GETInstitutions,
  updateProfile,
};

export default AccountServices;
