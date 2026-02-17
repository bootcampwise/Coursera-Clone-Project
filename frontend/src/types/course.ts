export interface Lesson {
  id: string;
  title: string;
  type: 'VIDEO' | 'READING' | 'ASSESSMENT';
  content?: string;
  videoUrl?: string;
  readingUrl?: string;
  updatedAt?: string;
  order: number;
  duration?: number;
  description?: string;
  parsedContent?: {
    questions?: Array<{ id: string | number; question: string; options: string[]; correctAnswer: string; explanation?: string }>;
    passingScore?: number;
    title?: string;
    instructions?: string;
  };
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  order: number;
  duration?: number;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  instructor?: Instructor;
  instructorId?: string;
  thumbnail?: string;
  image?: string;
  logo?: string;
  university?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: number;
  durationMinutes?: number;
  durationHours?: number;
  enrollmentCount?: number;
  rating?: number;
  reviewCount?: number;
  price?: number;
  modules: Module[];
  updatedAt?: string;
  createdAt?: string;
  category?: string;
  language?: string;
  skillsOffered?: string[];
  status?: 'Draft' | 'Published' | 'Archived';
  type?: string;
  partner?: string;
  partnerLogo?: string;
  outcomes?: string[];
  grade?: number;
  learnerName?: string;
  issuedAt?: string;
  partnerName?: string;
  verificationCode?: string;
  certificateUrl?: string;
  courseTitle?: string;
}

export interface CourseCard {
  id: string;
  university: string;
  logo: string;
  title: string;
  type: string;
  image: string;
}
