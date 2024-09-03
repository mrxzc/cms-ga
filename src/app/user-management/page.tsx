import { ListUserPage } from '@components/organisms/User'

export const metadata = {
  title: 'User Management - List User',
}

/**
 * Render a ListUserPage component for the user management list user page
 * This page is used to display the list of users
 * The user can click on the "Edit" button to edit the user
 * If the user is not logged in, the user will be redirected to the login page
 * The page title is "User Management - List User"
 */

export default function ListUserManagement() {
  return <ListUserPage />
}
