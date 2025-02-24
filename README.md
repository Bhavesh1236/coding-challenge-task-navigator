# React Native Coding Challenge: Task Navigator

Welcome to the **Task Navigator** coding challenge!  
This challenge will test your React Native skills—including authentication, deep linking, offline caching, testing, and more—using the publicly available [GoRest API](https://gorest.co.in/).

---

## Table of Contents
1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Features to Implement](#features-to-implement)
4. [Technical Details](#technical-details)
5. [Evaluation Criteria](#evaluation-criteria)
6. [Setup & Submission](#setup--submission)
7. [Additional Notes](#additional-notes)

---

## Overview
In this challenge, you'll build a **React Native** application called **Task Navigator** that interacts with the [GoRest API](https://gorest.co.in/). The primary goal is to demonstrate how you handle:

1. **Authentication** using a Bearer token.  
2. **CRUD operations** on to-do items (fetched from GoRest's `/todos` endpoint).  
3. **Deep Linking** (open a specific to-do screen via a URL).  
4. **Offline** data access (basic caching, potentially queuing updates offline).  
5. **Testing** (at least some unit tests, additional tests optional).  
6. **UI/UX** best practices in React Native.

By the end of this challenge, we should see a working mobile app with a clean structure, showcasing your knowledge of React Native's key concepts.

---

## Requirements

### 1. Authentication
- **Bearer Token**:  
  - The app should prompt for a GoRest API token.  
  - Store the token securely (e.g., `AsyncStorage` or a more secure storage library).  
  - Every request to the GoRest endpoints must include the header:  
    ```
    Authorization: Bearer <YOUR_GOREST_TOKEN>
    ```
- **Protected Screens**:  
  - If a token is missing or invalid, redirect the user to a Login/Token screen.

### 2. To-do CRUD
- **List To-dos**: Fetch from `GET /public/v2/todos`.  
- **Create To-do**: `POST /public/v2/todos` with required fields (e.g., `title`, `status`).  
- **Edit To-do**: `PATCH /public/v2/todos/:id`.  
- **Delete To-do**: `DELETE /public/v2/todos/:id`.  
- **UI**: Provide appropriate screens/forms for each operation.

### 3. Deep Linking
- **Basic Deep Linking**:  
  - Configure an app URL scheme, e.g. `tasknavigator://todo/:todoId`.  
  - Opening `tasknavigator://todo/123` should navigate to the detail screen for the to-do with ID `123`.
- **Handling App Launch**:  
  - If the app is backgrounded or closed, it should still handle the link properly when opened.

### 4. Offline Handling
- **Cache**:  
  - Store fetched to-dos in local storage (AsyncStorage or another DB) so previously loaded items are viewable offline.
- **Sync**:  
  - Optional but nice-to-have: If a user creates or edits a to-do while offline, queue the request and send it when back online.

### 5. Testing
- **Unit Tests**:  
  - At least one or two unit tests (e.g., a reducer or a core component) using Jest.
- **Integration or E2E Tests** (Optional):  
  - If you have time, showcase tests that simulate user flows (e.g., logging in, creating a to-do, etc.).

### 6. UI/UX
- **Styling**:  
  - Use any design library (React Native Paper, NativeBase) or custom styles, but keep it consistent and responsive.
- **UX Considerations**:  
  - Handle loading states, error states, and empty states gracefully.  
  - Provide meaningful form validation messages.

---

## Features to Implement

1. **Login/Token Screen**:  
   - A screen where the user inputs their GoRest token.  
   - Validate the token by making a test request or storing it, and then navigate to the main app if valid.

2. **Main Screen (To-do List)**:  
   - Displays a list of existing to-dos from the API.  
   - Provide a button to create a new to-do.

3. **To-do Details Screen**:  
   - Shows detailed information about a single to-do (title, status, etc.).  
   - Option to **Edit** (update status/title) and **Delete** the to-do.
   - This screen should support **deep linking** (e.g., if the user opens `tasknavigator://todo/:id`, go here).

4. **Create/Edit Screen**:  
   - A form to create a new to-do or edit an existing one.  
   - Required fields: `title`, `status`.  
   - Validate inputs (e.g., `title` cannot be empty).

5. **Offline State** (Basic):
   - Cache the to-dos so they remain visible if the app is offline.  
   - If you have extra time, queue offline edits and apply them when online again.

6. **Testing**:  
   - A small suite of tests (unit or integration) showcasing your testing approach.

---

## Technical Details

1. **Platform**: React Native (0.70+ recommended).
2. **Language**: TypeScript or JavaScript—choose whichever you're comfortable with.
3. **State Management**: Redux, Context + Hooks, or React Query—any robust solution is acceptable.
4. **Networking**: `fetch` or `axios`—use whichever you prefer.
5. **Navigation**: [React Navigation](https://reactnavigation.org/) recommended.
6. **Deep Linking Config**: [React Navigation Deep Linking Guide](https://reactnavigation.org/docs/deep-linking/).
7. **Offline Storage**: 
   - Use [`AsyncStorage`](https://reactnative.dev/docs/asyncstorage) or a similar local database.  
   - Keep it simple unless you want to showcase more advanced solutions.
8. **Testing Tools**: Jest, React Native Testing Library, Detox (optional for E2E).

---

## Evaluation Criteria

Your submission will be evaluated on:
1. **Code Quality & Organization**  
   - Clean, modular structure.  
   - Appropriate file/folder organization.
2. **Correctness & Functionality**  
   - Properly fetching data from GoRest with Bearer token.  
   - CRUD operations working as intended.  
   - Deep linking navigates to the correct screen.  
   - Offline caching works for previously fetched data.
3. **Error Handling & Validation**  
   - Meaningful error messages for network or validation failures.
4. **UI/UX**  
   - Consistent design, responsive layouts, clear user flows.
5. **Testing Approach**  
   - At least basic unit test coverage.  
   - Optional integration/E2E tests are a bonus.
6. **Performance**  
   - Efficient rendering of lists (`FlatList` or similar).  
   - Minimizing unnecessary re-renders.
7. **Documentation**  
   - A clear README explaining setup, usage, and architectural decisions.

---

## Setup & Submission

1. **Clone this Repo** (or start your own).  
2. **Initialize the Project**:  
   ```bash
   npx react-native init TaskNavigator
   cd TaskNavigator
   # or use expo if you prefer

```

## Testing Deep Linking

To test the deep linking functionality in your app, you can use the following command in your terminal:

```bash
adb shell am start -W -a android.intent.action.VIEW -d "tasknavigator://todo/74962" com.tasknavigator
```

### Steps to Run Deep Linking

1. **Run Your App**: Make sure your React Native app is running on an Android emulator or a physical device. You can start your app using:

   ```bash
   npx react-native run-android
   ```

2. **Open a Terminal**: Open a terminal window where you can run ADB commands.

3. **Execute the Deep Link Command**: Run the following command to test deep linking:

   ```bash
   adb shell am start -W -a android.intent.action.VIEW -d "tasknavigator://todo/74962" com.tasknavigator
   ```

4. **Observe the Behavior**: After executing the command, your app should navigate to the `TodoDetails` screen for the to-do with ID `74962`. If the app is in the background or closed, it should open and navigate to the correct screen.

### Troubleshooting

- If you encounter any issues, ensure that the deep linking configuration in your `AndroidManifest.xml` is set up correctly.
- Make sure that the `tasknavigator` scheme is defined and that the `TodoDetails` screen is properly configured to accept the `id` parameter.
