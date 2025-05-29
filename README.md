This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Unauthorized Access & Route Protection

This app uses Next.js middleware to protect routes that require authentication. If a user tries to access a protected route (such as creating, updating, or deleting an event) without being logged in, they are redirected to the `/unauthorized` page. This page provides a clear message and a button to return to the login page.

## Form Validation

Event creation and update forms include validation to ensure all required fields are filled out and valid. Users receive clear feedback if any information is missing or incorrect.

## Marking Criteria
- **Authentication:** Only logged-in users can create, update, or delete events. Unauthorized users are redirected.
- **UI/UX:** The app provides clear feedback for unauthorized access and form errors. The UI is accessible and user-friendly.
- **Code Quality:** Route protection and validation logic are clearly commented and structured for maintainability.
