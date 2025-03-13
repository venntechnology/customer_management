# Customer Management System

This is a Rails application for managing customers and their notes with role-based access control.

## Features

- User authentication with Devise
- Role-based authorization with Pundit (admin, advanced, basic)
- Bootstrap 5.3 for responsive UI
- Turbo and Stimulus for dynamic interactions
- Customer management
- Notes for customers with visibility based on user role

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   bundle install
   ```
3. Set up the database:
   ```
   rails db:create
   rails db:migrate
   rails db:seed
   ```
4. Start the server:
   ```
   bin/dev
   ```
   or
   ```
   rails server
   ```

## Test Accounts

- Admin: admin@example.com / password
- Advanced: advanced@example.com / password
- Basic: basic@example.com / password

## Access Control

- **Admins**: Can create, edit, and view all customers
- **Advanced users**: Can view all customers
- **Basic users**: Can view all customers

## User Permissions

| Action                  | Admin | Advanced | Basic |
|-------------------------|-------|----------|-------|
| View customers          | ✅    | ✅       | ✅    |
| Create/edit customers   | ✅    | ❌       | ❌    |
| Delete customers        | ✅    | ❌       | ❌    |

## Database Structure

- **users**: Authentication and role information
- **customers**: Customer contact information

## Technologies Used

- Ruby on Rails 7.1+
- PostgreSQL
- Devise for authentication
- Pundit for authorization
- Bootstrap 5.3 for UI components
- Turbo for page transitions
- Stimulus for JavaScript behaviors
- Kaminari for pagination

## Development

To add new features:

1. Create migrations for new models
2. Update policies for proper authorization
3. Add controller actions
4. Create or update views

## License

This project is available as open source under the terms of the MIT License.
