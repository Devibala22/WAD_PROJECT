# Demo Setup Guide - Two Laptops

## Setup 1: Student on Laptop 1, Teacher on Laptop 2 (Same Machine)

### On BOTH Laptops:
1. Copy the entire project folder to both laptops
2. Install dependencies on both:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Run on BOTH Laptops:
1. Start Backend (in backend folder):
   ```
   npm run dev
   ```
2. Start Frontend (in frontend folder):
   ```
   npm run dev
   ```
3. Open browser: http://localhost:5173
4. Laptop 1: Login as Student
5. Laptop 2: Login as Teacher

---

## Setup 2: Backend on Laptop 1, Frontend on Laptop 2 (Network Setup)

### Laptop 1 (Backend Server):
1. Find your IP address:
   - Open CMD
   - Type: `ipconfig`
   - Note the IPv4 Address (e.g., 192.168.1.5)

2. Update backend CORS in `backend/src/app.js`:
   ```javascript
   app.use(cors({
     origin: [
       "http://localhost:5173",
       "http://192.168.1.5:5173",  // Add Laptop 1 IP
       "http://192.168.1.10:5173"  // Add Laptop 2 IP
     ],
     credentials: true
   }));
   ```

3. Start backend:
   ```
   cd backend
   npm run dev
   ```

### Laptop 2 (Frontend):
1. Update `frontend/vite.config.js`:
   ```javascript
   proxy: {
     '/api': 'http://192.168.1.5:5000'  // Use Laptop 1's IP
   }
   ```

2. Start frontend:
   ```
   cd frontend
   npm run dev
   ```

3. Open: http://localhost:5173

---

## Setup 3: Both Accessible from Network (Best for Demo)

### Laptop 1:
1. Update `frontend/vite.config.js`:
   ```javascript
   server: {
     host: "0.0.0.0",  // Allow network access
     port: 5173,
   }
   ```

2. Update `backend/.env`:
   ```
   CORS=http://192.168.1.5:5173,http://192.168.1.10:5173
   ```

3. Start both backend and frontend

### Laptop 2:
1. Open browser
2. Go to: http://192.168.1.5:5173 (Laptop 1's IP)

---

## Quick Demo Script

### Laptop 1 - Student Demo:
1. Login as student: devibalan2201@gmail.com
2. Browse courses
3. Enroll in a course
4. View enrolled courses
5. Check class schedule

### Laptop 2 - Teacher Demo:
1. Login as teacher: mirunavijayan@gmail.com
2. Create a new course
3. Add class schedule
4. View enrolled students
5. Start a live class

---

## Unit Testing Demo (Mocha & Chai)

### Before Demo:
1. Make sure backend server is NOT running
2. Open terminal in backend folder

### Demo Steps:

**Step 1: Show Test File**
```
Open: backend/test/student.test.js
```
Explain: "This file contains unit tests for Student Authentication module using Mocha and Chai"

**Step 2: Run Tests**
```
cd backend
npm test
```

**Step 3: Explain Results**
Point out:
- ✅ Green checkmarks = Passed tests
- ❌ Red X = Failed tests
- Test execution time
- Total tests passed/failed

**Step 4: Show Test Coverage**
Explain what's being tested:
- Student Signup (valid data, missing fields, duplicate email)
- Student Login (valid credentials, invalid email, wrong password)
- Student Logout

**Step 5: Demonstrate Test Failure (Optional)**
1. Open `backend/test/student.test.js`
2. Change line 70: `Password: 'Devi@2201'` to `Password: 'WrongPass'`
3. Run `npm test` again
4. Show the failed test
5. Change it back and run again to show it passes

### What to Say During Demo:
"We've implemented automated testing using Mocha and Chai framework. These tests validate our Student Authentication module including signup, login, and logout functionality. This ensures code quality and catches bugs early in development."

---

## Troubleshooting

**If connection fails:**
1. Check both laptops are on same WiFi
2. Disable Windows Firewall temporarily
3. Make sure backend is running on Laptop 1
4. Verify IP addresses are correct

**If cookies don't work:**
- Use Setup 1 (both on same machine)
- Cookies work best on localhost

**If tests fail:**
1. Make sure MongoDB is running
2. Check .env file has correct database URL
3. Ensure test student exists in database
