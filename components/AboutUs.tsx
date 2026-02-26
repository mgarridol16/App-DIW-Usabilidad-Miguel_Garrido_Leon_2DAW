import React from "react";

interface AboutUsProps {
  onGoBack: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onGoBack }) => {
  return (
    <main className="bg-white rounded-4 shadow-sm border p-4 p-lg-5">
      {/* BACK BUTTON */}
      <div className="mb-5">
        <button
          onClick={onGoBack}
          className="btn btn-outline-secondary btn-sm"
          aria-label="Go back to previous page"
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back
        </button>
      </div>

      {/* HEADER */}
      <header className="mb-5 pb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h1 className="display-4 fw-bold text-primary-emphasis mb-2">
              About Us
            </h1>
            <p className="fs-5 text-secondary">
              Meet the developer behind this academic project
            </p>
            <div className="border rounded mt-3 py-2 px-3 bg-white">
              <i className="fas fa-info-circle me-2 text-primary"></i>
              <strong>Academic Project:</strong> Web Interface Design Module
              Practice - 2nd Year DAW
            </div>
          </div>
          <div>
            <img
              src="/assets/europass-logo.png"
              alt="Europass Logo"
              style={{ height: "60px" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </header>

      <div className="row g-4">
        {/* =================================
            SECTION 1: ABOUT THE STUDENT
            ================================= */}
        <div className="col-lg-8">
          <article>
            <section className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <img
                  src="/assets/profile-photo.jpg"
                  alt="Miguel Garrido León"
                  className="rounded-circle me-4"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "4px solid #0d6efd",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="%230d6efd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="48" font-family="Arial">MG</text></svg>';
                  }}
                />
                <div>
                  <h2 className="h3 fw-bold text-dark mb-1">
                    Miguel Garrido León
                  </h2>
                  <p className="text-secondary mb-0">
                    2nd Year DAW Student • Web Development & Interfaces
                  </p>
                  <p className="text-muted small mt-1 mb-0">
                    <i className="fas fa-map-marker-alt me-1"></i>Santa Cruz de
                    Mudela, Spain
                  </p>
                </div>
              </div>

              {/* PROFESSIONAL SUMMARY */}
              <section className="mb-4">
                <h3 className="h5 fw-bold text-dark mb-3">
                  <i className="fas fa-briefcase me-2 text-info"></i>
                  Professional Profile
                </h3>
                <p className="text-secondary fs-5 lh-lg">
                  Young passionate about computer science, currently studying
                  the second year of the Higher Level Training Cycle in Web
                  Application Development (DAW). With an entrepreneurial spirit,
                  I am characterized by being proactive, responsible and
                  oriented towards continuous improvement. I enjoy working in a
                  team and applying my skills to achieve common goals.
                  Additionally, I am enthusiastic about sports and competition,
                  which has taught me discipline, perseverance and resilience
                  that I apply in my professional life.
                </p>
              </section>

              {/* EDUCATION */}
              <section className="mb-4">
                <h3 className="h5 fw-bold text-dark mb-3">
                  <i className="fas fa-graduation-cap me-2 text-success"></i>
                  Academic Education
                </h3>
                <div className="list-group list-group-flush">
                  <div className="list-group-item border-0 ps-0 pb-3">
                    <h4 className="h6 fw-bold text-dark mb-1">
                      Higher Level Training Cycle in Web Application Development
                    </h4>
                    <p className="text-muted small mb-0">
                      IES Gregorio Prieto, Valdepeñas • In Progress
                      (19/07/2024-Present)
                    </p>
                    <p className="text-secondary mt-2">
                      Specialization in full-stack web development, HTML5, CSS3,
                      JavaScript, React, TypeScript and database management. EQF
                      Level: Level 5 EQF-MEC.
                    </p>
                  </div>

                  <div className="list-group-item border-0 ps-0 pb-3">
                    <h4 className="h6 fw-bold text-dark mb-1">
                      Technician in Administrative Management
                    </h4>
                    <p className="text-muted small mb-0">
                      IES Gregorio Prieto, Valdepeñas • Completed
                      (07/2021-06/2023)
                    </p>
                    <p className="text-secondary mt-2">
                      Training in administrative management, accounting and
                      business processes. EQF Level: Level 3 EQF-MEC.
                    </p>
                  </div>

                  <div className="list-group-item border-0 ps-0 pb-3">
                    <h4 className="h6 fw-bold text-dark mb-1">
                      Compulsory Secondary Education (ESO)
                    </h4>
                    <p className="text-muted small mb-0">
                      IES Máximo Laguna, Santa Cruz de Mudela • Completed
                      (07/2015-06/2020)
                    </p>
                    <p className="text-secondary mt-2">
                      EQF Level: Level 2 EQF-MEC
                    </p>
                  </div>
                </div>
              </section>

              {/* TECHNOLOGIES */}
              <section className="mb-4">
                <h3 className="h5 fw-bold text-dark mb-3">
                  <i className="fas fa-code me-2 text-danger"></i>
                  Digital Competencies & Skills
                </h3>
                <div className="row g-2">
                  <div className="col-md-6">
                    <h4 className="h6 fw-bold text-dark mb-2">Tools</h4>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <span className="badge bg-primary">
                          Microsoft Excel
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-primary">
                          Microsoft Office
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-primary">Gmail</span>
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-primary">Shopify</span>
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-primary">Social Media</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h4 className="h6 fw-bold text-dark mb-2">Soft Skills</h4>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <span className="badge bg-secondary">
                          Organization & Punctuality
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-secondary">Teamwork</span>
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-secondary">
                          Communication
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-secondary">
                          Problem Solving
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-secondary">
                          Responsibility
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* EXPERIENCE */}
              <section className="mb-4">
                <h3 className="h5 fw-bold text-dark mb-3">
                  <i className="fas fa-star me-2 text-warning"></i>
                  Work Experience
                </h3>
                <div className="list-group list-group-flush">
                  <div className="list-group-item border-0 ps-0 pb-3">
                    <h4 className="h6 fw-bold text-dark mb-1">
                      Ecommerce Store Development
                    </h4>
                    <p className="text-muted small mb-2">
                      01/08/2024 - Present • Personal Project
                    </p>
                    <p className="text-secondary">
                      Managing the development of an online store for a family
                      butcher shop using Shopify. Catalog configuration, secure
                      payment system implementation, UX/UI optimization and
                      integration of digital marketing tools.
                    </p>
                  </div>

                  <div className="list-group-item border-0 ps-0 pb-3">
                    <h4 className="h6 fw-bold text-dark mb-1">
                      Administrative - Family Business
                    </h4>
                    <p className="text-muted small mb-2">
                      20/06/2024 - 01/09/2024 • Freight Transport
                    </p>
                    <p className="text-secondary">
                      Administrative support: invoicing, document management,
                      payment/collection control, coordination with clients and
                      suppliers, transport records update and financial report
                      preparation.
                    </p>
                  </div>

                  <div className="list-group-item border-0 ps-0 pb-3">
                    <h4 className="h6 fw-bold text-dark mb-1">
                      Administrative Assistant (Internship)
                    </h4>
                    <p className="text-muted small mb-2">
                      04/04/2024 - 23/04/2024 • Pistachos del Valle SL
                    </p>
                    <p className="text-secondary">
                      Document management, invoicing, inventory control,
                      customer/supplier service, payment processing and
                      administrative management software handling.
                    </p>
                  </div>

                  <div className="list-group-item border-0 ps-0 pb-3">
                    <h4 className="h6 fw-bold text-dark mb-1">
                      Agricultural & Industrial Contributions
                    </h4>
                    <p className="text-muted small mb-2">
                      2021-2023 • Seasonal
                    </p>
                    <p className="text-secondary">
                      Experience in olive harvesting and classification,
                      bottling line work with quality control and compliance
                      with safety and hygiene regulations.
                    </p>
                  </div>
                </div>
              </section>

              {/* INTERESTS */}
              <section>
                <h3 className="h5 fw-bold text-dark mb-3">
                  <i className="fas fa-heart me-2 text-danger"></i>
                  Hobbies & Interests
                </h3>
                <div className="mb-3">
                  <h4 className="h6 fw-bold text-dark mb-2">
                    <i className="fas fa-biking me-2 text-primary"></i>Duathlon
                  </h4>
                  <p className="text-secondary">
                    I am an enthusiast of duathlon, a sport that combines
                    running and cycling. This discipline has taught me the
                    importance of discipline, perseverance and effort. Through
                    training and competitions, I have developed a mindset
                    focused on continuous improvement, effective time management
                    and resilience. The principles learned in sports competition
                    I apply in my professional and academic life.
                  </p>
                </div>

                <div>
                  <h4 className="h6 fw-bold text-dark mb-2">
                    <i className="fas fa-laptop me-2 text-info"></i>Web
                    Development & Technology
                  </h4>
                  <p className="text-secondary">
                    Passionate about learning new technologies, solving problems
                    through code and creating applications that improve user
                    experience. I am especially interested in modern web
                    development, intuitive interface design and the
                    implementation of innovative solutions.
                  </p>
                </div>
              </section>
            </section>
          </article>
        </div>

        {/* =================================
            SECTION 2: ACADEMIC CONTEXT
            ================================= */}
        <div className="col-lg-4">
          <aside>
            {/* CARD: ACADEMIC CONTEXT */}
            <div className="card border mb-4 rounded-4 shadow-sm bg-white">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold text-dark mb-3">
                  <i className="fas fa-book-open me-2 text-primary"></i>
                  Academic Context
                </h3>

                <div className="mb-3">
                  <p className="text-muted small mb-1">
                    <strong>Type of Practice:</strong>
                  </p>
                  <p className="text-dark fs-5">
                    <i className="fas fa-badge-check me-2 text-success"></i>
                    Academic Practice
                  </p>
                </div>

                <hr className="my-3" />

                <div className="mb-3">
                  <p className="text-muted small mb-1">
                    <strong>Module/Subject:</strong>
                  </p>
                  <p className="text-dark fs-4 fw-bold text-primary">
                    <i className="fas fa-paintbrush me-2"></i>
                    Web Interface Design
                  </p>
                  <p className="text-muted small fst-italic mt-2">
                    <i className="fas fa-star me-1 text-warning"></i>
                    Core module for the DAW training cycle
                  </p>
                </div>

                <hr className="my-3" />

                <div className="mb-3">
                  <p className="text-muted small mb-1">
                    <strong>Training Cycle:</strong>
                  </p>
                  <p className="text-dark fs-5">
                    <i className="fas fa-graduation-cap me-2 text-success"></i>
                    DAW (Higher Level)
                  </p>
                </div>

                <hr className="my-3" />

                <div className="mb-3">
                  <p className="text-muted small mb-1">
                    <strong>Year:</strong>
                  </p>
                  <p className="text-dark fs-5">
                    <i className="fas fa-calendar me-2 text-warning"></i>
                    2nd Year
                  </p>
                </div>

                <hr className="my-3" />

                <div className="mb-0">
                  <p className="text-muted small mb-1">
                    <strong>Academic Period:</strong>
                  </p>
                  <p className="text-dark fs-5">
                    <i className="fas fa-clock me-2 text-danger"></i>
                    2025-2026 Course
                  </p>
                </div>
              </div>
            </div>

            {/* CARD: PROJECT OBJECTIVES */}
            <div className="card border mb-4 rounded-4 shadow-sm bg-white">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold text-dark mb-3">
                  <i className="fas fa-target me-2 text-primary"></i>
                  Project Objectives
                </h3>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-check me-2 text-success"></i>
                    <span className="text-dark">
                      Create a responsive and functional SPA
                    </span>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check me-2 text-success"></i>
                    <span className="text-dark">
                      Implement web accessibility (WCAG AA)
                    </span>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check me-2 text-success"></i>
                    <span className="text-dark">
                      Use AI tools for application development
                    </span>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check me-2 text-success"></i>
                    <span className="text-dark">
                      Apply UX/UI best practices
                    </span>
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check me-2 text-success"></i>
                    <span className="text-dark">
                      Modern web interface design with Bootstrap 5
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CARD: REQUIREMENTS MET */}
            <div className="alert alert-light border-2 rounded-3" role="status">
              <h4 className="h6 fw-bold text-dark mb-3">
                <i className="fas fa-clipboard-check me-2 text-success"></i>
                Exercise Requirements
              </h4>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="fas fa-check-circle me-2 text-success"></i>
                  <span className="small">
                    <strong>"About Us" Section</strong> implemented
                  </span>
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle me-2 text-success"></i>
                  <span className="small">
                    <strong>Student's curriculum</strong> included
                  </span>
                </li>
                <li>
                  <i className="fas fa-check-circle me-2 text-success"></i>
                  <span className="small">
                    <strong>Academic references</strong> clear and visible
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-5 pt-5 border-top text-center">
        <p className="text-muted small mb-2">
          <i className="fas fa-certificate me-2"></i>
          This curriculum has been created following the Europass format
        </p>
        <p className="text-muted small">
          <i className="fas fa-calendar-alt me-2"></i>
          Digital Training Portal • Web Interface Design Practice • 2nd Year DAW
          • 2026
        </p>
      </footer>
    </main>
  );
};
