const rootURL = "http://localhost:8080/programs/"

const ListPrograms = (schoolName, programName) => {
  return fetch(rootURL + schoolName + "/" + programName, 
    {
      method: 'get',
      mode: "cors",
      headers: {
        'Accept': 'application/json,text/plain,*/*',
        'Content-Type': 'application/json'
      },
    })
  }

const ProgramServices = {
    ListPrograms,
    };
    
export default ProgramServices
      