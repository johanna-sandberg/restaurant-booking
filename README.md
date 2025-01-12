Restaurant Booking Application

This is a full-stack restaurant booking application built with:

- **Next.js**
- **TypeScript**
- **PostgreSQL**
- **Prisma**
- **TailwindCSS**

The application is deployed on **Vercel** and includes customer and admin functionalities.

---

## Live Demo

You can view the live version of the application here: [Restaurant Booking App](https://restaurant-booking-plum.vercel.app/)

---

## Features

- Book tables with details (name, email, guests, date, and time).
- Admin dashboard to manage bookings.
- Validations using Zod.
- Responsive design with TailwindCSS.

---

## Requirements

- Node.js 18 or later
- PostgreSQL database
- A Vercel account for deployment

---

## Local Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/johanna-sandberg/restaurant-booking.git
   cd restaurant-booking
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of your project with the following content:

   ```
   DATABASE_URL=your_postgresql_connection_string
   ```

   Replace `your_postgresql_connection_string` with the PostgeSQL connection string for your database.

4. **Generate the Prisma client**:

   ```bash
   npx prisma generate
   ```

5. **Apply the database schema**:

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Testing

Run the tests:

```bash
npm run test
```
