
const rootURL = "http://localhost:8080/account/"


const login = (info, usertype) => {

  console.log("login information:\n", info, "usertype:", usertype)

  //console.log(rootURL + "/account/" + usertype + "/login")
  return fetch(rootURL + usertype + "/login", 
    {
      method: 'POST',
      mode: "cors",
      headers: {
        'Accept': 'application/json,text/plain,*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
  }


  const signup = (info, usertype) => {
    
    console.log("sign up information:\n", info, "usertype:", usertype)

    return fetch(rootURL + usertype + "/register", 
      {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json,text/plain,*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      })
    }

    const getInstitutions = () => {

      return fetch(rootURL + "instructor/register", 
        {
          method: 'get',
          mode: "cors",
          headers: {
            'Accept': 'application/json,text/plain,*/*',
            'Content-Type': 'application/json'
          },
        })
      }

      const updateInstructorProfile = (info) => {
        return fetch(rootURL + "instructor/profile", 
          {
            method: 'POST',
            mode: "cors",
            headers: {
              'Accept': 'application/json,text/plain,*/*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
          })
        }

        const updateStudentProfile = (info) => {
          
          return fetch(rootURL + "student/profile", 
            {
              method: 'POST',
              mode: "cors",
              headers: {
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(info)
            })
          }
    

const AccountServices = {
  login,
  signup,
  getInstitutions,
  updateInstructorProfile,
  updateStudentProfile,
};

export default AccountServices

