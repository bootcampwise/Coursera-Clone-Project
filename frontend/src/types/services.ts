// imported course types were unused here; keep this file focused on service payloads

export interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  difficulty?: string;
  price: number;
  thumbnail?: string;
  language?: string;
  prerequisites?: string[];
}

export interface UpdateCourseData extends Partial<CreateCourseData> {
  id?: string;
}

export interface CreateModuleData {
  title: string;
  order?: number;
  description?: string;
}

export interface UpdateModuleData extends Partial<CreateModuleData> {
  id?: string;
}

export interface CreateLessonData {
  title: string;
  type: 'VIDEO' | 'READING' | 'ASSESSMENT';
  content?: string;
  description?: string;
  order?: number;
  duration?: number;
  thumbnail?: string;
  videoUrl?: string;
  readingContent?: string;
  questions?: unknown[];
}

export interface UpdateLessonData extends Partial<CreateLessonData> {
  id?: string;
}

export interface ReorderItem {
  id: string;
  order: number;
}

export interface CourseSearchParams {
  category?: string;
  difficulty?: string;
  search?: string;
  page?: number;
  limit?: number;
}
