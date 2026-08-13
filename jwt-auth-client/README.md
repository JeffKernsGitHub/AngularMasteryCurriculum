# Angular Mastery Curriculum: Phase 4 - JWT Authentication & Authorization

Welcome to the **jwt-auth-client** project in the **4.3-Authenication-Authorization** branch of the **Angular Mastery Curriculum**! This application demonstrates modern client-side security architecture in **Angular 22**, including JWT authentication, functional route guards (`CanActivateFn`), functional HTTP interceptors (`HttpInterceptorFn`), and role-based access control (RBAC) in a native **Zoneless** environment.

---

## 🎯 Phase 4 Learning Objectives

* **Client-Side Authentication Lifecycle**:
  1. **Login**: User inputs credentials, sends payload to `/api/auth/login`.
  2. **JWT Decoding**: Parses token claims (`sub`, `roles`) via `jwtDecode` to establish reactive user profile state.
  3. **Storage & Interception**: Stores token in secure storage; automatically attaches `Authorization: Bearer <token>` to requests via `HttpInterceptorFn`.
  4. **Session Termination**: Implements NIST AC-12 user-initiated logout, clearing memory and storage.
* **Functional Route Guards (`CanActivateFn`)**:
  * Protecting navigation boundaries based on authentication state and user roles.
* **Functional HTTP Interceptors (`HttpInterceptorFn`)**:
  * Seamlessly injecting Bearer JWT headers into outgoing `HttpClient` requests.
* **UI-Level Authorization with `@if`**:
  * Conditionally rendering UI controls based on user role signals (`authService.isAdmin()`).
* **Security & NIST Compliance (SECDEVOPS)**:
  * **NIST SP 800-63B & SP 800-53 AC-12**: Session termination, inactivity/overall timeouts, secure transport over HTTPS.
  * **Storage Security**: Tradeoffs between `localStorage` (XSS vulnerability) and `HTTP-Only Cookies` (CSRF mitigation required).
  * **Core Principle**: Client-side authorization is for UX; mandatory server-side authorization is required for security.

---

## 🏛️ Project Structure (`jwt-auth-client`)

```
src/app/
├── components/
│   ├── admin/                         # Admin-only protected dashboard (ADMIN role required)
│   ├── home/                          # Public landing page with role-aware navigation
│   ├── login/                         # User sign-in view with test credential presets
│   └── user/                          # User protected dashboard (USER or ADMIN role)
├── guards/
│   └── auth-guard.ts                  # Functional CanActivateFn checking auth & roles
├── interceptors/
│   └── auth-interceptor.ts            # Functional HttpInterceptorFn attaching Bearer token
├── models/
│   ├── auth-request.ts                # Credentials payload interface
│   ├── auth-response.ts               # JWT token response interface
│   └── user.ts                        # Decoded user model (username, roles)
├── services/
│   ├── api.ts                         # HTTP client service for public/user/admin endpoints
│   └── auth.ts                        # Authentication service with Signals & NIST session lifecycle
├── app.config.ts                      # provideZonelessChangeDetection, provideHttpClient(withInterceptors)
├── app.html                           # Header navigation with authentication badges & router outlet
├── app.routes.ts                      # Protected lazy routes with role data
├── app.scss                           # Application theme styles
├── app.spec.ts                        # Root component unit tests
└── app.ts                             # Root standalone component
```

---

## 🔑 Core Security Patterns Explained

### 1. Functional Route Guard (`CanActivateFn`)

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const requiredRoles = (route.data?.['roles'] as string[]) || [];
  if (requiredRoles.length > 0 && !authService.hasAnyRole(requiredRoles)) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
```

---

### 2. Functional HTTP Interceptor (`HttpInterceptorFn`)

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }

  return next(req);
};
```

---

### 3. Token Storage Security & NIST Guidelines

| Storage Strategy | Security Caveat | Recommendation |
| :--- | :--- | :--- |
| **`localStorage`** | Accessible to JavaScript; vulnerable to **XSS** attacks. | Acceptable for prototypes; avoid for sensitive high-assurance tokens. |
| **`HTTP-Only Cookies`** | Inaccessible to JavaScript (blocks XSS); vulnerable to **CSRF**. | **Recommended for Production** with SameSite cookies & Anti-CSRF tokens. |

#### NIST Session Standards (SP 800-63B & SP 800-53 AC-12):
* **AC-12 Session Termination**: Explicit logout immediately removes client tokens and invalidates server sessions.
* **Inactivity & Overall Timeout**: Limit maximum session life to prevent unauthorized reuse.
* **Secure Transport**: Ensure tokens are only transmitted over TLS 1.3 encrypted connections.

---

## 🚀 Running the Client Locally

```bash
# 1. Navigate to client directory
cd jwt-auth-client

# 2. Install dependencies
npm install

# 3. Start development server with API proxy
npm start

# 4. Production build
npm run build
```

---

## 🧪 Test Credentials

| Username | Password | Roles | Access Permissions |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | `ADMIN`, `USER` | Home, User Portal, Admin Portal |
| `user` | `user123` | `USER` | Home, User Portal |
