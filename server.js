const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'teckleoutreach@gmail.com',
    pass: 'fywu ukqk wmlp lynb'
  }
});

app.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  const mailOptions = {
    from: 'teckleoutreach@gmail.com',
    to,
    subject,
    text: body
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});