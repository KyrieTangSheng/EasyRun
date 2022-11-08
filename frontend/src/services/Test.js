const testURL = "http://localhost:8080/account/student/register";

const rootURL = "http://localhost:8080"

const test = () => {

    const values = {
      email : "sienna@nyu.edu",
      userName : "Siennaaa",
      pwd : "abc1234",
      dob : "2000-03-18",
    }
    console.log(JSON.stringify(values))

    return fetch(testURL, 
      {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json,text/plain,*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(result => {
          setInfo(result.data)
          console.log(info)
          return(info)
      }).catch(function (e) {
        console.log('fetch fail', e);
      });
    }

const Authenticate = {
    test,
    login,
    signup,
    getInstitutions
    };
    
    export default Authenticate
      