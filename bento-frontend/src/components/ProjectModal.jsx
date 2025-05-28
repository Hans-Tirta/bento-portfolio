import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ExternalLink, Github, Code, Users, Star, X } from "lucide-react";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { colors } = useTheme();

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="scrollable-container max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl shadow-2xl"
              style={{ backgroundColor: colors.light }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="sticky top-0 p-4 border-b"
                style={{
                  backgroundColor: colors.light,
                  borderColor: `${colors.soft}66`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2
                        className="text-2xl font-bold"
                        style={{ color: colors.deep }}
                      >
                        {project.title}
                      </h2>
                      <span
                        className="px-3 py-1 text-sm rounded-full font-medium"
                        style={{
                          backgroundColor: `${colors.muted}20`,
                          color: colors.deep,
                        }}
                      >
                        {project.type}
                      </span>
                    </div>
                    <p
                      className="text-lg font-medium"
                      style={{ color: colors.muted }}
                    >
                      {project.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
                    style={{ backgroundColor: `${colors.muted}10` }}
                  >
                    <X size={20} style={{ color: colors.muted }} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Project Image */}
                <div className="rounded-xl overflow-hidden ">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover object-center"
                  />
                </div>

                {/* Description */}
                <div>
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: colors.deep }}
                  >
                    About This Project
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: colors.deep }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={18} style={{ color: colors.muted }} />
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: colors.deep }}
                    >
                      Key Features
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {project.keyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: colors.muted }}
                        />
                        <span style={{ color: colors.deep }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies & Tools */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Code size={18} style={{ color: colors.muted }} />
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: colors.deep }}
                      >
                        Technologies
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-2 text-sm rounded-lg font-medium"
                          style={{
                            backgroundColor: `${colors.muted}15`,
                            color: colors.deep,
                            border: `1px solid ${colors.muted}30`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={18} style={{ color: colors.muted }} />
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: colors.deep }}
                      >
                        Tools Used
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-2 text-sm rounded-lg"
                          style={{
                            backgroundColor: `${colors.muted}15`,
                            color: colors.deep,
                            border: `1px solid ${colors.muted}30`,
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="flex items-center gap-4 pt-4 border-t"
                  style={{ borderColor: `${colors.soft}66` }}
                >
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
                    style={{
                      backgroundColor: `${colors.muted}15`,
                      color: colors.deep,
                      border: `1px solid ${colors.muted}30`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${colors.muted}25`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                    View Source Code
                  </motion.a>

                  {project.liveDemo && (
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
                      style={{
                        backgroundColor: colors.muted,
                        color: "white",
                      }}
                      whileHover={{
                        scale: 1.05,
                        opacity: 0.9,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      View Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
