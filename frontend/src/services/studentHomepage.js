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

const StudentHomepageServices = {
  ViewStarredPrograms,
};

export default StudentHomepageServices;