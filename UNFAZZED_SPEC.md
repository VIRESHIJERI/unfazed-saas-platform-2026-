# UNFAZZED --- Complete Project Specification

> **Project type:** Full-stack SaaS web application\
> **Domain:** Therapist private-practice management\
> **Primary users:** Therapists and their clients\
> **Reference specification:** Unlox Major Project -- Web Development
> PDF (11 pages)\
> **Status:** Build from a clean repository; implement modules in the
> specified order.

------------------------------------------------------------------------

## 1. Project Overview

UNFAZZED is a SaaS platform for therapists in India to manage their
private practices end-to-end. It brings client acquisition, scheduling,
payments, clinical notes, communication, and business analytics into one
platform, supported by a branded public link that therapists can share
with clients (for example, `unfazed.in/dr-sharma`).

### 1.1 Core platform components

  -----------------------------------------------------------------------
  Component               Purpose                 Primary users
  ----------------------- ----------------------- -----------------------
  Therapist Dashboard     Practice-management hub Therapists
                          for calendar, clients,  
                          notes, billing, and     
                          analytics               

  Client Portal           Branded page for        Clients
                          intake, booking,        
                          payment, chat, and      
                          shared notes            

  Entitlement /           Config-driven,          System-wide
  Subscription Layer      tier-based feature      
                          access; avoid hardcoded 
                          tier values             

  Communication Layer     Real-time chat and      Therapists and clients
                          automated notifications 
  -----------------------------------------------------------------------

### 1.2 Main outcomes

-   A therapist can register, sign in, manage a professional profile,
    and share a branded public profile URL.
-   Clients can discover the therapist's public profile, complete
    intake, book available sessions, and make payments.
-   Therapists can manage clients, sessions, clinical notes, packages,
    and payments.
-   Private clinical notes remain inaccessible through every
    client-facing API.
-   Therapists and clients can communicate through in-app chat and
    event-driven notifications.
-   Subscription entitlements are enforced centrally.
-   Analytics are calculated using MongoDB aggregation pipelines.
-   The complete system is deployed.

------------------------------------------------------------------------

## 2. System Architecture

The reference design uses a three-tier architecture:

1.  **Frontend:** React application with two experiences:
    -   Therapist Dashboard
    -   Client Portal
2.  **Backend:** Node.js and Express REST API, organized into routes,
    controllers, middleware, and services.
3.  **Database:** MongoDB accessed through Mongoose.

A dedicated Entitlement Service is the single source of truth for
feature access. External integrations---payments, real-time chat,
notifications, and file storage---must be isolated behind service
modules rather than scattered throughout the codebase.

### 2.1 High-level architecture

``` text
                         CLIENTS
                    Browser / Mobile Web
                             |
                           HTTPS
                             |
              +--------------+--------------+
              |                             |
      REACT THERAPIST                 REACT CLIENT
        DASHBOARD                       PORTAL
              |                             |
              +----------- REST API --------+
                         Axios
                    + Socket.IO
                             |
                   NODE.JS + EXPRESS
                  Routes / Controllers /
                  Middleware / Services
                       /          \
                      /            \
                 MONGODB       ENTITLEMENT
                Mongoose        SERVICE
                                  |
                      +-----------+-----------+
                      |           |           |
                   RAZORPAY    SOCKET.IO   NOTIFICATIONS
                   Payments    Live Chat   Email / SMS /
                                           WhatsApp stub
                      |
                 CLOUD STORAGE
                   (AWS S3)
```

### 2.2 Architectural principles

1.  **Centralize entitlement checks.** No route or component should
    inspect subscription-tier strings directly. All gated access must go
    through the Entitlement Service.
2.  **Separate private and shared data at the API layer.** Hiding
    private notes only in the UI is insufficient. Client-facing API
    responses must never include private notes.
3.  **Use configuration for monetary values and tier caps.** Do not
    scatter hardcoded prices, caps, or tier-specific values across the
    application.
4.  **Isolate third-party integrations.** Razorpay and notification
    providers must sit behind service interfaces so they can be stubbed
    or replaced.
5.  **Build modules in dependency order.** Later modules depend on
    models and services from earlier modules.
6.  **Use Git from day one.** Keep module-level branches and meaningful
    commits.
7.  **Deploy incrementally.** Deploy the first usable module rather than
    waiting until the entire project is complete.

------------------------------------------------------------------------

## 3. Technology Stack

### 3.1 Frontend

  -----------------------------------------------------------------------
  Technology                          Responsibility
  ----------------------------------- -----------------------------------
  React                               User interface

  Vite                                Development server and build
                                      tooling

  React Router DOM                    Client-side routing

  Axios                               REST API communication

  Socket.IO Client                    Real-time chat

  date-fns                            Date formatting and manipulation

  date-fns-tz                         Timezone-aware date handling

  react-big-calendar                  Scheduling calendar

  react-hook-form                     Form state and validation

  TipTap (`@tiptap/react`,            Rich-text session notes
  `@tiptap/starter-kit`)              

  Recharts                            Analytics charts

  Tailwind CSS (`tailwindcss`,        Styling
  `@tailwindcss/vite`)                
  -----------------------------------------------------------------------

### 3.2 Backend

  Technology / package   Responsibility
  ---------------------- -----------------------------
  Node.js 18+            JavaScript runtime
  Express                HTTP API
  Mongoose               MongoDB object modelling
  dotenv                 Environment configuration
  cors                   Cross-origin configuration
  bcryptjs               Password hashing
  jsonwebtoken           JWT authentication
  express-validator      Request validation
  Razorpay               Payment gateway integration
  Socket.IO              Real-time communication
  multer                 File upload handling
  pdfkit                 PDF invoice generation
  nodemailer             Optional email delivery
  nodemon                Development auto-restart

### 3.3 Data and external services

-   MongoDB Atlas or a local MongoDB instance.
-   Razorpay test account for payment development.
-   AWS S3 is shown in the reference architecture for files and
    attachments.
-   WhatsApp Business integration is represented by a stub/log/queue
    unless business approval and access are available.
-   Git and GitHub for version control and submission.

------------------------------------------------------------------------

## 4. Repository and Folder Structure

Create one parent project directory containing two sibling projects:
`unfazed-backend` and `unfazed-frontend`.

### 4.1 Backend structure

``` text
unfazed-backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── razorpay.js
│   ├── models/
│   │   ├── Therapist.js
│   │   ├── Client.js
│   │   ├── Session.js
│   │   ├── SessionNote.js
│   │   ├── Availability.js
│   │   ├── Payment.js
│   │   ├── Package.js
│   │   ├── ClientPackage.js
│   │   ├── Lead.js
│   │   └── SubscriptionTierConfig.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── therapistController.js
│   │   ├── clientController.js
│   │   ├── schedulingController.js
│   │   ├── paymentController.js
│   │   ├── noteController.js
│   │   └── analyticsController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── therapistRoutes.js
│   │   ├── clientRoutes.js
│   │   ├── schedulingRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── noteRoutes.js
│   │   └── analyticsRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── entitlementMiddleware.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── entitlementService.js
│   │   ├── notificationService.js
│   │   ├── invoiceService.js
│   │   └── leadDistributionService.js
│   ├── sockets/
│   │   └── chatSocket.js
│   ├── utils/
│   │   └── generateSlug.js
│   └── app.js
├── server.js
├── .env
├── .env.example
├── .gitignore
└── package.json
```

### 4.2 Frontend structure

``` text
unfazed-frontend/
├── public/
├── src/
│   ├── api/
│   │   └── axiosInstance.js
│   ├── components/
│   │   ├── common/       # Navbar, Button, Modal, Loader
│   │   ├── profile/      # Hero, About, ServiceCard
│   │   ├── scheduling/   # Calendar, SlotPicker
│   │   ├── crm/          # ClientTable, ClientCard
│   │   ├── payments/     # CheckoutForm, InvoiceView
│   │   ├── notes/        # NoteEditor, SoapTemplate
│   │   ├── chat/         # ChatWindow, MessageBubble
│   │   └── analytics/    # RevenueChart, StatCard
│   ├── pages/
│   │   ├── therapist/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Clients.jsx
│   │   │   ├── Schedule.jsx
│   │   │   ├── Notes.jsx
│   │   │   └── Analytics.jsx
│   │   ├── client/
│   │   │   ├── BookingPage.jsx
│   │   │   ├── ClientPortal.jsx
│   │   │   └── Payment.jsx
│   │   └── auth/
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useEntitlement.js
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
└── vite.config.js
```

The structure is the reference project's intended organization.
Additional files may be introduced when implementation requires them,
while preserving the separation of concerns.

------------------------------------------------------------------------

## 5. Data Model Inventory

The reference specification names the following Mongoose models:

  -----------------------------------------------------------------------
  Model                               Purpose in the system
  ----------------------------------- -----------------------------------
  `Therapist`                         Therapist account, authentication
                                      identity, and public profile

  `Client`                            Client record associated with a
                                      therapist

  `Session`                           Booked practice session

  `SessionNote`                       Clinical documentation with
                                      private/shared visibility

  `Availability`                      Recurring availability, overrides,
                                      and blocked slots

  `Payment`                           Payment transaction and financial
                                      status

  `Package`                           Therapist's multi-session package
                                      offering

  `ClientPackage`                     Client's purchased package and
                                      usage/expiry tracking

  `Lead`                              Client-acquisition lead

  `SubscriptionTierConfig`            Configurable subscription tiers,
                                      caps, and feature flags
  -----------------------------------------------------------------------

### 5.1 Fields explicitly specified in the reference

**Therapist** - `email` - `password_hash` - `name` - `slug` - `bio` -
`specializations[]` - `languages[]`

**Client** - Must reference the associated therapist using a
`therapist_id` reference.

**Payment** - `gateway_transaction_id` - `platform_fee` - `net_amount` -
`status`

**SessionNote** - `type`, with `private` and `shared` values.

**SubscriptionTierConfig** - Tier name - Caps - Feature flags

**Availability** - Recurring weekly template - One-time overrides -
Blocked slots

Other detailed field definitions should be designed during
implementation to support the listed workflows. The reference PDF does
not prescribe a complete field-by-field schema for every model.

------------------------------------------------------------------------

## 6. Functional Requirements and Module Roadmap

**Implementation order is mandatory:** complete modules in order because
later modules depend on earlier models and services. The reference
suggests timeboxing each module to a 1--2 week sprint and estimates
roughly 2--3.5 months for all seven modules.

### Module 1 --- Foundations: Authentication, Profile, and Branded Link

**Objective:** Establish the MERN skeleton and implement therapist
authentication and the public profile.

**Tasks** - Initialize the Express + Mongoose backend and Vite + React
frontend. - Build the Therapist schema with email, password hash, name,
slug, bio, specializations, and languages. - Implement signup and
login. - Hash passwords with bcrypt. - Implement JWT-based
authentication middleware. - Build the public profile route at
`/:slug`. - Include a hero section, about section, specializations, and
service cards. - Generate unique slugs and validate uniqueness. - Add
basic Open Graph metadata for shareability.

**Key packages/tools:** `bcryptjs`, `jsonwebtoken`, `express-validator`,
`react-router-dom`.

**Acceptance / deliverable** - A therapist can register and log in. - An
authenticated therapist can edit their profile. - Their public branded
link renders the correct profile.

### Module 2 --- Scheduling System

**Objective:** Build the availability-to-booking flow across timezones.

**Tasks** - Build the Availability schema for recurring weekly
templates, one-time overrides, and blocked slots. - Build therapist
controls for weekly availability. - Support buffer time. - Support
session durations of 30, 45, 60, and 90 minutes. - Display open slots to
clients in the client's local timezone. - Implement booking with instant
confirmation. - Prevent double booking. - Stretch goal: waitlist clients
when slots are full and stub an automatic notification when a slot
becomes available.

**Key packages/tools:** `date-fns`, `date-fns-tz` (or Luxon),
`react-big-calendar`.

**Acceptance / deliverable** - A therapist can open slots. - A client
can book an available slot. - Once booked, the slot immediately becomes
unavailable to other clients. - Booking logic prevents two clients from
successfully booking the same slot.

### Module 3 --- Client CRM and Intake

**Objective:** Build the client-management backbone and intake/consent
flow.

**Tasks** - Build the Client schema referencing Therapist. - Build a
sortable and filterable client list showing name, last session, status,
and tags. - Build an individual client profile that aggregates session
history, payment history, and notes. - Build an intake form for
demographics, presenting concern, and history; start with a static
template. - Stretch goal: dynamic drag-and-drop form builder with fields
stored as a JSON schema. - Capture digital consent through a checkbox. -
Store the consent timestamp as an auditable record.

**Key packages/tools:** `react-hook-form`, Mongoose subdocuments for
tags/intake.

**Acceptance / deliverable** - A therapist can manage their client
list. - A new client can complete intake and consent before their first
session. - Consent is stored with a timestamp.

### Module 4 --- Payments and Packages

**Objective:** Integrate a payment gateway and handle payment-related
workflows.

**Tasks** - Integrate Razorpay in test mode for advance payment at
booking. - Build the Payment schema with gateway transaction ID,
platform fee, net amount, and status. - Implement packages of 3, 6, and
12 sessions. - Track per-session rate and package expiry. - Generate a
GST-style invoice PDF after successful payment. - Verify Razorpay
webhooks for payment confirmation; do not rely only on the client-side
callback.

**Key packages/tools:** `razorpay`, `pdfkit`, `dotenv`.

**Acceptance / deliverable** - A client can pay for a session or
purchase a package. - The client receives an invoice. - The therapist
dashboard reflects payment status. - Payment confirmation is verified
through the webhook flow.

### Module 5 --- Clinical Documentation

**Objective:** Implement role-restricted clinical documentation with
private/shared note separation.

**Tasks** - Build SessionNote with a `type` field: `private` or
`shared`. - Enforce at the API/serializer layer that private notes are
never returned by client-facing routes. - Build a rich-text freeform
note editor using TipTap. - Stretch goal: selectable SOAP/DAP structured
note templates.

**Key packages/tools:** `@tiptap/react`, `@tiptap/starter-kit`.

**Acceptance / deliverable** - A therapist can write private and shared
notes. - Client-facing portal routes return shared notes only. - Private
notes are never exposed to clients, even if a client directly calls the
API.

### Module 6 --- Communication: Chat and Notifications

**Objective:** Add real-time messaging and an event-driven notification
architecture.

**Tasks** - Build in-app chat between therapist and client using
Socket.IO. - Stretch goal: read receipts and typing indicators. - Build
a NotificationService that reacts to domain events: - Booking
confirmed - 24-hour session reminder - Post-session follow-up - Stub the
WhatsApp layer using logging or a queue when live WhatsApp Business API
access is unavailable. - Optional: integrate an email provider using
Nodemailer as a practical demo channel.

**Key packages/tools:** `socket.io`, `socket.io-client`, `nodemailer`.

**Acceptance / deliverable** - Real-time chat works between therapist
and client. - The notification service fires on booking, payment, and
session events. - WhatsApp can be represented by a stubbed/logged/queued
integration rather than blocking the project.

### Module 7 --- Subscription Tiers, Entitlements, and Analytics

**Objective:** Implement centralized feature gating and an analytics
dashboard backed by real aggregation queries.

**Tasks** - Build the SubscriptionTierConfig collection with tier name,
caps, and feature flags. - Keep monetary values and tier limits
configurable; do not hardcode them throughout the application. - Build
one Entitlement Service exposing:

``` js
canAccess(therapistId, featureKey)
```

-   Route every gated backend operation through this service.
-   Never check tier strings directly in individual routes or components
    as the authorization source.
-   Gate at least three features, such as:
    -   Active-client cap
    -   Note template type
    -   Analytics depth
-   Show an upgrade prompt when a user attempts a blocked action.
-   Build an Analytics Dashboard with:
    -   Revenue trend
    -   Active clients
    -   No-show rate
-   Calculate analytics using MongoDB aggregation pipelines, not
    client-side computation.

**Key packages/tools:** Recharts and the Mongoose aggregation framework.

**Acceptance / deliverable** - Tier-gated features work end-to-end. -
All gated backend routes use the centralized Entitlement Service. - The
analytics dashboard is backed by real MongoDB aggregation queries. - The
completed system is deployed.

------------------------------------------------------------------------

## 7. Authentication, Authorization, and Data Protection Requirements

The reference explicitly requires JWT authentication, password hashing,
and API-level separation of private and shared clinical notes.

Implementation checklist:

-   [ ] Hash passwords with bcrypt; never store plaintext passwords.
-   [ ] Verify JWTs in protected backend routes.
-   [ ] Validate incoming request data.
-   [ ] Ensure therapist-owned records are scoped to the authenticated
    therapist.
-   [ ] Enforce private/shared note visibility on the backend, not only
    in React.
-   [ ] Ensure client-facing routes and serializers exclude private
    notes.
-   [ ] Centralize subscription entitlement decisions.
-   [ ] Keep credentials and API keys in environment variables.
-   [ ] Verify payment webhooks rather than trusting only browser
    callbacks.
-   [ ] Avoid logging passwords, secrets, payment credentials, or
    sensitive clinical note contents.

The source PDF does not specify a complete security or
regulatory-compliance framework. Any additional legal, privacy,
encryption, retention, or production-hardening requirements must be
separately assessed before handling real patient data. Use
synthetic/demo data during development.

------------------------------------------------------------------------

## 8. Environment Configuration

### 8.1 Prerequisites

-   Node.js v18 or later and npm.
-   MongoDB Atlas account or local MongoDB.
-   Razorpay test account for Module 4.
-   Git installed.
-   GitHub account.

### 8.2 Backend setup

``` bash
mkdir unfazed-backend
cd unfazed-backend
npm init -y

# Core server and database
npm install express mongoose dotenv cors

# Authentication and validation
npm install bcryptjs jsonwebtoken express-validator

# Payments, real-time communication, files, and PDF
npm install razorpay socket.io multer pdfkit nodemailer

# Development tooling
npm install --save-dev nodemon
```

Add scripts to `package.json`:

``` json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Create `unfazed-backend/.env`:

``` dotenv
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_test_key
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
```

Keep the real `.env` out of Git. Commit an `.env.example` containing
placeholder values only.

### 8.3 Frontend setup

From the parent project directory:

``` bash
npm create vite@latest unfazed-frontend -- --template react
cd unfazed-frontend
npm install

# Routing and API calls
npm install react-router-dom axios

# Real-time chat
npm install socket.io-client

# Dates and scheduling UI
npm install date-fns date-fns-tz react-big-calendar

# Forms
npm install react-hook-form

# Rich-text editor
npm install @tiptap/react @tiptap/starter-kit

# Analytics charts
npm install recharts

# Styling
npm install tailwindcss @tailwindcss/vite
```

Create `unfazed-frontend/.env`:

``` dotenv
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key
```

Only public client-side configuration belongs in `VITE_` variables.
Never put private API secrets in frontend environment variables.

### 8.4 Running the project

1.  Start MongoDB Atlas or the local MongoDB instance and configure the
    backend connection string.

2.  From `unfazed-backend/`, run:

    ``` bash
    npm run dev
    ```

    The API should start at `http://localhost:5000`.

3.  From `unfazed-frontend/`, run:

    ``` bash
    npm run dev
    ```

    Vite should serve the frontend at `http://localhost:5173`.

4.  Confirm that the frontend can reach the backend by testing a
    health-check or registration route.

------------------------------------------------------------------------

## 9. Deployment Requirements

Deploy incrementally.

  Layer          Reference deployment option
  -------------- ----------------------------------
  Frontend       Vercel
  Backend        Render or Railway
  Database       MongoDB Atlas
  File storage   AWS S3 shown in the architecture

Deployment sequence:

1.  Deploy Module 1 once registration, login, profile editing, and
    public profile routing work.
2.  Configure production environment variables separately from local
    `.env` files.
3.  Configure frontend API base URL to point to the deployed backend.
4.  Verify database connectivity and CORS settings.
5.  Deploy each subsequent module as it becomes stable.
6.  Complete deployment after Module 7.

The PDF specifies deployment as a final deliverable but does not
prescribe exact production environment settings, domains, CI/CD
workflows, or hosting plans.

------------------------------------------------------------------------

## 10. Git and Development Workflow

-   Initialize Git on day one.
-   Use a separate branch for each module.
-   Make meaningful, focused commits.
-   Keep frontend and backend code in their respective sibling folders.
-   Add `.gitignore` files and never commit secrets, `node_modules`, or
    generated build output.
-   Create a seed script after Module 1 to generate realistic test
    therapists, clients, and sessions without repeated manual entry.
-   Test each module's acceptance criteria before moving to the next
    module.
-   Keep a README with setup instructions, environment-variable names,
    scripts, architecture, and implemented features.
-   Deploy Module 1 early and continue shipping incrementally.

Suggested branch names:

``` text
main
module-1-foundations
module-2-scheduling
module-3-client-crm
module-4-payments
module-5-clinical-notes
module-6-communication
module-7-entitlements-analytics
```

------------------------------------------------------------------------

## 11. Project Completion Checklist

### Foundation and profile

-   [ ] Backend and frontend start independently.
-   [ ] MongoDB connection works.
-   [ ] Therapist registration and login work.
-   [ ] Passwords are hashed.
-   [ ] JWT-protected routes work.
-   [ ] Therapist profile can be edited.
-   [ ] Unique public slug works.
-   [ ] Public branded profile and Open Graph metadata work.

### Scheduling

-   [ ] Weekly availability can be configured.
-   [ ] Overrides and blocked slots work.
-   [ ] Buffer time works.
-   [ ] 30/45/60/90-minute durations work.
-   [ ] Client timezone conversion works.
-   [ ] Booking confirms immediately.
-   [ ] Double booking is prevented.

### Client CRM and intake

-   [ ] Client records are associated with therapists.
-   [ ] Client list can be sorted and filtered.
-   [ ] Client profile aggregates sessions, payments, and notes.
-   [ ] Intake form works.
-   [ ] Consent checkbox and timestamp are stored.

### Payments and packages

-   [ ] Razorpay test-mode payment works.
-   [ ] Payment record is persisted.
-   [ ] 3/6/12-session packages work.
-   [ ] Package expiry is tracked.
-   [ ] Invoice PDF is generated.
-   [ ] Webhook signature/confirmation is verified.
-   [ ] Dashboard reflects payment status.

### Clinical notes

-   [ ] Therapist can create private notes.
-   [ ] Therapist can create shared notes.
-   [ ] Rich-text editor works.
-   [ ] Client-facing API returns shared notes only.
-   [ ] Tests verify that private notes cannot leak through client
    routes.

### Communication

-   [ ] Therapist-client chat works in real time.
-   [ ] Booking-confirmation notification fires.
-   [ ] 24-hour reminder event is handled.
-   [ ] Post-session follow-up event is handled.
-   [ ] WhatsApp stub/log/queue works.
-   [ ] Optional email delivery works if implemented.

### Entitlements and analytics

-   [ ] Subscription tier configuration is stored in MongoDB.
-   [ ] One centralized `canAccess(therapistId, featureKey)` service
    exists.
-   [ ] At least three features are tier-gated.
-   [ ] Upgrade prompt appears for blocked actions.
-   [ ] Revenue trend uses MongoDB aggregation.
-   [ ] Active-client metric uses MongoDB aggregation.
-   [ ] No-show rate uses MongoDB aggregation.
-   [ ] End-to-end tier-gated system is deployed.

### Delivery

-   [ ] Git history contains meaningful module-level commits.
-   [ ] Seed script is available.
-   [ ] README documents setup and usage.
-   [ ] `.env.example` is provided and secrets are excluded.
-   [ ] Frontend is deployed.
-   [ ] Backend is deployed.
-   [ ] Database is configured for deployment.
-   [ ] Deployed workflows have been smoke-tested.
-   [ ] GitHub repository link is ready for submission.

------------------------------------------------------------------------

## 12. Explicit Stretch Goals and Optional Items

These are identified as stretch or optional items in the reference; they
should not block the core deliverables:

-   Scheduling waitlist with notification when a slot opens.
-   Dynamic intake-form builder with JSON-schema-backed fields.
-   SOAP/DAP structured clinical-note templates.
-   Chat read receipts and typing indicators.
-   Real email provider integration using Nodemailer.
-   Live WhatsApp Business API integration; the reference expects a stub
    if business approval is unavailable.

------------------------------------------------------------------------

## 13. Scope Boundary: AI Features

The supplied 11-page project PDF defines the seven core modules above.
It does **not** specify an AI assistant, LLM integration, RAG,
LangGraph, diagnosis, or automated clinical recommendations.

Therefore, AI is not part of the source-defined acceptance criteria and
must not replace or delay the seven required modules. If an AI assistant
is added as a separate extension after the core platform is stable,
document it separately, keep it distinct from the original requirements,
protect sensitive data, and require therapist review for any
consequential action. It must not diagnose or prescribe treatment.

------------------------------------------------------------------------

## 14. Reference Document and Submission

This specification is based on the uploaded **Unlox -- Major Project,
Web Development** PDF (11 pages).

The PDF's submission procedure is:

1.  Log in to the Unlox account.
2.  Open **My Course**.
3.  Select **Web Development Program**.
4.  Open **Modules**.
5.  Select the **Major Project** module.
6.  Review/download the project PDF.
7.  Open the **Major Project Submission Link** folder.
8.  Submit the GitHub/Google Colab link in the provided Google Form.

For this web application, prepare the GitHub repository link and ensure
the project is accessible and documented before submission.
