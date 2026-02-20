import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { courseApi } from "../../services/courseApi";
import type { SearchCourseResult } from "../../types";

const CATEGORY_MAPPING: Record<string, string> = {
  "data science": "Data Science",
  "computer science": "Computer Science",
  "information technology": "Information Technology",
  business: "Business",
  development: "Computer Science",
};

const DIFFICULTY_MAPPING: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const useSearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("search") || "";
  const [courses, setCourses] = useState<SearchCourseResult[]>([]);
  const [allCourses, setAllCourses] = useState<SearchCourseResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [filters, setFilters] = useState({
    subjects: [] as string[],
    skills: [] as string[],
    levels: [] as string[],
    durations: [] as string[],
    products: [] as string[],
    educators: [] as string[],
    languages: [] as string[],
    subtitles: [] as string[],
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const initializeFiltersFromQuery = (searchQuery: string) => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const newFilters: typeof filters = {
      subjects: [],
      skills: [],
      levels: [],
      durations: [],
      products: [],
      educators: [],
      languages: [],
      subtitles: [],
    };

    if (CATEGORY_MAPPING[normalizedQuery]) {
      newFilters.subjects.push(CATEGORY_MAPPING[normalizedQuery]);
    }

    if (DIFFICULTY_MAPPING[normalizedQuery]) {
      newFilters.levels.push(DIFFICULTY_MAPPING[normalizedQuery]);
    }

    return newFilters;
  };

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await courseApi.getCourses({ search: query });
        const mappedResults = response.courses.map(
          (c: Record<string, any>) => ({
            id: c.id || `course-${Math.random()}`,
            image:
              c.thumbnail ||
              "https://images.unsplash.com/photo-1620712943543-bcc4628c6757?w=800&auto=format&fit=crop&q=60",
            logo:
              c.instructor?.avatarUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            provider: c.instructor?.name || "Professional Instructor",
            title: c.title,
            description:
              c.outcomes ||
              c.description?.substring(0, 100) + "..." ||
              "Course skills",
            rating: 4.8,
            reviews: "1.2k",
            type: `${c.difficulty || "Beginner"} · Course`,
            category: c.category,
            difficulty: c.difficulty,
            language: c.language,
          })
        );
        setAllCourses(mappedResults);
        setCourses(mappedResults);

        const initialFilters = initializeFiltersFromQuery(query);
        setFilters(initialFilters);
      } catch (error) {
        // Error searching courses handles silently
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    const hasActiveFilters =
      filters.subjects.length > 0 ||
      filters.skills.length > 0 ||
      filters.levels.length > 0 ||
      filters.durations.length > 0 ||
      filters.products.length > 0 ||
      filters.educators.length > 0 ||
      filters.languages.length > 0 ||
      filters.subtitles.length > 0;

    if (!hasActiveFilters) {
      setCourses(allCourses);
      return;
    }

    const filtered = allCourses.filter((course) => {
      if (filters.subjects.length > 0) {
        const matchesSubject = filters.subjects.some(
          (subject) =>
            course.category?.toLowerCase() === subject.toLowerCase() ||
            course.title?.toLowerCase().includes(subject.toLowerCase())
        );
        if (!matchesSubject) return false;
      }

      if (filters.levels.length > 0) {
        const matchesLevel = filters.levels.some(
          (level) => course.difficulty?.toLowerCase() === level.toLowerCase()
        );
        if (!matchesLevel) return false;
      }

      if (filters.languages.length > 0) {
        const matchesLanguage = filters.languages.some(
          (lang) => course.language?.toLowerCase() === lang.toLowerCase()
        );
        if (!matchesLanguage) return false;
      }

      return true;
    });

    setCourses(filtered);
    setCurrentPage(1);
  }, [filters, allCourses]);

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category as keyof typeof prev];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [category]: newValues,
      };
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCourses = courses.slice(startIndex, endIndex);

  return {
    query,
    courses,
    isLoading,
    currentPage,
    itemsPerPage,
    filters,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen,
    handleFilterChange,
    handlePageChange,
    displayedCourses,
  };
};
