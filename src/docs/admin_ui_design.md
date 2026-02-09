# Admin UI Design (Phase 3.3)

## 1. Structure & Routing

- **/admin/login**
  - Public route (but redirects if already logged in).
  - Simple form: Username, Password.
  - Action: POST /api/v1/admin/login -> Store JWT in localStorage -> Redirect to /admin.

- **/admin** (Dashboard)
  - Protected Route (Requires Admin JWT).
  - Layout: Minimal header/sidebar with "Logout".
  - Content: List of Movies.

- **/admin/movies/new** & **/admin/movies/:id/edit**
  - Protected Route.
  - Form for Create/Update.

## 2. Components

### `AdminLayout.tsx`
- Wrapper for all protected routes.
- Checks `localStorage.getItem('adminToken')`.
- Redirects to `/admin/login` if missing.
- Renders a simple top bar with "Admin Panel" and "Logout".

### `AdminLogin.tsx`
- Minimal centered card.
- Error handling for 401.

### `AdminDashboard.tsx`
- **Table**:
  - ID (Small, truncated)
  - Title
  - Release (UTC)
  - Release (Local - for easy checking)
  - Actions: [Edit] [Delete]
- **Header**: "Movies" + [Add New] button.

### `MovieEditor.tsx`
- **Inputs**:
  - Title (Text)
  - Poster URL (Text + Preview)
  - Release Date (Date Picker - Local Time)
  - Release Time (Time Picker - Local Time)
- **Logic**:
  - On Submit: Combine Date+Time -> Local ISO -> Convert to UTC ISO string -> Send to API.
  - On Load (Edit): Parse UTC from API -> Split to Date/Time for inputs.

## 3. Deployment Strategy for "Internal Tool"
- Styling: Plain Tailwind (gray background, white cards).
- No animations, focused on density and utility.
- "Function over Form".
