import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import notesApp from "../../Assets/Projects/notesApp.png";
import emotion from "../../Assets/Projects/emotion.png";
import lemonade from "../../Assets/Projects/lemonade.png";
import justForToday from "../../Assets/Projects/justForToday.png";
import QA_testing from "../../Assets/Projects/QA_testing.png";
import editor from "../../Assets/Projects/codeEditor.png";
import gmail_inbox_cleaner from "../../Assets/Projects/gmail_inbox_cleaner.png";
import prayerTimes from "../../Assets/Projects/prayerTimes.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          { <Col md={4} className="project-card">
            <ProjectCard
              imgPath={prayerTimes}
              isBlog={false}
              title="Islamic Prayer Times"
              description="A sunset-colored dashboard delivering accurate Islamic prayer times for Cape Town, South Africa - updated daily via API magic. Real-time Aladhan API integration. Auto-refreshing times. Prophet's ﷺ dua with Arabic/English display. Pure Clojure no dependencies, no problems"
              ghLink="https://github.com/Dave-Vermeulen/Prayer-Times"
              demoLink="https://solaahtimes.vercel.app/"
            />
          </Col> }

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={notesApp}
              isBlog={false}
              title="Notes App"
              description="A minimalistic notes app built using React and Tailwind CSS. It allows users to create, read, update, and delete notes. The app uses local storage to persist the notes."
              ghLink="https://github.com/Dave-Vermeulen/Notes-App"
              //demoLink="https://quicknotes.run.place"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={justForToday}
              isBlog={false}
              title="Just For Today"
              description="JustForToday is a revolutionary productivity app designed specifically for individuals with ADHD. We understand the challenges of managing tasks, staying focused, and maintaining a healthy routine."
              ghLink="https://github.com/Dave-Vermeulen/Just_For_Today"
              //demoLink="https://www.justfortoday.work.gd"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={lemonade}
              isBlog={false}
              title="Lemonade 🍋"
              description="A blog about my journey. Demystifying the the world of ADHD, Islam, and Tech. Built using the most enjoyable language, Clojure 🫶🏾"
              ghLink="https://github.com/Dave-Vermeulen/Lemonade"
              //demoLink="https://www.fabfeet.run.place"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={QA_testing}
              isBlog={false}
              title="Noobs Guide to QA Testing"
              description="This is guide to learn quality assurance testing manually with TestRail and automation testing with Jest. Theres a ExrepessJS server with API endpoints to test."
              ghLink="https://github.com/Dave-Vermeulen/sureco.co.za"
              //demoLink="https://sureco.co.za/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={gmail_inbox_cleaner}
              isBlog={false}
              title="Gmail Inbox Cleaner"
              description="A Node.js application that helps clean up your Gmail inbox by automatically processing unread emails containing 'unsubscribe' links. It uses the Gmail API to access your inbox and the Natural Language Processing API to process the emails."
              ghLink="https://github.com/Dave-Vermeulen/gmail-inbox-cleaner"
              //demoLink="https://plant49-ai.herokuapp.com/"
            />
          
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
