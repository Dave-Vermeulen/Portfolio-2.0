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
import OpenMosque from "../../Assets/Projects/OpenMosque.png";
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
           <Col md={4} className="project-card">
            <ProjectCard
              imgPath={prayerTimes}
              isBlog={false}
              title="Islamic Prayer Times"
              description="A sunset-colored dashboard delivering accurate Islamic prayer times for Cape Town, South Africa - updated daily via API magic. Real-time Aladhan API integration. Auto-refreshing times. Prophet's ﷺ dua with Arabic/English display. Pure Clojure no dependencies, no problems"
              ghLink="https://github.com/Dave-Vermeulen/Prayer-Times"
              demoLink="https://solaahtimes.vercel.app/"
            />
          </Col>

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
              title="StepWork"
              description="StepWork is a 12 Step inspired app designed specifically for individuals from the rooms. We understand the challenges of managing step work, doing it bit by bit, and maintaining a healthy routine."
              ghLink="https://github.com/Dave-Vermeulen/StepWork"
              //demoLink="https://www.justfortoday.work.gd"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={lemonade}
              isBlog={false}
              title="Normally 🍋"
              description="A blog about my journey. Demystifying the the world of ADHD, Islam, and Tech. Built using the most enjoyable language, Clojure 🫶🏾"
              ghLink="https://github.com/Dave-Vermeulen/Lemonade"
              demoLink="https://equalsto.me/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={QA_testing}
              isBlog={false}
              title="Noobs Guide to QA Testing"
              description="This is guide to learn quality assurance testing manually with TestRail and automation testing with Jest. Theres a ExrepessJS server with API endpoints to test."
              ghLink="https://github.com/Dave-Vermeulen/QA-Testing"
              //demoLink="https://sureco.co.za/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={gmail_inbox_cleaner}
              isBlog={false}
              title="Chatbot"
              description="A chatbot built with Python, FlaskAPI, and the WhatsApp Business API. It responds to user messages with predefined answers and can be extended with more complex functionalities. >> v2 NLU with Dialogflow."
              ghLink="https://gitlab.com/noortech/WhatsApp_Chatbot"
              //demoLink="https://plant49-ai.herokuapp.com/"
            />
          
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={OpenMosque}
              isBlog={false}
              title="The Open Mosque"
              description="Wordpress site for the Mosque that has been inherited. We are in discussions with stakeholders to build a new site with a bit more bang!"
              //ghLink="https://github.com/Dave-Vermeulen/gmail-inbox-cleaner"
              demoLink="https://theopenmosque.org.za/"
            />
          
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
