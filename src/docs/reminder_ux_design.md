# Reminder Feature UX Design (Phase 4.6)

## 1. UX Flow Explanation

The reminder feature is a low-friction, high-value interaction. Since there is no user authentication, the primary identifier is the user's email (collected via valid input).

### Flow:
1.  **Trigger**: User clicks "Remind Me" on a movie card or details page.
2.  **Input**: A modal or inline form appears asking for email (if not already known from local storage/context).
3.  **Action**: User invokes "Set Reminder".
4.  **Feedback**:
    -   **Immediate**: Button creates a "spinner" or loading state. Input is disabled.
    -   **Success**: Button transforms to "Reminder Set ✓". rigorous visual confirmation (e.g., confetti or toast).
    -   **Duplicate**: If user has already set it, backend returns 409. UI treats this as a "Soft Success" -> "Already Set ✓".

## 2. Button State Logic

| State | Label | Visual Style | Interactivity |
| :--- | :--- | :--- | :--- |
| **Idle** | "Remind Me" | Primary Color, Hover effects | Clickable |
| **Loading** | "Setting..." | Opacity 70%, Spinner Icon | Disabled |
| **Success** | "Reminder Set ✓" | Green/Success Color, Checkmark | Disabled |
| **Existing**| "Already Set ✓" | Blue/Info Color, Checkmark | Disabled |
| **Error** | "Retry" | Red/Error Color, Shake animation | Clickable |

## 3. User-Facing Messages

We will use a **Toast System** for global feedback and **Inline Validation** for email errors.

| Event | Message | Type |
| :--- | :--- | :--- |
| **Success** | "We'll remind you when [Movie] releases!" | Success |
| **Duplicate** | "You're all set! Reminder already exists." | Info |
| **Network Error** | "Connection failed. Please try again." | Error |
| **Invalid Email** | "Please enter a valid email address." | Warning |
| **Server Error** | "Something went wrong. Try again later." | Error |

## 4. Edge Cases & Handling

-   **Double Clicks**: Prevented by disabling button immediately `onClick`.
-   **Network Failure**:
    -   Show "Retry" state on button.
    -   Keep email input populated so user doesn't have to retype.
-   **Duplicate Reminder**:
    -   Backend returns `409 Conflict`.
    -   Frontend catches 409 and transitions to "Already Set" state (Positive reinforcement, not an error).

## 5. Persistence
-   **LocalStorage**: Store a list of `reminded_movie_ids` locally.
-   **On Load**: Check if current movie ID is in local storage. If yes, pre-set button to "Reminder Set ✓".
-   *Note*: This is a "weak" persistence (cleared if cache cleared), but sufficient for unauthenticated UX.
