import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API Route for submitting exam
  app.post("/api/submit-exam", async (req, res) => {
    const { studentName, studentEmail, score, totalQuestions, detailedResults } = req.body;

    console.log(`Received submission from ${studentName} (${studentEmail}): ${score}/${totalQuestions}`);

    // Check for SMTP configuration in env
    let smtpHost = process.env.SMTP_HOST?.trim() || "";
    const smtpPort = process.env.SMTP_PORT?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const adminEmail = "assad2008wwe@gmail.com";

    // Aggressive sanitization of SMTP_HOST for common user typos
    if (smtpHost) {
      smtpHost = smtpHost.replace(/^[^a-zA-Z]+/, "").toLowerCase();
    }

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort) || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Format detailed results
        const resultsHtml = detailedResults.map((res: any, index: number) => `
          <div style="margin-bottom: 20px; padding: 15px; border-radius: 8px; border: 1px solid ${res.isCorrect ? '#d1fae5' : '#fee2e2'}; background: ${res.isCorrect ? '#f0fdf4' : '#fef2f2'};">
            <p style="margin: 0 0 8px 0; font-weight: bold;">Question ${index + 1}: ${res.question}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Chosen:</strong> <span style="color: ${res.isCorrect ? '#059669' : '#dc2626'};">${res.selectedAnswer}</span></p>
            ${!res.isCorrect ? `<p style="margin: 4px 0; font-size: 14px; color: #059669;"><strong>Correct Answer:</strong> ${res.correctAnswer}</p>` : ''}
          </div>
        `).join('');

        const info = await transporter.sendMail({
          from: `"Physiology Exam System" <${smtpUser}>`,
          to: adminEmail,
          subject: `Exam Result: ${studentName} (${score}/${totalQuestions})`,
          text: `
            Student Name: ${studentName}
            Student Email: ${studentEmail}
            Score: ${score} / ${totalQuestions}
            Percentage: ${((score / totalQuestions) * 100).toFixed(2)}%
          `,
          html: `
            <div style="font-family: sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
              <h2 style="color: #2563eb; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">Physiology Exam Result</h2>
              <p><strong>Student Name:</strong> ${studentName}</p>
              <p><strong>Student Email:</strong> ${studentEmail}</p>
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 18px;"><strong>Total Score:</strong> <span style="color: #059669;">${score} / ${totalQuestions}</span></p>
                <p style="margin: 4px 0 0 0;"><strong>Percentage:</strong> ${((score / totalQuestions) * 100).toFixed(2)}%</p>
              </div>
              
              <h3 style="color: #1e293b; margin-top: 32px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Detailed Review</h3>
              ${resultsHtml}
              
              <p style="color: #64748b; font-size: 12px; margin-top: 32px;">Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          `,
        });

        console.log("Message sent: %s", info.messageId);
        res.json({ success: true, message: "تم إرسال النتيجة بنجاح إلى البريد الإلكتروني." });
      } catch (error: any) {
        console.error("Error sending email:", error);
        res.status(500).json({ 
          success: false, 
          message: `فشل الإرسال: تأكد من صحة إعدادات SMTP وكلمة سر التطبيق. (Error: ${error.message})` 
        });
      }
    } else {
      console.warn("SMTP settings are missing in environment variables.");
      res.json({ 
        success: false, 
        message: "لم يتم الإرسال: يجب إضافة إعدادات SMTP (Host, User, Pass) في الـ Secrets الخاصة بـ AI Studio لإرسال الرسالة فعلياً." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
