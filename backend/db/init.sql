DROP TABLE IF EXISTS quiz_results, quiz_questions, phases;

CREATE TABLE phases (
  id           SERIAL PRIMARY KEY,
  step_number  INT         NOT NULL UNIQUE,
  name         VARCHAR(50) NOT NULL,
  icon         VARCHAR(10),
  badge        VARCHAR(30),
  badge_color  VARCHAR(20),
  description  TEXT        NOT NULL,
  tool_example TEXT,
  cli_example  TEXT
);

INSERT INTO phases VALUES
(1,1,'Plan','📋','Agile','#7F77DD','Teams define what to build using Agile methods — user stories, sprints, and priorities aligned with business goals.','Jira / GitHub Projects','gh issue create --title "feat: Google OAuth login"'),
(2,2,'Code','💻','Git','#378ADD','Developers write code on feature branches, commit clearly, and open pull requests for peer review before merging.','Git / GitHub','git checkout -b feat/user-login'),
(3,3,'Build','🔨','Docker','#1D9E75','Source code is compiled and packaged into a Docker image — ensuring identical behavior in every environment.','Docker / npm','docker build -t myapp:v1.0.0 .'),
(4,4,'Test','🧪','CI','#EF9F27','Every push triggers linting, unit tests, security scans, and quality gates — blocking bad code automatically.','Jest / SonarQube / Trivy','npm test -- --coverage'),
(5,5,'Release','🚀','Artifacts','#D85A30','A versioned, immutable artifact is stored. Tags and changelogs give a clear history of what changed.','DockerHub / GitHub Releases','docker push registry/myapp:v1.0.0'),
(6,6,'Deploy','📦','GitOps','#185FA5','ArgoCD watches the Git repo and syncs the cluster automatically when manifests change — zero manual commands.','Kubernetes / ArgoCD','argocd app sync myapp'),
(7,7,'Operate','⚙️','K8s','#3B6D11','Kubernetes orchestrates containers — handling scaling, restarts, rolling updates, and health checks automatically.','Minikube / kubectl','kubectl rollout status deployment/myapp'),
(8,8,'Monitor','📈','Observability','#A32D2D','Prometheus scrapes /metrics. Grafana visualizes request rates and latency. Alerts fire when thresholds are crossed.','Prometheus / Grafana','curl localhost:4000/metrics'),
(9,9,'Improve','✨','Feedback','#534AB7','Teams review metrics and postmortems. Improvements feed back into Plan — closing the loop.','Retrospectives','# CI time: 8min → 4min by caching node_modules');

CREATE TABLE quiz_questions (
  id             SERIAL PRIMARY KEY,
  question       TEXT    NOT NULL,
  options        JSONB   NOT NULL,
  correct_answer VARCHAR(5) NOT NULL
);

INSERT INTO quiz_questions (question, options, correct_answer) VALUES
('What does CI stand for in DevOps?','{"a":"Continuous Infrastructure","b":"Continuous Integration","c":"Code Inspection","d":"Container Image"}','b'),
('Which tool handles GitOps-based deployment to Kubernetes?','{"a":"Jenkins","b":"Ansible","c":"ArgoCD","d":"Terraform"}','c'),
('What does the /metrics endpoint expose?','{"a":"API docs","b":"DB schema","c":"Prometheus metrics","d":"Health status"}','c'),
('Which phase comes right after Build?','{"a":"Deploy","b":"Release","c":"Test","d":"Operate"}','c'),
('Main benefit of Infrastructure as Code?','{"a":"Faster internet","b":"Version-controlled infrastructure","c":"Cheaper cloud","d":"No developers needed"}','b');

CREATE TABLE quiz_results (
  id           SERIAL PRIMARY KEY,
  score        INT NOT NULL,
  total        INT NOT NULL,
  percentage   INT NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW()
);
