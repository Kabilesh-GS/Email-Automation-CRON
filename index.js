require("dotenv").config();
const { Client } = require("@notionhq/client");
const nodemailer = require("nodemailer");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getTasks() {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_DATABASE_ID,

      filter: {
        property: "Status",
        status: {
          equals: "Not started",
        },
      },
    });

    const tasks = response.results;
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

function generateHTML(tasks){
  let html = "<h1>Pending Tasks</h1><ul>";
  tasks.forEach((task) => {
    const props = task.properties;
    const title = props["Task"].title[0]?.plain_text || "Untitled";
    const priority = props["Priority"].select?.name || "No Priority";
    const due = props["Due Date"].date?.start || "No Due Date";

    html += `<li><strong>${title}</strong><br>Priority: ${priority}<br>Due: ${due}</li>`;
  });
  html += "</ul>";
  return html;
}

async function sendEmail(html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "📌 Tasks Completion Remainder",
    html,
  });

  console.log("✅ Email Sent Successfully");
}

async function main() {
  try {
    const tasks = await getTasks();

    console.log(`📌 Found ${tasks.length} tasks`);

    const html = generateHTML(tasks);

    await sendEmail(html);

  } catch (err) {
    console.error(err);
  }
}

main();