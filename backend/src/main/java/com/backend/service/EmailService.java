package com.backend.service;

import com.backend.Entity.UserQuestion;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.format.DateTimeFormatter;


@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${careloop.support.email:shawabhijit370@gmail.com}")
    private String supportEmail;

    @Value("${careloop.support.email2:sabyasachigorai496@gmail.com}")
    private String supportEmail2;

    @Value("${careloop.app.name:CareLoop}")
    private String appName;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Send notification email to support team when new question is submitted
     */
    @Async
    public void sendNewQuestionNotification(UserQuestion question) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(supportEmail);
            helper.setSubject(String.format("[%s] New Question from %s", appName, question.getEmail()));

            // Create email context
            Context context = new Context();
            context.setVariable("questionId", question.getId());
            context.setVariable("userEmail", question.getEmail());
            context.setVariable("question", question.getQuestion());
            context.setVariable("submittedAt", question.getCreatedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")));
            context.setVariable("userIp", question.getUserIp() != null ? question.getUserIp() : "N/A");
            context.setVariable("appName", appName);

            // If you're using Thymeleaf templates (recommended)
            //String htmlContent = templateEngine.process("email/new-question", context);

            // For now, using simple HTML
            String htmlContent = buildNewQuestionEmailHtml(context);

            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("New question notification email sent successfully to {} for question ID: {}",
                    supportEmail, question.getId());

            mailSender.send(message);
            log.info("New question notification email sent successfully to {} for question ID: {}",
                    supportEmail2, question.getId());

        } catch (MessagingException e) {
            log.error("Failed to send new question notification email for question ID: {}",
                    question.getId(), e);
        }
    }

    /**
     * Send confirmation email to user
     */
    @Async
    public void sendConfirmationToUser(UserQuestion question) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(question.getEmail());
            helper.setSubject(String.format("We received your question - %s", appName));

            Context context = new Context();
            context.setVariable("appName", appName);
            context.setVariable("question", question.getQuestion());
            context.setVariable("submittedAt", question.getCreatedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")));

            String htmlContent = buildUserConfirmationEmailHtml(context);

            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Confirmation email sent successfully to {} for question ID: {}",
                    question.getEmail(), question.getId());

        } catch (MessagingException e) {
            log.error("Failed to send confirmation email to user {} for question ID: {}",
                    question.getEmail(), question.getId(), e);
        }
    }

    /**
     * Build HTML email for new question notification to support team
     */
    private String buildNewQuestionEmailHtml(Context context) {
        return String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); 
                              color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .question-box { background: white; padding: 20px; border-left: 4px solid #667eea; 
                                    margin: 20px 0; border-radius: 5px; }
                    .info-row { margin: 10px 0; }
                    .label { font-weight: bold; color: #667eea; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                    .button { background: #667eea; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block; 
                              margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔔 New Question Received!</h1>
                    </div>
                    <div class="content">
                        <p>A new question has been submitted through the %s FAQ system.</p>
                        
                        <div class="question-box">
                            <h3 style="margin-top: 0; color: #667eea;">Question Details</h3>
                            <div class="info-row">
                                <span class="label">Question ID:</span> #%s
                            </div>
                            <div class="info-row">
                                <span class="label">From:</span> %s
                            </div>
                            <div class="info-row">
                                <span class="label">Submitted:</span> %s
                            </div>
                            <div class="info-row">
                                <span class="label">IP Address:</span> %s
                            </div>
                            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                            <div style="margin-top: 15px;">
                                <span class="label">Question:</span>
                                <p style="margin-top: 10px; font-size: 15px; line-height: 1.8;">%s</p>
                            </div>
                        </div>
                        
                        <p style="margin-top: 20px;">
                            <strong>⏰ Action Required:</strong> Please review and respond to this question 
                            at your earliest convenience. The user is expecting a response.
                        </p>
                        
                        <center>
                            <a href="#" class="button">View in Admin Dashboard</a>
                        </center>
                        
                        <div class="footer">
                            <p>This is an automated notification from %s FAQ System</p>
                            <p>Please do not reply to this email directly.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """,
                context.getVariable("appName"),
                context.getVariable("questionId"),
                context.getVariable("userEmail"),
                context.getVariable("submittedAt"),
                context.getVariable("userIp"),
                context.getVariable("question"),
                context.getVariable("appName")
        );
    }

    /**
     * Build HTML email for user confirmation
     */
    private String buildUserConfirmationEmailHtml(Context context) {
        return String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); 
                              color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .checkmark { font-size: 48px; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="checkmark">✅</div>
                        <h1>Question Received!</h1>
                    </div>
                    <div class="content">
                        <p>Hi there,</p>
                        
                        <p>Thank you for reaching out to %s! We've received your question and our team 
                           will review it shortly.</p>
                        
                        <div style="background: white; padding: 20px; border-left: 4px solid #667eea; 
                                    margin: 20px 0; border-radius: 5px;">
                            <p><strong>Your Question:</strong></p>
                            <p style="font-size: 15px; line-height: 1.8; color: #555;">%s</p>
                            <p style="margin-top: 15px; font-size: 13px; color: #999;">
                                Submitted on: %s
                            </p>
                        </div>
                        
                        <p><strong>What happens next?</strong></p>
                        <ul>
                            <li>Our team will review your question within 24-48 hours</li>
                            <li>You'll receive a personalized response via email</li>
                            <li>For urgent matters, please contact us directly</li>
                        </ul>
                        
                        <p>In the meantime, you can check out our FAQ section for quick answers to common questions.</p>
                        
                        <div class="footer">
                            <p><strong>%s - Your AI-Driven Healthcare Ecosystem</strong></p>
                            <p>One platform where people can access care, medicine, and human help — effortlessly.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """,
                context.getVariable("appName"),
                context.getVariable("question"),
                context.getVariable("submittedAt"),
                context.getVariable("appName")
        );
    }
}
