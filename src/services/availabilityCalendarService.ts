import baseRequest from "../_core/baseRequest";

const availabilityCalendarService = {
  getCounselorAvailability: params =>
    baseRequest.post("/availabilityCalendar/getCounselorAvailabilityCalendar", params),

  updateCounselorAvailability: params =>
    baseRequest.post("/availabilityCalendar/updateCounselorAvailability", params),

  getCounselorAvailabilityForClient: params =>
    baseRequest.post("/availabilityCalendar/getCounselorAvailabilityForClient", params)
};

export default availabilityCalendarService;
