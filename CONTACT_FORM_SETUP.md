# Contact Form Setup Instructions

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up with Kelly's email: `kelly.archambeault.running@gmail.com`
3. Verify the email address

### Step 2: Create Form Endpoint
1. Click "New Form" in Formspree dashboard
2. Set form name: "Kelly Athletics Contact Form"
3. Set email destination: `kelly.archambeault.running@gmail.com`
4. Copy the form endpoint URL (looks like: `https://formspree.io/f/xdkovnqg`)

### Step 3: Update Form Action
1. Open `contact.html`
2. Find line with: `action="https://formspree.io/f/xdkovnqg"`
3. Replace `xdkovnqg` with your actual form ID from step 2

### Step 4: Configure Formspree Settings (Recommended)
In your Formspree dashboard:
- ✅ Enable spam filtering
- ✅ Set custom thank you page (optional)
- ✅ Enable email notifications
- ✅ Add custom reply-to (optional)

## 🔒 Anti-Abuse Protection Features

### Client-Side Protection
- **Rate Limiting**: 5-minute cooldown between submissions
- **Honeypot Field**: Hidden field to catch bots
- **Spam Detection**: Keyword filtering and repetition checking
- **Time-Based Validation**: Minimum 10 seconds to fill form
- **Input Limits**: Maximum character limits on all fields
- **Content Filtering**: Blocks URLs and common spam phrases

### Formspree Built-in Protection
- **reCAPTCHA**: Automatic bot detection
- **Email Verification**: Validates email addresses
- **Spam Filtering**: AI-powered spam detection
- **Rate Limiting**: Server-side submission limits

## 📊 Free Tier Limits
- **50 submissions/month** (Formspree free tier)
- **Unlimited** form validations and interactions
- **No bandwidth limits** on the form itself

## 🔧 Customization Options

### To Change Rate Limit (currently 5 minutes):
```javascript
const cooldownPeriod = 5 * 60 * 1000; // Change "5" to desired minutes
```

### To Modify Spam Keywords:
Edit the `spamKeywords` array in `script.js`

### To Adjust Character Limits:
Update `maxlength` attributes in `contact.html`

## 🎯 Testing
1. Submit a test message after setup
2. Check Kelly's email for the submission
3. Verify anti-spam features work by:
   - Trying to submit twice quickly (should show rate limit)
   - Including URLs in message (should be blocked)

## 📧 Email Template
Messages will arrive formatted as:
```
From: [Name] <[Email]>
Subject: New Contact Form Submission - Kelly Athletics

Name: [Name]
Email: [Email]  
Phone: [Phone]
Organization: [School/Organization]
Position: [Position/Title]
Subject: [Subject Selection]

Message:
[Message Content]

Submitted: [Timestamp]
```

## 🚨 Important Notes
- Replace the form action URL with your actual Formspree endpoint
- The current form ID `xdkovnqg` is a placeholder
- Test thoroughly before going live
- Monitor submission volume to avoid hitting free tier limits

## 🔄 Fallback Option
If Formspree fails, the form will show an error with Kelly's direct email address for manual contact.