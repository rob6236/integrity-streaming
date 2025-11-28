// app/creator-studio/projects/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

type ProjectStatus = "active" | "archived";
type Aspect = "16:9" | "9:16";
type Destination = "videos" | "shorts" | "tiktok";

type ProjectItem = {
  id: string;
  title: string;
  status: ProjectStatus;
  aspect: Aspect;
  destination: Destination;
  lastEdited: string;
};

const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Integrity Streaming — Episode 1",
    status: "active",
    aspect: "16:9",
    destination: "videos",
    lastEdited: "Today • 2:14 PM",
  },
  {
    id: "p2",
    title: "Integrity Streaming — Channel Trailer",
    status: "active",
    aspect: "9:16",
    destination: "shorts",
    lastEdited: "Yesterday • 7:03 PM",
  },
  {
    id: "p3",
    title: "Quick Tip: Upload Workflow",
    status: "archived",
    aspect: "16:9",
    destination: "videos",
    lastEdited: "Nov 02 • 4:31 PM",
  },
  {
    id: "p4",
    title: "Vertical Clip Pack",
    status: "active",
    aspect: "9:16",
    destination: "tiktok",
    lastEdited: "Oct 29 • 9:18 AM",
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>("active");

  const filteredProjects = useMemo(
    () => MOCK_PROJECTS.filter((p) => p.status === statusFilter),
    [statusFilter]
  );

  const handleDuplicate = (project: ProjectItem) => {
    alert(`Duplicate project (mock): "${project.title}"`);
  };

  const handleDelete = (project: ProjectItem) => {
    const ok = confirm(
      `Delete project (mock) "${project.title}"?\nThis is a UI-only confirmation.`
    );
    if (ok) {
      alert("Project deleted (mock only, nothing actually removed).");
    }
  };

  return (
    <div
      className="projects-root"
      style={{
        minHeight: "100vh",
        background: BURGUNDY,
        color: IVORY,
        padding: 24,
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        .projects-root {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .projects-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .projects-top-left {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .projects-top-btn {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .projects-top-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .projects-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .projects-title-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .projects-title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .projects-subtitle {
          font-size: 12px;
          font-weight: 700;
          opacity: 0.9;
        }

        .projects-header-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .projects-btn {
          padding: 8px 18px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: ${IVORY};
        }

        .projects-btn-primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .projects-filter-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .projects-filter-btn {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .projects-filter-btn.active {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .projects-card {
          background: rgba(0, 0, 0, 0.34);
          border-radius: 18px;
          padding: 14px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .projects-thumb {
          width: 100%;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            rgba(255, 215, 0, 0.22),
            rgba(255, 249, 240, 0.06)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .projects-thumb.aspect-16-9 {
          aspect-ratio: 16 / 9;
        }

        .projects-thumb.aspect-9-16 {
          aspect-ratio: 9 / 16;
        }

        .projects-thumb-inner {
          width: 92%;
          height: 86%;
          border-radius: 10px;
          border: 2px solid ${GOLD};
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          padding: 6px;
          box-sizing: border-box;
        }

        .projects-meta-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .projects-name {
          font-size: 13px;
          font-weight: 700;
        }

        .projects-chip {
          padding: 3px 10px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .projects-meta-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          opacity: 0.9;
        }

        .projects-meta-bottom span {
          font-weight: 700;
        }

        .projects-buttons-column {
          margin-top: 4px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        .projects-action-btn {
          width: 100%;
          max-width: 240px;
          padding: 8px 10px;
          border-radius: 9999px;
          border: 1px solid ${GOLD};
          background: transparent;
          color: ${IVORY};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
        }

        .projects-action-btn.primary {
          background: ${GOLD};
          color: ${BURGUNDY};
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .projects-root {
            padding: 16px;
          }

          .projects-top-bar {
            align-items: flex-start;
          }

          .projects-header-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .projects-title {
            font-size: 20px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .projects-action-btn {
            max-width: 100%;
          }
        }
      `}</style>

      {/* Top bar / breadcrumbs */}
      <div className="projects-top-bar">
        <div className="projects-top-left">
          <button
            className="projects-top-btn"
            onClick={() => router.push("/creator-studio")}
          >
            ← Back to Creator Studio
          </button>
          <span>Projects</span>
        </div>
        <button
          className="projects-top-btn projects-top-btn-primary"
          onClick={() => router.push("/creator-studio/library")}
        >
          Go to Content Library
        </button>
      </div>

      {/* Header */}
      <div className="projects-header-row">
        <div className="projects-title-block">
          <div className="projects-title">Projects</div>
          <div className="projects-subtitle">
            Manage editing projects before rendering and publishing.
          </div>
        </div>
        <div className="projects-header-actions">
          <button
            className="projects-btn"
            onClick={() => alert("Import project (mock).")}
          >
            Import project (mock)
          </button>
          <button
            className="projects-btn projects-btn-primary"
            onClick={() => alert("Create new project (mock).")}
          >
            New project
          </button>
        </div>
      </div>

      {/* Status filter */}
      <div className="projects-filter-row">
        <button
          className={`projects-filter-btn ${
            statusFilter === "active" ? "active" : ""
          }`}
          onClick={() => setStatusFilter("active")}
        >
          Active
        </button>
        <button
          className={`projects-filter-btn ${
            statusFilter === "archived" ? "active" : ""
          }`}
          onClick={() => setStatusFilter("archived")}
        >
          Archived
        </button>
      </div>

      {/* Grid of project cards */}
      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              opacity: 0.85,
              fontSize: 14,
              fontWeight: 700,
              padding: 32,
              borderRadius: 16,
              border: `1px dashed ${GOLD}`,
            }}
          >
            No projects in this view.
            <br />
            <span style={{ fontSize: 12 }}>
              Try switching between Active and Archived, or create a new project.
            </span>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="projects-card">
              {/* Thumbnail */}
              <div
                className={`projects-thumb ${
                  project.aspect === "16:9"
                    ? "aspect-16-9"
                    : "aspect-9-16"
                }`}
              >
                <div className="projects-thumb-inner">
                  {project.aspect === "16:9"
                    ? "16:9 project preview placeholder"
                    : "9:16 project preview placeholder"}
                </div>
              </div>

              {/* Meta */}
              <div className="projects-meta-top">
                <div className="projects-name">{project.title}</div>
                <div className="projects-chip">
                  {project.destination.toUpperCase()}
                </div>
              </div>
              <div className="projects-meta-bottom">
                <span>{project.lastEdited}</span>
                <span>{project.status === "active" ? "ACTIVE" : "ARCHIVED"}</span>
              </div>

              {/* Centered action buttons */}
              <div className="projects-buttons-column">
                <button
                  className="projects-action-btn primary"
                  onClick={() =>
                    router.push(`/creator-studio/editor?projectId=${project.id}`)
                  }
                >
                  Open editor
                </button>
                <button
                  className="projects-action-btn"
                  onClick={() =>
                    router.push(
                      `/creator-studio/projects/${project.id}/render-setup`
                    )
                  }
                >
                  Render setup
                </button>
                <button
                  className="projects-action-btn"
                  onClick={() =>
                    router.push(
                      `/creator-studio/content/${project.id}/details`
                    )
                  }
                >
                  Video details
                </button>
                <button
                  className="projects-action-btn"
                  onClick={() => handleDuplicate(project)}
                >
                  Duplicate (mock)
                </button>
                <button
                  className="projects-action-btn"
                  onClick={() => handleDelete(project)}
                >
                  Delete (mock)
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
