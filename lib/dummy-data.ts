export interface Teacher {
  id: string
  name: string
  staffId: string
  email: string
  phone: string
  birthDate: string
  subject: string
  experience: number
  joiningDate: string
  status: "active" | "inactive"
  address: {
    street: string
    city: string
    state: string
    country: string
  }
  avatar?: string
}

export interface Qualification {
  id: string
  teacherId: string
  name: string
  rate: number
  type: "private" | "group"
  subject: string
  level: string
}

export interface ScheduleEvent {
  id: string
  teacherId: string
  title: string
  time: string
  duration: number
  type: "class" | "meeting" | "break"
  subject?: string
  students?: number
  day: string
}

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Priya Sharma",
    staffId: "TCH001",
    email: "priya.sharma@school.edu.in",
    phone: "+91 98765 43210",
    birthDate: "1985-03-15",
    subject: "Mathematics",
    experience: 8,
    joiningDate: "2020-06-15",
    status: "active",
    address: {
      street: "A-204, Shanti Apartments, Sector 15",
      city: "Noida",
      state: "Uttar Pradesh",
      country: "India",
    },
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    staffId: "TCH002",
    email: "rajesh.kumar@school.edu.in",
    phone: "+91 87654 32109",
    birthDate: "1982-07-22",
    subject: "Physics",
    experience: 12,
    joiningDate: "2018-04-10",
    status: "active",
    address: {
      street: "B-45, Green Valley Society",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
    },
  },
  {
    id: "3",
    name: "Anita Patel",
    staffId: "TCH003",
    email: "anita.patel@school.edu.in",
    phone: "+91 76543 21098",
    birthDate: "1988-11-08",
    subject: "Chemistry",
    experience: 6,
    joiningDate: "2021-08-20",
    status: "active",
    address: {
      street: "C-12, Sunrise Residency",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
    },
  },
  {
    id: "4",
    name: "Vikram Singh",
    staffId: "TCH004",
    email: "vikram.singh@school.edu.in",
    phone: "+91 65432 10987",
    birthDate: "1980-05-12",
    subject: "English",
    experience: 15,
    joiningDate: "2015-03-01",
    status: "active",
    address: {
      street: "D-78, Royal Gardens",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
    },
  },
  {
    id: "5",
    name: "Meera Reddy",
    staffId: "TCH005",
    email: "meera.reddy@school.edu.in",
    phone: "+91 54321 09876",
    birthDate: "1990-09-25",
    subject: "Biology",
    experience: 4,
    joiningDate: "2022-01-15",
    status: "active",
    address: {
      street: "E-23, Tech City Apartments",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
    },
  },
  {
    id: "6",
    name: "Arjun Nair",
    staffId: "TCH006",
    email: "arjun.nair@school.edu.in",
    phone: "+91 43210 98765",
    birthDate: "1987-12-03",
    subject: "Computer Science",
    experience: 7,
    joiningDate: "2019-07-10",
    status: "inactive",
    address: {
      street: "F-56, Palm Grove",
      city: "Kochi",
      state: "Kerala",
      country: "India",
    },
  },
]

export const qualifications: Qualification[] = [
  {
    id: "1",
    teacherId: "1",
    name: "Advanced Mathematics",
    rate: 800,
    type: "private",
    subject: "Mathematics",
    level: "Class 12",
  },
  {
    id: "2",
    teacherId: "1",
    name: "Basic Algebra",
    rate: 600,
    type: "group",
    subject: "Mathematics",
    level: "Class 10",
  },
  { id: "3", teacherId: "2", name: "Physics Lab", rate: 900, type: "private", subject: "Physics", level: "Class 12" },
  { id: "4", teacherId: "2", name: "General Physics", rate: 700, type: "group", subject: "Physics", level: "Class 11" },
  {
    id: "5",
    teacherId: "3",
    name: "Organic Chemistry",
    rate: 850,
    type: "private",
    subject: "Chemistry",
    level: "Class 12",
  },
  {
    id: "6",
    teacherId: "4",
    name: "English Literature",
    rate: 750,
    type: "private",
    subject: "English",
    level: "Class 11",
  },
  {
    id: "7",
    teacherId: "5",
    name: "Biology Practical",
    rate: 800,
    type: "group",
    subject: "Biology",
    level: "Class 12",
  },
  {
    id: "8",
    teacherId: "6",
    name: "Programming Basics",
    rate: 1000,
    type: "private",
    subject: "Computer Science",
    level: "Class 12",
  },
]

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "1",
    teacherId: "1",
    title: "Mathematics Class 12A",
    time: "9:00am",
    duration: 2,
    type: "class",
    subject: "Mathematics",
    students: 35,
    day: "Monday",
  },
  {
    id: "2",
    teacherId: "1",
    title: "Mathematics Class 11B",
    time: "11:00am",
    duration: 2,
    type: "class",
    subject: "Mathematics",
    students: 32,
    day: "Monday",
  },
  {
    id: "3",
    teacherId: "2",
    title: "Physics Lab",
    time: "2:00pm",
    duration: 3,
    type: "class",
    subject: "Physics",
    students: 28,
    day: "Tuesday",
  },
  {
    id: "4",
    teacherId: "2",
    title: "Physics Theory",
    time: "10:00am",
    duration: 2,
    type: "class",
    subject: "Physics",
    students: 40,
    day: "Wednesday",
  },
  {
    id: "5",
    teacherId: "3",
    title: "Chemistry Practical",
    time: "1:00pm",
    duration: 2,
    type: "class",
    subject: "Chemistry",
    students: 25,
    day: "Thursday",
  },
  {
    id: "6",
    teacherId: "4",
    title: "English Literature",
    time: "9:00am",
    duration: 2,
    type: "class",
    subject: "English",
    students: 38,
    day: "Friday",
  },
  {
    id: "7",
    teacherId: "5",
    title: "Biology Class",
    time: "11:00am",
    duration: 2,
    type: "class",
    subject: "Biology",
    students: 30,
    day: "Monday",
  },
  { id: "8", teacherId: "1", title: "Staff Meeting", time: "3:00pm", duration: 1, type: "meeting", day: "Friday" },
  { id: "9", teacherId: "2", title: "Parent Meeting", time: "4:00pm", duration: 2, type: "meeting", day: "Saturday" },
]
