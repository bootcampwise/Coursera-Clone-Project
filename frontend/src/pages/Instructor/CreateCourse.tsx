import React, { useState } from "react";

type CourseStatus = "Draft" | "Published";

interface CourseFormState {
  title: string;
  subtitle: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  price: string;
  status: CourseStatus;
  description: string;
  outcomes: string;
}

const CreateCourse: React.FC = () => {
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

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: wire to API later
    console.log("CreateCourse submit", form);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Course</h1>
        <p className="text-sm text-gray-500">Build a course draft with clean metadata and outcomes.</p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-6">Course Details</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  placeholder="e.g. React Fundamentals"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  name="subtitle"
                  value={form.subtitle}
                  onChange={onChange}
                  placeholder="Short value proposition for learners"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>Development</option>
                    <option>Business</option>
                    <option>Design</option>
                    <option>Data Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={onChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    name="language"
                    value={form.language}
                    onChange={onChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>English</option>
                    <option>Urdu</option>
                    <option>Arabic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="Write a clear course description for learners..."
                  rows={5}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Outcomes</label>
                <textarea
                  name="outcomes"
                  value={form.outcomes}
                  onChange={onChange}
                  placeholder="Example: Build reusable React components, Manage state with hooks..."
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">Tip: keep outcomes action-oriented and measurable.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-6">Publishing</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={onChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={onChange}
                  inputMode="decimal"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">Set 0 for free courses.</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-all"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-all shadow-sm"
              >
                Create Course
              </button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-2">Next Steps</h2>
            <p className="text-sm text-gray-500">After creating the course, upload videos and arrange lessons.</p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {[
                { title: "Upload videos", desc: "Add lesson videos and assets." },
                { title: "Structure lessons", desc: "Organize modules and lessons." },
                { title: "Preview & publish", desc: "Validate content before publishing." },
              ].map((n) => (
                <div key={n.title} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="text-sm font-semibold text-gray-900">{n.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{n.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;

