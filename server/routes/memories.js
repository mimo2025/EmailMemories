const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

router.get('/', async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  oauth2Client.setCredentials(req.session.tokens);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const currentYear = today.getFullYear();
  const memories = [];

  for (let year = currentYear - 1; year >= currentYear - 10; year--) {
    const after = new Date(year, month - 1, day);
    const before = new Date(year, month - 1, day + 1);

    const afterTimestamp = Math.floor(after.getTime() / 1000);
    const beforeTimestamp = Math.floor(before.getTime() / 1000);

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: `in:anywhere after:${afterTimestamp} before:${beforeTimestamp}`,
      maxResults: 5,
    });

    const messages = response.data.messages || [];

    for (const message of messages) {
      const details = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'metadata',
        metadataHeaders: ['Subject', 'From', 'Date'],
      });

      const headers = details.data.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || '(no subject)';
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
      const date = headers.find(h => h.name === 'Date')?.value || '';

      console.log(`Found email: from=${from}, subject=${subject}`);

      const emailMatch = from.match(/<(.+)>/) || [null, from];
      const senderEmail = emailMatch[1].toLowerCase();
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'me.com'];
      const isRealPerson = personalDomains.some(domain => senderEmail.endsWith(domain));
      
      if (isRealPerson) {
        memories.push({ year, subject, from, date });
      }
    }
  }

  res.json({ memories });
});

module.exports = router;
