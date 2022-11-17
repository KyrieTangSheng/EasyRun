import React from "react";
import ProfileImage from "./ProfileImage";
import ProfileNavigator from "./ProfileNavigator";
import ProfileContents from "./ProfileContents";
import InstructorHomepageServices from "../services/instructorHomepage";
import StudentHomepageServices from "../services/studentHomepage";

export default function Profile() {
  const [navigatorValue, setNavigatorValue] = React.useState(0);

  React.useEffect(() => {
    if (localStorage.isLoggedIn && localStorage.userType === "instructor"){
      const instructorId = JSON.parse(localStorage.userInfo).id;
      InstructorHomepageServices.ViewInstitutionInfo(instructorId)
        .then((response) => response.json())
        .then((result) => {
          localStorage.setItem("institutionData", result.data)
        });
    }
    else if (localStorage.isLoggedIn && localStorage.userType === "student"){
      const studentId = JSON.parse(localStorage.userInfo).id;
      StudentHomepageServices.GetContract(studentId)
        .then((response) => response.json())
        .then((result) => {
          localStorage.setItem("contractData", result.data)
        });
    }
  }, []);

  if (localStorage.isLoggedIn) {
    let userType = localStorage.userType;
  
    return (
      <div>
        {/* profile image */}
        <ProfileImage />

        {/* profile navigator */}
        <ProfileNavigator
          navigatorValue={navigatorValue}
          setNavigatorValue={setNavigatorValue}
        />
        {/* profile content */}
        <ProfileContents navigatorValue={navigatorValue} userType={userType} />
      </div>
    );
  } else {
    window.location.href = "../login";
  }
}
