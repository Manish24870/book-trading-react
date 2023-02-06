import OfferItem from "./OfferItem";

const OfferList = (props) => {
  const renderOffers = props.myOffers.map((offer) => {
    return offer.initiator.map((initiatorData) => {
      // Only render unrejected offers
      if (initiatorData.offerStatus === "rejected") {
        return null;
      }
      return (
        <OfferItem
          exchangeId={offer._id}
          key={initiatorData._id}
          initiatorItemId={initiatorData._id}
          initiatorUser={initiatorData.initiatorUser}
          bookWanted={offer.bookWanted}
          booksGiven={initiatorData.initiatorBooks}
          initiatedAt={initiatorData.initiatedAt}
          acceptedAt={initiatorData.acceptedAt}
          offerStatus={initiatorData.offerStatus}
        />
      );
    });
  });

  return renderOffers;
};

export default OfferList;
