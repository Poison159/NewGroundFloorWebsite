import { Container, Typography, Paper, Divider } from "@mui/material";

export default function PrivacyPolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: "#1e1e1e",
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
          Terms of Service for SpotVibe
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3, color: 'rgba(255,255,255,0.5)' }}>
          Last Updated: 16 October 2025
        </Typography>

        <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 2, color: 'white' }}>
          1. Acceptance of Terms
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          By accessing and using SpotVibe ("the App"), you agree to be bound
          by these Terms of Service. If you do not agree to these terms,
          please do not use the App.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          2. User Content and Reviews
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
          2.1 Your Responsibilities
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          When posting reviews, ratings, or comments on the App, you agree to:
        </Typography>
        <Typography component="ul" sx={{ color: 'rgba(255,255,255,0.8)', pl: 3 }}>
          <li>Provide honest, accurate, and truthful information based on your personal experience</li>
          <li>Respect the rights and dignity of others</li>
          <li>Comply with all applicable laws and regulations</li>
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, mt: 2, color: 'rgba(255,255,255,0.9)' }}>
          2.2 Prohibited Content
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          You may not post content that:
        </Typography>
        <Typography component="ul" sx={{ color: 'rgba(255,255,255,0.8)', pl: 3 }}>
          <li>Is false, misleading, defamatory, or fraudulent</li>
          <li>Contains hate speech, threats, harassment, or bullying</li>
          <li>Is obscene, pornographic, or sexually explicit</li>
          <li>Violates intellectual property rights or confidential information</li>
          <li>Promotes illegal activities or violence</li>
          <li>Contains spam, advertising, or unsolicited promotional material</li>
          <li>Impersonates any person or entity</li>
          <li>Contains malicious code, viruses, or harmful software</li>
          <li>Discriminates based on race, religion, gender, sexual orientation, disability, or any protected characteristic</li>
          <li>Violates the privacy of others</li>
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          3. Content Moderation
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>3.1 Right to Review:</strong> We reserve the right to review, monitor, edit, or remove any user-generated content at our sole discretion, with or without notice.
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>3.2 No Obligation:</strong> We are not obligated to monitor content but may do so to ensure compliance with these Terms.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          4. Account Suspension and Termination
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>4.1 Violations:</strong> Your account may be temporarily suspended or permanently terminated if you:
        </Typography>
        <Typography component="ul" sx={{ color: 'rgba(255,255,255,0.8)', pl: 3 }}>
          <li>Violate any provision of these Terms of Service</li>
          <li>Post prohibited content as outlined in Section 2.2</li>
          <li>Receive multiple reports from other users</li>
          <li>Engage in fraudulent or abusive behavior</li>
          <li>Create multiple accounts to circumvent restrictions</li>
          <li>Harass or threaten other users or staff</li>
        </Typography>

        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>4.2 Warning System:</strong>
        </Typography>
        <Typography component="ul" sx={{ color: 'rgba(255,255,255,0.8)', pl: 3 }}>
          <li>First Violation: Written warning and content removal</li>
          <li>Second Violation: Temporary suspension (7-30 days)</li>
          <li>Third Violation: Permanent account termination</li>
          <li>Severe Violations: Immediate permanent ban without warning (e.g., illegal content, threats, hate speech)</li>
        </Typography>

        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>4.3 Appeal Process:</strong> If your account is suspended or terminated, you may appeal the decision by contacting us at info@groundfloor.africa within 14 days. We will review your appeal and respond within 7 business days.
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>4.4 Effect of Termination:</strong> Upon termination:
        </Typography>
        <Typography component="ul" sx={{ color: 'rgba(255,255,255,0.8)', pl: 3 }}>
          <li>Your access to the App will be immediately revoked</li>
          <li>Your content may be removed from the platform</li>
          <li>You forfeit any unused credits, subscriptions, or benefits</li>
          <li>You may not create new accounts without our express permission</li>
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          5. Content Ownership and License
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>5.1 Your Content:</strong> You retain ownership of the content you post. However, by posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute your content in connection with the App.
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>5.2 Our Content:</strong> All other content on the App, including text, graphics, logos, and software, is owned by us or our licensors and is protected by copyright and other intellectual property laws.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          6. Privacy
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Your use of the App is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          7. Disclaimers
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>7.1 User Content:</strong>
        </Typography>
        <Typography component="ul" sx={{ color: 'rgba(255,255,255,0.8)', pl: 3 }}>
          <li>User reviews and comments represent the opinions of individual users, not SpotVibe.</li>
          <li>We do not endorse or guarantee the accuracy of user-generated content.</li>
          <li>We are not responsible for disputes between users.</li>
        </Typography>

        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <strong>7.2 Service Availability:</strong> The App is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          8. Limitation of Liability
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          To the maximum extent permitted by law, SpotVibe shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the App.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          9. Reporting Violations
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          If you encounter content that violates these Terms, please report it through:
        </Typography>
        <Typography component="ul" sx={{ color: 'rgba(255,255,255,0.8)', pl: 3 }}>
          <li>In-app reporting feature</li>
          <li>Email: info@groundfloor.africa</li>
          <li>Include: specific content, location, and reason for report</li>
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          10. Changes to Terms
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          We may modify these Terms at any time. Continued use of the App after changes constitutes acceptance of the modified Terms. We will notify users of material changes via:
        </Typography>
        <Typography component="ul" sx={{ color: 'rgba(255,255,255,0.8)', pl: 3 }}>
          <li>In-app notifications</li>
          <li>Email notifications</li>
          <li>Posted notice on the App</li>
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          11. Governing Law
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          These Terms shall be governed by the laws of South Africa, without regard to conflict of law provisions.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          12. Contact Information
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          For questions about these Terms of Service, contact us at:
        </Typography>
        <Typography component="ul" sx={{ color: 'rgba(255,255,255,0.8)', pl: 3 }}>
          <li>Email: info@groundfloor.africa</li>
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          13. Severability
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3, color: 'white' }}>
          14. Entire Agreement
        </Typography>
        <Typography paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
          These Terms, together with our Privacy Policy, constitute the entire agreement between you and SpotVibe regarding use of the App.
        </Typography>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography paragraph sx={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>
          By using SpotVibe, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        </Typography>
      </Paper>
    </Container>
  );
}
