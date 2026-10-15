# OrangeHRM & Restful-booking QA Testing

Automated testing of the OrangeHRM and Restful-booking websites based on prepared test cases.
The project covers API endpoint testing and UI testing, with both happy path and negative scenarios.

## Project Goal

### OrangeHRM
- Check that login works correctly with valid and invalid data
- Create an employee through the 'PIM' page
- Verify that search and autocomplete suggestions work correctly
- Add new users from the 'Admin' page
- Assign leave with valid and invalid dates
- Logout functionality
- Reset password functionality

### Restful-booking
- User can log in with valid credentials
- Returning bookings
- Updating a booking
- Partial update
- Deleting a booking

## Technologies Used
- Manual testing
- Postman
- Playwright
- GitHub

## Project Structure

```
├── OrangeHRM-and-Restful-booking-QA
├── .github
├── data
│   ├── API
│   └── UI
├── fixtures
│   └── API
├── node_modules
├── pages
│   └── UI
├── playwright-report
├── test-results
├── tests
│   ├── API
│   └── UI
├── utils
│   ├── API
│   └── UI
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```

## Installation

1. Clone the repository:
```bash
   git clone <repository-url>
   cd <project-folder>
```
2. Install dependencies:
```bash
   npm install
```
3. Install Playwright browsers:
```bash
   npx playwright install
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Open the HTML report:
```bash
npx playwright show-report
```

## CI/CD

Tests are automatically run using GitHub Actions on every `push` and `pull request`.
The workflow installs dependencies and Playwright browsers, runs all tests, and uploads
the Playwright HTML report as an artifact.

## Key Findings

Two tests are currently failing:

### OrangeHRM
**TC18 – Assign leave with invalid date shows error**
After selecting an invalid date range (from 01-01-1976 to today), the application returns a
`504 Gateway Time-out` error instead of showing a validation error message.

### Restful-booking
**TC09 – Authorized user can delete a single booking**
According to the documentation, the response status after deleting a booking should be `200 OK`,
but the API returns `201 Created`. The resource is deleted correctly, but the status code is wrong.
