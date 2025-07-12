# Teacher Management System

A modern, responsive teacher management interface built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing teacher profiles, schedules, and qualifications with a clean, user-friendly interface.

## 🚀 Features

### Core Functionality
- **Teacher Profile Management**: Complete profile editing with personal, contact, and address information
- **Schedule Management**: Interactive weekly calendar with event management
- **Qualifications Management**: Separate handling of private and group qualifications with rates
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Modern UI/UX**: Clean, contemporary design following current best practices

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable components
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and state management
- **Mobile Responsive**: Touch-friendly interactions and optimized layouts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks (useState)

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd teacher-management-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── sidebar.tsx         # Navigation sidebar
│   ├── teacher-profile.tsx # Profile management
│   ├── teacher-schedule.tsx # Schedule management
│   ├── qualifications-manager.tsx # Qualifications management
│   └── teacher-management.tsx # Main container
├── lib/
│   └── utils.ts           # Utility functions
└── public/
    └── reference-image.png # Original design reference
\`\`\`

## 🎨 Design Decisions

### UI/UX Improvements
- **Modern Card-based Layout**: Replaced table-heavy design with card components
- **Gradient Backgrounds**: Added subtle gradients for visual appeal
- **Improved Typography**: Better hierarchy and readability
- **Interactive Elements**: Hover states and smooth transitions
- **Color Coding**: Consistent color scheme for different content types

### Responsive Design
- **Mobile-first Approach**: Designed for mobile devices first
- **Flexible Grid System**: Uses CSS Grid and Flexbox for layouts
- **Touch-friendly**: Larger touch targets and appropriate spacing
- **Collapsible Sidebar**: Mobile-optimized navigation

### Accessibility Features
- **Semantic HTML**: Proper use of headings, labels, and ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color combinations
- **Screen Reader Support**: Proper labeling and descriptions

## 🔧 Key Components

### TeacherManagement
Main container component that manages the overall application state and navigation.

### Sidebar
Responsive navigation component with mobile hamburger menu and desktop persistent sidebar.

### TeacherProfile
Comprehensive profile management with editable fields and organized sections.

### TeacherSchedule
Interactive weekly calendar with event management and mobile-optimized views.

### QualificationsManager
Dual-table system for managing private and group qualifications with CRUD operations.

## 📱 Mobile Responsiveness

- **Breakpoints**: Tailored for mobile (< 768px), tablet (768px-1024px), and desktop (> 1024px)
- **Navigation**: Collapsible sidebar with overlay on mobile
- **Tables**: Horizontal scroll and card-based layouts for mobile
- **Forms**: Optimized input sizes and spacing for touch devices
- **Calendar**: Stacked day view for mobile, grid view for desktop

## Video link: [video](https://drive.google.com/file/d/1EkmXWtvwtLHz8LmPaxLmcDPkvZChAo7F/view?usp=sharing)

## Deployed app link: