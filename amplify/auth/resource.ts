import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    // Add phone if you want SMS authentication
    // phone: true
  },
  userAttributes: {
    email: {
      required: true,
      mutable: true,
    },
  },
  // Configure email verification message
  emailSettings: {
    emailSubject: 'Calculator App - Verify your email',
  },
});
