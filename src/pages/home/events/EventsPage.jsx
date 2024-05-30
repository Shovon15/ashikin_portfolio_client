
// import HeaderText from "../../../components/shared/textHeader/HeaderText";
import EventCard from "../../../components/card/event/EventCard";
import LoadingSkeleton from "../../../components/card/LoadingSkeleton";
import PageHelmet from "../../../helper/PageHelmet";

import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/DataContext";
import Pagination from "../../../components/pagination";

const EventsPage = () => {
  const { eventData, isEventLoading, fetchEventData } = useContext(DataContext);
  const [pageData, setPageData] = useState({});
  
  useEffect(() => {
    if (eventData) {
      setPageData(eventData.pagination);
    }
  }, [eventData]);

  const handlePageChange = (pageNumber) => {
    fetchEventData(pageNumber)
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const Loader = () => {
    return (
      <div className="flex flex-wrap gap-5 p-5 md:p-10">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  };
  return (
    <>
      <PageHelmet
        title="Ashikin Alam | programs"
        description="Embark on an inspiring journey with seminars, events, and motivational lectures. Elevate experiences, empower teams, ignite positive change."
        link={shareUrl}
        type="webapp"
      />

      <div className="page-container">

        {isEventLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap flex-grow gap-4 p-5 md:p-10">
            {eventData.data.length !== 0 ? (
              eventData.data.map((event) => (
                <EventCard key={event._id} eventData={event} />
              ))
            ) : (
              <div className="min-h-screen w-full flex justify-center items-center text-color-primary text-2xl">Coming Soon</div>
            )}
          </div>
        )}
        <Pagination
          paginationData={pageData}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default EventsPage;
