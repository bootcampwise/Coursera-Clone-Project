import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import { certificateApi } from "../../services/certificateApi";
import { courseApi } from "../../services/courseApi";
import { IMAGES } from "../../constants/images";
import type {
  CertificateDisplayItem,
  CourseDisplayCard,
  UpNextCourse,
  Certificate,
  Course,
} from "../../types";

export const useAccomplishments = () => {
  const [certificateItems, setCertificateItems] = useState<
    CertificateDisplayItem[]
  >([]);
  const [topPickCourses, setTopPickCourses] = useState<CourseDisplayCard[]>([]);
  const [topPicksVisibleCount, setTopPicksVisibleCount] = useState(4);
  const [recentlyViewedCourses, setRecentlyViewedCourses] = useState<
    CourseDisplayCard[]
  >([]);
  const [recentlyViewedVisibleCount, setRecentlyViewedVisibleCount] =
    useState(4);
  const [degreesVisibleCount, setDegreesVisibleCount] = useState(4);
  const [upNextCourses, setUpNextCourses] = useState<UpNextCourse[]>([]);
  const [activeCertificateTab, setActiveCertificateTab] = useState<
    "mastertrack" | "university"
  >("mastertrack");

  const { user } = useSelector((state: RootState) => state.auth);
  const studentName = user?.name || "Learner";
  const completedCourseName =
    certificateItems[0]?.title || "Google Prompting Essentials Specialization";

  const degreeItems = [
    {
      university: "University of Illinois Tech",
      degree: "Master of Science in Management (IMSM)",
      image: IMAGES.DEGREE.DEGREE_1,
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      university: "University of Hunders",
      degree: "MSc Management",
      image: IMAGES.DEGREE.HUNDERS,
      universityIcon: IMAGES.EARN_DEGREE.ICON_2,
    },
    {
      university: "Illinois Tech",
      degree: "Master of Bussiness Administration",
      image: IMAGES.DEGREE.ILLINOIS_TECH,
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
    {
      university: "Illinois Tech",
      degree: "Master of Data Science",
      image: IMAGES.DEGREE.DEGREE_2,
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
  ];

  const masterTrackCertificates = [
    {
      title: "Diplomado en Analítica de los Negocios",
      image: IMAGES.MASTERTRACK.MT1,
      university: "Pontificia Universidad",
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      title: "Administración de Empresas: Certificado MasterTrack",
      image: IMAGES.MASTERTRACK.MT2,
      university: "Universidad de P",
      universityIcon: IMAGES.EARN_DEGREE.ICON_2,
    },
    {
      title: "Certificado en Finanzas Corporativas MasterTrack",
      image: IMAGES.MASTERTRACK.MT3,
      university: "Pontificia Universidad",
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      title: "Instructional Design MasterTrack Certificate",
      image: IMAGES.MASTERTRACK.MT4,
      university: "University of Illinois Tech",
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
  ];

  const universityCertificates = [
    {
      title: "Data Visualization and Communication Certificate",
      image: IMAGES.MASTERTRACK.MT1,
      university: "University of Illinois Tech",
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
    {
      title: "Strategic Management Certificate",
      image: IMAGES.MASTERTRACK.MT2,
      university: "University of Hunders",
      universityIcon: IMAGES.EARN_DEGREE.ICON_2,
    },
    {
      title: "Applied Business Analytics Certificate",
      image: IMAGES.MASTERTRACK.MT3,
      university: "Pontificia Universidad",
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      title: "Digital Leadership Certificate",
      image: IMAGES.MASTERTRACK.MT4,
      university: "Illinois Tech",
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
  ];

  const certificateDisplayItems =
    activeCertificateTab === "mastertrack"
      ? masterTrackCertificates
      : universityCertificates;

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certs = await certificateApi.getMyCertificates();
        const items = (certs || []).map((c: Certificate) => ({
          id: c.id,
          title: c.courseTitle,
          type: c.partnerName || c.course?.instructor?.name || "Course",
          image:
            c.imageUrl ||
            c.course?.thumbnail ||
            "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7.jpeg",
          grade:
            typeof c.grade === "number" ? `${c.grade.toFixed(2)}%` : undefined,
        }));
        setCertificateItems(items);
      } catch (err) {
        // Fetch certificates failed
      }
    };
    fetchCertificates();
  }, []);

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const result = await courseApi.getCourses({ limit: 100 });
        const courses = result?.courses || [];
        const formatted = courses.map((course: Course) => ({
          title: course.title,
          provider: course.partner || course.instructor?.name || "Google",
          image: course.thumbnail,
          logo: course.partnerLogo || IMAGES.LOGOS.GOOGLE_LOGO,
          type: course.type || "Course",
        }));
        setTopPickCourses(formatted);
      } catch (err) {
        // Fetch top picks failed
      }
    };
    fetchTopPicks();
  }, []);

  useEffect(() => {
    const fetchUpNextCourses = async () => {
      try {
        const result = await courseApi.getCourses({ limit: 100 });
        const courses = result?.courses || [];
        const filtered = courses.filter(
          (course: Course) => course.title !== completedCourseName
        );
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3).map(
          (course: Course): UpNextCourse => ({
            title: course.title,
            image: course.thumbnail || "https://via.placeholder.com/300x200",
          })
        );
        setUpNextCourses(selected);
      } catch (err) {
        // Fetch up next courses failed
      }
    };
    fetchUpNextCourses();
  }, [completedCourseName]);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const recentlyViewedData = await courseApi.getRecentlyViewed();
        const formatted = recentlyViewedData.map((course: Course) => ({
          title: course.title,
          provider: course.instructor?.name || "Google",
          image: course.thumbnail,
          logo: IMAGES.LOGOS.GOOGLE_LOGO,
          type: "Course",
        }));
        setRecentlyViewedCourses(formatted);
      } catch (err) {
        // Fetch recently viewed courses failed
      }
    };
    fetchRecentlyViewed();
  }, []);

  const topPicksRemaining = topPickCourses.length - topPicksVisibleCount;
  const degreesRemaining = degreeItems.length - degreesVisibleCount;
  const showMoreDegrees = degreesRemaining > 0;
  const recentlyViewedRemaining =
    recentlyViewedCourses.length - recentlyViewedVisibleCount;

  return {
    certificateItems,
    topPickCourses,
    topPicksVisibleCount,
    setTopPicksVisibleCount,
    recentlyViewedCourses,
    recentlyViewedVisibleCount,
    setRecentlyViewedVisibleCount,
    degreesVisibleCount,
    setDegreesVisibleCount,
    upNextCourses,
    activeCertificateTab,
    setActiveCertificateTab,
    studentName,
    completedCourseName,
    degreeItems,
    certificateDisplayItems,
    topPicksRemaining,
    degreesRemaining,
    showMoreDegrees,
    recentlyViewedRemaining,
  };
};
