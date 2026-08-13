# Angular Mastery Curriculum: Phase 4 - Authentication & Authorization

Welcome to the **4.3-Authenication-Authorization** branch of the **Angular Mastery Curriculum**! This repository demonstrates end-to-end security architecture combining a modern **Angular 22** client application with a secure **Spring Boot** backend service.

---

## 🏛️ Repository Architecture

This branch contains two synchronized subprojects:

1. **[`jwt-auth-client`](./jwt-auth-client)**:
   - Modern Angular 22 Single Page Application (SPA).
   - Native **Zoneless** change detection (`provideZonelessChangeDetection()`).
   - Signal-based authentication state (`AuthService`).
   - Functional route guards (`CanActivateFn`) for role-based navigation boundaries.
   - Functional HTTP interceptor (`HttpInterceptorFn`) attaching Bearer JWT tokens.
   - UI-level conditional authorization using `@if` control flow.

2. **[`jwt-auth-service`](./jwt-auth-service)**:
   - Spring Boot REST API providing JWT token issuance and role-protected endpoints (`/api/public`, `/api/user`, `/api/admin`).

---

## 🔐 Key Security Principles

* **Client vs. Server**: Client-side guards and UI conditional elements improve User Experience (UX); **Mandatory Server-Side Authorization** is required for actual system security.
* **Token Storage (SECDEVOPS)**: Understanding tradeoffs between `localStorage` (vulnerable to XSS) and `HTTP-Only Cookies` (vulnerable to CSRF, mitigated with SameSite / Anti-CSRF tokens).
* **NIST Session Management**:
  * **NIST SP 800-63B**: Inactivity timeouts, overall timeouts, and warning mechanisms.
  * **NIST SP 800-53 AC-12**: Explicit user-initiated session termination (logout).

---

## 🚀 Getting Started

### 1. Run the Angular 22 Client
```bash
cd jwt-auth-client
npm install
npm start
```
The client serves at `http://localhost:4200/` with proxy forwarding to the backend at `http://localhost:8080/`.

### 2. Run the Spring Boot Backend
```bash
cd jwt-auth-service
./mvnw spring-boot:run
```

---

## 🧪 Default Test Accounts

| Username | Password | Roles | Access Level |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | `ADMIN`, `USER` | Full Admin & User portal access |
| `user` | `user123` | `USER` | User portal access only |
