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

const ViewInstitutionInfo= (instructorId) => {
  return fetch(rootURL + "institutionInfo/" + instructorId, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
}

const InstructorHomepageServices = {
  GetEnrolledStudents,
  ViewInstitutionInfo,
};

export default InstructorHomepageServices;