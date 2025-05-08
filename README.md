# Educational Newsletter Landing Page

This project implements a newsletter signup page with Zapier integration, analytics tracking, and dynamic content. It's built using React, TypeScript, and Tailwind CSS.

## Features

- **Newsletter Signup Form**: Captures user information (name, age, email)
- **Zapier Integration**: Automates form submission workflow
- **Google Analytics 4**: Tracks user interactions and form submissions
- **Dynamic Quote Widget**: Displays inspirational quotes from Quotable API
- **UTM Parameter Tracking**: Captures marketing attribution data

## Technical Implementation

### Zapier Automation

The form submission process is automated through Zapier:

1. Form data is sent to a Zapier webhook
2. Zapier workflow:
   - Stores submission in Google Sheets
   - Adds subscriber to email list
   - Sends welcome email
   - Logs submission in database

### API Integration

- **Quotable API**: Fetches and displays random inspirational quotes
- **Zapier Webhook**: Handles form submissions
- **Google Analytics**: Tracks user interactions

### Data Tracking

The application tracks:
- Newsletter signups
- Page views
- User interactions
- Marketing attribution (UTM parameters)

### Environment Setup

1. Replace placeholder values in `App.tsx`:
   - `GA4_MEASUREMENT_ID`: Your Google Analytics 4 measurement ID
   - `ZAPIER_WEBHOOK_URL`: Your Zapier webhook URL

2. Configure Zapier workflow:
   - Create a "Catch Hook" trigger
   - Add actions for email list, spreadsheet, etc.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Testing

1. Fill out the newsletter form
2. Check Zapier task history
3. Verify Google Analytics events
4. Confirm spreadsheet entries

## Deployment

1. Build the project: `npm run build`
2. Deploy to your preferred hosting platform
3. Update environment variables
4. Test all integrations in production

## Maintenance

- Monitor Zapier task usage
- Check Google Analytics for conversion tracking
- Update content and messaging as needed
- Maintain API integrations