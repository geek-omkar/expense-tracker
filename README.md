# Expense Tracker

A modern, mobile-first expense tracking application built with React Native and Expo. Track your daily expenses with an intuitive interface, category filtering, and search functionality.

## Setup

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator / physical device
- Expo Go app (for physical device testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expence-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   pnpm start
   ```

4. **Run on your platform**
   - **iOS Simulator**: Press `i` in the terminal or run `npm run ios`
   - **Android Emulator**: Press `a` in the terminal or run `npm run android`
   - **Web**: Press `w` in the terminal or run `npm run web`
   - **Physical Device**: Scan the QR code with Expo Go app

### Project Structure

```
expence-tracker/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Expense list screen
│   │   ├── add.tsx        # Add expense screen
│   │   └── _layout.tsx    # Tab navigation layout
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── expense-item.tsx   # Expense list item component
│   ├── category-filter.tsx # Category filter chips
│   └── empty-state.tsx    # Empty state component
├── hooks/                 # Custom React hooks
│   ├── use-expenses.ts    # Expense list logic hook
│   └── use-expense-form.ts # Form management hook
├── store/                 # State management
│   └── expense-store.ts   # Zustand store for expenses
├── types/                 # TypeScript type definitions
│   └── expense.ts         # Expense-related types
└── utils/                 # Utility functions
    └── helpers.ts         # Formatting and helper functions
```

## Architecture Decisions

### 1. **State Management: Zustand**

**Decision**: Use Zustand instead of Redux or Context API.

**Rationale**:
- **Simplicity**: Minimal boilerplate compared to Redux
- **Performance**: Better than Context API for frequently updated state
- **TypeScript**: Excellent TypeScript support out of the box
- **Selective subscriptions**: Components only re-render when their subscribed state changes
- **Persistence**: Easy integration with AsyncStorage for local persistence

**Implementation**: The `expense-store.ts` centralizes all expense-related state, including:
- Expense list and loading states
- Search query and category filter
- CRUD operations (add, delete, load)
- Computed values (filtered expenses, total)

### 2. **Navigation: Expo Router**

**Decision**: Use Expo Router (file-based routing) instead of React Navigation setup.

**Rationale**:
- **File-based routing**: Familiar pattern for web developers
- **Type-safe navigation**: Built-in TypeScript support
- **Deep linking**: Automatic deep linking support
- **Code splitting**: Automatic route-based code splitting
- **Less configuration**: Minimal setup required

### 3. **Data Persistence: AsyncStorage**

**Decision**: Use AsyncStorage for local data persistence instead of a database.

**Rationale**:
- **Simplicity**: No database setup required
- **Offline-first**: Works completely offline
- **Fast**: Synchronous API for reads (with async writes)
- **Sufficient**: For a personal expense tracker, JSON storage is adequate
- **Cross-platform**: Works on iOS, Android, and Web

**Trade-off**: Not suitable for large datasets (>10MB), but sufficient for personal expense tracking.

### 4. **Custom Hooks Pattern**

**Decision**: Extract business logic into custom hooks (`use-expenses.ts`, `use-expense-form.ts`).

**Rationale**:
- **Separation of concerns**: UI components focus on rendering, hooks handle logic
- **Reusability**: Logic can be reused across components
- **Testability**: Hooks can be tested independently
- **Readability**: Screen components are cleaner and easier to understand
- **State management**: Hooks act as a bridge between Zustand store and components

**Example**: `useExpenses()` hook encapsulates:
- Loading state management
- Pull-to-refresh logic
- Filter and search state
- Computed filtered results

### 5. **TypeScript Throughout**

**Decision**: Full TypeScript implementation with strict type checking.

**Rationale**:
- **Type safety**: Catch errors at compile time
- **Better DX**: IntelliSense and autocomplete
- **Refactoring**: Safer refactoring with type checking
- **Documentation**: Types serve as inline documentation

### 6. **Component Architecture**

**Decision**: Small, focused components with clear responsibilities.

**Rationale**:
- **Maintainability**: Easy to understand and modify
- **Reusability**: Components can be reused across screens
- **Testing**: Smaller components are easier to test
- **Performance**: Smaller components enable better React optimization

**Component breakdown**:
- `ExpenseItem`: Renders a single expense with delete on long-press
- `CategoryFilter`: Horizontal scrollable category chips
- `EmptyState`: Reusable empty state with icon, title, and subtitle

### 7. **Form Validation Strategy**

**Decision**: Inline validation with error messages displayed per field.

**Rationale**:
- **User feedback**: Immediate feedback on errors
- **Progressive disclosure**: Errors clear as user fixes them
- **Better UX**: Users know exactly what's wrong
- **Accessibility**: Screen readers can announce errors

**Implementation**: `useExpenseForm` hook manages:
- Field-level validation
- Error state per field
- Auto-clearing errors on field edit
- Date formatting as user types

### 8. **Styling: StyleSheet API**

**Decision**: Use React Native's StyleSheet API instead of styled-components or CSS-in-JS.

**Rationale**:
- **Performance**: StyleSheet optimizes styles at creation time
- **Native**: Works seamlessly with React Native
- **No dependencies**: No additional libraries needed
- **Type safety**: Can be typed with TypeScript

## What I'd Improve

### 1. **Data Persistence**

**Current**: Simple JSON storage in AsyncStorage.

**Improvements**:
- **Add a proper database**: Consider SQLite (via `expo-sqlite`) or Realm for:
  - Better query performance
  - Relationships and constraints
  - Migration support
  - Better handling of large datasets
- **Add data export**: CSV/JSON export functionality
- **Add cloud sync**: Optional cloud backup (Firebase, Supabase, or custom backend)

### 2. **Error Handling**

**Current**: Basic error handling with simple error messages.

**Improvements**:
- **Error boundaries**: Add React Error Boundaries for better error recovery
- **Retry logic**: Automatic retry for failed operations
- **Error logging**: Integrate error tracking (Sentry, Bugsnag)
- **User-friendly messages**: More descriptive error messages with actionable steps

### 3. **Testing**

**Current**: No tests implemented.

**Improvements**:
- **Unit tests**: Test hooks, utilities, and store logic (Jest)
- **Component tests**: Test UI components (React Native Testing Library)
- **Integration tests**: Test user flows end-to-end
- **E2E tests**: Test critical paths (Detox or Maestro)

### 4. **Performance Optimizations**

**Current**: Basic React Native optimizations.

**Improvements**:
- **Memoization**: Add `React.memo` to expensive components
- **Virtualized lists**: Use `FlashList` instead of `FlatList` for better performance
- **Image optimization**: If adding images, use optimized formats and lazy loading
- **Code splitting**: Lazy load screens and heavy components

### 5. **Accessibility**

**Current**: Basic accessibility support.

**Improvements**:
- **Screen reader support**: Add proper `accessibilityLabel` and `accessibilityHint`
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Color contrast**: Verify WCAG AA compliance
- **Dynamic type**: Support system font size preferences

### 6. **Features**

**Missing features that would enhance the app**:
- **Edit expenses**: Currently can only add and delete
- **Expense categories**: Allow custom categories (currently fixed list)
- **Recurring expenses**: Support for recurring/subscription expenses
- **Budget tracking**: Set budgets per category and track spending
- **Charts and analytics**: Visualize spending patterns over time
- **Multi-currency**: Support for different currencies
- **Receipt photos**: Attach photos to expenses
- **Tags**: Multiple tags per expense for better organization

### 7. **Code Quality**

**Improvements**:
- **ESLint rules**: Add stricter linting rules
- **Prettier**: Ensure consistent code formatting
- **Pre-commit hooks**: Run linting and tests before commits (Husky)
- **CI/CD**: Set up automated testing and deployment
- **Documentation**: Add JSDoc comments for complex functions

### 8. **State Management**

**Current**: Zustand store is well-structured but could be enhanced.

**Improvements**:
- **Middleware**: Add persistence middleware for automatic AsyncStorage sync
- **DevTools**: Add Zustand DevTools for debugging
- **Optimistic updates**: Update UI immediately, sync in background
- **Undo/Redo**: Add undo functionality for deleted expenses

### 9. **User Experience**

**Improvements**:
- **Onboarding**: Add a welcome screen for first-time users
- **Tutorial**: Interactive tutorial for key features
- **Haptic feedback**: Add haptic feedback for actions (already have expo-haptics installed)
- **Animations**: Add smooth transitions and micro-interactions
- **Dark mode**: Support system dark mode preference
- **Search improvements**: Add filters (date range, amount range)

### 10. **Security**

**Current**: No security considerations (local-only app).

**Improvements** (if adding cloud sync):
- **Authentication**: Secure user authentication
- **Data encryption**: Encrypt sensitive data at rest
- **API security**: Secure API endpoints with proper authentication
- **Biometric lock**: Add Face ID / Touch ID for app access

### 11. **Internationalization**

**Current**: Hardcoded English strings.

**Improvements**:
- **i18n**: Add react-i18next or similar for multi-language support
- **Date formatting**: Use locale-aware date formatting
- **Currency formatting**: Support locale-specific currency formatting

### 12. **Performance Monitoring**

**Improvements**:
- **Analytics**: Add usage analytics (privacy-friendly)
- **Performance monitoring**: Track app performance metrics
- **Crash reporting**: Integrate crash reporting service

---

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: Zustand
- **Storage**: AsyncStorage
- **Language**: TypeScript
- **Styling**: React Native StyleSheet API

## License

[Add your license here]
