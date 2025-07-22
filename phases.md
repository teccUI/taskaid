Here is a comprehensive, step-by-step implementation guideline to build the TaskAid MVP from a clean slate. This plan is designed to be followed sequentially, ensuring a logical build order from foundation to deployment.

---

### **Phase 0: Project Foundation & Environment Setup**

**Goal:** Create a fully configured, runnable "hello world" project with all necessary tools and connections to Firebase.

*   **Step 1: Set up the Frontend Project with Vite**
    *   Open your terminal and run the Vite creator:
        ```bash
        npm create vite@latest taskaid -- --template react-ts
        cd taskaid
        ```

*   **Step 2: Install All Frontend Dependencies**
    *   Install production dependencies:
        ```bash
        npm install firebase react-router-dom @dnd-kit/core @dnd-kit/sortable react-hook-form zod @hookform/resolvers clsx tailwind-merge lucide-react
        ```
    *   Install development dependencies for Tailwind CSS:
        ```bash
        npm install -D tailwindcss postcss autoprefixer
        ```

*   **Step 3: Initialize and Configure Tailwind CSS**
    *   Run the Tailwind initialization command:
        ```bash
        npx tailwindcss init -p
        ```
    *   Configure `tailwind.config.js` to find your source files:
        ```javascript
        /** @type {import('tailwindcss').Config} */
        export default {
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {},
          },
          plugins: [],
        }
        ```
    *   Add Tailwind directives to `src/index.css`:
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

*   **Step 4: Initialize and Configure ShadCN UI**
    *   Run the ShadCN UI initialization command. It will ask a few configuration questions; accept the defaults, which should align with this setup.
        ```bash
        npx shadcn-ui@latest init
        ```    *   This will create a `components.json` file and a `src/lib/utils.ts` file.

*   **Step 5: Set up Firebase Project**
    1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project named "TaskAid".
    2.  In the project dashboard, go to **Authentication** -> **Sign-in method** and enable the **Email/Password** provider.
    3.  Go to **Firestore Database**, create a database, and start in **Production mode**.
    4.  Go to **Project Settings** -> **General**, scroll down to "Your apps", and create a new **Web app**.
    5.  Copy the `firebaseConfig` object.

*   **Step 6: Integrate Firebase Config into the App**
    1.  Create a `.env` file in the project root. **Do not commit this file to Git.**
        ```
        VITE_FIREBASE_API_KEY="AIza..."
        VITE_FIREBASE_AUTH_DOMAIN="taskaid-c5950.firebaseapp.com"
        VITE_FIREBASE_PROJECT_ID="taskaid-c5950"
        VITE_FIREBASE_STORAGE_BUCKET="taskaid-c5950.appspot.com"
        VITE_FIREBASE_MESSAGING_SENDER_ID="104..."
        VITE_FIREBASE_APP_ID="1:104..."
        ```
    2.  Create a `.env.example` file to commit, showing the required variables.
    3.  Create `src/firebase/config.ts` to initialize Firebase:
        ```typescript
        import { initializeApp } from "firebase/app";
        import { getAuth } from "firebase/auth";
        import { getFirestore } from "firebase/firestore";

        const firebaseConfig = {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID,
        };

        const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app);
        export const db = getFirestore(app);
        ```

*   **Step 7: Create Folder Structure**
    *   Inside `src/`, create the following directories: `components`, `pages`, `hooks`, `contexts`, and `routes`.

### **Phase 1: Authentication & Core Layout**

**Goal:** Allow users to sign up, log in, and see a protected dashboard page with the basic two-pane layout.

*   **Step 1: Implement App Routing**
    *   Create `src/routes/AppRouter.tsx` to handle public and private routes.
    *   Create a `PrivateRoute.tsx` component that checks for an authenticated user and redirects to the landing page if none is found.
    *   In `App.tsx`, render the `<AppRouter />`.

*   **Step 2: Create Authentication Context & Hook**
    *   Create `src/contexts/AuthContext.tsx` to provide user state to the entire app.
    *   Use Firebase's `onAuthStateChanged` to listen for auth changes and update the context value.
    *   Create a `useAuth` hook for easy access to the context.

*   **Step 3: Build Authentication UI**
    *   Create `src/pages/LandingPage.tsx`.
    *   Use ShadCN's `Dialog`, `Card`, `Input`, and `Button` to build the **Sign-Up** and **Log-In** modals as described in the wireframes.
    *   Use `react-hook-form` and `zod` for client-side validation, including the strong password rule.

*   **Step 4: Build the App Shell**
    *   Create `src/pages/DashboardPage.tsx`.
    *   Implement the fixed 50/50 two-pane layout.
    *   Create `src/components/layout/Header.tsx` with a "Log Out" button that calls the logout function from your `useAuth` hook.
    *   Create placeholder components: `TaskList.tsx` and `BucketGrid.tsx` and place them in the left and right panes.

### **Phase 2: Task Management (CRUD)**

**Goal:** Enable logged-in users to create, view, update, and delete their own tasks.

*   **Step 1: Create Firestore Hooks for Tasks**
    *   Create `src/hooks/useTasks.ts`.
    *   This hook will contain all Firestore logic for tasks:
        *   `getTasks()`: Fetches tasks in realtime for the current `uid`.
        *   `addTask(taskData)`: Adds a new task document to Firestore.
        *   `updateTask(taskId, updates)`: Updates an existing task.
        *   `deleteTask(taskId)`: Deletes a task document.

*   **Step 2: Implement Task List View**
    *   In `src/components/tasks/TaskList.tsx`, use the `useTasks` hook to fetch and display the list of tasks.
    *   Create a `TaskCard.tsx` component to render individual tasks with edit and delete buttons.

*   **Step 3: Implement Task Creation/Editing**
    *   Create a `TaskForm.tsx` component, displayed within a ShadCN `Drawer`.
    *   The form will handle both creating new tasks and populating fields to edit an existing task.
    *   On submit, it will call either `addTask` or `updateTask`.

*   **Step 4: Implement Delete Confirmation**
    *   Use ShadCN's `AlertDialog` component. Clicking the delete button on a `TaskCard` will trigger this dialog, which requires explicit confirmation before calling `deleteTask`.

### **Phase 3: Bucket Management & Drag-and-Drop**

**Goal:** Implement the app's core grouping feature, allowing users to create buckets and drag tasks into them.

*   **Step 1: Implement Bucket CRUD**
    *   Follow the same pattern as tasks: create `useBuckets.ts`, `BucketGrid.tsx`, `BucketCard.tsx`, and a `BucketForm.tsx` (using a `Dialog`).
    *   The `BucketCard` should display the bucket name and a live task count.

*   **Step 2: Integrate `dnd-kit`**
    *   In `DashboardPage.tsx`, wrap the two-pane layout with `<DndContext>`.
    *   Define an `onDragEnd` handler function.

*   **Step 3: Make Tasks Draggable**
    *   In `TaskCard.tsx`, use the `useDraggable` hook from `dnd-kit`.

*   **Step 4: Make Buckets Droppable**
    *   In `BucketCard.tsx`, use the `useDroppable` hook. Add visual feedback (e.g., a border highlight) when a task is hovering over it (`isOver`).

*   **Step 5: Implement the Drop Logic**
    *   In the `onDragEnd` handler in `DashboardPage.tsx`:
        1.  Check if a draggable item (`active`) was dropped over a droppable area (`over`).
        2.  If so, extract the `taskId` from `active.id` and the `bucketId` from `over.id`.
        3.  Call the `updateTask(taskId, { bucketId: bucketId })` function from your hook. Firestore's realtime listener will handle the UI update automatically.

### **Phase 4: Backend Logic with Cloud Functions**

**Goal:** Offload complex logic to the backend for efficiency and data integrity.

*   **Step 1: Initialize Firebase Functions**
    *   In your project root, run:
        ```bash
        firebase init functions
        ```
    *   Choose TypeScript and install dependencies. This creates a `functions` directory.

*   **Step 2: Implement Cascading Deletes**
    *   In `functions/src/index.ts`, write a new Cloud Function.
    *   Use the `functions.firestore.document('buckets/{bucketId}').onDelete()` trigger.
    *   Inside the function, query all tasks where `bucketId` matches the deleted bucket's ID and delete them in a batch write.

*   **Step 3: Implement Analytics Aggregation**
    *   Write a Cloud Function triggered by `functions.firestore.document('tasks/{taskId}').onWrite()`.
    *   This function will inspect the change (e.g., if a task was just marked complete).
    *   It will then read and update a separate analytics document (e.g., `/users/{uid}/analytics/{YYYY-MM-DD}`). This keeps the client-side analytics queries simple and fast.

### **Phase 5: Final Features & Deployment**

**Goal:** Add the remaining "Should-Have" features and deploy the application.

*   **Step 1: Implement Analytics Bar**
    *   Create `src/components/analytics/AnalyticsBar.tsx`.
    *   It will fetch data from the pre-aggregated document created by your Cloud Function.
    *   Implement the collapsible UI logic.

*   **Step 2: Implement Theme Toggle**
    *   Use a simple context or library to manage the theme state (`light`/`dark`).
    *   Add the toggle switch to the `Header.tsx` component.
    *   Store the user's preference in `localStorage`.

*   **Step 3: Prepare for Deployment**
    *   Run the build command:
        ```bash
        npm run build
        ```
    *   This creates an optimized `dist` folder.

*   **Step 4: Deploy with Firebase Hosting**
    *   Initialize hosting:
        ```bash
        firebase init hosting
        ```
    *   Configure it as a single-page app and point the public directory to `dist`.
    *   Deploy the app:
        ```bash
        firebase deploy
        ```

*   **Step 5 (Optional but Recommended): Set up CI/CD**
    *   Create a `.github/workflows/deploy.yml` file.
    *   Configure a GitHub Action that triggers on push to the `main` branch, runs `npm install` and `npm run build`, and then uses the official Firebase action to deploy to hosting.