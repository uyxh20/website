export type ArchiveField = {
  label: string;
  value: string;
};

export type ArchiveProject = {
  id: string;
  title: string;
  period: string;
  role: string;
  fields: ArchiveField[];
};

export type ArchiveSection = {
  id: string;
  title: string;
  intro: string;
  projects: ArchiveProject[];
};

export const intro = {
  heading: "The Go-Between",
  lede: "I’m Ulysse Ha, a qualitative (ethnographic) researcher trained in Anthropology (MSc) and Sociology (BSc). This site documents projects, observations, and thoughts.",
  body: "It began with a heuristic in anthropology: what we create changes who we are. How are worldviews and behaviors reshaped by daily interaction with technological systems? Looking at the human–digital intersection showed how behavioral change is induced and sustained by a change in the perception of reality. That remains the anchor for professional work.",
  caption:
    "Ontogenesis, after Yuk Hui’s Recursivity and Contingency (2019): iteration that is dynamic and recursive.",
  insights:
    "What do people want? Do they even know what they want? Build with insights.",
};

export const archive: ArchiveSection[] = [
  {
    id: "research",
    title: "User research",
    intro: "Fieldwork, journeys, and product direction — Carlsberg Digital Studio and graduate research.",
    projects: [
      {
        id: "marketplace",
        title: "B2B Marketplace",
        period: "2023 – Present",
        role: "UX Researcher @ Carlsberg Group Digital Studio",
        fields: [
          {
            label: "Objective",
            value:
              "Design, coordinate, execute, and deliver research for Carlsberg’s B2B e-com platform (>€800M yearly volume). Validate a marketplace model that includes third-party vendors through desk research and fieldwork in a Vietnam and Denmark pilot.",
          },
          {
            label: "Challenge",
            value:
              "(1) Local market facilitation across language barriers. (2) Significant project-management effort in user recruitment under EU GDPR.",
          },
          {
            label: "Action & outcome",
            value:
              "In-depth interviews and surveys of both customers and potential sellers.",
          },
        ],
      },
      {
        id: "sfa",
        title: "Sales Tool (SFA)",
        period: "2023 – Present",
        role: "UX Researcher @ Carlsberg Group Digital Studio",
        fields: [
          {
            label: "Objective",
            value:
              "Understand how the sales role is evolving as Carlsberg digitises order-placement channels. Research local strategies and trends across six European markets, and the relationship between ordering channels, to inform the internal SFA tool’s two-year direction and prototype future features.",
          },
          {
            label: "Challenge",
            value:
              "(1) Execution depended on market coordination and buy-in from local market leads. (2) No internal data to support the hypothesis.",
          },
          {
            label: "Action & outcome",
            value:
              "Designed, mobilised, coordinated, and executed a three-part research project covering six markets (>500 sales force): interviews, surveys, and internal sales data; observation of sales reps; prototype user tests. Identified functional opportunities (edit / cancel / rush / push additional orders).",
          },
        ],
      },
      {
        id: "journey",
        title: "Global Customer Journey",
        period: "2023 – Present",
        role: "UX Researcher @ Carlsberg Group Digital Studio",
        fields: [
          {
            label: "Objective",
            value:
              "Build Carlsberg Group’s first end-to-end customer journey with over 30 markets in scope (Western and Central Europe as well as Asia).",
          },
          {
            label: "Challenge",
            value:
              "Address large market differences from local business-model variation with limited resources.",
          },
          {
            label: "Action & outcome",
            value: "Coming soon.",
          },
        ],
      },
      {
        id: "graduate",
        title: "Graduate research",
        period: "2019 – 2021",
        role: "MSc Anthropology student @ University College London",
        fields: [
          {
            label: "Projects",
            value:
              "(1) Fitness trackers and behavioral change (MSc thesis): how tracker metrics reshape everyday decisions. Recurrent interviews and digital diaries; N=6 (US/UK/DE/NL/SG). (2) Science communication: how psychedelics proponents formed networks around academic institutions. Ethnography and interviews; N=6 (UK). (3) Remote-work change management for an Accenture agency, with a mental-health focus. Interviews and digital diaries; N=8 (UK). (4) Affective app design: user-retention features for dating apps based on emotional UX. Focus groups, interviews, surveys; N=40+ (UK).",
          },
          {
            label: "Challenge",
            value:
              "Entering anthropology with little primary-research experience. The aim was to study human–technology interaction with original data, not high-level literature alone.",
          },
          {
            label: "Action & outcome",
            value:
              "Project-based electives taught independent research plans on open briefs, recruitment, and mixing ethnography, focus groups, interviews, and gamified self-report to extract verbal and non-verbal insight.",
          },
        ],
      },
    ],
  },
  {
    id: "programs",
    title: "Program management",
    intro: "Supply-chain planning and ERP transformation across markets.",
    projects: [
      {
        id: "scp",
        title: "Supply chain planning",
        period: "2022",
        role: "Data integration project manager @ Carlsberg Group",
        fields: [
          {
            label: "Responsibility",
            value:
              "Malaysia pilot of a flagship program (31 markets) to modernise supply-chain planning. Worked with internal and external technical teams and business (HQ and MY) to build an integration layer connecting local data sources with RapidResponse and PlanetTogether.",
          },
          {
            label: "Challenge",
            value:
              "(1) Unclear asynchronous collaboration across seven teams in NA/EU/Asia, four of them consultants/vendors. (2) Constant design-requirement changes from earlier communication gaps, with unchanged resources.",
          },
          {
            label: "Action & outcome",
            value:
              "Project plan and timeline; delivery flow and ways of working; tracking from build and unit testing to data validation; forums to document, process, and execute design changes.",
          },
        ],
      },
      {
        id: "erp",
        title: "ERP transformation",
        period: "2021 – 2022",
        role: "Asia Project Manager & Internal Comms Lead @ Carlsberg Group",
        fields: [
          {
            label: "Responsibility",
            value:
              "China pilot of a global Dynamics 365 ERP rollout (20+ markets). Mobilised subject-matter experts from nine Asian markets to produce a reusable system blueprint.",
          },
          {
            label: "Challenge",
            value:
              "Buy-in for the new system design from hundreds of power users and middle management across Asia and Europe.",
          },
          {
            label: "Action & outcome",
            value:
              "Coordinated collection, validation, and sign-off of functional requirements from 20+ markets into a global system design.",
          },
        ],
      },
    ],
  },
  {
    id: "comms",
    title: "Communication",
    intro: "Internal knowledge systems and a generative-AI newsletter.",
    projects: [
      {
        id: "genai",
        title: "Generative AI newsletter",
        period: "2023 – Present",
        role: "User Researcher @ Carlsberg Group",
        fields: [
          {
            label: "Responsibility",
            value:
              "Started an internal newsletter as a side project to share ready-to-use ChatGPT prompts, use cases, and related news. 70 subscribers on day one.",
          },
          {
            label: "Challenge",
            value:
              "(1) Weak reader engagement for community-generated content. (2) Thin content and community then limited readership growth.",
          },
          {
            label: "Action & outcome",
            value:
              "Gamified the newsletter (quiz, leaderboard, Midjourney professional portrait as prize). Collected reader requirements and co-created stopgap solutions, including anonymised text summary for contract management.",
          },
        ],
      },
      {
        id: "erp-comms",
        title: "ERP transformation comms",
        period: "2021 – 2022",
        role: "Asia Project Manager & Internal Comms Lead @ Carlsberg Group",
        fields: [
          {
            label: "Responsibility",
            value:
              "Global internal comms to promote program progress and give people practical project information (requirement workshops, timeline, scope).",
          },
          {
            label: "Challenge",
            value:
              "(1) Build a comms system from scratch — plan, channels, and content — as a one-person army. (2) No single source of truth for external stakeholders or project participants.",
          },
          {
            label: "Action & outcome",
            value:
              "Built and maintained an internal knowledge hub for employees, senior stakeholders, and workshop participants: general information plus workshop-specific instructions.",
          },
        ],
      },
    ],
  },
  {
    id: "ops",
    title: "Ops optimisation",
    intro: "Standardising how applications actually get rolled out.",
    projects: [
      {
        id: "service-transition",
        title: "Service transition",
        period: "2021 – 2022",
        role: "Project Manager / team member @ Carlsberg Group",
        fields: [
          {
            label: "Responsibility",
            value:
              "Led a team to investigate and improve the standard procedure of application rollout.",
          },
          {
            label: "Challenge",
            value:
              "(1) Little documentation or standard procedure; past-case diagnostics were impossible because application-specific knowledge left with the project team. (2) Real change needed commitment from project, ops, and infrastructure.",
          },
          {
            label: "Action & outcome",
            value:
              "About ten internal interviews to define the deliverable: clearer project guidance. A SharePoint checklist folded into the Western Europe project lifecycle. Town halls, internal articles, drop-in calls, surveys, and focus groups before handing ownership to PMO and ops.",
          },
        ],
      },
    ],
  },
];
