const rootURL = "http://localhost:8080/institutions/"

const ListInstitutions = (name) => {
    return fetch(rootURL + name, 
      {
        method: 'GET',
        mode: "cors",
        headers: {
          'Accept': 'application/json,text/plain,*/*',
          'Content-Type': 'application/json'
        },
      })
    }

const InstitutionServices = {
    ListInstitutions
    };
    
export default InstitutionServices