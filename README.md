# Kelly Archambeault - Athletic Portfolio

A responsive website showcasing the athletic achievements and academic profile of Kelly Archambeault, a competitive cross country and track distance runner (Class of 2027).

## 🏃‍♀️ About

This website serves as an athletic portfolio for college recruitment, featuring:

- **Personal Records**: 800m (2:14.52), 1600m (5:08.61), 3200m (11:18.46), 5000m (19:19.30)
- **Academic Excellence**: 4.2 GPA
- **Leadership**: Team Captain for Cross Country, Track, and Basketball
- **State Recognition**: MSHSAA State medalist and qualifier

## 🌐 Website Features

- **Home**: Overview with personal records and recent achievements
- **Achievements**: Complete athletic accomplishments and race results
- **Academics**: Academic profile and qualifications
- **Gallery**: Competition photos and team moments
- **Resume**: Printable athletic resume for coaches
- **Contact**: Recruitment contact information

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Hosting**: Cloudflare Pages
- **Design**: Responsive, mobile-first design optimized for all devices
- **Performance**: Optimized images with responsive srcsets

## 📱 Responsive Design

The website is optimized for viewing across all devices:
- Mobile phones (iPhone/Android)
- Tablets
- Desktop/laptop screens

## 🚀 Deployment

Deployed using Cloudflare Pages with automatic deployments from the main branch.

## ✉️ Contact Form & Formspree Integration

The contact form on this website allows college recruiters and coaches to send direct inquiries to Kelly. It features real-time validation, anti-abuse protection, and a live character counter for the message field.

### How the Contact Form Works
- **Form Submission**: When a user submits the form, the data is sent securely to Formspree, a third-party email service.
- **Validation**: The form checks for required fields, valid email format, and message length before allowing submission.
- **Spam Protection**: Includes honeypot fields, rate limiting, and content filtering to prevent abuse.
- **Character Counter**: Displays the number of characters typed in the message field (max 2000).
- **Success/Error Feedback**: Users receive instant feedback on submission status.

### Formspree Dependency
- The contact form relies on [Formspree](https://formspree.io/) to deliver messages to Kelly's email address.
- **Formspree** is a secure, privacy-focused service for handling form submissions without server-side code.
- No backend or database is required; Formspree acts as the intermediary, forwarding form data to a verified email address.
- The form is configured with a unique Formspree project ID and requires email verification for activation.

#### Basic Formspree Info
- **Free Tier**: Limited submissions per month, suitable for personal/recruitment sites.
- **Setup**: Add a Formspree endpoint to your form's `action` attribute and verify your email.
- **Security**: Supports spam filtering, CAPTCHA, and encrypted submissions.
- **Docs**: See [Formspree Documentation](https://formspree.io/docs/) for details.

## 📁 Project Structure

```
├── index.html          # Homepage with key stats and achievements
├── achievements.html   # Complete athletic record
├── academics.html      # Academic profile
├── gallery.html        # Photo gallery
├── resume.html         # Printable athletic resume
├── contact.html        # Contact information
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── components.js   # Shared navigation and footer
├── imgs/               # Optimized athlete photos
├── assets/             # Logos and branding
└── wrangler.toml       # Cloudflare Pages configuration
```

## 🏆 Key Achievements

- MSHSAA Class 5 State 800m: 6th place (2:14.52 PR)
- MSHSAA Class 5 State 4x800: 2nd place (9:18.22)
- All-Conference Team member
- Multiple peer awards for outstanding performance

---

*This website is designed for college recruitment purposes and showcases academic and athletic achievements for coaches and recruiters.*