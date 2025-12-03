package com.backend.service;

import com.backend.Entity.UserQuestion;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import reactor.core.publisher.Mono;

import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final SpringTemplateEngine templateEngine;
    private final WebClient mailerWebClient;

    @Value("${careloop.support.email:shawabhijit370@gmail.com}")
    private String supportEmail;

    @Value("${careloop.support.email2:sabyasachigorai496@gmail.com}")
    private String supportEmail2;

    @Value("${careloop.app.name:CareLoop}")
    private String appName;

    @Value("${spring.mail.username}")
    private String fromEmail; // keep same property - should be your verified MailerSend sender

    @Value("${mailersend.api.token}")
    private String mailerSendApiToken;

    /**
     * Send notification email to support team when new question is submitted
     */
    @Async
    public void sendNewQuestionNotification(UserQuestion question) {
        try {
            Context context = new Context();
            context.setVariable("questionId", question.getId());
            context.setVariable("userEmail", question.getEmail());
            context.setVariable("question", question.getQuestion());
            context.setVariable("submittedAt", question.getCreatedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")));
            context.setVariable("userIp", question.getUserIp() != null ? question.getUserIp() : "N/A");
            context.setVariable("appName", appName);

            String htmlContent = buildNewQuestionEmailHtml(context);
            String subject = String.format("[%s] New Question from %s", appName, question.getEmail());

            // recipients: supportEmail and supportEmail2 (if set)
            List<String> recipients = new ArrayList<>();
            recipients.add(supportEmail);
            if (supportEmail2 != null && !supportEmail2.isBlank() && !supportEmail2.equals(supportEmail)) {
                recipients.add(supportEmail2);
            }

            sendEmailViaMailerSend(recipients, subject, htmlContent)
                    .doOnSuccess(resp -> log.info("New question notification email sent successfully to {} for question ID: {}",
                            recipients, question.getId()))
                    .doOnError(err -> log.error("Failed to send new question notification email for question ID: {}",
                            question.getId(), err))
                    .subscribe();

        } catch (Exception e) {
            log.error("Failed to prepare new question notification email for question ID: {}", question.getId(), e);
        }
    }

    /**
     * Send confirmation email to user
     */
    @Async
    public void sendConfirmationToUser(UserQuestion question) {
        try {
            Context context = new Context();
            context.setVariable("appName", appName);
            context.setVariable("question", question.getQuestion());
            context.setVariable("submittedAt", question.getCreatedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")));

            String htmlContent = buildUserConfirmationEmailHtml(context);
            String subject = String.format("We received your question - %s", appName);

            sendEmailViaMailerSend(Collections.singletonList(question.getEmail()), subject, htmlContent)
                    .doOnSuccess(resp -> log.info("Confirmation email sent successfully to {} for question ID: {}", question.getEmail(), question.getId()))
                    .doOnError(err -> log.error("Failed to send confirmation email to user {} for question ID: {}", question.getEmail(), question.getId(), err))
                    .subscribe();

        } catch (Exception e) {
            log.error("Failed to prepare confirmation email to user {} for question ID: {}", question.getEmail(), question.getId(), e);
        }
    }

    /**
     * Internal helper: send email via MailerSend API.
     * Returns a Mono<String> with response body (or error).
     */
    private Mono<String> sendEmailViaMailerSend(List<String> toEmails, String subject, String htmlContent) {
        // Build "personalizations" structure expected by MailerSend
        // MailerSend expects: { "from": {"email": "...","name":"..."} , "to": [{"email":"..."}], "subject": "...", "html": "..."}
        Map<String, Object> payload = new LinkedHashMap<>();

        Map<String, String> from = new HashMap<>();
        from.put("email", fromEmail);
        from.put("name", appName);
        payload.put("from", from);

        List<Map<String, String>> to = new ArrayList<>();
        for (String r : toEmails) {
            Map<String, String> recipient = new HashMap<>();
            recipient.put("email", r);
            to.add(recipient);
        }
        payload.put("to", to);

        payload.put("subject", subject);
        payload.put("html", htmlContent);

        // Optionally: add plain text fallback
        payload.put("text", stripHtmlToPlainText(htmlContent));

        // headers or tags can be added if desired
        // payload.put("tags", Collections.singletonList("careloop"));

        return mailerWebClient.post()
                .uri("/v1/email")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + mailerSendApiToken)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(err -> log.error("MailerSend API request failed: {}", err.getMessage(), err));
    }

    // Simple html->text fallback (very small utility)
    private String stripHtmlToPlainText(String html) {
        return html.replaceAll("\\<.*?\\>", "")
                .replaceAll("&nbsp;", " ")
                .replaceAll("&amp;", "&")
                .replaceAll("\\s{2,}", " ")
                .trim();
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
