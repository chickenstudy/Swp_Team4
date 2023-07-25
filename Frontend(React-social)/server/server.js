const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let otpStorage = {};

app.post("/send-otp", (req, res) => {
  const { email } = req.body;

  // Tạo mã OTP ngẫu nhiên
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Lưu mã OTP vào bộ nhớ
  otpStorage[email] = otp;

  // Cấu hình transporter cho nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "gaphongdoa@gmail.com",
      pass: "kbinwwbnmllrfoop",
    },
  });

  // Cấu hình email
  const mailOptions = {
    from: "Cinema-system",
    to: email,
    subject: "Cinema System Team_4 Send OTP Confirmation",
    text: `Your OTP is: ${otp}`,
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  // Kiểm tra mã OTP
  if (otpStorage[email] && otpStorage[email] === otp) {
    // Xác nhận thành công
    delete otpStorage[email]; // Xóa mã OTP khỏi bộ nhớ
    res.send("OTP confirmed successfully");
  } else {
    // Xác nhận thất bại
    res.status(400).send("Invalid OTP");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
