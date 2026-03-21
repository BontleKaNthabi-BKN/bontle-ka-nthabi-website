// app/server/utils/recaptcha.ts

import { createError } from 'h3';

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  'error-codes'?: string[];
}

/**
 * Verifies a reCAPTCHA token with Google's API
 * @param token The reCAPTCHA token to verify
 * @returns Promise<boolean> indicating if the token is valid
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  // Skip verification for dummy token used in development
  if (!token || token === 'dummy-token-for-development') {
    console.warn('Using dummy reCAPTCHA token or no token provided - skipping verification (development mode)');
    return true;
  }

  const config = useRuntimeConfig();
  const recaptchaSecretKey = config.recaptchaSecretKey;

  if (!recaptchaSecretKey) {
    console.warn('reCAPTCHA secret key is not configured in runtime config - skipping verification');
    return true; // Allow in development if not configured
  }

  try {
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const response: RecaptchaResponse = await $fetch(recaptchaVerifyUrl, {
      method: 'POST',
      body: new URLSearchParams({
        secret: recaptchaSecretKey,
        response: token
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.success || (response.score !== undefined && response.score < 0.5)) {
      console.error('reCAPTCHA verification failed', { 
        errors: response['error-codes'] || 'Low score',
        score: response.score
      });
      return false;
    }

    return true;
  } catch (error: any) {
    console.error('Error verifying reCAPTCHA', { error: error.message });
    return false;
  }
}