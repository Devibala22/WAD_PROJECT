# Two Laptop Demo Setup - EurekaPath

## Network Configuration
- **Laptop 1 IP:** 10.243.104.205 (Backend + Frontend Server)
- **Laptop 2 IP:** 10.102.234.81 (Client Browser)
- **Requirement:** Both laptops on same WiFi

---

## Setup Instructions

### Laptop 1 (10.243.104.205) - Server:

**Step 1: Start Backend**
```bash
cd backend
npm run dev
```
Wait for: "MongoDB connected !!"

**Step 2: Start Frontend** (New terminal)
```bash
cd frontend
npm run dev
```
Wait for: "Local: http://10.243.104.205:5173"

**Step 3: Test Locally**
- Open browser: http://10.243.104.205:5173
- Should see EurekaPath homepage

---

### Laptop 2 (10.102.234.81) - Client:

**Step 1: Connect to Same WiFi**
- Verify same network as Laptop 1

**Step 2: Test Connection**
- Open CMD
- Type: `ping 10.243.104.205`
- Should see replies (not timeout)

**Step 3: Open Application**
- Open browser
- Go to: **http://10.243.104.205:5173**
- Should see EurekaPath homepage

---

## Demo Script

### Laptop 1 - Student Demo:
1. **Login:** devibalan2201@gmail.com / Devi@2201
2. **Browse:** Click "Search Teacher" → Select Python
3. **Enroll:** Click "Enroll Now" → Complete payment
4. **View:** Go to "My Courses" → See enrolled course

### Laptop 2 - Teacher Demo:
1. **Login:** mirunavijayan@gmail.com / (your password)
2. **Create:** Click "Create Course" → Fill details
3. **Schedule:** Add class timing
4. **View:** See enrolled students

---

## Configuration Already Done ✅

✅ CORS configured for both IPs
✅ Frontend accepts network connections (host: 0.0.0.0)
✅ Backend allows cross-origin requests
✅ Cookies enabled with credentials

---

## Troubleshooting

### If Laptop 2 can't access:

**1. Check Network**
```bash
# On Laptop 2, run:
ping 10.243.104.205
```
Should see: Reply from 10.243.104.205

**2. Disable Firewall (Laptop 1)**
- Windows Security → Firewall → Turn off temporarily

**3. Verify Services Running (Laptop 1)**
- Backend: http://localhost:5000 (should show "Cannot GET /")
- Frontend: http://localhost:5173 (should show homepage)

**4. Check Browser Console (Laptop 2)**
- Press F12 → Console tab
- Look for CORS or network errors

### If cookies don't work:
- Both laptops must use same URL format
- Use IP address (not localhost) on both

---

## Alternative Setup (If Network Fails)

### Copy Project to Laptop 2:
1. Copy entire project folder to Laptop 2
2. Install dependencies on Laptop 2
3. Run backend and frontend on Laptop 2
4. Use localhost:5173 on Laptop 2

---

## Quick Commands

### Laptop 1:
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

### Laptop 2:
```
Browser: http://10.243.104.205:5173
```

---

## Important Notes

⚠️ Keep Laptop 1 running throughout demo
⚠️ Don't close backend or frontend terminals
⚠️ Use different accounts on each laptop
⚠️ Test connection before actual demo

---

## Test Checklist

Before Demo:
- [ ] Both laptops on same WiFi
- [ ] Laptop 2 can ping Laptop 1
- [ ] Backend running on Laptop 1
- [ ] Frontend running on Laptop 1
- [ ] Laptop 1 can access: http://10.243.104.205:5173
- [ ] Laptop 2 can access: http://10.243.104.205:5173
- [ ] Student login works
- [ ] Teacher login works
