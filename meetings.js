const getAllEvents = async (calendar, oauth2Client) => {
  const allEvents = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date(2024, 0, 19, 8, 0, 0),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
    auth: oauth2Client,
  });
  // console.log(allEvents);
  return allEvents.data.items;
};

function convertToIST(date) {
  // Convert the date to IST (UTC+5:30)
  const istDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  return istDate;
}

function getExisitingMeets(events) {
  let existingStartTime = [];
  let existingEndTime = [];
  for (let i = 0; i < events.length; i++) {
    existingStartTime[i] = events[i].start.dateTime;
    existingEndTime[i] = events[i].end.dateTime;
  }
  return { existingStartTime, existingEndTime };
}

function getMeetings(
  startTime,
  endTime,
  duration,
  existingStartTimes,
  existingEndTimes
) {
  const meetings = [];

  let currentStartTime = new Date(startTime);
  const endTimeObj = new Date(endTime);

  while (currentStartTime <= endTimeObj) {
    // Check if the current interval conflicts with existing meetings
    const conflictExists = existingStartTimes.some(
      (existingStartTime, index) => {
        const existingEndTime = existingEndTimes[index];
        return (
          (currentStartTime >= existingStartTime &&
            currentStartTime < existingEndTime) ||
          (currentStartTime < existingStartTime &&
            existingStartTime < currentStartTime.getTime() + duration* 60000)
        );
      }
    );

    // If no conflict, add the meeting
    if (!conflictExists) {
      meetings.push(currentStartTime.toISOString());
    }

    // Move to the next interval
    currentStartTime = new Date(currentStartTime.getTime() + duration* 60000);
  }

  return meetings;
}

module.exports = { getAllEvents, getMeetings, getExisitingMeets };
