import { useState } from "react";
import SidebarLayout from "../components/Layout";
import Card from "../components/Card";

const LandingPage = () => {
  const [applicationCounts] = useState({
    sent: 10,
    shortlisted: 5,
    shortlistedForInterview: 3,
    finalRoundInterview: 2,
    offerLetterConfirmed: 1,
  });

  return (
    // <SidebarLayout>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //     <Card title="Sent Applications" count={applicationCounts.sent} />
    //     <Card
    //       title="Shortlisted Applications"
    //       count={applicationCounts.shortlisted}
    //     />
    //     <Card
    //       title="Shortlisted For Interviews"
    //       count={applicationCounts.shortlistedForInterview}
    //     />
    //     <Card
    //       title="Final Round Interviews"
    //       count={applicationCounts.finalRoundInterview}
    //     />
    //     <Card
    //       title="Offer Letter Confirmed"
    //       count={applicationCounts.offerLetterConfirmed}
    //     />
    //   </div>
    // </SidebarLayout>
    <></>
  );
};

export default LandingPage;
