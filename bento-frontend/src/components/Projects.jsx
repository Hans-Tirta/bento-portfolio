import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Eye } from "lucide-react";
import projects from "../components/data/projects.jsx";
import ProjectModal from "./ProjectModal.jsx";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colors } = useTheme();

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-2xl p-4 sm:p-6 shadow flex flex-col"
        style={{ backgroundColor: colors.light }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: colors.deep }}>
            🛠️ Projects
          </h2>
          <div className="text-sm" style={{ color: colors.muted }}>
            {projects.length} Projects
          </div>
        </div>

        <div className="overflow-auto grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border"
                style={{
                  backgroundColor: `${colors.soft}4D`,
                  borderColor:
                    hoveredIndex === index ? colors.muted : colors.soft,
                  borderWidth: "1px",
                }}
                onClick={() => openModal(project)}
              >
                {/* Project Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-lg font-semibold line-clamp-1"
                      style={{ color: colors.deep }}
                    >
                      {project.title}
                    </h3>
                    <span
                      className="px-2 py-1 text-xs rounded-full font-medium ml-2 flex-shrink-0"
                      style={{
                        backgroundColor: `${colors.muted}20`,
                        color: colors.deep,
                      }}
                    >
                      {project.type}
                    </span>
                  </div>

                  <p
                    className="text-sm mb-3 line-clamp-2"
                    style={{ color: colors.muted }}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: `${colors.muted}15`,
                          color: colors.deep,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: `${colors.muted}15`,
                          color: colors.muted,
                        }}
                      >
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <motion.div
                    className="flex items-center justify-between"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.7,
                      x: hoveredIndex === index ? 5 : 0,
                    }}
                  >
                    <div
                      className="flex items-center text-sm gap-1"
                      style={{ color: colors.deep }}
                    >
                      <Eye size={16} />
                      View Details
                    </div>
                    <motion.div
                      animate={{
                        x: hoveredIndex === index ? 5 : 0,
                      }}
                      className="text-sm"
                      style={{ color: colors.muted }}
                    >
                      →
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
