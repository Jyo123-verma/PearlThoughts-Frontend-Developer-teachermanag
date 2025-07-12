export interface Teacher {
  id: string
  name: string
  staffId: string
  email: string
  phone: string
  birthDate: string
  subject: string[]
  experience: number
  joiningDate: string
  status: "active" | "inactive" | "on-leave"
  salary: number
  qualification: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
    country: string
  }
  avatar?: string
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  assignedClasses: string[]
}

export interface Qualification {
  id: string
  teacherId: string
  name: string
  rate: number
  type: "private" | "group"
  subject: string
  level: string
  duration: number
}

export interface ScheduleEvent {
  id: string
  teacherId: string
  title: string
  time: string
  endTime: string
  duration: number
  type: "class" | "meeting" | "break" | "exam"
  subject?: string
  students?: number
  day: string
  classroom?: string
  grade?: string
}

export interface Student {
  id: string
  name: string
  grade: string
  rollNumber: string
  subjects: string[]
}

export interface Attendance {
  id: string
  teacherId: string
  date: string
  status: "present" | "absent" | "late" | "half-day"
  checkIn?: string
  checkOut?: string
}

export interface ClassRoom {
  id: string
  name: string
  capacity: number
  type: "regular" | "lab" | "auditorium"
  equipment: string[]
}

export interface PaymentTransaction {
  id: string
  teacherId: string
  amount: number
  upiId: string
  remarks?: string
  date: string
  status: "success" | "failed" | "pending"
}

export interface SalaryBreakdown {
  baseSalary: number
  monthlyBonus: number
  leaveDays: number
  leaveDeduction: number
  netPayable: number
  month: string
  year: number
}

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    staffId: "EMP001",
    email: "priya.sharma@vidyalaya.edu.in",
    phone: "+91 98765 43210",
    birthDate: "1985-03-15",
    subject: ["Mathematics", "Statistics"],
    experience: 12,
    joiningDate: "2018-06-15",
    status: "active",
    salary: 85000,
    qualification: "M.Sc Mathematics, B.Ed",
    assignedClasses: ["12A", "11B", "12B"],
    address: {
      street: "A-204, Shanti Apartments, Sector 15",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      country: "India",
    },
    emergencyContact: {
      name: "Rajesh Sharma",
      relation: "Husband",
      phone: "+91 98765 43211",
    },
  },
  {
    id: "2",
    name: "Prof. Rajesh Kumar",
    staffId: "EMP002",
    email: "rajesh.kumar@vidyalaya.edu.in",
    phone: "+91 87654 32109",
    birthDate: "1982-07-22",
    subject: ["Physics", "Applied Physics"],
    experience: 15,
    joiningDate: "2015-04-10",
    status: "active",
    salary: 95000,
    qualification: "M.Sc Physics, Ph.D",
    assignedClasses: ["12A", "11A"],
    address: {
      street: "B-45, Green Valley Society, Kothrud",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411038",
      country: "India",
    },
    emergencyContact: {
      name: "Sunita Kumar",
      relation: "Wife",
      phone: "+91 87654 32110",
    },
  },
  {
    id: "3",
    name: "Mrs. Anita Patel",
    staffId: "EMP003",
    email: "anita.patel@vidyalaya.edu.in",
    phone: "+91 76543 21098",
    birthDate: "1988-11-08",
    subject: ["Chemistry", "Environmental Science"],
    experience: 8,
    joiningDate: "2019-08-20",
    status: "active",
    salary: 78000,
    qualification: "M.Sc Chemistry, B.Ed",
    assignedClasses: ["12B", "10A"],
    address: {
      street: "C-12, Sunrise Residency, Satellite",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380015",
      country: "India",
    },
    emergencyContact: {
      name: "Kiran Patel",
      relation: "Husband",
      phone: "+91 76543 21099",
    },
  },
  {
    id: "4",
    name: "Mr. Vikram Singh",
    staffId: "EMP004",
    email: "vikram.singh@vidyalaya.edu.in",
    phone: "+91 65432 10987",
    birthDate: "1980-05-12",
    subject: ["English", "Literature"],
    experience: 18,
    joiningDate: "2012-03-01",
    status: "active",
    salary: 92000,
    qualification: "M.A English, B.Ed",
    assignedClasses: ["12A", "10B"],
    address: {
      street: "D-78, Royal Gardens, Civil Lines",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302006",
      country: "India",
    },
    emergencyContact: {
      name: "Meera Singh",
      relation: "Wife",
      phone: "+91 65432 10988",
    },
  },
  {
    id: "5",
    name: "Dr. Meera Reddy",
    staffId: "EMP005",
    email: "meera.reddy@vidyalaya.edu.in",
    phone: "+91 54321 09876",
    birthDate: "1990-09-25",
    subject: ["Biology", "Biotechnology"],
    experience: 6,
    joiningDate: "2020-01-15",
    status: "active",
    salary: 82000,
    qualification: "M.Sc Biology, Ph.D",
    assignedClasses: ["12A", "11A"],
    address: {
      street: "E-23, Tech City Apartments, Gachibowli",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500032",
      country: "India",
    },
    emergencyContact: {
      name: "Suresh Reddy",
      relation: "Father",
      phone: "+91 54321 09877",
    },
  },
  {
    id: "6",
    name: "Mr. Arjun Nair",
    staffId: "EMP006",
    email: "arjun.nair@vidyalaya.edu.in",
    phone: "+91 43210 98765",
    birthDate: "1987-12-03",
    subject: ["Computer Science", "Information Technology"],
    experience: 9,
    joiningDate: "2017-07-10",
    status: "on-leave",
    salary: 88000,
    qualification: "MCA, M.Tech",
    assignedClasses: ["11B", "10A"],
    address: {
      street: "F-56, Palm Grove, Kakkanad",
      city: "Kochi",
      state: "Kerala",
      pincode: "682030",
      country: "India",
    },
    emergencyContact: {
      name: "Lakshmi Nair",
      relation: "Mother",
      phone: "+91 43210 98766",
    },
  },
  {
    id: "7",
    name: "Mrs. Kavita Joshi",
    staffId: "EMP007",
    email: "kavita.joshi@vidyalaya.edu.in",
    phone: "+91 32109 87654",
    birthDate: "1986-04-18",
    subject: ["Hindi", "Sanskrit"],
    experience: 10,
    joiningDate: "2016-05-20",
    status: "active",
    salary: 75000,
    qualification: "M.A Hindi, B.Ed",
    assignedClasses: ["10A", "8B"],
    address: {
      street: "G-89, Shivaji Nagar, Model Colony",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440010",
      country: "India",
    },
    emergencyContact: {
      name: "Amit Joshi",
      relation: "Husband",
      phone: "+91 32109 87655",
    },
  },
  {
    id: "8",
    name: "Mr. Suresh Gupta",
    staffId: "EMP008",
    email: "suresh.gupta@vidyalaya.edu.in",
    phone: "+91 21098 76543",
    birthDate: "1983-08-30",
    subject: ["Social Studies", "History"],
    experience: 13,
    joiningDate: "2014-09-15",
    status: "active",
    salary: 80000,
    qualification: "M.A History, B.Ed",
    assignedClasses: ["11B", "9A"],
    address: {
      street: "H-12, Lajpat Nagar, Ring Road",
      city: "Delhi",
      state: "Delhi",
      pincode: "110024",
      country: "India",
    },
    emergencyContact: {
      name: "Pooja Gupta",
      relation: "Wife",
      phone: "+91 21098 76544",
    },
  },
]

export const qualifications: Qualification[] = [
  {
    id: "1",
    teacherId: "1",
    name: "Advanced Mathematics",
    rate: 1200,
    type: "private",
    subject: "Mathematics",
    level: "Class 12",
    duration: 60,
  },
  {
    id: "2",
    teacherId: "1",
    name: "Statistics Workshop",
    rate: 800,
    type: "group",
    subject: "Statistics",
    level: "Class 11-12",
    duration: 90,
  },
  {
    id: "3",
    teacherId: "2",
    name: "Physics Laboratory",
    rate: 1500,
    type: "private",
    subject: "Physics",
    level: "Class 12",
    duration: 120,
  },
  {
    id: "4",
    teacherId: "2",
    name: "General Physics",
    rate: 900,
    type: "group",
    subject: "Physics",
    level: "Class 11",
    duration: 60,
  },
  {
    id: "5",
    teacherId: "3",
    name: "Organic Chemistry",
    rate: 1300,
    type: "private",
    subject: "Chemistry",
    level: "Class 12",
    duration: 90,
  },
  {
    id: "6",
    teacherId: "3",
    name: "Environmental Science",
    rate: 700,
    type: "group",
    subject: "Environmental Science",
    level: "Class 9-10",
    duration: 45,
  },
  {
    id: "7",
    teacherId: "4",
    name: "English Literature",
    rate: 1100,
    type: "private",
    subject: "English",
    level: "Class 11-12",
    duration: 60,
  },
  {
    id: "8",
    teacherId: "4",
    name: "Creative Writing",
    rate: 600,
    type: "group",
    subject: "English",
    level: "Class 8-10",
    duration: 45,
  },
  {
    id: "9",
    teacherId: "5",
    name: "Biology Practical",
    rate: 1400,
    type: "private",
    subject: "Biology",
    level: "Class 12",
    duration: 120,
  },
  {
    id: "10",
    teacherId: "5",
    name: "Biotechnology Basics",
    rate: 850,
    type: "group",
    subject: "Biotechnology",
    level: "Class 11-12",
    duration: 75,
  },
  {
    id: "11",
    teacherId: "6",
    name: "Programming Fundamentals",
    rate: 1600,
    type: "private",
    subject: "Computer Science",
    level: "Class 11-12",
    duration: 90,
  },
  {
    id: "12",
    teacherId: "6",
    name: "Web Development",
    rate: 1000,
    type: "group",
    subject: "Computer Science",
    level: "Class 10-12",
    duration: 120,
  },
  {
    id: "13",
    teacherId: "7",
    name: "Hindi Literature",
    rate: 900,
    type: "private",
    subject: "Hindi",
    level: "Class 10-12",
    duration: 60,
  },
  {
    id: "14",
    teacherId: "7",
    name: "Sanskrit Basics",
    rate: 500,
    type: "group",
    subject: "Sanskrit",
    level: "Class 6-8",
    duration: 45,
  },
  {
    id: "15",
    teacherId: "8",
    name: "History Research",
    rate: 1000,
    type: "private",
    subject: "History",
    level: "Class 11-12",
    duration: 75,
  },
  {
    id: "16",
    teacherId: "8",
    name: "Social Studies",
    rate: 650,
    type: "group",
    subject: "Social Studies",
    level: "Class 6-10",
    duration: 60,
  },
]

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "1",
    teacherId: "1",
    title: "Mathematics - Class 12A",
    time: "09:00",
    endTime: "10:00",
    duration: 60,
    type: "class",
    subject: "Mathematics",
    students: 35,
    day: "Monday",
    classroom: "Room 201",
    grade: "12A",
  },
  {
    id: "2",
    teacherId: "1",
    title: "Statistics - Class 11B",
    time: "11:00",
    endTime: "12:00",
    duration: 60,
    type: "class",
    subject: "Statistics",
    students: 32,
    day: "Monday",
    classroom: "Room 201",
    grade: "11B",
  },
  {
    id: "3",
    teacherId: "1",
    title: "Mathematics - Class 12B",
    time: "14:00",
    endTime: "15:00",
    duration: 60,
    type: "class",
    subject: "Mathematics",
    students: 30,
    day: "Monday",
    classroom: "Room 201",
    grade: "12B",
  },

  {
    id: "4",
    teacherId: "2",
    title: "Physics Lab - Class 12A",
    time: "10:00",
    endTime: "12:00",
    duration: 120,
    type: "class",
    subject: "Physics",
    students: 28,
    day: "Tuesday",
    classroom: "Physics Lab",
    grade: "12A",
  },
  {
    id: "5",
    teacherId: "2",
    title: "Physics Theory - Class 11A",
    time: "14:00",
    endTime: "15:00",
    duration: 60,
    type: "class",
    subject: "Physics",
    students: 40,
    day: "Tuesday",
    classroom: "Room 301",
    grade: "11A",
  },

  {
    id: "6",
    teacherId: "3",
    title: "Chemistry Practical - Class 12B",
    time: "09:00",
    endTime: "11:00",
    duration: 120,
    type: "class",
    subject: "Chemistry",
    students: 25,
    day: "Wednesday",
    classroom: "Chemistry Lab",
    grade: "12B",
  },
  {
    id: "7",
    teacherId: "3",
    title: "Environmental Science - Class 10A",
    time: "13:00",
    endTime: "14:00",
    duration: 60,
    type: "class",
    subject: "Environmental Science",
    students: 38,
    day: "Wednesday",
    classroom: "Room 105",
    grade: "10A",
  },

  {
    id: "8",
    teacherId: "4",
    title: "English Literature - Class 12A",
    time: "08:00",
    endTime: "09:00",
    duration: 60,
    type: "class",
    subject: "English",
    students: 35,
    day: "Thursday",
    classroom: "Room 401",
    grade: "12A",
  },
  {
    id: "9",
    teacherId: "4",
    title: "Creative Writing - Class 10B",
    time: "15:00",
    endTime: "16:00",
    duration: 60,
    type: "class",
    subject: "English",
    students: 42,
    day: "Thursday",
    classroom: "Room 401",
    grade: "10B",
  },

  {
    id: "10",
    teacherId: "5",
    title: "Biology - Class 12A",
    time: "10:00",
    endTime: "11:00",
    duration: 60,
    type: "class",
    subject: "Biology",
    students: 30,
    day: "Friday",
    classroom: "Room 501",
    grade: "12A",
  },
  {
    id: "11",
    teacherId: "5",
    title: "Biology Lab - Class 11A",
    time: "13:00",
    endTime: "15:00",
    duration: 120,
    type: "class",
    subject: "Biology",
    students: 28,
    day: "Friday",
    classroom: "Biology Lab",
    grade: "11A",
  },

  {
    id: "12",
    teacherId: "7",
    title: "Hindi - Class 10A",
    time: "09:00",
    endTime: "10:00",
    duration: 60,
    type: "class",
    subject: "Hindi",
    students: 45,
    day: "Monday",
    classroom: "Room 102",
    grade: "10A",
  },
  {
    id: "13",
    teacherId: "7",
    title: "Sanskrit - Class 8B",
    time: "11:00",
    endTime: "12:00",
    duration: 60,
    type: "class",
    subject: "Sanskrit",
    students: 35,
    day: "Monday",
    classroom: "Room 102",
    grade: "8B",
  },

  {
    id: "14",
    teacherId: "8",
    title: "History - Class 11B",
    time: "08:00",
    endTime: "09:00",
    duration: 60,
    type: "class",
    subject: "History",
    students: 38,
    day: "Tuesday",
    classroom: "Room 302",
    grade: "11B",
  },
  {
    id: "15",
    teacherId: "8",
    title: "Social Studies - Class 9A",
    time: "14:00",
    endTime: "15:00",
    duration: 60,
    type: "class",
    subject: "Social Studies",
    students: 40,
    day: "Tuesday",
    classroom: "Room 302",
    grade: "9A",
  },

  {
    id: "16",
    teacherId: "1",
    title: "Faculty Meeting",
    time: "16:00",
    endTime: "17:00",
    duration: 60,
    type: "meeting",
    day: "Friday",
    classroom: "Conference Room",
  },
  {
    id: "17",
    teacherId: "2",
    title: "Parent-Teacher Meeting",
    time: "10:00",
    endTime: "12:00",
    duration: 120,
    type: "meeting",
    day: "Saturday",
    classroom: "Auditorium",
  },
  {
    id: "18",
    teacherId: "3",
    title: "Science Fair Preparation",
    time: "15:00",
    endTime: "17:00",
    duration: 120,
    type: "meeting",
    day: "Wednesday",
    classroom: "Science Lab",
  },

  {
    id: "19",
    teacherId: "4",
    title: "Class 12 Board Exam",
    time: "09:00",
    endTime: "12:00",
    duration: 180,
    type: "exam",
    subject: "English",
    students: 150,
    day: "Saturday",
    classroom: "Exam Hall",
  },
  {
    id: "20",
    teacherId: "5",
    title: "Class 11 Unit Test",
    time: "10:00",
    endTime: "11:30",
    duration: 90,
    type: "exam",
    subject: "Biology",
    students: 60,
    day: "Thursday",
    classroom: "Room 501",
  },
]

export const students: Student[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    grade: "12A",
    rollNumber: "12A001",
    subjects: ["Mathematics", "Physics", "Chemistry", "English"],
  },
  {
    id: "2",
    name: "Diya Patel",
    grade: "12A",
    rollNumber: "12A002",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
  },
  {
    id: "3",
    name: "Arjun Kumar",
    grade: "11A",
    rollNumber: "11A001",
    subjects: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
  },
  {
    id: "4",
    name: "Ananya Singh",
    grade: "11A",
    rollNumber: "11A002",
    subjects: ["Mathematics", "Physics", "Biology", "English"],
  },
  {
    id: "5",
    name: "Ishaan Gupta",
    grade: "10A",
    rollNumber: "10A001",
    subjects: ["Mathematics", "Science", "Social Studies", "Hindi", "English"],
  },
  {
    id: "6",
    name: "Kavya Reddy",
    grade: "10A",
    rollNumber: "10A002",
    subjects: ["Mathematics", "Science", "Social Studies", "Hindi", "English"],
  },
]

// Generate attendance data for the past week
export const attendanceData: Attendance[] = (() => {
  const data: Attendance[] = []
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const statuses: ("present" | "absent" | "late" | "half-day")[] = [
    "present",
    "present",
    "present",
    "late",
    "present",
    "absent",
    "half-day",
  ]

  teachers.forEach((teacher) => {
    days.forEach((day, index) => {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      data.push({
        id: `${teacher.id}-${day}`,
        teacherId: teacher.id,
        date: day,
        status: teacher.status === "on-leave" ? "absent" : randomStatus,
        checkIn: randomStatus !== "absent" ? "09:00" : undefined,
        checkOut: randomStatus !== "absent" ? "17:00" : undefined,
      })
    })
  })

  return data
})()

export const classRooms: ClassRoom[] = [
  {
    id: "1",
    name: "Room 101",
    capacity: 40,
    type: "regular",
    equipment: ["Projector", "Whiteboard", "AC"],
  },
  {
    id: "2",
    name: "Room 201",
    capacity: 35,
    type: "regular",
    equipment: ["Smart Board", "AC", "Sound System"],
  },
  {
    id: "3",
    name: "Physics Lab",
    capacity: 30,
    type: "lab",
    equipment: ["Lab Equipment", "Projector", "Safety Kit"],
  },
  {
    id: "4",
    name: "Chemistry Lab",
    capacity: 25,
    type: "lab",
    equipment: ["Lab Equipment", "Fume Hood", "Safety Kit"],
  },
  {
    id: "5",
    name: "Computer Lab",
    capacity: 30,
    type: "lab",
    equipment: ["30 Computers", "Projector", "AC"],
  },
  {
    id: "6",
    name: "Auditorium",
    capacity: 200,
    type: "auditorium",
    equipment: ["Stage", "Sound System", "Lighting", "Projector"],
  },
]

export const availableClasses = [
  "6A",
  "6B",
  "7A",
  "7B",
  "8A",
  "8B",
  "9A",
  "9B",
  "10A",
  "10B",
  "11A",
  "11B",
  "12A",
  "12B",
]

export const availableSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Sanskrit",
  "Social Studies",
  "History",
  "Geography",
  "Computer Science",
  "Physical Education",
  "Art",
  "Music",
  "Environmental Science",
  "Economics",
  "Political Science",
]

// Mock payment transactions
export const paymentTransactions: PaymentTransaction[] = [
  {
    id: "pay001",
    teacherId: "1",
    amount: 85000,
    upiId: "priya.sharma@bank",
    remarks: "Monthly salary - Jan 2024",
    date: "2024-01-31",
    status: "success",
  },
  {
    id: "pay002",
    teacherId: "2",
    amount: 95000,
    upiId: "rajesh.kumar@upi",
    remarks: "Monthly salary - Jan 2024",
    date: "2024-01-31",
    status: "success",
  },
  {
    id: "pay003",
    teacherId: "1",
    amount: 5000,
    upiId: "priya.sharma@bank",
    remarks: "Bonus for extra classes - Jan 2024",
    date: "2024-02-05",
    status: "pending",
  },
  {
    id: "pay004",
    teacherId: "3",
    amount: 78000,
    upiId: "anita.patel@bank",
    remarks: "Monthly salary - Jan 2024",
    date: "2024-01-31",
    status: "success",
  },
  {
    id: "pay005",
    teacherId: "6",
    amount: 88000,
    upiId: "arjun.nair@upi",
    remarks: "Monthly salary - Jan 2024 (On Leave)",
    date: "2024-01-31",
    status: "failed",
  },
]

export const getTeacherStats = () => {
  const activeTeachers = teachers.filter((t) => t.status === "active").length
  const totalClasses = scheduleEvents.filter((e) => e.type === "class").length
  const totalStudents = scheduleEvents.reduce((sum, e) => sum + (e.students || 0), 0)
  const avgSalary = Math.round(teachers.reduce((sum, t) => sum + t.salary, 0) / teachers.length)
  const avgExperience = Math.round(teachers.reduce((sum, t) => sum + t.experience, 0) / teachers.length)

  return {
    activeTeachers,
    totalClasses,
    totalStudents,
    avgSalary,
    avgExperience,
    totalTeachers: teachers.length,
    onLeave: teachers.filter((t) => t.status === "on-leave").length,
    subjects: [...new Set(teachers.flatMap((t) => t.subject))].length,
  }
}

export const getAttendanceStats = () => {
  const thisWeekAttendance = attendanceData.filter((a) => a.date !== "Sunday")
  const presentCount = thisWeekAttendance.filter((a) => a.status === "present").length
  const absentCount = thisWeekAttendance.filter((a) => a.status === "absent").length
  const lateCount = thisWeekAttendance.filter((a) => a.status === "late").length
  const halfDayCount = thisWeekAttendance.filter((a) => a.status === "half-day").length

  const attendanceByDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => {
    const dayAttendance = attendanceData.filter((a) => a.date === day)
    const present = dayAttendance.filter((a) => a.status === "present").length
    const total = dayAttendance.length
    return {
      day,
      present,
      total,
      percentage: Math.round((present / total) * 100),
    }
  })

  return {
    presentCount,
    absentCount,
    lateCount,
    halfDayCount,
    attendanceByDay,
    totalRecords: thisWeekAttendance.length,
    attendanceRate: Math.round((presentCount / thisWeekAttendance.length) * 100),
  }
}

// Mock functions for CRUD operations
export const addTeacher = (teacher: Omit<Teacher, "id">) => {
  const newTeacher = { ...teacher, id: Date.now().toString() }
  teachers.push(newTeacher)
  return newTeacher
}

export const updateTeacher = (id: string, updates: Partial<Teacher>) => {
  const index = teachers.findIndex((t) => t.id === id)
  if (index !== -1) {
    teachers[index] = { ...teachers[index], ...updates }
    return teachers[index]
  }
  return null
}

export const deleteTeacher = (id: string) => {
  const index = teachers.findIndex((t) => t.id === id)
  if (index !== -1) {
    teachers.splice(index, 1)
    return true
  }
  return false
}

export const addScheduleEvent = (event: Omit<ScheduleEvent, "id">) => {
  const newEvent = { ...event, id: Date.now().toString() }
  scheduleEvents.push(newEvent)
  return newEvent
}

export const updateScheduleEvent = (id: string, updates: Partial<ScheduleEvent>) => {
  const index = scheduleEvents.findIndex((e) => e.id === id)
  if (index !== -1) {
    scheduleEvents[index] = { ...scheduleEvents[index], ...updates }
    return scheduleEvents[index]
  }
  return null
}

export const deleteScheduleEvent = (id: string) => {
  const index = scheduleEvents.findIndex((e) => e.id === id)
  if (index !== -1) {
    scheduleEvents.splice(index, 1)
    return true
  }
  return false
}

export const addPaymentTransaction = (transaction: Omit<PaymentTransaction, "id" | "date">) => {
  const newTransaction = { ...transaction, id: Date.now().toString(), date: new Date().toISOString().split("T")[0] }
  paymentTransactions.push(newTransaction)
  return newTransaction
}

export const getTeacherSalaryBreakdown = (teacherId: string, month: string, year: number): SalaryBreakdown | null => {
  const teacher = teachers.find((t) => t.id === teacherId)
  if (!teacher) return null

  const baseSalary = teacher.salary
  const monthlyBonus = 5000 // Dummy bonus

  // Calculate leave days from attendance data for the specified teacher
  // For simplicity, we'll use the existing attendanceData which is generated for "past week"
  // In a real application, you'd filter attendance by the specific month and year.
  const teacherAttendance = attendanceData.filter((a) => a.teacherId === teacherId)

  let leaveDays = 0
  teacherAttendance.forEach((att) => {
    if (att.status === "absent") {
      leaveDays += 1
    } else if (att.status === "half-day") {
      leaveDays += 0.5
    }
  })

  // Calculate daily salary for deduction
  const workingDaysInMonth = 22 // Assuming 22 working days in a month
  const dailySalary = baseSalary / workingDaysInMonth
  const leaveDeduction = leaveDays * dailySalary

  const netPayable = baseSalary + monthlyBonus - leaveDeduction

  return {
    baseSalary,
    monthlyBonus,
    leaveDays: parseFloat(leaveDays.toFixed(1)), // Round to 1 decimal place
    leaveDeduction: parseFloat(leaveDeduction.toFixed(2)), // Round to 2 decimal places
    netPayable: parseFloat(netPayable.toFixed(2)), // Round to 2 decimal places
    month,
    year,
  }
}
