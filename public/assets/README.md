# IMPORTANT: Place Your Images Here

## Required Images for AboutUs Component

### 1. Profile Photo
- **Filename:** `profile-photo.jpg`
- **Source:** Your circular professional photo
- **Size:** 400x400px minimum recommended
- **Format:** JPG or PNG

### 2. Europass Logo
- **Filename:** `europass-logo.png`
- **Source:** The official Europass logo from Europe
- **Format:** PNG (with transparent background)

## How to Add Images

1. **Save your profile photo:**
   - Right-click on your circular photo attachment
   - Save it as `profile-photo.jpg`
   - Copy it to this folder: `public/assets/`

2. **Save the Europass logo:**
   - Right-click on the Europass logo attachment
   - Save it as `europass-logo.png`
   - Copy it to this folder: `public/assets/`

## What Happens If Images Are Missing?

The component has fallback mechanisms:
- **Missing profile photo:** Shows a blue circle with "MG" initials
- **Missing Europass logo:** Logo is hidden automatically

## After Adding Images

Run `npm run build` or `npm run dev` to see the changes.

---

**Note:** The `public` folder in Vite is served as the root of your application.
Files in `public/assets/` are accessible at the URL `/assets/filename.ext`
