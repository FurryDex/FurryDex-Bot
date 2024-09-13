const express = require("express");
const dotenv = require("dotenv");
//const fetch = import("node-fetch");
dotenv.config({ path: "../.env" });
const cors = require("cors");

const app = express();
const port = 10001;

const corsOptions = {
  origin: "*", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Allow express to parse JSON bodie
app.use(express.json());

app.post("/api/token", async (req, res) => {
  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: "1281952753404350468",
      client_secret: "UH0kNkDdIOZEalmDFJGPqsUvIPZgqCTt",
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = await response.json();
  // Return the access_token to our client as { access_token: "..."}
  res.send({ access_token });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
