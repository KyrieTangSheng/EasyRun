import React from "react";
import ProfileImage from "./ProfileImage";
import ProfileNavigator from "./ProfileNavigator";
import ProfileContents from "./ProfileContents";

export default function Profile() {
  const [navigatorValue, setNavigatorValue] = React.useState(0);
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
