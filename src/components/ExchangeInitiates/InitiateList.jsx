import InitiateItem from "./InitiateItem";
import { useSelector } from "react-redux";

const InitiateList = (props) => {
  const { myProfile } = useSelector((state) => state.profile);
  const renderInitiates = props.myInitiates.map((initiate) => {
    // Only render unrejected offers
    // if (initiatorData.offerStatus === "rejected") {
    //   return null;
    // }
    if (!myProfile) {
      return null;
    } else {
      return (
        <InitiateItem
          key={initiate._id}
          myProfile={myProfile}
          initiate={initiate}
          // exchangeId={offer._id}
          // key={initiatorData._id}
          // initiatorItemId={initiatorData._id}
          // initiatorUser={initiatorData.initiatorUser}
          // bookWanted={offer.bookWanted}
          // booksGiven={initiatorData.initiatorBooks}
          // initiatedAt={initiatorData.initiatedAt}
          // acceptedAt={initiatorData.acceptedAt}
          // offerStatus={initiatorData.offerStatus}
        />
      );
    }
  });

  return renderInitiates;
};

export default InitiateList;
