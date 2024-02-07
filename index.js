require("./E-cartDB/config");
const express = require("express");
const cors = require("cors");
const User = require("./E-cartDB/User");
const app = express();
app.use(cors());

app.use(express.json());

app.post("/login", (req, resp) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const userData = {
          name: user.name,
          email: user.email,
          isLoggedIn: true
        };
        resp.json({ status: "success", userData });
      } else {
        resp.json({ status: "error", message: "Invalid password" });
      }
    } else {
      resp.json({ status: "error", message: "User not found" });
    }
  }).catch(err => {
    console.error("Error finding user:", err);
    resp.status(500).json({ status: "error", message: "Internal server error" });
  });
});


app.post("/signup", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  resp.send(result);
});

app.listen(5000);

//   console.log(req.body);
//   if (req.body.pasword && req.body.eamil) {
//     let user = await User.findOne(req.body).select("-password");
//     if (user) {
//       resp.send(user);
//     } else {
//       resp.send({ result: "No User Found" });
//     }
//   } else {
// app.post("/login", async (req, resp) => {
//     resp.send({ result: "No User Found" });
//   }
// });
