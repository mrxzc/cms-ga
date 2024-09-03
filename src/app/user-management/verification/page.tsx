import { VerificationUserPage } from '@components/organisms/User'

export const metadata = {
  title: 'User Management - Verification Request',
}

/**
 * Render a VerificationUserPage component for the user management verification request page
 * This page is used to display the list of users that have requested verification
 * The user can click on the "Verify" button to verify the user
 * The user can click on the "Reject" button to reject the verification request
 * If the user is not logged in, the user will be redirected to the login page
 * The page title is "User Management - Verification Request"
 */
export default function VerificationUserManagement() {
  return <VerificationUserPage />
}
