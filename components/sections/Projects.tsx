'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/animations/ScrollReveal'
import HeadingReveal from '@/components/animations/HeadingReveal'
import Principle from '@/components/Principle'
import MarginNote from '@/components/MarginNote'
import { ExternalLink, Github, X } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  problem: string
  constraint: string
  decision: string
  tech: string[]
  scale?: string
  github?: string
  live?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Real-time Chat Application',
    description: 'Scalable chat platform supporting 10,000+ concurrent users',
    problem: 'Need real-time messaging at scale without sacrificing message reliability.',
    constraint: 'Must handle 10,000+ concurrent connections with sub-100ms latency.',
    decision: 'Chose Socket.io for real-time transport, PostgreSQL for persistence, and Redis for pub/sub to decouple scaling concerns.',
    longDescription: 'A high-performance real-time chat application built with Socket.io and PostgreSQL. Features include message persistence, user presence, typing indicators, and file sharing. Optimized for low latency and high concurrency.',
    tech: ['Socket.io', 'PostgreSQL', 'Node.js', 'React', 'Redis'],
    scale: '10,000+ concurrent users',
  },
  {
    id: 2,
    title: 'AI Blogging Platform',
    description: 'Automated content generation platform with 5,000+ AI-generated articles',
    problem: 'Generate high-quality content at scale while maintaining SEO and readability.',
    constraint: 'API costs must remain predictable, and content must pass human quality checks.',
    decision: 'Built a pipeline that generates drafts, validates quality, then optimizes for SEO—separating generation from optimization.',
    longDescription: 'An AI-powered blogging platform that generates high-quality articles using GPT models. Features automated SEO optimization, content scheduling, and multi-format publishing. Built with Next.js and integrated with OpenAI API.',
    tech: ['Next.js', 'GPT', 'OpenAI API', 'PostgreSQL', 'Vercel'],
    scale: '5,000+ articles generated',
  },
  {
    id: 3,
    title: 'Serverless Processing System',
    description: 'Scalable serverless architecture for data processing',
    problem: 'Process variable workloads without maintaining always-on infrastructure.',
    constraint: 'Must handle both batch and real-time streams, with cost optimization as a priority.',
    decision: 'Used AWS Lambda for compute, Kafka for event streaming, and S3 for durable storage—paying only for actual processing time.',
    longDescription: 'A serverless data processing system built on AWS Lambda with Docker containers. Handles batch processing, real-time data streams, and automated scaling. Features include event-driven architecture and cost optimization.',
    tech: ['AWS Lambda', 'Docker', 'Node.js', 'Kafka', 'S3'],
  },
  {
    id: 4,
    title: 'Image Manipulation Tool',
    description: 'Web-based image editor with 3,500+ active users',
    problem: 'Enable complex image operations in the browser without blocking the UI.',
    constraint: 'Must work on mid-range devices and handle large images without crashing.',
    decision: 'Moved heavy processing to Web Workers, used Canvas API for rendering, and implemented progressive loading to keep the main thread responsive.',
    longDescription: 'A powerful React-based image manipulation tool with features like filters, cropping, resizing, and format conversion. Optimized for performance with canvas API and Web Workers for heavy processing.',
    tech: ['React', 'Canvas API', 'TypeScript', 'Tailwind CSS'],
    scale: '3,500+ active users',
  },
  {
    id: 5,
    title: 'Secure Document Sharing App',
    description: 'End-to-end encrypted document sharing platform',
    problem: 'Share sensitive documents securely without trusting the server.',
    constraint: 'Encryption must be transparent to users, and key management must be foolproof.',
    decision: 'Implemented end-to-end encryption with client-side key generation, using native encryption libraries for performance and security.',
    longDescription: 'A React Native mobile application for secure document sharing with end-to-end encryption. Features include file encryption, secure key exchange, access control, and audit logs. Built with React Native and native encryption libraries.',
    tech: ['React Native', 'E2E Encryption', 'Node.js', 'PostgreSQL'],
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-32 px-6 sm:px-8 lg:px-12 relative">
      <MarginNote position="right" delay={0.4}>
        Every project is a hypothesis. I test, measure, iterate.
      </MarginNote>
      <div className="max-w-5xl mx-auto">
        <HeadingReveal>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-8 tracking-tight text-center">
            Projects
          </h2>
        </HeadingReveal>

        <Principle delay={0.05}>
          Every technical decision is a trade-off. I document the problem, constraint, and reasoning.
        </Principle>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <div
                className="p-8 border border-border rounded-lg bg-surface shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <h3 className="text-2xl font-semibold mb-4 text-text">
                  {project.title}
                </h3>
                <div className="space-y-3 mb-6 text-sm text-text-secondary leading-relaxed">
                  <p><span className="font-medium text-text">Problem:</span> {project.problem}</p>
                  <p><span className="font-medium text-text">Constraint:</span> {project.constraint}</p>
                  <p className="italic"><span className="font-medium text-text">Decision:</span> {project.decision}</p>
                </div>
                {project.scale && (
                  <p className="text-sm text-accent mb-4 font-medium">
                    {project.scale}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-bg border border-border rounded text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-3 py-1 text-xs text-text-secondary">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-surface border border-border rounded-lg p-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 hover:bg-bg rounded transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-3xl font-semibold mb-6 text-text">
                {selectedProject.title}
              </h3>
              
              <div className="space-y-4 mb-8 p-6 bg-bg rounded-lg border border-border">
                <p className="text-base text-text-secondary leading-relaxed">
                  <span className="font-medium text-text">Problem:</span> {selectedProject.problem}
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  <span className="font-medium text-text">Constraint:</span> {selectedProject.constraint}
                </p>
                <p className="text-base text-text-secondary italic leading-relaxed">
                  <span className="font-medium text-text">Decision:</span> {selectedProject.decision}
                </p>
              </div>

              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {selectedProject.scale && (
                <p className="text-accent font-medium mb-6">
                  {selectedProject.scale}
                </p>
              )}

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-text">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-bg border border-border rounded text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(selectedProject.github || selectedProject.live) && (
                <div className="flex gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-bg transition-colors duration-200"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded hover:opacity-90 transition-opacity duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
