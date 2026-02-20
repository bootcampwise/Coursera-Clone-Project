import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { courseApi } from "../../../services/courseApi";
import adminApi from "../../../services/adminApiClient";
import { toast } from "react-hot-toast";

export type CourseStatus = "Draft" | "Published";

export interface CourseFormState {
  title: string;
  subtitle: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  price: string;
  status: CourseStatus;
  description: string;
  outcomes: string;
  instructorId?: string;
}

export const useCreateCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = Boolean(id);
  const isAdmin = location.pathname.includes("/admin");

  const [form, setForm] = useState<CourseFormState>({
    title: "",
    subtitle: "",
    category: "Development",
    difficulty: "Beginner",
    language: "English",
    price: "0",
    status: "Draft",
    description: "",
    outcomes: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [existingThumbnail, setExistingThumbnail] = useState<string>("");
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [showThumbnailInput, setShowThumbnailInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [instructors, setInstructors] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchCourse = async () => {
        try {
          const data = await courseApi.getCourseById(id);
          const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
          const difficulty = validDifficulties.includes(data.difficulty)
            ? (data.difficulty as "Beginner" | "Intermediate" | "Advanced")
            : "Beginner";
          setForm({
            title: data.title || "",
            subtitle: data.subtitle || "",
            category: data.category || "Development",
            difficulty: difficulty,
            language: data.language || "English",
            price: String(data.price ?? 0),
            status: (data.status as CourseStatus) || "Draft",
            description: data.description || "",
            outcomes: data.outcomes || "",
          });

          if (data.thumbnail) {
            setExistingThumbnail(data.thumbnail);
          }
          setThumbnailFile(null);
        } catch (error) {
          toast.error("Failed to fetch course details");
        } finally {
          setFetching(false);
        }
      };
      fetchCourse();
    }
  }, [id, isEditMode]);

  useEffect(() => {
    if (isAdmin && !isEditMode) {
      const fetchInstructors = async () => {
        try {
          const response = await adminApi.get("/users?role=instructor");
          setInstructors(response.data.users || []);
        } catch (error) {
          toast.error("Failed to load instructors");
        }
      };
      fetchInstructors();
    }
  }, [isAdmin, isEditMode]);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        ...(isAdmin && !isEditMode && { instructorId: form.instructorId }),
      };

      if (isEditMode && id) {
        await courseApi.updateCourse(id, payload);

        if (thumbnailFile) {
          await courseApi.uploadCourseThumbnail(id, thumbnailFile);
        } else if (thumbnailUrl.trim()) {
          await courseApi.updateCourse(id, { thumbnail: thumbnailUrl });
        }
        toast.success("Course updated successfully");
      } else {
        const newCourse = await courseApi.createCourse(payload);
        if (thumbnailFile && newCourse?.id) {
          await courseApi.uploadCourseThumbnail(newCourse.id, thumbnailFile);
        } else if (thumbnailUrl.trim() && newCourse?.id) {
          await courseApi.updateCourse(newCourse.id, {
            thumbnail: thumbnailUrl,
          });
        }
        toast.success("Course created successfully");
        navigate(
          location.pathname.includes("/admin")
            ? `/admin/courses`
            : `/instructor/courses`
        );
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    isEditMode,
    isAdmin,
    form,
    thumbnailFile,
    thumbnailUrl,
    existingThumbnail,
    uploadMethod,
    showThumbnailInput,
    loading,
    fetching,
    instructors,
    setThumbnailFile,
    setThumbnailUrl,
    setUploadMethod,
    setShowThumbnailInput,
    onChange,
    onSubmit,
    navigate,
    location,
  };
};
