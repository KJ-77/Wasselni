import { WebStorageStateStore } from 'oidc-client-ts';

/**
 * OIDC Configuration for AWS Cognito
 *
 * This config tells react-oidc-context how to communicate with your Cognito User Pool
 * using the OpenID Connect protocol.
 */
const cognitoAuthConfig = {
  // The OIDC authority URL - Cognito's OIDC discovery endpoint
  // Cognito automatically provides /.well-known/openid-configuration at this URL
  authority: `https://cognito-idp.${import.meta.env.VITE_Region}.amazonaws.com/${import.meta.env.VITE_User_Pool_id}`,

  // Your Cognito App Client ID
  client_id: `${import.meta.env.VITE_Client_id}`,

  // Where Cognito redirects after successful sign-in
  redirect_uri: 'http://localhost:5173/auth/callback',

  // Where Cognito redirects after sign-out
  post_logout_redirect_uri: 'http://localhost:5173',

  // OAuth response type - 'code' for Authorization Code flow
  response_type: 'code',

  // What user info we're requesting access to
  scope: 'openid email profile phone',

  // Store auth state in localStorage (survives page refresh)
  // Alternative: sessionStorage (cleared when tab closes)
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export default cognitoAuthConfig;

/**
 * Cognito User Pool configuration for direct API calls (sign-up, verification)
 */
export const cognitoPoolConfig = {
  UserPoolId: import.meta.env.VITE_User_Pool_id,
  ClientId: import.meta.env.VITE_Client_id,
};