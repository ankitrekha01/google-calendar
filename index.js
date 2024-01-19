const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { google } = require("googleapis");
const {getAllEvents,getExisitingMeets,getMeetings} = require("./meetings");

app.use(express.json());

const PORT = 5000 || process.env.PORT;

const calendar = google.calendar({
  version: "v3",
  auth: process.env.API_KEY,
});

let token = null;

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
// generate a url that asks permissions for Google Calendar scopes
const scopes = ["https://www.googleapis.com/auth/calendar"];

app.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
});

app.get("/google/redirect", async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  token = tokens;
  res.send("Its working");
});

app.get("/allevent", async (req, res) => {
  if (token) {
    oauth2Client.setCredentials(token);
    // console.log(allEvents);
    const events = await getAllEvents(calendar,oauth2Client);
    console.log(events);
    res.send("Working");
  }
});

app.get("/create-event", async (req, res) => {
  let { startTime, endTime, timezone, duration } = req.body;
  startTime = new Date(2024, 0, 19, 8, 0, 0);
  // endTime = new Date(startTime.getTime() + 1 * 60 * 30 * 1000);
  endTime =new Date(2024, 0, 19, 23, 0, 0);
  if (token) {
    oauth2Client.setCredentials(token);
    const event = await getAllEvents(calendar, oauth2Client);
    const existing = getExisitingMeets(event);
    console.log(existing);
    console.log(getMeetings(startTime,endTime,15,existing.existingStartTime,existing.existingEndTime));

    res.send('wrking');
  }
});

app.post("/fix-meeting",async(req,res)=>{
  const response = await calendar.events.insert({
    auth: oauth2Client,
    calendarId: "primary",
    requestBody: {
      summary: "test",
      description: "testing",
      start: {
        dateTime: new Date(startTime),
      },
      end: {
        dateTime: new Date(endTime),
      },
    },
  });
  res.send("Meeting made");
})

app.listen(PORT, () => {
  console.log(`Server is listening to PORT:${PORT}`);
});
