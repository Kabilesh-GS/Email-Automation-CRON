# Email Automation CRON

A Node.js CRON job that fetches data from Notion and sends automated emails using Nodemailer.

> 📄 For full details, refer to the project documentation <a target="_blank" href="https://drive.google.com/file/d/1KOXPc0gSQFuBOgQGqrSC2xHTj_n2BYf8/view?usp=sharing">PDF</a>.

---

## How It Works

```
Notion Database → CRON Job (index.js) → Nodemailer → Email Recipients
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js | Runtime |
| `node-cron` | Scheduled job |
| `@notionhq/client` | Fetch data from Notion |
| `nodemailer` | Send emails |
| `dotenv` | Environment config |
