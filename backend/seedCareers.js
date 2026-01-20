import mongoose from "mongoose";
import dotenv from "dotenv";
import Career from "./models/Career.js"; // <-- Update path if your model is elsewhere

// Load environment variables
dotenv.config({ path: "./.env" });

// Validate MONGO_URI
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in your .env file!");
  process.exit(1);
};

const careers = [
  {
    title: "Software Developer",
    overview: "Designs, develops, tests, and maintains software applications for web, mobile, and desktop platforms.",
    requiredSkills: ["JavaScript", "Python", "React", "Node.js", "SQL", "Problem-Solving"],
    educationPath: "Bachelor's in Computer Science, Software Engineering, or IT. Bootcamps and certifications are valuable.",
    avgSalary: "R350,000 - R900,000 / year",
    categories: ["Technology", "Software Development"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study computer science, software engineering, or attend coding bootcamps.",
        resources: ["https://www.freecodecamp.org", "https://www.codecademy.com"]
      },
      {
        title: "Experience Stage",
        description: "Work on real-world projects, internships, and open-source contributions.",
        resources: ["https://github.com", "https://www.hackerrank.com"]
      }
    ]
  },
  {
    title: "Data Scientist",
    overview: "Analyzes complex data to derive insights, create predictive models, and support business decisions.",
    requiredSkills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization"],
    educationPath: "Bachelor's in Data Science, Statistics, or Computer Science. Certifications in AI/ML are highly recommended.",
    avgSalary: "R400,000 - R950,000 / year",
    categories: ["Technology", "Data & AI"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn statistics, data structures, and machine learning fundamentals.",
        resources: ["https://www.datacamp.com", "https://www.kaggle.com"]
      },
      {
        title: "Experience Stage",
        description: "Work with real-world datasets, build predictive models, and participate in hackathons.",
        resources: ["https://towardsdatascience.com"]
      }
    ]
  },
  {
    title: "Cybersecurity Specialist",
    overview: "Protects systems and networks from security breaches, attacks, and data theft.",
    requiredSkills: ["Network Security", "Penetration Testing", "Cloud Security", "Risk Management"],
    educationPath: "Degree in Cybersecurity, IT, or Computer Science. Certifications like CEH, CISSP, and CompTIA Security+ add value.",
    avgSalary: "R450,000 - R950,000 / year",
    categories: ["Technology", "Cybersecurity"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study cybersecurity principles, networking, and encryption.",
        resources: ["https://www.cybrary.it", "https://tryhackme.com"]
      },
      {
        title: "Experience Stage",
        description: "Gain hands-on experience securing systems and performing vulnerability assessments.",
        resources: ["https://owasp.org", "https://hackthebox.com"]
      }
    ]
  },
  {
    title: "AI / Machine Learning Engineer",
    overview: "Builds AI models and machine learning algorithms for automation, predictions, and business intelligence.",
    requiredSkills: ["Python", "TensorFlow", "Deep Learning", "Data Modeling", "MLOps"],
    educationPath: "Bachelor's in AI, Computer Science, or related fields. ML certifications are highly recommended.",
    avgSalary: "R500,000 - R1,200,000 / year",
    categories: ["Technology", "Artificial Intelligence"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn machine learning, neural networks, and model optimization.",
        resources: ["https://www.coursera.org/specializations/machine-learning", "https://developers.google.com/machine-learning"]
      },
      {
        title: "Experience Stage",
        description: "Build, train, and deploy AI models; contribute to open-source AI frameworks.",
        resources: ["https://pytorch.org", "https://www.kaggle.com"]
      }
    ]
  },
  {
    title: "Cloud Architect",
    overview: "Designs and manages cloud computing solutions, ensuring secure, scalable, and cost-efficient infrastructure.",
    requiredSkills: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Cloud Security"],
    educationPath: "Degree in IT or Computer Science. Cloud certifications like AWS Solutions Architect or Azure Architect are critical.",
    avgSalary: "R600,000 - R1,300,000 / year",
    categories: ["Technology", "Cloud Computing"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn cloud infrastructure, virtualization, and network management.",
        resources: ["https://aws.amazon.com/training", "https://cloud.google.com/training"]
      },
      {
        title: "Experience Stage",
        description: "Design scalable systems and optimize cloud infrastructure for businesses.",
        resources: ["https://kubernetes.io", "https://terraform.io"]
      }
    ]
  },
  {
    title: "DevOps Engineer",
    overview: "Bridges development and operations to streamline software delivery and infrastructure management.",
    requiredSkills: ["CI/CD", "Docker", "Kubernetes", "Infrastructure as Code", "Scripting"],
    educationPath: "Degree in Computer Science or IT. Certifications in DevOps tools and methodologies are beneficial.",
    avgSalary: "R550,000 - R1,200,000 / year",
    categories: ["Technology", "DevOps"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn about software development lifecycle, automation, and cloud services.",
        resources: ["https://www.udemy.com/course/the-complete-devops-engineer-course-2-in-1/", "https://www.edx.org/professional-certificate/devops"]
      },
      {
        title: "Experience Stage",
        description: "Implement CI/CD pipelines, manage containerized applications, and automate infrastructure.",
        resources: ["https://www.jenkins.io", "https://www.docker.com"]
      }
    ]
  },
  {
    title: "Full Stack Developer",
    overview: "Develops both front-end and back-end components of web applications, ensuring seamless user experiences.",
    requiredSkills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "RESTful APIs"],
    educationPath: "Bachelor's in Computer Science or related fields. Bootcamps and online courses are also effective.",
    avgSalary: "R400,000 - R1,000,000 / year",
    categories: ["Technology", "Web Development"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn front-end and back-end technologies, databases, and version control.",
        resources: ["https://www.theodinproject.com", "https://www.freecodecamp.org"]
      },
      {
        title: "Experience Stage",
        description: "Build full-stack projects, contribute to open-source, and work on real-world applications.",
        resources: ["https://github.com", "https://dev.to"]
      }
    ]
  },
  {
    title: "Product Manager",
    overview: "Oversees product development from ideation to launch, ensuring alignment with business goals and user needs.",
    requiredSkills: ["Agile", "Scrum", "User Research", "Roadmapping", "Stakeholder Management"],
    educationPath: "Degree in Business, Marketing, or related fields. Certifications in Agile and Product Management are advantageous.",
    avgSalary: "R500,000 - R1,200,000 / year",
    categories: ["Business", "Product Management"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn product lifecycle, market research, and project management methodologies.",
        resources: ["https://www.coursera.org/specializations/product-management", "https://www.scrum.org"]
      },
      {
        title: "Experience Stage",
        description: "Work on cross-functional teams, manage product backlogs, and deliver user-centric products.",
        resources: ["https://www.atlassian.com/agile", "https://www.productschool.com"]
      }
    ]
  },
  {
    title: "UX/UI Designer",
    overview: "Designs user interfaces and experiences that are intuitive, engaging, and aligned with user needs.",
    requiredSkills: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
    educationPath: "Degree in Design, HCI, or related fields. Certifications in UX/UI design tools and methodologies are beneficial.",
    avgSalary: "R350,000 - R900,000 / year",
    categories: ["Design", "User Experience"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn design principles, user research methods, and prototyping tools.",
        resources: ["https://www.interaction-design.org", "https://www.udemy.com/course/user-experience-design-fundamentals/"]
      },
      {
        title: "Experience Stage",
        description: "Build a portfolio of design projects, conduct usability testing, and collaborate with developers.",
        resources: ["https://www.behance.net", "https://dribbble.com"]
      }
    ]
  },
  {
    title: "Digital Marketing Specialist",
    overview: "Develops and implements online marketing strategies to drive brand awareness, engagement, and conversions.",
    requiredSkills: ["SEO", "Content Marketing", "Social Media", "Google Analytics", "PPC"],
    educationPath: "Degree in Marketing, Communications, or related fields. Certifications in Google Ads, SEO, and digital marketing tools are valuable.",
    avgSalary: "R300,000 - R800,000 / year",
    categories: ["Marketing", "Digital Marketing"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn digital marketing fundamentals, SEO techniques, and analytics tools.",
        resources: ["https://www.google.com/analytics/academy/", "https://www.hubspot.com/courses/marketing"]
      },
      {
        title: "Experience Stage",
        description: "Run real-world campaigns, analyze performance metrics, and optimize marketing strategies.",
        resources: ["https://moz.com/learn/seo", "https://www.wordstream.com"]
      }
    ]
  },
  {
    title: "IT Support Specialist",
    overview: "Provides technical support and troubleshooting for hardware, software, and network issues.",
    requiredSkills: ["Technical Support", "Networking", "Operating Systems", "Customer Service"],
    educationPath: "Degree or diploma in IT, Computer Science, or related fields. Certifications like CompTIA A+ and Network+ are beneficial.",
    avgSalary: "R250,000 - R600,000 / year",
    categories: ["Technology", "IT Support"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn computer hardware, software troubleshooting, and networking basics.",
        resources: ["https://www.comptia.org/certifications/a", "https://www.coursera.org/specializations/google-it-support"]
      },
      {
        title: "Experience Stage",
        description: "Gain hands-on experience resolving technical issues and supporting end-users.",
        resources: ["https://www.reddit.com/r/techsupport", "https://www.spiceworks.com"]
      }
    ]
  },
  {
    title: "Business Analyst",
    overview: "Analyzes business processes, identifies needs, and recommends solutions to improve efficiency and effectiveness.",
    requiredSkills: ["Data Analysis", "Requirements Gathering", "Process Modeling", "Stakeholder Management"],
    educationPath: "Degree in Business, IT, or related fields. Certifications in Business Analysis (CBAP, PMI-PBA) are advantageous.",
    avgSalary: "R400,000 - R1,000,000 / year",
    categories: ["Business", "Analysis"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn business analysis techniques, data modeling, and project management.",
        resources: ["https://www.iiba.org/certification/cbap/", "https://www.coursera.org/specializations/business-analysis"]
      },
      {
        title: "Experience Stage",
        description: "Work on projects to gather requirements, analyze processes, and implement solutions.",
        resources: ["https://www.modernanalyst.com", "https://www.batimes.com"]
      }
    ]
  },
  {
    title: "Network Engineer",
    overview: "Designs, implements, and manages computer networks to ensure reliable and secure connectivity.",
    requiredSkills: ["Cisco", "Network Protocols", "Firewall Management", "VPN", "Troubleshooting"],
    educationPath: "Degree in Computer Science, IT, or related fields. Certifications like CCNA, CompTIA Network+ are critical.",
    avgSalary: "R450,000 - R1,100,000 / year",
    categories: ["Technology", "Networking"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn networking fundamentals, protocols, and security principles.",
        resources: ["https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html", "https://www.comptia.org/certifications/network"]
      },
      {
        title: "Experience Stage",
        description: "Gain hands-on experience configuring and managing network devices and troubleshooting issues.",
        resources: ["https://packetlife.net", "https://www.networklessons.com"]
      }
    ]
  },
  {
    title: "Systems Administrator",
    overview: "Manages and maintains IT systems, ensuring optimal performance, security, and availability.",
    requiredSkills: ["Linux", "Windows Server", "Scripting", "Virtualization", "Backup & Recovery"],
    educationPath: "Degree in IT, Computer Science, or related fields. Certifications like RHCE, MCSA are beneficial.",
    avgSalary: "R400,000 - R900,000 / year",
    categories: ["Technology", "Systems Administration"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn operating systems, system administration, and scripting languages.",
        resources: ["https://www.redhat.com/en/services/training/ex200-red-hat-certified-engineer-rhce-exam", "https://www.microsoft.com/en-us/learning/mcsa-certification.aspx"]
      },
      {
        title: "Experience Stage",
        description: "Manage servers, automate tasks, and ensure system security and reliability.",
        resources: ["https://linuxacademy.com", "https://www.udemy.com/course/learn-linux-in-5-days/"]
      }
    ]
  },
  {
    title: "Mobile App Developer",
    overview: "Designs and builds mobile applications for iOS and Android platforms, ensuring optimal performance and user experience.",
    requiredSkills: ["Swift", "Kotlin", "React Native", "UI/UX Design", "APIs"],
    educationPath: "Degree in Computer Science or related fields. Bootcamps and certifications in mobile development are valuable.",
    avgSalary: "R400,000 - R1,000,000 / year",
    categories: ["Technology", "Mobile Development"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn mobile programming languages, app design principles, and platform-specific guidelines.",
        resources: ["https://developer.apple.com/learn/curriculum/", "https://developer.android.com/courses"]
      },
      {
        title: "Experience Stage",
        description: "Build and publish mobile apps, optimize performance, and gather user feedback.",
        resources: ["https://www.raywenderlich.com", "https://www.udemy.com/course/ios-13-app-development-bootcamp/"]
      }
    ]
  },
  {
    title: "QA Engineer",
    overview: "Ensures software quality through testing, identifying bugs, and validating functionality against requirements.",
    requiredSkills: ["Manual Testing", "Automated Testing", "Selenium", "JIRA", "Test Planning"],
    educationPath: "Degree in Computer Science or related fields. Certifications in software testing (ISTQB) are beneficial.",
    avgSalary: "R350,000 - R800,000 / year",
    categories: ["Technology", "Quality Assurance"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn software testing methodologies, tools, and quality assurance principles.",
        resources: ["https://www.istqb.org/certification-path-root/advanced-level.html", "https://www.udemy.com/course/software-testing-and-automation/"]
      },
      {
        title: "Experience Stage",
        description: "Conduct manual and automated tests, report bugs, and collaborate with development teams.",
        resources: ["https://www.guru99.com/software-testing.html", "https://www.selenium.dev"]
      }
    ]
  },
  {
    title: "Technical Writer",
    overview: "Creates clear and concise documentation for technical products, including user manuals, guides, and API documentation.",
    requiredSkills: ["Technical Writing", "Documentation Tools", "Research", "Communication"],
    educationPath: "Degree in English, Communications, or related fields. Technical writing certifications are a plus.",
    avgSalary: "R300,000 - R700,000 / year",
    categories: ["Writing", "Technical Communication"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn technical writing principles, documentation tools, and research methods.",
        resources: ["https://www.stc.org/certification/", "https://www.udemy.com/course/technical-writing/"]
      },
      {
        title: "Experience Stage",
        description: "Create technical documents, collaborate with subject matter experts, and gather user feedback.",
        resources: ["https://www.writingassist.com", "https://www.techwhirl.com"]
      }
    ]
  },
  {
    title: "Game Developer",
    overview: "Designs and develops interactive video games for various platforms, focusing on gameplay, graphics, and user experience.",
    requiredSkills: ["C#", "Unity", "Unreal Engine", "3D Modeling", "Game Design"],
    educationPath: "Degree in Game Design, Computer Science, or related fields. Certifications in game development tools are beneficial.",
    avgSalary: "R400,000 - R1,200,000 / year",
    categories: ["Technology", "Game Development"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn game development principles, programming languages, and design techniques.",
        resources: ["https://learn.unity.com/", "https://www.udemy.com/course/unitycourse/"]
      },
      {
        title: "Experience Stage",
        description: "Build and publish games, optimize performance, and gather player feedback.",
        resources: ["https://www.gamedev.net", "https://www.reddit.com/r/gamedev/"]
      }
    ]
  },
  {
    title: "Civil Engineer",
    overview: "Designs, builds, and maintains infrastructure projects like roads, bridges, dams, and buildings.",
    requiredSkills: ["AutoCAD", "Project Management", "Structural Analysis", "Mathematics", "Problem-Solving"],
    educationPath: "Bachelor's in Civil Engineering. Professional registration with ECSA is highly recommended.",
    avgSalary: "R350,000 - R850,000 / year",
    categories: ["Engineering", "Infrastructure"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Obtain a degree in Civil Engineering and focus on structural design, hydraulics, and project planning.",
        resources: ["https://www.coursera.org/browse/engineering/civil-engineering", "https://www.edx.org/learn/civil-engineering"]
      },
      {
        title: "Experience Stage",
        description: "Gain hands-on experience in construction projects, structural assessments, and project management.",
        resources: ["https://www.autodesk.com/products/autocad", "https://www.structuralengineer.info"]
      }
    ]
  },
  {
    title: "Electrical Engineer",
    overview: "Designs, develops, and maintains electrical systems and equipment across various industries.",
    requiredSkills: ["Circuit Design", "Power Systems", "Automation", "PLC Programming", "Problem-Solving"],
    educationPath: "Bachelor's in Electrical or Electronic Engineering. Registration with ECSA is an advantage.",
    avgSalary: "R380,000 - R900,000 / year",
    categories: ["Engineering", "Energy"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Earn a degree in Electrical Engineering and specialize in power systems or electronics.",
        resources: ["https://www.edx.org/learn/electrical-engineering", "https://www.coursera.org/learn/electric-power-systems"]
      },
      {
        title: "Experience Stage",
        description: "Work on designing, testing, and optimizing electrical systems in real-world projects.",
        resources: ["https://www.ieee.org", "https://www.automation.com"]
      }
    ]
  },
  {
    title: "Mechanical Engineer",
    overview: "Designs and maintains mechanical systems, machines, and tools used in industries such as manufacturing, automotive, and energy.",
    requiredSkills: ["CAD Design", "Thermodynamics", "Fluid Mechanics", "Project Management", "Mathematical Modeling"],
    educationPath: "Bachelor's in Mechanical Engineering. Specializations in robotics or manufacturing provide an advantage.",
    avgSalary: "R400,000 - R950,000 / year",
    categories: ["Engineering", "Manufacturing"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Obtain a degree in Mechanical Engineering and study thermodynamics, design, and fluid systems.",
        resources: ["https://www.coursera.org/learn/mechanical-design", "https://nptel.ac.in/courses/mechanical-engineering"]
      },
      {
        title: "Experience Stage",
        description: "Join engineering firms or manufacturing companies to gain practical experience in machine design and testing.",
        resources: ["https://www.autodesk.com/products/fusion-360", "https://www.engineeringtoolbox.com"]
      }
    ]
  },
  {
    title: "Petroleum Engineer",
    overview: "Develops methods for extracting oil and gas efficiently while minimizing environmental impact.",
    requiredSkills: ["Reservoir Engineering", "Drilling Operations", "Energy Economics", "Geology", "Data Analysis"],
    educationPath: "Bachelor's in Petroleum Engineering, Chemical Engineering, or Geosciences. Postgraduate specialization recommended.",
    avgSalary: "R700,000 - R1,300,000 / year",
    categories: ["Engineering", "Energy"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Earn a degree in Petroleum or Chemical Engineering and focus on reservoir modeling and drilling techniques.",
        resources: ["https://www.edx.org/learn/petroleum-engineering", "https://www.spe.org/en/training"]
      },
      {
        title: "Experience Stage",
        description: "Work with oil companies to gain expertise in exploration, drilling, and production optimization.",
        resources: ["https://www.ogj.com", "https://www.onepetro.org"]
      }
    ]
  },
  {
    title: "Renewable Energy Engineer",
    overview: "Designs and implements sustainable energy systems such as solar, wind, and hydroelectric power solutions.",
    requiredSkills: ["Solar Systems", "Wind Energy", "Energy Storage", "Sustainability Planning", "Data Modeling"],
    educationPath: "Bachelor's in Electrical, Mechanical, or Renewable Energy Engineering. Green energy certifications are a bonus.",
    avgSalary: "R450,000 - R1,000,000 / year",
    categories: ["Engineering", "Renewable Energy"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Earn a degree in Renewable Energy Engineering and study sustainable technologies and energy optimization.",
        resources: ["https://www.coursera.org/specializations/renewable-energy", "https://www.edx.org/learn/renewable-energy"]
      },
      {
        title: "Experience Stage",
        description: "Work with energy firms and government projects to develop clean and sustainable energy systems.",
        resources: ["https://www.iea.org/topics/renewables", "https://www.irena.org"]
      }
    ]
  },
  {
    title: "Solar Technician",
    overview: "Installs, maintains, and troubleshoots solar power systems for residential, commercial, and industrial applications.",
    requiredSkills: ["Electrical Systems", "Solar Panel Installation", "Troubleshooting", "Safety Compliance", "Customer Service"],
    educationPath: "Certificate or diploma in Solar Energy Technology. Hands-on training and practical experience are essential.",
    avgSalary: "R200,000 - R500,000 / year",
    categories: ["Renewable Energy", "Technician"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete a certification course on solar installation, maintenance, and safety standards.",
        resources: ["https://www.udemy.com/topic/solar-energy", "https://www.coursera.org/learn/solar-energy"]
      },
      {
        title: "Experience Stage",
        description: "Work with renewable energy companies to gain field experience on solar panel installations.",
        resources: ["https://www.solartraining.co.za", "https://www.energy.gov/solar"]
      }
    ]
  },
  {
    title: "Wind Energy Specialist",
    overview: "Designs, maintains, and optimizes wind turbines and energy production systems.",
    requiredSkills: ["Turbine Mechanics", "Electrical Systems", "Data Analysis", "Project Planning", "Safety Compliance"],
    educationPath: "Bachelor's in Renewable Energy, Mechanical, or Electrical Engineering. Specialized training on wind technologies recommended.",
    avgSalary: "R350,000 - R850,000 / year",
    categories: ["Renewable Energy", "Engineering"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study renewable energy systems with a focus on wind power generation and turbine optimization.",
        resources: ["https://www.coursera.org/learn/wind-energy", "https://www.energy.gov/wind"]
      },
      {
        title: "Experience Stage",
        description: "Gain hands-on experience maintaining, troubleshooting, and optimizing wind turbines.",
        resources: ["https://www.irena.org", "https://www.iea.org/topics/renewables"]
      }
    ]
  },
  {
    title: "Sustainable Energy Engineer",
    overview: "Develops sustainable energy strategies by integrating multiple renewable energy sources for optimized energy production.",
    requiredSkills: ["Energy Efficiency", "Environmental Science", "Systems Integration", "Data Analytics", "Policy Planning"],
    educationPath: "Bachelor's in Renewable Energy, Environmental Engineering, or Energy Systems. Certifications in energy efficiency are useful.",
    avgSalary: "R500,000 - R1,100,000 / year",
    categories: ["Engineering", "Sustainability"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study sustainable energy technologies, environmental systems, and energy storage solutions.",
        resources: ["https://www.edx.org/course/sustainable-energy", "https://www.coursera.org/specializations/sustainability"]
      },
      {
        title: "Experience Stage",
        description: "Work on government or corporate projects that focus on energy efficiency and green transitions.",
        resources: ["https://www.energypedia.info", "https://www.ieee.org"]
      }
    ]
  },
  {
    title: "Environmental Engineer",
    overview: "Develops solutions to environmental challenges, focusing on sustainability, pollution control, and resource management.",
    requiredSkills: ["Environmental Science", "Regulatory Compliance", "Data Analysis", "Project Management", "Sustainability Planning"],
    educationPath: "Bachelor's in Environmental Engineering or related fields. Certifications in environmental management (CEM) are advantageous.",
    avgSalary: "R400,000 - R900,000 / year",
    categories: ["Engineering", "Environment"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn environmental engineering principles, pollution control technologies, and sustainability practices.",
        resources: ["https://www.coursera.org/specializations/environmental-management", "https://www.edx.org/learn/environmental-science"]
      },
      {
        title: "Experience Stage",
        description: "Work on projects related to waste management, water treatment, and environmental impact assessments.",
        resources: ["https://www.epa.gov", "https://www.environmental-expert.com"]
      }
    ]
  },
  {
    title: "Geotechnical Engineer",
    overview: "Analyzes soil and rock properties to design foundations, slopes, and earthworks for construction projects.",
    requiredSkills: ["Soil Mechanics", "Foundation Design", "Geotechnical Software", "Data Analysis", "Project Management"],
    educationPath: "Bachelor's in Civil or Geotechnical Engineering. Postgraduate specialization is often required.",
    avgSalary: "R450,000 - R1,000,000 / year",
    categories: ["Engineering", "Geotechnical"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study geotechnical engineering principles, soil mechanics, and foundation design.",
        resources: ["https://www.coursera.org/learn/geotechnical-engineering", "https://nptel.ac.in/courses/civil-engineering"]
      },
      {
        title: "Experience Stage",
        description: "Gain practical experience through internships and projects involving soil testing and foundation analysis.",
        resources: ["https://www.geotechdata.info", "https://www.asce.org"]
      }
    ]
  },
  {
    title: "Transportation Engineer",
    overview: "Plans, designs, and manages transportation systems to ensure efficient and safe movement of people and goods.",
    requiredSkills: ["Traffic Engineering", "Urban Planning", "Data Analysis", "Project Management", "GIS"],
    educationPath: "Bachelor's in Civil or Transportation Engineering. Specializations in urban planning are beneficial.",
    avgSalary: "R400,000 - R950,000 / year",
    categories: ["Engineering", "Transportation"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn transportation engineering principles, traffic flow theory, and urban planning.",
        resources: ["https://www.coursera.org/learn/transportation-engineering", "https://nptel.ac.in/courses/civil-engineering"]
      },
      {
        title: "Experience Stage",
        description: "Work on transportation projects, traffic studies, and infrastructure planning.",
        resources: ["https://www.transportation.gov", "https://www.asce.org"]
      }
    ]
  },
  {
    title: "Agricultural Engineer",
    overview: "Designs and improves agricultural machinery, irrigation systems, and sustainable farming practices.",
    requiredSkills: ["Soil Science", "Irrigation Design", "Machinery", "Sustainability", "Data Analysis"],
    educationPath: "Bachelor's in Agricultural Engineering or related fields. Specializations in sustainable agriculture are beneficial.",
    avgSalary: "R300,000 - R750,000 / year",
    categories: ["Engineering", "Agriculture"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study agricultural engineering principles, soil science, and irrigation systems.",
        resources: ["https://www.coursera.org/learn/agricultural-engineering", "https://nptel.ac.in/courses/agriculture"]
      },
      {
        title: "Experience Stage",
        description: "Gain hands-on experience in designing agricultural equipment and sustainable farming solutions.",
        resources: ["https://www.aaes.org", "https://www.agriculture.com"]
      }
    ]
  },
  {
    title: "Mining Engineer",
    overview: "Plans and oversees mining operations, ensuring efficient extraction of minerals while minimizing environmental impact.",
    requiredSkills: ["Mine Design", "Geology", "Safety Management", "Project Management", "Environmental Compliance"],
    educationPath: "Bachelor's in Mining Engineering or related fields. Registration with ECSA is essential.",
    avgSalary: "R600,000 - R1,500,000 / year",
    categories: ["Engineering", "Mining"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Earn a degree in Mining Engineering and study mine design, geology, and safety protocols.",
        resources: ["https://www.coursera.org/learn/mining-engineering", "https://nptel.ac.in/courses/mining-engineering"]
      },
      {
        title: "Experience Stage",
        description: "Work with mining companies to gain practical experience in mine operations and environmental management.",
        resources: ["https://www.saimm.co.za", "https://www.mining-technology.com"]
      }
    ]
  },
  {
    title: "Software Engineer",
    overview: "Designs, develops, and maintains software applications and systems across various industries.",
    requiredSkills: ["Programming", "Data Structures", "Algorithms", "System Design", "Version Control"],
    educationPath: "Bachelor's in Computer Science or related fields. Certifications in specific programming languages or technologies are beneficial.",
    avgSalary: "R450,000 - R1,200,000 / year",
    categories: ["Technology", "Software Development"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn programming languages, software development methodologies, and system design principles.",
        resources: ["https://www.coursera.org/specializations/software-development", "https://www.edx.org/learn/computer-science"]
      },
      {
        title: "Experience Stage",
        description: "Build software projects, contribute to open-source, and work on real-world applications.",
        resources: ["https://github.com", "https://dev.to"]
      }
    ]
  },
  {
    title: "Registered Nurse",
    overview: "Provides direct patient care, administers treatments, monitors recovery, and supports doctors in hospitals, clinics, and community healthcare settings.",
    requiredSkills: ["Patient Care", "Medical Knowledge", "Critical Thinking", "Communication", "Infection Control"],
    educationPath: "Diploma or Bachelor's in Nursing Science (4 years). Must register with the South African Nursing Council (SANC).",
    avgSalary: "R250,000 - R480,000 / year",
    categories: ["Healthcare", "Nursing"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Earn a nursing diploma or degree and complete practical clinical training.",
        resources: ["https://www.sanc.co.za", "https://www.coursera.org/learn/nursing-fundamentals"]
      },
      {
        title: "Experience Stage",
        description: "Work in hospitals, clinics, or community health centers to build expertise in patient care.",
        resources: ["https://www.who.int/health-topics/nursing", "https://nursingworld.org"]
      }
    ]
  },
  {
    title: "General Practitioner (Medical Doctor)",
    overview: "Diagnoses, treats, and manages a wide range of medical conditions while providing preventive care and health education.",
    requiredSkills: ["Diagnosis", "Clinical Skills", "Medical Procedures", "Communication", "Critical Thinking"],
    educationPath: "Bachelor of Medicine and Bachelor of Surgery (MBChB) — 6 years. 2-year internship + 1-year community service required.",
    avgSalary: "R600,000 - R1,000,000 / year",
    categories: ["Healthcare", "Medicine"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete an MBChB degree at an accredited medical school and pass the HPCSA board exams.",
        resources: ["https://www.hpcsa.co.za", "https://www.khanacademy.org/science/health-and-medicine"]
      },
      {
        title: "Experience Stage",
        description: "Complete an internship, gain hospital experience, and establish a private or public healthcare practice.",
        resources: ["https://www.who.int", "https://www.medscape.com"]
      }
    ]
  },
  {
    title: "Specialist Doctor",
    overview: "Focuses on a specific medical field such as cardiology, neurology, oncology, or pediatrics, providing advanced diagnosis and treatments.",
    requiredSkills: ["Specialized Clinical Expertise", "Research Skills", "Patient Management", "Critical Decision-Making"],
    educationPath: "MBChB degree + Internship + Community Service + Fellowship/Specialization (additional 4–6 years).",
    avgSalary: "R900,000 - R2,500,000 / year",
    categories: ["Healthcare", "Specialist Medicine"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete MBChB and then specialize in your chosen field through fellowship programs.",
        resources: ["https://www.hpcsa.co.za", "https://www.nejm.org"]
      },
      {
        title: "Experience Stage",
        description: "Gain clinical experience in specialized hospital departments and manage complex medical cases.",
        resources: ["https://www.ncbi.nlm.nih.gov", "https://www.bmj.com"]
      }
    ]
  },
  {
    title: "Physiotherapist",
    overview: "Helps patients recover mobility, manage pain, and improve physical function after injuries or medical conditions.",
    requiredSkills: ["Rehabilitation Techniques", "Anatomy Knowledge", "Exercise Therapy", "Manual Therapy", "Patient Education"],
    educationPath: "Bachelor of Physiotherapy (BPhysT) — 4 years. HPCSA registration required.",
    avgSalary: "R250,000 - R600,000 / year",
    categories: ["Healthcare", "Rehabilitation"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study physiotherapy with a focus on anatomy, rehabilitation techniques, and physical therapy methods.",
        resources: ["https://www.coursera.org/learn/physical-therapy", "https://www.physio-pedia.com"]
      },
      {
        title: "Experience Stage",
        description: "Work in hospitals, rehabilitation centers, or private practices treating sports injuries, neurological disorders, and post-surgery recovery.",
        resources: ["https://www.apta.org", "https://www.hpcsa.co.za"]
      }
    ]
  },
  {
    title: "Medical Laboratory Technologist",
    overview: "Conducts laboratory tests on blood, tissue, and other samples to assist doctors in diagnosing and treating diseases.",
    requiredSkills: ["Lab Testing", "Sample Analysis", "Attention to Detail", "Data Interpretation", "Health & Safety Compliance"],
    educationPath: "National Diploma or Bachelor's in Biomedical Technology. Must register with HPCSA.",
    avgSalary: "R220,000 - R480,000 / year",
    categories: ["Healthcare", "Laboratory"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete a biomedical technology qualification focusing on pathology, microbiology, and molecular diagnostics.",
        resources: ["https://www.futurelearn.com/subjects/healthcare-courses/laboratory", "https://www.medicaltechnologysource.org"]
      },
      {
        title: "Experience Stage",
        description: "Work in pathology labs, hospitals, or private testing facilities.",
        resources: ["https://www.hpcsa.co.za", "https://www.clinical-laboratory-science.org"]
      }
    ]
  },
  {
    title: "Pharmacist",
    overview: "Prepares, dispenses, and advises patients on the safe use of medications while ensuring regulatory compliance.",
    requiredSkills: ["Pharmacology", "Drug Interactions", "Medical Advice", "Inventory Management", "Customer Service"],
    educationPath: "Bachelor of Pharmacy (BPharm) — 4 years. Must register with the South African Pharmacy Council (SAPC).",
    avgSalary: "R350,000 - R720,000 / year",
    categories: ["Healthcare", "Pharmaceutical"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Earn a pharmacy degree and study pharmacology, toxicology, and pharmaceutical regulations.",
        resources: ["https://www.coursera.org/learn/pharmacology", "https://www.sapc.za.org"]
      },
      {
        title: "Experience Stage",
        description: "Gain hands-on experience in retail, hospital, or clinical pharmacy settings.",
        resources: ["https://www.fip.org", "https://www.drugs.com"]
      }
    ]
  },
  {
    title: "Radiographer",
    overview: "Operates imaging equipment such as X-rays, MRIs, and CT scans to help doctors diagnose and treat medical conditions.",
    requiredSkills: ["Medical Imaging", "Radiation Safety", "Anatomy Knowledge", "Attention to Detail", "Patient Care"],
    educationPath: "Bachelor of Diagnostic Radiography or National Diploma. Registration with HPCSA is mandatory.",
    avgSalary: "R280,000 - R600,000 / year",
    categories: ["Healthcare", "Medical Imaging"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study diagnostic radiography, including imaging techniques, anatomy, and radiation safety.",
        resources: ["https://www.coursera.org/learn/medical-imaging", "https://www.radiologyinfo.org"]
      },
      {
        title: "Experience Stage",
        description: "Gain clinical experience operating imaging equipment in hospitals and diagnostic centers.",
        resources: ["https://www.hpcsa.co.za", "https://www.arrs.org"]
      }
    ]
  },
  {
    title: "Paramedic",
    overview: "Provides emergency medical care and life-saving support to patients in urgent situations before they reach the hospital.",
    requiredSkills: ["Emergency Response", "CPR & First Aid", "Patient Stabilization", "Medical Equipment Handling", "Decision-Making"],
    educationPath: "Diploma or Bachelor's in Emergency Medical Care. HPCSA registration required for practicing.",
    avgSalary: "R180,000 - R400,000 / year",
    categories: ["Healthcare", "Emergency Services"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete a diploma or degree in emergency medical care and learn pre-hospital treatment techniques.",
        resources: ["https://www.coursera.org/learn/emergency-medical-services", "https://www.hpcsa.co.za"]
      },
      {
        title: "Experience Stage",
        description: "Work with emergency response units, private ambulance services, or hospital-based trauma teams.",
        resources: ["https://www.redcross.org", "https://www.ems.gov"]
      }
    ]
  },
  {
    title: "Occupational Therapist",
    overview: "Helps patients develop, recover, and improve the skills needed for daily living and working through therapeutic practices.",
    requiredSkills: ["Therapeutic Techniques", "Patient Assessment", "Rehabilitation Planning", "Communication", "Empathy"],
    educationPath: "Bachelor of Occupational Therapy (B.Occ.T) — 4 years. Must register with HPCSA.",
    avgSalary: "R300,000 - R650,000 / year",
    categories: ["Healthcare", "Rehabilitation"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study occupational therapy principles, human anatomy, and rehabilitation techniques.",
        resources: ["https://www.coursera.org/learn/occupational-therapy", "https://www.aota.org"]
      },
      {
        title: "Experience Stage",
        description: "Gain clinical experience in hospitals, rehabilitation centers, or community health settings.",
        resources: ["https://www.hpcsa.co.za", "https://www.otworks.com"]
      }
    ]
  },
  {
    title: "Dietitian/Nutritionist",
    overview: "Provides expert advice on diet and nutrition to promote health, manage diseases, and improve overall well-being.",
    requiredSkills: ["Nutritional Science", "Diet Planning", "Patient Counseling", "Research Skills", "Communication"],
    educationPath: "Bachelor's in Dietetics or Nutrition Science. Registration with HPCSA is required.",
    avgSalary: "R250,000 - R550,000 / year",
    categories: ["Healthcare", "Nutrition"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete a degree in dietetics or nutrition and study human nutrition, food science, and diet planning.",
        resources: ["https://www.coursera.org/learn/nutrition", "https://www.hpcsa.co.za"]
      },
      {
        title: "Experience Stage",
        description: "Work in hospitals, clinics, or community health programs providing dietary advice and nutrition plans.",
        resources: ["https://www.eatright.org", "https://www.nutrition.org"]
      }
    ]
  },
  {
    title: "Speech Therapist (Speech-Language Pathologist)",
    overview: "Diagnoses and treats communication disorders, speech impairments, and swallowing difficulties in patients of all ages.",
    requiredSkills: ["Speech Therapy Techniques", "Patient Assessment", "Communication Skills", "Empathy", "Problem-Solving"],
    educationPath: "Bachelor of Speech-Language Pathology (B.SLP) — 4 years. Must register with HPCSA.",
    avgSalary: "R280,000 - R600,000 / year",
    categories: ["Healthcare", "Therapy"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study speech-language pathology principles, anatomy of speech mechanisms, and therapeutic techniques.",
        resources: ["https://www.coursera.org/learn/speech-language-pathology", "https://www.asha.org"]
      },
      {
        title: "Experience Stage",
        description: "Gain clinical experience in hospitals, schools, or private practices treating speech and communication disorders.",
        resources: ["https://www.hpcsa.co.za", "https://www.speechpathology.com"]
      }
    ]
  },
  {
    title: "Clinical Psychologist",
    overview: "Assesses, diagnoses, and treats mental health disorders through therapeutic interventions and counseling techniques.",
    requiredSkills: ["Psychological Assessment", "Therapeutic Techniques", "Research Skills", "Empathy", "Communication"],
    educationPath: "Bachelor's in Psychology + Honours + Master's in Clinical Psychology (total 6 years). HPCSA registration required.",
    avgSalary: "R400,000 - R900,000 / year",
    categories: ["Healthcare", "Mental Health"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete a psychology degree, honours, and a master's focusing on clinical psychology.",
        resources: ["https://www.coursera.org/specializations/clinical-psychology", "https://www.apa.org"]
      },
      {
        title: "Experience Stage",
        description: "Gain supervised clinical experience in mental health settings and complete required internships.",
        resources: ["https://www.hpcsa.co.za", "https://www.psychologytoday.com"]
      }
    ]
  },
  {
    title: "Technical Writer",
    overview: "Creates clear and concise documentation for technical products, including user manuals, guides, and API documentation.",
    requiredSkills: ["Technical Writing", "Documentation Tools", "Research", "Communication"],
    educationPath: "Degree in English, Communications, or related fields. Technical writing certifications are a plus.",
    avgSalary: "R300,000 - R700,000 / year",
    categories: ["Writing", "Technical Communication"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn technical writing principles, documentation tools, and research methods.",
        resources: ["https://www.stc.org/certification/", "https://www.udemy.com/course/technical-writing/"]
      },
      {
        title: "Experience Stage",
        description: "Create technical documents, collaborate with subject matter experts, and gather user feedback.",
        resources: ["https://www.writingassist.com", "https://www.techwhirl.com"]
      }
    ]
  },
  {
    title: "Chartered Accountant (CA)",
    overview: "Manages financial records, audits, tax compliance, and provides strategic financial advice to businesses and individuals.",
    requiredSkills: ["Financial Analysis", "Taxation", "Auditing", "Accounting Software"],
    educationPath: "Bachelor's in Accounting or Finance, followed by SAICA-accredited CA program and board exams.",
    avgSalary: "R450,000 - R1,200,000 / year",
    categories: ["Accounting", "Finance"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Earn a degree in accounting or finance and complete SAICA-accredited modules.",
        resources: ["https://www.saica.org.za", "https://www.coursera.org/learn/accounting"]
      },
      {
        title: "Experience Stage",
        description: "Complete a 3-year training contract (articles) at an accredited firm and prepare for board exams.",
        resources: ["https://www.saica.org.za/becomingaca", "https://www.accountingtools.com"]
      }
    ]
  },
  {
    title: "Investment Banker",
    overview: "Advises companies and governments on raising capital, mergers, acquisitions, and financial restructuring.",
    requiredSkills: ["Financial Modeling", "Valuation", "Market Analysis", "Negotiation"],
    educationPath: "Bachelor's in Finance, Economics, or Business. MBA or CFA certification highly recommended.",
    avgSalary: "R600,000 - R2,000,000 / year",
    categories: ["Finance", "Investment"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study corporate finance, valuation techniques, and investment strategies.",
        resources: ["https://www.cfainstitute.org", "https://www.udemy.com/course/investment-banking"]
      },
      {
        title: "Experience Stage",
        description: "Join an investment bank, work on IPOs, mergers, acquisitions, and corporate fundraising.",
        resources: ["https://www.wallstreetoasis.com", "https://www.investopedia.com"]
      }
    ]
  },
  {
    title: "Financial Analyst",
    overview: "Analyzes financial data, evaluates investment opportunities, and prepares reports to guide decision-making.",
    requiredSkills: ["Data Analysis", "Excel & Power BI", "Budgeting", "Forecasting"],
    educationPath: "Bachelor's in Finance, Accounting, or Economics. CFA certification is a plus.",
    avgSalary: "R350,000 - R850,000 / year",
    categories: ["Finance", "Business Analysis"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn financial modeling, data analytics, and corporate finance fundamentals.",
        resources: ["https://www.coursera.org/specializations/financial-analysis", "https://www.investopedia.com"]
      },
      {
        title: "Experience Stage",
        description: "Work in investment firms, corporates, or consulting companies analyzing financial trends.",
        resources: ["https://corporatefinanceinstitute.com", "https://www.efinancialcareers.com"]
      }
    ]
  },
  {
    title: "Corporate Lawyer",
    overview: "Specializes in business law, contracts, mergers, acquisitions, and ensures legal compliance for corporations.",
    requiredSkills: ["Legal Research", "Negotiation", "Contract Drafting", "Regulatory Knowledge"],
    educationPath: "Bachelor of Laws (LLB), followed by articles and admission as an attorney.",
    avgSalary: "R500,000 - R1,500,000 / year",
    categories: ["Law", "Corporate Legal Services"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete an LLB degree and gain foundational knowledge in corporate and commercial law.",
        resources: ["https://www.lssa.org.za", "https://www.coursera.org/browse/business/law"]
      },
      {
        title: "Experience Stage",
        description: "Work in law firms or in-house legal teams managing contracts, compliance, and mergers.",
        resources: ["https://www.lexisnexis.com", "https://www.legal500.com"]
      }
    ]
  },
  {
    title: "Entrepreneur / Startup Founder",
    overview: "Starts and manages a business venture, developing products or services and leading overall strategy and growth.",
    requiredSkills: ["Business Planning", "Leadership", "Sales & Marketing", "Financial Management"],
    educationPath: "No strict requirement, but a degree in Business, Marketing, or Finance helps. Entrepreneurship programs are recommended.",
    avgSalary: "Varies — R0 to R5,000,000+ / year depending on success",
    categories: ["Business", "Startups"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn business management, marketing, and product development fundamentals.",
        resources: ["https://www.ycombinator.com/library", "https://www.coursera.org/specializations/entrepreneurship"]
      },
      {
        title: "Experience Stage",
        description: "Start your business, secure funding, develop products/services, and scale operations.",
        resources: ["https://www.startupschool.org", "https://www.inc.com"]
      }
    ]
  },
  {
    title: "Tax Consultant",
    overview: "Helps individuals and businesses comply with tax laws, file tax returns, and plan tax-efficient strategies.",
    requiredSkills: ["Taxation", "Financial Planning", "Compliance", "Attention to Detail"],
    educationPath: "Bachelor's in Accounting or Finance. Taxation certifications add value.",
    avgSalary: "R300,000 - R700,000 / year",
    categories: ["Finance", "Tax"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study tax laws, accounting principles, and financial compliance.",
        resources: ["https://www.sars.gov.za", "https://www.coursera.org/learn/taxation"]
      },
      {
        title: "Experience Stage",
        description: "Work in accounting firms, consultancies, or government agencies managing tax portfolios.",
        resources: ["https://www.accountingweb.com", "https://www.aat.org.uk"]
      }
    ]
  },
  {
    title: "Management Consultant",
    overview: "Advises organizations on improving efficiency, solving business problems, and implementing growth strategies.",
    requiredSkills: ["Strategic Thinking", "Data Analytics", "Problem Solving", "Communication"],
    educationPath: "Bachelor’s in Business, Economics, or Finance. MBA is highly preferred for top firms.",
    avgSalary: "R500,000 - R1,800,000 / year",
    categories: ["Business", "Consulting"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study management strategies, business operations, and consulting frameworks.",
        resources: ["https://www.mckinsey.com", "https://www.coursera.org/learn/management-consulting"]
      },
      {
        title: "Experience Stage",
        description: "Join a consulting firm, work with clients, and design solutions to improve profitability and performance.",
        resources: ["https://www.bcg.com", "https://www.strategyand.pwc.com"]
      }
    ]
  },
  {
    title: "Risk Manager",
    overview: "Identifies, evaluates, and mitigates financial and operational risks for companies.",
    requiredSkills: ["Risk Assessment", "Data Analysis", "Compliance", "Strategic Planning"],
    educationPath: "Bachelor’s in Finance, Risk Management, or Economics. FRM or PRM certifications are valuable.",
    avgSalary: "R400,000 - R1,000,000 / year",
    categories: ["Finance", "Business Strategy"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn risk assessment frameworks, compliance regulations, and mitigation strategies.",
        resources: ["https://www.garp.org", "https://www.coursera.org/learn/financial-risk"]
      },
      {
        title: "Experience Stage",
        description: "Work in banks, insurance companies, or corporates assessing and managing financial risks.",
        resources: ["https://www.rims.org", "https://www.investopedia.com"]
      }
    ]
  },
  {
    title: "Actuary",
    overview: "Analyzes financial risks using mathematics, statistics, and financial theory to help businesses plan for the future.",
    requiredSkills: ["Statistical Analysis", "Financial Theory", "Risk Modeling", "Problem Solving"],
    educationPath: "Bachelor’s in Actuarial Science, Mathematics, or Statistics. Professional actuarial exams required.",
    avgSalary: "R600,000 - R1,500,000 / year",
    categories: ["Finance", "Statistics"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study actuarial science, probability, and financial mathematics.",
        resources: ["https://www.saa.org.za", "https://www.soa.org"]
      },
      {
        title: "Experience Stage",
        description: "Complete actuarial exams and gain experience in insurance, pensions, or investment firms.",
        resources: ["https://www.actuaries.org.uk", "https://www.towerswatson.com"]
      }
    ]
  },
  {
    title: "Forensic Accountant",
    overview: "Investigates financial discrepancies, fraud, and embezzlement, providing litigation support and expert testimony.",
    requiredSkills: ["Accounting", "Fraud Detection", "Data Analysis", "Legal Knowledge"],
    educationPath: "Bachelor’s in Accounting or Finance. Certifications like CFE (Certified Fraud Examiner) are beneficial.",
    avgSalary: "R400,000 - R900,000 / year",
    categories: ["Accounting", "Forensics"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn forensic accounting principles, fraud detection techniques, and legal aspects of financial investigations.",
        resources: ["https://www.acfe.com", "https://www.coursera.org/learn/forensic-accounting"]
      },
      {
        title: "Experience Stage",
        description: "Work with accounting firms, law enforcement, or corporate investigation teams handling fraud cases.",
        resources: ["https://www.ey.com/en_gl/forensic", "https://www.pwc.com/gx/en/services/forensics.html"]
      }
    ]
  },
  {
    title: "Compliance Officer",
    overview: "Ensures that companies adhere to legal standards and internal policies, managing regulatory compliance programs.",
    requiredSkills: ["Regulatory Knowledge", "Risk Management", "Attention to Detail", "Communication"],
    educationPath: "Bachelor’s in Law, Business, or Finance. Certifications like CRCM are advantageous.",
    avgSalary: "R350,000 - R800,000 / year",
    categories: ["Business", "Compliance"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study regulatory frameworks, compliance management, and risk assessment techniques.",
        resources: ["https://www.coursera.org/learn/compliance", "https://www.aba.com"]
      },
      {
        title: "Experience Stage",
        description: "Work in compliance departments of banks, insurance companies, or corporates ensuring regulatory adherence.",
        resources: ["https://www.complianceweek.com", "https://www.icaew.com"]
      }
    ]
  },
  {
    title: "Teacher (Primary & Secondary)",
    overview: "Educates students at different grade levels, creating lesson plans, assessing progress, and fostering personal and academic growth.",
    requiredSkills: ["Lesson Planning", "Classroom Management", "Communication", "Patience", "Assessment"],
    educationPath: "Bachelor's degree in Education or a teaching diploma. Specialization in subject areas is preferred.",
    avgSalary: "R180,000 - R400,000 / year",
    categories: ["Education", "Teaching"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Earn a degree or diploma in education, specialize in your chosen grade level or subject, and complete practical teaching training.",
        resources: ["https://www.coursera.org/learn/foundations-teaching", "https://www.udemy.com/course/teacher-training"]
      },
      {
        title: "Experience Stage",
        description: "Gain classroom teaching experience, create lesson plans, evaluate students, and refine teaching strategies.",
        resources: ["https://teach.com/", "https://www.edutopia.org/"]
      }
    ]
  },
  {
    title: "University Lecturer",
    overview: "Teaches at higher education institutions, conducts research, supervises students, and contributes to academic publications.",
    requiredSkills: ["Research", "Public Speaking", "Curriculum Development", "Analytical Skills"],
    educationPath: "Master's or PhD in the relevant field, plus academic research experience.",
    avgSalary: "R350,000 - R850,000 / year",
    categories: ["Education", "Research"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Pursue a postgraduate degree (Master’s or PhD) while gaining research and teaching assistant experience.",
        resources: ["https://www.futurelearn.com/", "https://www.coursera.org/"]
      },
      {
        title: "Experience Stage",
        description: "Publish academic research, supervise students, and develop expertise in your subject area.",
        resources: ["https://www.timeshighereducation.com/", "https://www.researchgate.net/"]
      }
    ]
  },
  {
    title: "Instructional Designer",
    overview: "Designs and develops educational materials, online courses, and training programs for schools, universities, and organizations.",
    requiredSkills: ["Curriculum Design", "E-Learning Tools", "Instructional Strategies", "Multimedia Development"],
    educationPath: "Degree in Education, Instructional Design, or related field. Knowledge of e-learning platforms is a plus.",
    avgSalary: "R280,000 - R600,000 / year",
    categories: ["Education", "E-Learning"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn instructional design theories, educational technologies, and content development techniques.",
        resources: ["https://www.udemy.com/course/instructional-design/", "https://www.coursera.org/learn/learning-design"]
      },
      {
        title: "Experience Stage",
        description: "Work on designing courses, training programs, and blended learning experiences using digital platforms.",
        resources: ["https://elearningindustry.com/", "https://www.iste.org/"]
      }
    ]
  },
  {
    title: "Corporate Trainer",
    overview: "Develops and delivers employee training programs to improve skills, productivity, and professional development within organizations.",
    requiredSkills: ["Presentation Skills", "Public Speaking", "Curriculum Development", "Interpersonal Skills"],
    educationPath: "Bachelor’s degree in Education, Human Resources, or a related field. Certifications in training and development are advantageous.",
    avgSalary: "R300,000 - R700,000 / year",
    categories: ["Corporate Training", "Professional Development"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn training methodologies, employee engagement techniques, and leadership development strategies.",
        resources: ["https://www.coursera.org/learn/learning-how-to-learn", "https://www.udemy.com/course/corporate-training/"]
      },
      {
        title: "Experience Stage",
        description: "Design and deliver customized training modules, measure employee performance, and refine teaching techniques.",
        resources: ["https://www.td.org/", "https://elearningindustry.com/"]
      }
    ]
  },
  {
    title: "Educational Psychologist",
    overview: "Works with students, parents, and teachers to address learning, emotional, and behavioral challenges affecting education.",
    requiredSkills: ["Counseling", "Child Development", "Behavioral Analysis", "Communication"],
    educationPath: "Master’s degree in Educational Psychology and registration with the relevant psychology council.",
    avgSalary: "R400,000 - R900,000 / year",
    categories: ["Psychology", "Education"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete a postgraduate degree in educational psychology and gain supervised counseling experience.",
        resources: ["https://www.apa.org/ed/", "https://www.coursera.org/learn/psychology"]
      },
      {
        title: "Experience Stage",
        description: "Work with schools, parents, and learners to assess educational challenges and implement support strategies.",
        resources: ["https://www.bps.org.uk/", "https://www.edutopia.org/"]
      }
    ]
  },
  {
    title: "E-Learning Developer",
    overview: "Creates interactive digital learning content, online courses, and multimedia training materials using modern learning technologies.",
    requiredSkills: ["HTML/CSS/JS Basics", "LMS Platforms", "Multimedia Design", "SCORM Standards"],
    educationPath: "Degree or diploma in Education Technology, Instructional Design, or related fields.",
    avgSalary: "R250,000 - R550,000 / year",
    categories: ["E-Learning", "Digital Education"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn e-learning development tools, SCORM integration, and online learning best practices.",
        resources: ["https://www.udemy.com/course/articulate-storyline-training/", "https://www.linkedin.com/learning/"]
      },
      {
        title: "Experience Stage",
        description: "Develop custom learning platforms, interactive lessons, and multimedia-rich digital learning experiences.",
        resources: ["https://elearningindustry.com/", "https://www.talentlms.com/blog"]
      }
    ]
  },
  {
    title: "Special Education Teacher",
    overview: "Supports students with learning disabilities, developmental delays, and other challenges through customized teaching strategies.",
    requiredSkills: ["Individualized Education Plans (IEPs)", "Empathy", "Behavioral Management", "Communication"],
    educationPath: "Bachelor's degree in Special Education or relevant teaching qualifications.",
    avgSalary: "R200,000 - R450,000 / year",
    categories: ["Teaching", "Special Needs"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn specialized teaching strategies, behavior management, and inclusive learning practices.",
        resources: ["https://www.udemy.com/course/special-education/", "https://www.edx.org/course/teaching-students-with-learning-difficulties"]
      },
      {
        title: "Experience Stage",
        description: "Work with students requiring tailored lesson plans, collaborate with parents, and provide emotional support.",
        resources: ["https://www.readingrockets.org/", "https://www.understood.org/"]
      }
    ]
  },
  {
    title: "Curriculum Developer",
    overview: "Designs and develops educational curricula, lesson plans, and assessment tools for schools and educational institutions.",
    requiredSkills: ["Curriculum Design", "Educational Standards", "Assessment Development", "Research"],
    educationPath: "Degree in Education, Curriculum Development, or related fields. Experience in teaching is beneficial.",
    avgSalary: "R300,000 - R650,000 / year",
    categories: ["Education", "Curriculum Design"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn curriculum development theories, educational standards, and assessment design.",
        resources: ["https://www.coursera.org/learn/curriculum-development", "https://www.edx.org/course/curriculum-and-instruction"]
      },
      {
        title: "Experience Stage",
        description: "Work with educational institutions to design curricula, create lesson plans, and develop assessment tools.",
        resources: ["https://www.ascd.org/", "https://www.teachthought.com/"]
      }
    ]
  },
  {
    title: "Education Consultant",
    overview: "Advises schools, educational institutions, and organizations on improving teaching methods, curricula, and learning outcomes.",
    requiredSkills: ["Educational Research", "Data Analysis", "Communication", "Problem-Solving"],
    educationPath: "Bachelor’s or Master’s in Education, Educational Leadership, or related fields. Experience in teaching or administration is beneficial.",
    avgSalary: "R400,000 - R900,000 / year",
    categories: ["Education", "Consulting"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study educational theories, research methodologies, and leadership strategies.",
        resources: ["https://www.coursera.org/learn/education-leadership", "https://www.edx.org/course/education-innovation"]
      },
      {
        title: "Experience Stage",
        description: "Work with schools or educational organizations to analyze performance data and recommend improvements.",
        resources: ["https://www.edutopia.org/", "https://www.educationworld.com/"]
      }
    ]
  },
  {
    title: "Librarian",
    overview: "Manages library resources, assists patrons with research, and organizes information for easy access.",
    requiredSkills: ["Cataloging", "Research Skills", "Information Management", "Customer Service"],
    educationPath: "Bachelor’s or Master’s in Library Science or Information Studies. Certification may be required.",
    avgSalary: "R250,000 - R600,000 / year",
    categories: ["Library Science", "Information Management"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn library management, cataloging systems, and research methodologies.",
        resources: ["https://www.coursera.org/learn/library-science", "https://www.udemy.com/course/library-management/"]
      },
      {
        title: "Experience Stage",
        description: "Work in libraries or information centers managing resources, assisting patrons, and organizing information.",
        resources: ["https://www.ala.org/", "https://www.ifla.org/"]
      }
    ]
  },
  {
    title: "Museum Curator",
    overview: "Oversees museum collections, organizes exhibitions, and educates the public about art, history, or science.",
    requiredSkills: ["Collection Management", "Research", "Exhibition Design", "Public Speaking"],
    educationPath: "Bachelor’s or Master’s in Museum Studies, History, Art, or related fields.",
    avgSalary: "R300,000 - R700,000 / year",
    categories: ["Museum Studies", "Curation"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study museum management, curation techniques, and exhibition design.",
        resources: ["https://www.coursera.org/learn/museum-studies", "https://www.edx.org/course/museum-management"]
      },
      {
        title: "Experience Stage",
        description: "Work in museums or galleries managing collections, organizing exhibitions, and engaging with the public.",
        resources: ["https://www.aam-us.org/", "https://www.museumsassociation.org/"]
      }
    ]
  },
  {
    "title": "Electrician",
    "overview": "Installs, maintains, and repairs electrical systems in residential, commercial, and industrial settings.",
    "requiredSkills": ["Electrical Wiring", "Problem-Solving", "Safety Knowledge", "Blueprint Reading"],
    "educationPath": "NQF Level 4 qualification or National Certificate in Electrical Engineering, plus trade test.",
    "avgSalary": "R180,000 - R420,000 / year",
    "categories": ["Skilled Trades", "Electrical Work"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Complete a formal electrical engineering qualification and practical apprenticeships.",
        "resources": ["https://www.ewseta.org.za", "https://www.skillsacademy.co.za/electrician-courses/"]
      },
      {
        "title": "Experience Stage",
        "description": "Work as an apprentice, gain practical exposure, and pass your trade test.",
        "resources": ["https://www.fasset.org.za", "https://www.saiee.org.za"]
      }
    ]
  },
  {
    "title": "Plumber",
    "overview": "Installs and repairs water, drainage, and sewage systems for homes and businesses.",
    "requiredSkills": ["Pipe Fitting", "Problem-Solving", "Mechanical Knowledge", "Blueprint Interpretation"],
    "educationPath": "National Certificate in Plumbing (NQF Level 4) and completion of a trade test.",
    "avgSalary": "R150,000 - R350,000 / year",
    "categories": ["Skilled Trades", "Plumbing"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Complete an accredited plumbing course and apprenticeship training.",
        "resources": ["https://www.iopsa.org/", "https://www.skillsacademy.co.za/plumbing-courses/"]
      },
      {
        "title": "Experience Stage",
        "description": "Work under a registered plumber, gain experience, and register with PIRB.",
        "resources": ["https://pirb.co.za", "https://www.plumbingindustry.co.za"]
      }
    ]
  },
  {
    "title": "Welder",
    "overview": "Joins and fabricates metal structures using various welding techniques such as MIG, TIG, and Arc welding.",
    "requiredSkills": ["Welding Techniques", "Attention to Detail", "Blueprint Reading", "Manual Dexterity"],
    "educationPath": "National Certificate in Welding (NQF Level 2-4) plus practical training.",
    "avgSalary": "R120,000 - R300,000 / year",
    "categories": ["Skilled Trades", "Metalwork"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Complete a welding course through an accredited institution or TVET college.",
        "resources": ["https://www.merseta.org.za/", "https://www.skillsacademy.co.za/welding-courses/"]
      },
      {
        "title": "Experience Stage",
        "description": "Work on-site as a welder, gain practical expertise, and specialize in high-demand techniques.",
        "resources": ["https://www.saisc.co.za", "https://www.aws.org"]
      }
    ]
  },
  {
    "title": "Carpenter",
    "overview": "Designs, builds, installs, and repairs wooden structures, furniture, and frameworks.",
    "requiredSkills": ["Woodworking", "Measurement & Precision", "Tool Handling", "Design Skills"],
    "educationPath": "NQF Level 3-4 in Carpentry, plus apprenticeship and trade test.",
    "avgSalary": "R140,000 - R350,000 / year",
    "categories": ["Skilled Trades", "Woodwork"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Learn carpentry fundamentals, woodworking techniques, and blueprint reading.",
        "resources": ["https://www.skillsacademy.co.za/carpentry-courses/", "https://www.merseta.org.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Work with professional carpenters, refine your craftsmanship, and build a portfolio.",
        "resources": ["https://www.saice.org.za", "https://www.diyhome.co.za"]
      }
    ]
  },
  {
    "title": "Bricklayer / Mason",
    "overview": "Builds walls, structures, and pathways using bricks, stones, and concrete blocks.",
    "requiredSkills": ["Bricklaying Techniques", "Measurement & Accuracy", "Physical Strength", "Construction Knowledge"],
    "educationPath": "National Certificate in Bricklaying and Plastering (NQF Level 3) with trade test.",
    "avgSalary": "R100,000 - R280,000 / year",
    "categories": ["Skilled Trades", "Construction"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Study bricklaying basics at an accredited TVET or trade school.",
        "resources": ["https://www.skillsacademy.co.za/bricklaying-courses/", "https://www.merseta.org.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Gain on-site experience working on construction projects and master advanced techniques.",
        "resources": ["https://www.cidb.org.za", "https://www.saice.org.za"]
      }
    ]
  },
  {
    "title": "Motor Mechanic",
    "overview": "Repairs and maintains cars, trucks, and other vehicles, diagnosing mechanical and electrical faults.",
    "requiredSkills": ["Engine Diagnostics", "Mechanical Knowledge", "Problem-Solving", "Tool Handling"],
    "educationPath": "National Certificate in Automotive Repair (NQF Level 4) and trade certification.",
    "avgSalary": "R120,000 - R360,000 / year",
    "categories": ["Skilled Trades", "Automotive"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Study vehicle systems, diagnostics, and repair methods in an accredited automotive school.",
        "resources": ["https://www.merseta.org.za/", "https://www.skillsacademy.co.za/motor-mechanic-courses/"]
      },
      {
        "title": "Experience Stage",
        "description": "Work in a repair shop or dealership, specialize in hybrid/electric vehicles for future demand.",
        "resources": ["https://www.saiosh.co.za", "https://www.aa.co.za"]
      }
    ]
  },
  {
    "title": "Boilermaker",
    "overview": "Fabricates, installs, and repairs boilers, tanks, and heavy metal structures for construction and mining.",
    "requiredSkills": ["Welding", "Blueprint Reading", "Metal Fabrication", "Safety Practices"],
    "educationPath": "NQF Level 4 in Boilermaking plus apprenticeship and trade test.",
    "avgSalary": "R160,000 - R400,000 / year",
    "categories": ["Skilled Trades", "Metal Fabrication"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Complete a boilermaking course and welding certification at a TVET or trade school.",
        "resources": ["https://www.merseta.org.za/", "https://www.skillsacademy.co.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Work on-site in construction or mining, gaining exposure to high-pressure environments.",
        "resources": ["https://www.saimm.co.za", "https://www.saisc.co.za"]
      }
    ]
  },
  {
    "title": "Painter & Decorator",
    "overview": "Prepares and applies paints, wallpapers, and finishes to interior and exterior surfaces.",
    "requiredSkills": ["Surface Preparation", "Color Theory", "Attention to Detail", "Creativity"],
    "educationPath": "Short courses or National Certificate in Painting & Decorating (NQF Level 2-3).",
    "avgSalary": "R90,000 - R240,000 / year",
    "categories": ["Skilled Trades", "Home Improvement"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Learn painting techniques, color combinations, and surface preparation.",
        "resources": ["https://www.skillsacademy.co.za/painting-courses/", "https://www.cidb.org.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Gain hands-on practice through apprenticeships and freelance projects.",
        "resources": ["https://www.houzz.com", "https://www.dulux.co.za"]
      }
    ]
  },
  {
    "title": "HVAC Technician",
    "overview": "Installs, repairs, and maintains heating, ventilation, and air conditioning systems in residential and commercial spaces.",
    "requiredSkills": ["HVAC Systems", "Problem-Solving", "Technical Diagnostics", "Safety Compliance"],
    "educationPath": "National Certificate in Refrigeration & Air Conditioning (NQF Level 4) plus practical training.",
    "avgSalary": "R150,000 - R380,000 / year",
    "categories": ["Skilled Trades", "HVAC"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Study HVAC systems, refrigeration principles, and energy efficiency techniques.",
        "resources": ["https://www.sais.org.za", "https://www.skillsacademy.co.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Gain field experience installing and servicing residential and commercial HVAC systems.",
        "resources": ["https://www.saia.org.za", "https://www.hvacrresources.org"]
      }
    ]
  },
  {
    "title": "Chef",
    "overview": "Prepares and cooks food in restaurants, hotels, or catering services, creating menus and managing kitchen staff.",
    "requiredSkills": ["Culinary Techniques", "Menu Planning", "Time Management", "Creativity"],
    "educationPath": "Diploma or Certificate in Culinary Arts from a recognized institution.",  
    "avgSalary": "R120,000 - R400,000 / year",
    "categories": ["Culinary Arts", "Hospitality"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Learn cooking techniques, food safety, and kitchen management.",
        "resources": ["https://www.cookeryschool.co.za", "https://www.udemy.com/course/culinary-arts/"]
      },
      {
        "title": "Experience Stage",
        "description": "Work in professional kitchens, refine your skills, and develop a unique culinary style.",
        "resources": ["https://www.chefsunited.co.za", "https://www.bbcgoodfood.com/"]
      }
    ]
  },
  {
    "title": "Butcher", 
    "overview": "Prepares and cuts meat products for retail or food service, ensuring quality and hygiene standards.",
    "requiredSkills": ["Meat Cutting", "Food Safety", "Customer Service", "Attention to Detail"],
    "educationPath": "National Certificate in Meat Processing (NQF Level 2-3) or apprenticeship.",
    "avgSalary": "R100,000 - R250,000 / year",
    "categories": ["Food Processing", "Retail"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Learn meat cutting techniques, hygiene standards, and customer service skills.",
        "resources": ["https://www.fasset.org.za", "https://www.skillsacademy.co.za/butcher-courses/"]
      },
      {
        "title": "Experience Stage",
        "description": "Gain hands-on experience in butcher shops or meat processing facilities.",
        "resources": ["https://www.meatboard.co.za", "https://www.safoodservice.co.za"]
      }
    ]
  },
  {
    title: "Supply Chain Manager",
    overview: "Oversees the entire supply chain process, ensuring the smooth flow of goods from suppliers to customers while optimizing costs and efficiency.",
    requiredSkills: ["Supply Chain Management", "Leadership", "Negotiation", "Analytics", "Problem-Solving"],
    educationPath: "Bachelor's in Supply Chain Management, Logistics, Business Administration, or Industrial Engineering.",
    avgSalary: "R550,000 - R1,200,000 / year",
    categories: ["Logistics", "Management", "Operations"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Earn a degree in supply chain, logistics, or business, and gain foundational knowledge of operations and inventory management.",
        resources: ["https://www.coursera.org/specializations/supply-chain-management", "https://edx.org/course/supply-chain-fundamentals"]
      },
      {
        title: "Experience Stage",
        description: "Work in procurement, warehouse, or logistics roles, and build leadership skills to transition into managerial positions.",
        resources: ["https://www.apics.org", "https://www.instituteforsupplymanagement.org"]
      }
    ]
  },
  {
    title: "Logistics Coordinator",
    overview: "Coordinates the transportation and delivery of goods, ensuring schedules are met and processes run smoothly.",
    requiredSkills: ["Scheduling", "Inventory Control", "Communication", "Problem-Solving", "Attention to Detail"],
    educationPath: "Diploma or Bachelor's in Logistics, Transportation, or Supply Chain Management.",
    avgSalary: "R200,000 - R450,000 / year",
    categories: ["Logistics", "Operations"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn the fundamentals of transportation, warehousing, and scheduling logistics operations.",
        resources: ["https://alison.com/course/diploma-in-logistics", "https://www.udemy.com/course/logistics-management"]
      },
      {
        title: "Experience Stage",
        description: "Gain hands-on experience in logistics coordination by working in warehouses, freight forwarding, or courier companies.",
        resources: ["https://cilt.co.za/", "https://logisticsdegree.net/"]
      }
    ]
  },
  {
    title: "Procurement Specialist",
    overview: "Manages sourcing, negotiation, and purchasing of goods and services for organizations while optimizing costs and vendor relationships.",
    requiredSkills: ["Negotiation", "Contract Management", "Supplier Relations", "Cost Optimization", "Analytics"],
    educationPath: "Bachelor's in Procurement, Supply Chain, or Business Administration. Certifications like CIPS are beneficial.",
    avgSalary: "R300,000 - R700,000 / year",
    categories: ["Procurement", "Logistics", "Supply Chain"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study procurement strategies, supplier management, and cost-saving techniques.",
        resources: ["https://www.cips.org", "https://www.udemy.com/course/procurement-management"]
      },
      {
        title: "Experience Stage",
        description: "Work in entry-level procurement roles, build supplier relationships, and gain experience in contract negotiation.",
        resources: ["https://www.apics.org", "https://procurementfoundry.com"]
      }
    ]
  },
  {
    title: "Warehouse Manager",
    overview: "Oversees warehouse operations, manages inventory, supervises staff, and ensures goods are stored and distributed efficiently.",
    requiredSkills: ["Inventory Management", "Leadership", "Safety Compliance", "Organizational Skills"],
    educationPath: "Diploma or Bachelor's in Logistics, Supply Chain, or Warehouse Management.",
    avgSalary: "R250,000 - R600,000 / year",
    categories: ["Warehouse Management", "Logistics"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn warehouse operations, safety protocols, and inventory optimization techniques.",
        resources: ["https://www.udemy.com/course/warehouse-management", "https://alison.com/course/diploma-in-warehouse-management"]
      },
      {
        title: "Experience Stage",
        description: "Gain hands-on experience in warehouse supervision, ERP systems, and team leadership.",
        resources: ["https://www.apics.org", "https://logisticsdegree.net"]
      }
    ]
  },
  {
    title: "Freight Forwarder",
    overview: "Acts as an intermediary between shippers and carriers, arranging the transportation of goods domestically and internationally.",
    requiredSkills: ["Customs Knowledge", "Documentation", "Negotiation", "Multitasking", "Problem-Solving"],
    educationPath: "Diploma or Bachelor's in Logistics, Freight Management, or Supply Chain.",
    avgSalary: "R250,000 - R650,000 / year",
    categories: ["Freight", "Logistics", "Transport"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn about freight handling, customs clearance, and international shipping regulations.",
        resources: ["https://www.udemy.com/course/freight-forwarding", "https://www.coursera.org/learn/logistics"]
      },
      {
        title: "Experience Stage",
        description: "Work for freight forwarding companies, shipping lines, or international trade organizations.",
        resources: ["https://cilt.co.za/", "https://www.freightwaves.com"]
      }
    ]
  },
  {
    title: "Inventory Analyst",
    overview: "Monitors stock levels, analyzes trends, and optimizes inventory management to minimize costs and improve efficiency.",
    requiredSkills: ["Data Analysis", "Inventory Planning", "ERP Systems", "Excel", "Forecasting"],
    educationPath: "Bachelor's in Logistics, Business, or Supply Chain. Certifications like CPIM are a plus.",
    avgSalary: "R220,000 - R500,000 / year",
    categories: ["Inventory", "Logistics", "Analytics"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn stock control, demand forecasting, and supply planning techniques.",
        resources: ["https://www.udemy.com/course/inventory-management", "https://apics.org"]
      },
      {
        title: "Experience Stage",
        description: "Gain practical experience analyzing inventory data and optimizing stock turnover.",
        resources: ["https://cilt.co.za/", "https://logisticsdegree.net"]
      }
    ]
  },
  {
    title: "Customs Broker",
    overview: "Facilitates the clearance of goods through customs by preparing documentation, calculating duties, and ensuring compliance with import/export laws.",
    requiredSkills: ["Customs Regulations", "Documentation", "Problem-Solving", "Attention to Detail"],
    educationPath: "Diploma or Bachelor's in International Trade, Logistics, or Supply Chain.",
    avgSalary: "R300,000 - R700,000 / year",
    categories: ["Logistics", "International Trade"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn import/export laws, customs tariffs, and cross-border trade compliance.",
        resources: ["https://www.udemy.com/course/customs-broker", "https://logisticsdegree.net"]
      },
      {
        title: "Experience Stage",
        description: "Work with freight forwarders, logistics companies, or customs agencies handling cross-border shipments.",
        resources: ["https://www.wto.org", "https://cilt.co.za/"]
      }
    ]
  },
  {
    title: "Transportation Planner",
    overview: "Plans, organizes, and manages transportation routes and schedules to ensure timely deliveries at minimal costs.",
    requiredSkills: ["Route Optimization", "GIS Tools", "Planning", "Cost Management", "Problem-Solving"],
    educationPath: "Bachelor's in Transportation, Supply Chain, or Logistics Engineering.",
    avgSalary: "R350,000 - R800,000 / year",
    categories: ["Transportation", "Planning", "Logistics"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study route optimization techniques, fleet management, and transport infrastructure planning.",
        resources: ["https://www.udemy.com/course/transport-planning", "https://cilt.co.za/"]
      },
      {
        title: "Experience Stage",
        description: "Gain work experience in transportation companies, route planning, and optimization software.",
        resources: ["https://logisticsdegree.net", "https://www.apics.org"]
      }
    ]
  },
  {
    title: "Operations Manager (Logistics)",
    overview: "Leads logistics operations by managing warehouses, fleets, and supply chain processes to ensure business goals are met.",
    requiredSkills: ["Leadership", "Project Management", "Data Analysis", "Cost Control", "Logistics Knowledge"],
    educationPath: "Bachelor's in Logistics, Business, or Industrial Engineering. MBA preferred for senior roles.",
    avgSalary: "R600,000 - R1,200,000 / year",
    categories: ["Logistics", "Management", "Operations"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn business operations, process optimization, and logistics strategy.",
        resources: ["https://www.coursera.org/specializations/operations-management", "https://edx.org/course/operations-management"]
      },
      {
        title: "Experience Stage",
        description: "Work in mid-level supply chain or warehouse management roles before transitioning to senior operations management.",
        resources: ["https://apics.org", "https://cilt.co.za/"]
      }
    ]
  },
  {
    title: "E-commerce Logistics Specialist",
    overview: "Manages the storage, packaging, and delivery processes for online retailers, ensuring fast and efficient fulfillment.",
    requiredSkills: ["E-commerce Fulfillment", "Inventory Management", "Customer Service", "Data Analytics", "Process Optimization"],
    educationPath: "Diploma or Bachelor's in Logistics, Supply Chain, or E-commerce Operations.",
    avgSalary: "R250,000 - R550,000 / year",
    categories: ["E-commerce", "Logistics", "Retail"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn e-commerce logistics systems, order management, and warehouse optimization for online retail.",
        resources: ["https://www.udemy.com/course/ecommerce-logistics", "https://cilt.co.za/"]
      },
      {
        title: "Experience Stage",
        description: "Work with online stores, courier companies, or fulfillment centers to gain practical experience in e-commerce logistics.",
        resources: ["https://www.shopify.com/learn", "https://apics.org"]
      }
    ]
  },
  {
    title: "Fleet Manager",
    overview: "Oversees a company's vehicle fleet, ensuring maintenance, compliance, and efficient use of resources.",
    requiredSkills: ["Fleet Maintenance", "Logistics", "Budgeting", "Regulatory Compliance", "Leadership"],
    educationPath: "Diploma or Bachelor's in Logistics, Business, or Fleet Management.",
    avgSalary: "R300,000 - R700,000 / year",
    categories: ["Fleet Management", "Logistics"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn vehicle maintenance, fleet optimization, and regulatory compliance.",
        resources: ["https://www.udemy.com/course/fleet-management", "https://cilt.co.za/"]
      },
      {
        title: "Experience Stage",
        description: "Gain experience managing vehicle fleets in logistics companies or large organizations.",
        resources: ["https://logisticsdegree.net", "https://apics.org"]
      }
    ]
  },
  {
    title: "Cold Chain Logistics Specialist",
    overview: "Manages the transportation and storage of temperature-sensitive goods, ensuring product integrity throughout the supply chain.",
    requiredSkills: ["Cold Chain Management", "Temperature Control", "Regulatory Compliance", "Logistics"],
    educationPath: "Diploma or Bachelor's in Logistics, Supply Chain, or Food Science.",
    avgSalary: "R280,000 - R600,000 / year",
    categories: ["Cold Chain", "Logistics", "Food Safety"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn cold chain logistics principles, temperature monitoring, and food safety regulations.",
        resources: ["https://www.udemy.#com/course/cold-chain-logistics", "https://cilt.co.za/"]
      },
      {
        title: "Experience Stage",
        description: "Work with pharmaceutical companies, food distributors, or logistics firms specializing in cold chain management.",
        resources: ["https://logisticsdegree.net", "https://apics.org"]
      }
    ]
  },
  {
    title: "Financial Analyst",
    overview: "Analyzes financial data, prepares reports, forecasts trends, and helps businesses make informed investment decisions.",
    requiredSkills: ["Financial Modeling", "Excel", "Data Analysis", "Investment Research", "Reporting"],
    educationPath: "Bachelor’s degree in Finance, Economics, or Accounting. CFA certification is a strong advantage.",
    avgSalary: "R350,000 - R850,000 / year",
    categories: ["Finance", "Investments", "Analysis"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn financial analysis, accounting principles, and investment strategies.",
        resources: [
          "https://www.coursera.org/learn/financial-analysis",
          "https://www.udemy.com/course/finance-for-non-finance/"
        ]
      },
      {
        title: "Certification Stage",
        description: "Consider pursuing a CFA certification to enhance credibility and opportunities.",
        resources: [
          "https://www.cfainstitute.org/",
          "https://www.wallstreetprep.com/"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work on investment research, financial reporting, and forecasting for companies or clients.",
        resources: [
          "https://www.investopedia.com/",
          "https://corporatefinanceinstitute.com/"
        ]
      }
    ]
  },
  {
    title: "Investment Banker",
    overview: "Helps companies raise capital, manage mergers and acquisitions, and structure complex financial deals.",
    requiredSkills: ["Corporate Finance", "Valuation", "Negotiation", "Financial Modeling", "Communication"],
    educationPath: "Bachelor’s degree in Finance, Economics, or Business. MBA or CFA can boost prospects.",
    avgSalary: "R800,000 - R3,000,000 / year",
    categories: ["Finance", "Investment Banking", "Corporate Strategy"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study finance, business, and economics while mastering valuation techniques.",
        resources: [
          "https://www.wallstreetoasis.com/",
          "https://www.udemy.com/course/investment-banking-course/"
        ]
      },
      {
        title: "Internship Stage",
        description: "Gain internship experience at investment banks to build networking and practical skills.",
        resources: [
          "https://www.efinancialcareers.com/",
          "https://www.linkedin.com/learning/"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work on IPOs, mergers, acquisitions, and capital raising strategies.",
        resources: [
          "https://corporatefinanceinstitute.com/",
          "https://www.investopedia.com/"
        ]
      }
    ]
  },
  {
    title: "Auditor",
    overview: "Examines financial statements, ensures accuracy, and checks compliance with regulations.",
    requiredSkills: ["Accounting", "Attention to Detail", "Risk Assessment", "Compliance Knowledge"],
    educationPath: "Bachelor’s degree in Accounting or Auditing. Becoming a Certified Internal Auditor (CIA) is recommended.",
    avgSalary: "R350,000 - R700,000 / year",
    categories: ["Accounting", "Auditing", "Risk Management"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn accounting principles, auditing techniques, and compliance requirements.",
        resources: [
          "https://www.accountingcoach.com/",
          "https://www.udemy.com/course/auditing/"
        ]
      },
      {
        title: "Certification Stage",
        description: "Earn a CIA certification to improve credibility and job prospects.",
        resources: [
          "https://www.theiia.org/",
          "https://www.coursera.org/specializations/auditing"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work as an internal or external auditor to evaluate financial accuracy and risks.",
        resources: [
          "https://www.ifac.org/",
          "https://corporatefinanceinstitute.com/"
        ]
      }
    ]
  },
  {
    title: "Tax Consultant",
    overview: "Advises individuals and businesses on tax strategies, planning, compliance, and returns.",
    requiredSkills: ["Tax Laws", "Analytical Skills", "Problem-Solving", "Communication"],
    educationPath: "Bachelor’s degree in Accounting, Finance, or Taxation. A tax certification is highly recommended.",
    avgSalary: "R300,000 - R800,000 / year",
    categories: ["Accounting", "Taxation", "Consulting"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn tax laws, regulations, and strategic planning techniques.",
        resources: [
          "https://www.accountingcoach.com/",
          "https://www.udemy.com/course/tax-preparation-course/"
        ]
      },
      {
        title: "Certification Stage",
        description: "Pursue tax-related certifications like SAIT or CTA to advance your career.",
        resources: [
          "https://www.thesait.org.za/",
          "https://www.coursera.org/specializations/taxation"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work with businesses or individuals to manage tax compliance and optimization.",
        resources: [
          "https://www.investopedia.com/taxes/",
          "https://www.hrblock.com/"
        ]
      }
    ]
  },
  {
    title: "Risk Manager",
    overview: "Identifies, analyzes, and manages financial, operational, and strategic risks for organizations.",
    requiredSkills: ["Risk Assessment", "Financial Modeling", "Regulatory Compliance", "Problem-Solving"],
    educationPath: "Bachelor’s degree in Finance, Economics, or Risk Management. FRM certification is a major advantage.",
    avgSalary: "R600,000 - R1,500,000 / year",
    categories: ["Finance", "Risk Management", "Compliance"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study risk management, probability, statistics, and financial modeling.",
        resources: [
          "https://www.coursera.org/specializations/risk-management",
          "https://corporatefinanceinstitute.com/"
        ]
      },
      {
        title: "Certification Stage",
        description: "Pursue the Financial Risk Manager (FRM) certification for better opportunities.",
        resources: [
          "https://www.garp.org/frm",
          "https://www.udemy.com/course/risk-management/"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work with companies to assess risks and develop mitigation strategies.",
        resources: [
          "https://www.investopedia.com/",
          "https://www.edx.org/course/risk-management"
        ]
      }
    ]
  },
  {
    title: "Payroll Specialist",
    overview: "Manages employee salaries, tax deductions, and ensures compliance with labor and tax laws.",
    requiredSkills: ["Payroll Systems", "Compliance Knowledge", "Attention to Detail", "Financial Reporting"],
    educationPath: "Diploma or bachelor’s degree in Accounting, HR, or Finance. Experience with payroll software is essential.",
    avgSalary: "R250,000 - R600,000 / year",
    categories: ["Accounting", "Payroll", "Human Resources"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn payroll processes, tax laws, and HR compliance regulations.",
        resources: [
          "https://www.udemy.com/course/payroll-training/",
          "https://www.accountingcoach.com/"
        ]
      },
      {
        title: "Practical Training Stage",
        description: "Gain hands-on experience with payroll software like Sage, Pastel, or SAP.",
        resources: [
          "https://sage.com/en-za/",
          "https://quickbooks.intuit.com/"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work in payroll administration or HR departments to handle salary processing.",
        resources: [
          "https://www.hrblock.com/",
          "https://corporatefinanceinstitute.com/"
        ]
      }
    ]
  },
  {
    title: "Marketing Manager",
    overview: "Oversees marketing campaigns, branding strategies, and promotional activities to drive business growth.",
    requiredSkills: ["Marketing Strategy", "Brand Management", "Market Research", "Communication"],
    educationPath: "Bachelor’s degree in Marketing, Business, or Communications. MBA is beneficial.",
    avgSalary: "R450,000 - R1,000,000 / year",
    categories: ["Marketing", "Business", "Management"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study marketing principles, digital marketing, and brand management.",
        resources: ["https://www.cim.co.uk/", "https://www.coursera.org/specializations/digital-marketing"]
      },
      {
        title: "Experience Stage",
        description: "Work on real campaigns, manage teams, and track marketing KPIs.",
        resources: ["https://www.hubspot.com/resources", "https://www.marketingweek.com"]
      }
    ]
  },
  {
    title: "Public Relations Specialist",
    overview: "Manages an organization’s public image and maintains positive relationships with the media and stakeholders.",
    requiredSkills: ["Communication", "Crisis Management", "Media Relations", "Writing"],
    educationPath: "Bachelor’s degree in Public Relations, Communications, or Journalism.",
    avgSalary: "R250,000 - R600,000 / year",
    categories: ["PR", "Media", "Communication"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn PR principles, media writing, and crisis management strategies.",
        resources: ["https://www.prsa.org", "https://www.udemy.com/course/public-relations-pr-strategies/"]
      },
      {
        title: "Experience Stage",
        description: "Build media networks, manage press releases, and develop PR campaigns.",
        resources: ["https://www.holmesreport.com", "https://www.prweek.com"]
      }
    ]
  },
  {
    title: "Journalist",
    overview: "Researches, writes, and reports news stories for print, broadcast, or digital media.",
    requiredSkills: ["Investigative Skills", "Writing", "Interviewing", "Critical Thinking"],
    educationPath: "Bachelor’s degree in Journalism, Media Studies, or Communications.",
    avgSalary: "R180,000 - R500,000 / year",
    categories: ["Media", "Writing", "Communication"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn journalism ethics, writing styles, and multimedia reporting.",
        resources: ["https://www.poynter.org", "https://www.coursera.org/learn/journalism"]
      },
      {
        title: "Experience Stage",
        description: "Work with newsrooms, develop investigative skills, and specialize in beats.",
        resources: ["https://www.nieman.harvard.edu", "https://ijnet.org"]
      }
    ]
  },
  {
    title: "Digital Marketing Specialist",
    overview: "Focuses on online marketing strategies such as SEO, SEM, social media, and email marketing.",
    requiredSkills: ["SEO/SEM", "Social Media Marketing", "Content Creation", "Analytics"],
    educationPath: "Bachelor’s degree in Marketing, Digital Media, or related fields. Digital certifications are valuable.",
    avgSalary: "R250,000 - R700,000 / year",
    categories: ["Marketing", "Digital Media", "Analytics"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn SEO, social media strategies, and digital analytics tools.",
        resources: ["https://www.google.com/analytics/academy/", "https://www.udemy.com/course/seo-training-course/"]
      },
      {
        title: "Experience Stage",
        description: "Run online campaigns, optimize websites, and track digital performance metrics.",
        resources: ["https://moz.com/learn/seo", "https://ahrefs.com/blog"]
      }
    ]
  },
  {
    title: "Content Creator",
    overview: "Produces engaging content for platforms like YouTube, TikTok, blogs, and podcasts.",
    requiredSkills: ["Video Production", "Content Strategy", "Storytelling", "Creativity"],
    educationPath: "No strict degree required. Training in media production and digital tools is beneficial.",
    avgSalary: "R150,000 - R600,000 / year (varies by platform & audience size)",
    categories: ["Media", "Creative", "Digital"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn video editing, social media platforms, and storytelling techniques.",
        resources: ["https://www.skillshare.com/browse/content-creation", "https://creatoracademy.youtube.com/"]
      },
      {
        title: "Experience Stage",
        description: "Build a personal brand, collaborate with brands, and grow audiences.",
        resources: ["https://www.hootsuite.com/resources", "https://www.socialmediaexaminer.com"]
      }
    ]
  },
  {
    title: "Advertising Specialist",
    overview: "Designs and executes ad campaigns across traditional and digital platforms.",
    requiredSkills: ["Creative Strategy", "Media Planning", "Copywriting", "Analytics"],
    educationPath: "Bachelor’s degree in Advertising, Marketing, or Communications.",
    avgSalary: "R300,000 - R800,000 / year",
    categories: ["Advertising", "Marketing", "Creative"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn creative ad design, copywriting, and campaign planning.",
        resources: ["https://www.adobe.com/creativecloud.html", "https://www.coursera.org/specializations/advertising"]
      },
      {
        title: "Experience Stage",
        description: "Work with agencies, manage ad budgets, and analyze ad performance.",
        resources: ["https://www.adage.com", "https://www.warc.com"]
      }
    ]
  },
  {
    title: "Brand Strategist",
    overview: "Develops strategies to define and grow a company’s brand identity and market presence.",
    requiredSkills: ["Brand Management", "Market Analysis", "Communication", "Creative Thinking"],
    educationPath: "Bachelor’s degree in Marketing, Business, or Communications.",
    avgSalary: "R400,000 - R900,000 / year",
    categories: ["Branding", "Marketing", "Strategy"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study branding principles, consumer behavior, and strategy development.",
        resources: ["https://www.coursera.org/learn/brand-management", "https://www.futurelearn.com/courses/branding"]
      },
      {
        title: "Experience Stage",
        description: "Work on brand campaigns, analyze consumer insights, and create brand roadmaps.",
        resources: ["https://www.brandingmag.com", "https://www.interbrand.com"]
      }
    ]
  },
  {
    title: "Social Media Manager",  
    overview: "Manages an organization’s social media presence, content strategy, and audience engagement.",
    requiredSkills: ["Social Media Strategy", "Content Creation", "Analytics", "Community Management"],
    educationPath: "Bachelor’s degree in Marketing, Communications, or related fields. Certifications in social media are beneficial.",
    avgSalary: "R250,000 - R600,000 / year",  
    categories: ["Social Media", "Marketing", "Digital"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn social media platforms, content strategies, and analytics tools.",
        resources: ["https://www.hootsuite.com/academy", "https://www.coursera.org/specializations/social-media-marketing"]
      },
      {
        title: "Experience Stage",
        description: "Manage social media accounts, create engaging content, and analyze performance metrics.",
        resources: ["https://buffer.com/resources", "https://sproutsocial.com/insights/"]
      }
    ]
  },
  {
    "title": "Lawyer",
    "overview": "Represents clients in legal matters, provides legal advice, drafts contracts, and advocates in court.",
    "requiredSkills": ["Legal Research", "Critical Thinking", "Negotiation", "Communication"],
    "educationPath": "LLB (Bachelor of Laws) degree, followed by articles of clerkship and admission exams.",
    "avgSalary": "R400,000 - R1,200,000 / year",
    "categories": ["Law", "Legal Services"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Complete LLB and study legal frameworks, constitutional law, and legal writing.",
        "resources": ["https://www.lssa.org.za", "https://www.coursera.org/browse/law"]
      },
      {
        "title": "Experience Stage",
        "description": "Serve articles, work in a law firm, or government legal office to gain practical experience.",
        "resources": ["https://www.lawsociety.org.za", "https://www.lexology.com"]
      }
    ]
  },
  {
    "title": "Judge",
    "overview": "Presides over court proceedings, interprets laws, and delivers rulings in cases.",
    "requiredSkills": ["Legal Expertise", "Critical Judgment", "Impartiality", "Decision-Making"],
    "educationPath": "LLB degree, several years of legal practice as an attorney or advocate, followed by appointment.",
    "avgSalary": "R800,000 - R1,800,000 / year",
    "categories": ["Law", "Justice System"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Earn a law degree and develop deep knowledge in multiple areas of law.",
        "resources": ["https://www.coursera.org/specializations/international-law", "https://www.lssa.org.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Practice law for 10+ years before being considered for judicial appointment.",
        "resources": ["https://www.justice.gov.za", "https://www.icj.org"]
      }
    ]
  },
  {
    "title": "Prosecutor",
    "overview": "Represents the state in criminal trials, presenting evidence against defendants.",
    "requiredSkills": ["Courtroom Advocacy", "Criminal Law", "Case Analysis", "Research"],
    "educationPath": "LLB degree, admission as an attorney/advocate, then join the National Prosecuting Authority (NPA).",
    "avgSalary": "R350,000 - R900,000 / year",
    "categories": ["Law", "Criminal Justice"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Specialize in criminal law during LLB studies.",
        "resources": ["https://www.npa.gov.za", "https://www.iclr.co.uk"]
      },
      {
        "title": "Experience Stage",
        "description": "Work with the NPA handling criminal cases, preparing evidence, and prosecuting offenders.",
        "resources": ["https://www.justice.gov.za/npa", "https://www.cps.gov.uk"]
      }
    ]
  },
  {
    "title": "Diplomat",
    "overview": "Represents a country abroad, negotiates treaties, and promotes national interests.",
    "requiredSkills": ["International Relations", "Negotiation", "Cultural Awareness", "Languages"],
    "educationPath": "Degree in International Relations, Political Science, or Law. Foreign service training required.",
    "avgSalary": "R400,000 - R1,200,000 / year",
    "categories": ["Government", "International Relations"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Study politics, law, and international diplomacy.",
        "resources": ["https://www.edx.org/course/international-relations", "https://www.dirco.gov.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Join the Department of International Relations and Cooperation (DIRCO) as a trainee diplomat.",
        "resources": ["https://www.un.org/en/careers", "https://www.foreignaffairs.com"]
      }
    ]
  },
  {
    "title": "Civil Servant",
    "overview": "Works in government departments implementing policies, managing public services, and supporting development.",
    "requiredSkills": ["Public Administration", "Policy Development", "Leadership", "Project Management"],
    "educationPath": "Degree in Public Administration, Political Science, Law, or relevant field.",
    "avgSalary": "R250,000 - R800,000 / year",
    "categories": ["Government", "Public Service"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Study public administration, governance, or political science.",
        "resources": ["https://www.coursera.org/learn/public-policy", "https://www.gov.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Apply for government graduate programs or public administration roles.",
        "resources": ["https://www.gov.za", "https://www.publicadministrationreview.com"]
      }
    ]
  },
  {
    "title": "Policy Analyst",
    "overview": "Researches, analyzes, and advises on government policies to address social and economic issues.",
    "requiredSkills": ["Policy Research", "Data Analysis", "Critical Thinking", "Communication"],
    "educationPath": "Degree in Economics, Political Science, Law, or Public Policy.",
    "avgSalary": "R350,000 - R950,000 / year",
    "categories": ["Government", "Policy Research"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Develop knowledge of economics, governance, and policy frameworks.",
        "resources": ["https://www.policyanalyst.com", "https://www.coursera.org/specializations/public-policy"]
      },
      {
        "title": "Experience Stage",
        "description": "Work with think tanks, NGOs, or government departments to analyze and draft policy proposals.",
        "resources": ["https://www.rand.org", "https://www.brookings.edu"]
      }
    ]
  },
  {
    "title": "Correctional Officer",
    "overview": "Manages correctional facilities, oversees inmates, and ensures rehabilitation programs.",
    "requiredSkills": ["Security Management", "Conflict Resolution", "Discipline", "Law Enforcement"],
    "educationPath": "Diploma or degree in Corrections Management, Criminology, or Security Studies.",
    "avgSalary": "R200,000 - R500,000 / year",
    "categories": ["Law Enforcement", "Corrections"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Study criminology or correctional management.",
        "resources": ["https://www.unisa.ac.za", "https://www.corrections.gov.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Join Department of Correctional Services and gain field experience.",
        "resources": ["https://www.corrections.gov.za", "https://nicic.gov"]
      }
    ]
  },
  {
    "title": "Forensic Scientist",
    "overview": "Analyzes physical evidence from crime scenes to assist in criminal investigations.",
    "requiredSkills": ["Laboratory Skills", "Attention to Detail", "Analytical Thinking", "Report Writing"],
    "educationPath": "Degree in Forensic Science, Chemistry, Biology, or related field.",
    "avgSalary": "R300,000 - R800,000 / year",  
    "categories": ["Forensics", "Science", "Law Enforcement"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Learn forensic analysis techniques, crime scene investigation, and lab procedures.",
        "resources": ["https://www.aafs.org", "https://www.coursera.org/specializations/forensic-science"]
      },
      {
        "title": "Experience Stage",
        "description": "Work in forensic labs, police departments, or government agencies handling evidence analysis.",
        "resources": ["https://www.fbi.gov/services/laboratory", "https://www.ncjrs.gov"]
      }
    ]
  },
  {
    "title": "Intelligence Analyst",
    "overview": "Gathers and analyzes information to support national security and law enforcement operations.",
    "requiredSkills": ["Data Analysis", "Critical Thinking", "Research", "Communication"],
    "educationPath": "Degree in International Relations, Political Science, Criminology, or related field.",
    "avgSalary": "R400,000 - R1,000,000 / year",
    "categories": ["Intelligence", "Security", "Analysis"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Study intelligence analysis, geopolitics, and security studies.",
        "resources": ["https://www.coursera.org/specializations/intelligence-analysis", "https://www.unisa.ac.za"]
      },
      {
        "title": "Experience Stage",
        "description": "Work with intelligence agencies, law enforcement, or defense organizations.",
        "resources": ["https://www.dia.mil", "https://www.cia.gov"]
      }
    ]
  },
  {
    "title": "Human Rights Advocate",
    "overview": "Works to protect and promote human rights through legal action, policy advocacy, and public education.",
    "requiredSkills": ["Legal Knowledge", "Advocacy", "Research", "Communication"],
    "educationPath": "Degree in Law, Human Rights, Political Science, or related field.",
    "avgSalary": "R300,000 - R800,000 / year",
    "categories": ["Human Rights", "Law", "Advocacy"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Learn international human rights law, advocacy techniques, and research methods.",
        "resources": ["https://www.ohchr.org", "https://www.coursera.org/specializations/human-rights"]
      },
      {
        "title": "Experience Stage",
        "description": "Work with NGOs, legal aid organizations, or international bodies focused on human rights.",
        "resources": ["https://www.amnesty.org", "https://www.hrw.org"]
      }
    ]
  },
  {
    "title": "Mediator",  
    "overview": "Facilitates negotiations and conflict resolution between disputing parties outside of court.",
    "requiredSkills": ["Negotiation", "Conflict Resolution", "Communication", "Impartiality"],
    "educationPath": "Degree in Law, Psychology, or Conflict Resolution. Mediation certification is essential.",
    "avgSalary": "R250,000 - R700,000 / year",
    "categories": ["Mediation", "Law", "Conflict Resolution"],
    "roadmap": [  
      {
        "title": "Education Stage",
        "description": "Study mediation techniques, negotiation strategies, and conflict resolution.",
        "resources": ["https://www.mediate.com", "https://www.coursera.org/learn/conflict-resolution"]
      },
      {
        "title": "Certification Stage",
        "description": "Obtain mediation certification from recognized bodies.",
        "resources": ["https://www.acrnet.org", "https://www.imimediation.org"]
      },
      {
        "title": "Experience Stage",
        "description": "Gain experience mediating disputes in legal, community, or organizational settings.",
        "resources": ["https://www.mediate.com/articles", "https://www.adr.org"]
      }
    ]
  },
  {
    "title": "Legal Consultant",
    "overview": "Provides expert legal advice to businesses, governments, or individuals on various legal matters.",    
    "requiredSkills": ["Legal Research", "Advisory Skills", "Communication", "Problem-Solving"],
    "educationPath": "LLB degree and admission as an attorney or advocate. Specialized legal knowledge is beneficial.",
    "avgSalary": "R500,000 - R1,500,000 / year",
    "categories": ["Law", "Consulting"],    
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Complete LLB and specialize in areas like corporate law, tax law, or intellectual property.",
        "resources": ["https://www.lssa.org.za", "https://www.coursera.org/browse/law"]
      },
      {
        "title": "Experience Stage",
        "description": "Work in law firms or corporate legal departments to gain advisory experience.",
        "resources": ["https://www.lexology.com", "https://www.law360.com"]
      }
    ]
  },
  {
    "title": "Paralegal",
    "overview": "Assists lawyers by conducting research, drafting documents, and managing case files.",
    "requiredSkills": ["Legal Research", "Writing", "Organizational Skills", "  Attention to Detail"],
    "educationPath": "Diploma or certificate in Paralegal Studies or Legal Assistance.",  
    "avgSalary": "R180,000 - R400,000 / year",
    "categories": ["Law", "Legal Support"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Learn legal terminology, research methods, and document preparation.",
        "resources": ["https://www.paralegal.org", "https://www.udemy.com/course/paralegal-training/"]
      },
      {
        "title": "Experience Stage",
        "description": "Work in law firms, corporate legal departments, or government agencies.",
        "resources": ["https://www.lawjobs.com", "https://www.indeed.com/q-Paralegal-jobs.html"]
      }
    ]
  },
  {
    title: "E-commerce Logistics Coordinator",  
    overview: "Manages the logistics of online retail operations, including inventory management, order fulfillment, and shipping.",
    requiredSkills: ["E-commerce Platforms", "Inventory Management", "Order Fulfillment", "Customer Service"],  
    educationPath: "Diploma or Bachelor's in Logistics, Supply Chain, or Business Administration.",
    avgSalary: "R250,000 - R600,000 / year",
    categories: ["E-commerce", "Logistics", "Supply Chain"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn e-commerce operations, logistics management, and customer service principles.",
        resources: ["https://www.shopify.com/learn", "https://www.coursera.org/specializations/e-commerce"]
      },
      {
        title: "Experience Stage",
        description: "Work with online retailers or logistics companies specializing in e-commerce fulfillment.",
        resources: ["https://www.logisticsdegree.net", "https://apics.org"]
      }
    ]
  },
  {
    title: "Veterinarianian",
    overview: "Provides medical care to animals, including diagnosis, treatment, and surgery.",
    requiredSkills: ["Animal Care", "Surgery", "Diagnosis", "Communication"],
    educationPath: "Bachelor’s degree in Veterinary Science (BVSc) and registration with the South African Veterinary Council (SAVC).",
    avgSalary: "R300,000 - R900,000 / year",
    categories: ["Veterinary", "Animal Care", "Healthcare"], 
    roadmap: [
      {
        title: "Education Stage",
        description: "Complete a BVSc degree and gain knowledge in animal anatomy, diseases, and treatments.",
        resources: ["https://www.savc.org.za", "https://www.coursera.org/specializations/veterinary-science"]
      },
      {
        title: "Experience Stage",
        description: "Work in veterinary clinics, animal hospitals, or wildlife conservation organizations.",
        resources: ["https://www.avma.org", "https://www.vetmed.wsu.edu"]
      }
    ]
  },
  {
    title: "Animal Nutritionist",
    overview: "Develops dietary plans and nutritional programs for animals to ensure their health and well-being.",
    requiredSkills: ["Animal Nutrition", "Diet Planning", "Research", "Communication"], 
    educationPath: "Degree in Animal Science, Veterinary Science, or Nutrition. Specialized training in animal nutrition is beneficial.",
    avgSalary: "R250,000 - R700,000 / year",
    categories: ["Animal Care", "Nutrition", "Science"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study animal biology, nutrition principles, and diet formulation.",
        resources: ["https://www.asas.org", "https://www.coursera.org/learn/animal-nutrition"]
      },
      {
        title: "Experience Stage",
        description: "Work with farms, zoos, or pet food companies to develop and implement nutrition plans.",
        resources: ["https://www.nutrition.org", "https://www.avma.org"]
      }
    ]
  },
  {
    title: "Wildlife Conservationist",
    overview: "Works to protect wildlife species and their habitats through research, advocacy, and fieldwork.",
    requiredSkills: ["Ecology", "Field Research", "Advocacy", "Communication"],
    educationPath: "Degree in Environmental Science, Biology, or Wildlife Management.",
    avgSalary: "R200,000 - R600,000 / year",
    categories: ["Wildlife", "Conservation", "Environment"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn ecology, conservation biology, and environmental policies.",
        resources: ["https://www.worldwildlife.org", "https://www.coursera.org/specializations/environmental-management"]
      },
      {
        title: "Experience Stage",
        description: "Work with conservation organizations, wildlife reserves, or government agencies.",
        resources: ["https://www.conservation.org", "https://www.iucn.org"]
      }
    ]
  },
  {
    title: "Videographer / Video Producer",
    overview: "Plans, shoots, and edits video content for events, commercials, films, and online platforms.",
    requiredSkills: ["Camera Operation", "Video Editing", "Storyboarding", "Lighting", "Audio Recording"],
    educationPath: "Diploma or Bachelor's in Film, Media Production, or related field. Practical experience is critical.",
    avgSalary: "R250,000 - R600,000 / year",
    categories: ["Media", "Videography", "Content Creation"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn video production, camera techniques, lighting, and editing software.",
        resources: ["https://www.coursera.org/specializations/video-production", "https://www.udemy.com/course/video-production/"]
      },
      {
        title: "Experience Stage",
        description: "Work on projects, short films, or commercial shoots to build a strong portfolio.",
        resources: ["https://www.videomaker.com", "https://nofilmschool.com"]
      }
    ]
  },
  {
    title: "Film Editor / Post-Production Specialist",
    overview: "Edits raw footage into polished content, applying effects, transitions, and color grading to achieve a creative vision.",
    requiredSkills: ["Video Editing", "Color Grading", "Motion Graphics", "Sound Design", "Storytelling"],
    educationPath: "Diploma or Bachelor's in Film Production, Media Studies, or Editing. Knowledge of software like Adobe Premiere, Final Cut Pro, DaVinci Resolve is essential.",
    avgSalary: "R300,000 - R700,000 / year",
    categories: ["Media", "Post-Production", "Editing"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study film editing techniques, post-production workflows, and visual storytelling.",
        resources: ["https://www.lynda.com", "https://www.coursera.org/learn/film-editing"]
      },
      {
        title: "Experience Stage",
        description: "Intern or freelance on projects to gain hands-on editing experience and build a demo reel.",
        resources: ["https://www.videomaker.com", "https://www.motionarray.com"]
      }
    ]
  },
  {
    title: "Director / Creative Director",
    overview: "Leads the creative vision of films, advertisements, or video projects, managing teams and guiding production from concept to final cut.",
    requiredSkills: ["Leadership", "Storytelling", "Project Management", "Scriptwriting", "Visual Composition"],
    educationPath: "Bachelor's in Film, Media, or Creative Arts. Strong portfolio and networking are crucial.",
    avgSalary: "R400,000 - R1,200,000 / year",
    categories: ["Media", "Directing", "Creative Leadership"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn directing principles, cinematography, scriptwriting, and production management.",
        resources: ["https://www.filmschoolonline.com", "https://www.coursera.org/learn/directing"]
      },
      {
        title: "Experience Stage",
        description: "Work on short films, commercials, or music videos to gain leadership experience in production.",
        resources: ["https://nofilmschool.com", "https://www.stage32.com"]
      }
    ]
  },
  {
    title: "Cinematographer / Director of Photography",
    overview: "Responsible for capturing the visual elements of a film or video, including lighting, camera angles, and shot composition.",
    requiredSkills: ["Camera Operation", "Lighting Design", "Shot Composition", "Color Theory", "Collaboration"],
    educationPath: "Diploma or Bachelor's in Cinematography, Film Production, or Media. Practical shooting experience is critical.",
    avgSalary: "R350,000 - R900,000 / year",
    categories: ["Media", "Videography", "Cinematography"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn cinematography, lighting setups, camera techniques, and visual storytelling.",
        resources: ["https://www.coursera.org/learn/filmmaking", "https://nofilmschool.com"]
      },
      {
        title: "Experience Stage",
        description: "Work as a camera operator, assistant DP, or on short film projects to develop expertise.",
        resources: ["https://www.videomaker.com", "https://www.stage32.com"]
      }
    ]
  },
  {
    title: "Motion Graphics Designer / Animator",
    overview: "Creates animated graphics, visual effects, and motion design for videos, advertisements, and digital content.",
    requiredSkills: ["After Effects", "3D Animation", "Illustration", "Visual Effects", "Storytelling"],
    educationPath: "Diploma or Bachelor's in Animation, Graphic Design, or Motion Graphics. Proficiency with Adobe After Effects or Cinema 4D is essential.",
    avgSalary: "R300,000 - R750,000 / year",
    categories: ["Media", "Animation", "Motion Graphics"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn animation principles, motion graphics, visual effects, and software tools.",
        resources: ["https://www.schoolofmotion.com", "https://www.coursera.org/specializations/graphic-design"]
      },
      {
        title: "Experience Stage",
        description: "Work on commercial projects, short films, or online content to build a professional reel.",
        resources: ["https://www.behance.net", "https://www.videohive.net"]
      }
    ]
  },
  {
    title: "Broadcast Journalist / Media Presenter",
    overview: "Researches, reports, and presents news or media content across TV, radio, or online platforms.",
    requiredSkills: ["Research", "Communication", "Public Speaking", "Storytelling", "Interviewing"],
    educationPath: "Bachelor's in Journalism, Media Studies, or Communications. Internships in broadcasting are highly recommended.",
    avgSalary: "R200,000 - R550,000 / year",
    categories: ["Media", "Journalism", "Broadcasting"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study journalism, reporting techniques, media ethics, and public speaking.",
        resources: ["https://www.coursera.org/specializations/journalism", "https://www.nieman.harvard.edu"]
      },
      {
        title: "Experience Stage",
        description: "Intern at TV, radio, or online media outlets to gain practical experience in reporting and presentation.",
        resources: ["https://www.poynter.org", "https://www.mediaupdate.co.za"]
      }
    ]
  },
  {
    title: "Sound Designer / Audio Engineer",
    overview: "Records, edits, and mixes audio for films, commercials, video games, and media productions.",
    requiredSkills: ["Audio Editing", "Mixing & Mastering", "Sound Design", "Music Theory", "Attention to Detail"],
    educationPath: "Diploma or Bachelor's in Audio Engineering, Music Production, or Sound Design. Experience with DAWs is essential.",
    avgSalary: "R220,000 - R600,000 / year",
    categories: ["Media", "Audio Production", "Sound Design"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn recording techniques, mixing, mastering, and sound design principles.",
        resources: ["https://www.coursera.org/learn/audio-production", "https://www.udemy.com/course/audio-engineering/"]
      },
      {
        title: "Experience Stage",
        description: "Work in studios, film sets, or media production houses to gain hands-on audio experience.",
        resources: ["https://www.soundonsound.com", "https://www.audiomasterclass.com"]
      }
    ]
  },
  {
    title: "Content Creator / Social Media Videographer",
    overview: "Creates engaging video content for social media platforms, combining storytelling, trends, and brand marketing.",
    requiredSkills: ["Video Editing", "Social Media Strategy", "Storytelling", "Graphic Design", "Analytics"],
    educationPath: "No strict degree required; diploma in Media, Marketing, or Digital Content is helpful. Strong portfolio required.",
    avgSalary: "R180,000 - R450,000 / year",
    categories: ["Media", "Digital Content", "Videography"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn video production, social media trends, and digital marketing principles.",
        resources: ["https://www.coursera.org/specializations/social-media-marketing", "https://www.udemy.com/course/social-media-marketing/"]
      },
      {
        title: "Experience Stage",
        description: "Create content for brands, YouTube channels, or social media platforms to grow audience and engagement.",
        resources: ["https://www.hootsuite.com", "https://www.canva.com"]
      }
    ]
  },
  {
    title: "Public Relations Specialist",
    overview: "Manages the public image of organizations through media relations, press releases, and event coordination.",
    requiredSkills: ["Communication", "Media Relations", "Writing", "Crisis Management",  "Social Media"],
    educationPath: "Bachelor's in Public Relations, Communications, or Marketing.",
    avgSalary: "R300,000 - R750,000 / year",
    categories: ["Media", "Public Relations", "Communications"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study PR principles, media relations, writing skills, and communication strategies.",
        resources: ["https://www.prsa.org", "https://www.coursera.org/specializations/public-relations"]
      },
      {
        title: "Experience Stage",
        description: "Work in PR agencies, corporate communications, or non-profits to gain practical experience.",
        resources: ["https://www.prweek.com", "https://www.spin-sucks.com"]
      }
    ]
  },
  {
    title: "Event Videographer",  
    overview: "Captures video footage of events such as weddings, corporate functions, and live performances.",
    requiredSkills: ["Camera Operation", "Video Editing", "Event Coordination", "Lighting", "Audio Recording"],
    educationPath: "Diploma or Bachelor's in Film, Media Production, or related field. Practical experience is critical.",
    avgSalary: "R200,000 - R500,000 / year",  
    categories: ["Media", "Videography", "Event Production"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn video production, camera techniques, lighting, and editing software.",
        resources: ["https://www.coursera.org/specializations/video-production", "https://www.udemy.com/course/video-production/"]
      },
      {
        title: "Experience Stage",
        description: "Work on event shoots to build a strong portfolio and gain experience in dynamic environments.",
        resources: ["https://www.videomaker.com", "https://nofilmschool.com"]
      }
    ]
  },
  {
    title: "Digital Marketing Specialist",
    overview: "Develops and implements online marketing strategies to promote brands, products, or services.",
    requiredSkills: ["SEO", "Content Marketing", "Social Media", "Email Marketing", "Analytics"],
    educationPath: "Bachelor's in Marketing, Business, or Communications. Certifications in Google Analytics, SEO, or digital marketing are beneficial.",
    avgSalary: "R300,000 - R800,000 / year",
    categories: ["Marketing", "Digital", "Advertising"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn digital marketing strategies, SEO, content creation, and analytics tools.",
        resources: ["https://www.coursera.org/specializations/digital-marketing", "https://www.hubspot.com/academy"]
      },
      {
        title: "Experience Stage",
        description: "Work with agencies or in-house marketing teams to execute campaigns and analyze performance.",
        resources: ["https://moz.com/learn/seo", "https://www.socialmediaexaminer.com"]
      }
    ]
  },
  {
    "title": "Photographer",
    "overview": "Captures images for various purposes including events, commercial use, journalism, and artistic expression.",
    "requiredSkills": ["Camera Operation", "Photo Editing", "Composition", "Lighting", "Creativity"],
    "educationPath": "No strict degree required; diploma in Photography or Visual Arts is helpful. Strong portfolio required.",
    "avgSalary": "R150,000 - R500,000 / year",  
    "categories": ["Media", "Photography", "Visual Arts"],
    "roadmap": [
      {
        "title": "Education Stage",
        "description": "Learn photography techniques, camera settings, lighting, and photo editing software.",
        "resources": ["https://www.coursera.org/specializations/photography", "https://www.udemy.com/course/photography-masterclass-complete-guide-to-photography/"]
      },
      {
        "title": "Experience Stage",
        "description": "Build a portfolio by shooting various subjects, working on assignments, or assisting established photographers.",
        "resources": ["https://www.behance.net", "https://www.500px.com"]
      }
    ]
  },
  {
    title: "Graphic Designer",
    overview: "Creates visual content for branding, advertising, websites, and print media using design software.",
    requiredSkills: ["Adobe Creative Suite", "Typography", "Layout Design", "Branding", "Creativity"],
    educationPath: "Diploma or Bachelor's in Graphic Design, Visual Arts, or related field.",
    avgSalary: "R200,000 - R600,000 / year",
    categories: ["Media", "Graphic Design", "Visual Arts"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn design principles, typography, color theory, and software tools like Adobe Photoshop and Illustrator.",
        resources: ["https://www.coursera.org/specializations/graphic-design", "https://www.udemy.com/course/graphic-design-masterclass/"]
      },
      {
        title: "Experience Stage",
        description: "Work on freelance projects, internships, or in design studios to build a professional portfolio.",
        resources: ["https://www.behance.net", "https://www.dribbble.com"]
      }
    ]
  },
  {
    title: "Social Media Manager",
    overview: "Develops and executes social media strategies to enhance brand presence and engage audiences across platforms.",
    requiredSkills: ["Social Media Strategy", "Content Creation", "Analytics", "Community Management", "Advertising"],
    educationPath: "Bachelor's in Marketing, Communications, or related field. Certifications in social media marketing are beneficial.",
    avgSalary: "R250,000 - R700,000 / year",
    categories: ["Marketing", "Social Media", "Communications"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn social media platforms, content strategies, and analytics tools.",
        resources: ["https://www.coursera.org/specializations/social-media-marketing", "https://www.hootsuite.com/academy"]
      },
      {
        title: "Experience Stage",
        description: "Manage social media accounts for brands, organizations, or personal projects to gain practical experience.",
        resources: ["https://www.socialmediaexaminer.com", "https://buffer.com/library/social-media-management"]
      }
    ]
  },
  {
    title: "Sports Scientist",
    overview: "Applies scientific principles to improve athletic performance, recovery, and overall physical fitness.",
    requiredSkills: ["Exercise Physiology", "Biomechanics", "Nutrition Knowledge", "Research", "Data Analysis"],
    educationPath: "Bachelor’s in Sports Science, Exercise Physiology, or related field. Master’s or PhD preferred for research roles.",
    avgSalary: "R350,000 - R750,000 / year",
    categories: ["Sports Science", "Athletic Performance"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study exercise physiology, biomechanics, nutrition, and psychology. Gain laboratory and research experience.",
        resources: [
          "https://www.coursera.org/specializations/exercise-science",
          "https://www.bases.org.uk"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work with sports teams, fitness centers, or research labs. Apply testing and performance evaluation techniques.",
        resources: [
          "https://www.nsca.com/",
          "https://www.aspetar.com"
        ]
      }
    ]
  },
  {
    title: "Athletic Coach",
    overview: "Trains and mentors athletes to reach peak performance while focusing on skills, strategy, and motivation.",
    requiredSkills: ["Leadership", "Communication", "Sports Strategy", "Training Methods", "Motivation"],
    educationPath: "Bachelor’s in Sports Coaching, Physical Education, or related fields. Coaching certifications are essential.",
    avgSalary: "R200,000 - R600,000 / year",
    categories: ["Coaching", "Sports Leadership"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn coaching principles, sports psychology, and training program design.",
        resources: [
          "https://www.nccp.ca/",
          "https://www.coursera.org/learn/sport-coaching"
        ]
      },
      {
        title: "Experience Stage",
        description: "Coach school, amateur, or professional teams. Gain experience in tactical planning and athlete development.",
        resources: [
          "https://www.uksport.gov.uk/coaching",
          "https://www.issaonline.com/"
        ]
      }
    ]
  },
  {
    title: "Sports Psychologist",
    overview: "Helps athletes improve mental focus, motivation, and resilience to enhance performance.",
    requiredSkills: ["Sports Psychology", "Counseling", "Motivational Techniques", "Stress Management"],
    educationPath: "Bachelor’s in Psychology + Master’s/Doctorate in Sports Psychology. Registration with psychology boards required.",
    avgSalary: "R400,000 - R800,000 / year",
    categories: ["Mental Performance", "Sports Psychology"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study psychology with a focus on cognitive and sports psychology. Gain counseling training.",
        resources: [
          "https://www.bps.org.uk",
          "https://www.apa.org/ed/graduate/specialize/sports"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work with athletes on mental preparation, stress management, and motivation strategies.",
        resources: [
          "https://www.aaasponline.org/",
          "https://positivepsychology.com/sports-psychology/"
        ]
      }
    ]
  },
  {
    title: "Kinesiologist",
    overview: "Studies human movement to help prevent injuries, improve rehabilitation, and optimize physical performance.",
    requiredSkills: ["Human Anatomy", "Exercise Physiology", "Movement Analysis", "Rehabilitation"],
    educationPath: "Bachelor’s in Kinesiology or Exercise Science. Master’s recommended for clinical roles.",
    avgSalary: "R300,000 - R650,000 / year",
    categories: ["Rehabilitation", "Human Movement"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn anatomy, physiology, biomechanics, and motor control.",
        resources: [
          "https://www.coursera.org/learn/kinesiology",
          "https://www.nsca.com"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work in clinics, fitness centers, or athletic programs to help athletes recover and prevent injuries.",
        resources: [
          "https://www.cokinetics.com/",
          "https://www.kinesiologist.ca/"
        ]
      }
    ]
  },
  {
    title: "Strength & Conditioning Coach",
    overview: "Designs training programs to improve strength, endurance, agility, and overall athletic performance.",
    requiredSkills: ["Strength Training", "Conditioning", "Sports Science", "Program Design", "Motivation"],
    educationPath: "Bachelor’s in Sports Science, Kinesiology, or related fields. Strength and conditioning certifications are essential (NSCA CSCS).",
    avgSalary: "R250,000 - R700,000 / year",
    categories: ["Athletic Performance", "Fitness Training"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Study physiology, biomechanics, and advanced training principles.",
        resources: [
          "https://www.nsca.com/certification/cscs/",
          "https://www.coursera.org/learn/strength-conditioning"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work with teams and athletes to design performance programs and monitor results.",
        resources: [
          "https://www.uksca.org.uk",
          "https://www.issaonline.com/"
        ]
      }
    ]
  },
  {
    title: "Rehabilitation Specialist",
    overview: "Helps athletes recover from sports-related injuries through tailored rehabilitation programs.",
    requiredSkills: ["Physiotherapy", "Sports Injury Management", "Rehabilitation Exercises", "Communication"],
    educationPath: "Degree in Physiotherapy, Rehabilitation Science, or Exercise Therapy. Certifications in sports rehab are a plus.",
    avgSalary: "R300,000 - R650,000 / year",
    categories: ["Rehabilitation", "Sports Medicine"],
    roadmap: [
      {
        title: "Education Stage",
        description: "Learn anatomy, injury management, and rehabilitation program design.",
        resources: [
          "https://www.physio-pedia.com/",
          "https://www.coursera.org/learn/injury-prevention"
        ]
      },
      {
        title: "Experience Stage",
        description: "Work in clinics, sports teams, or hospitals focusing on athletic rehabilitation.",
        resources: [
          "https://www.sportsrehabexpert.com/",
          "https://www.basem.co.uk/"
        ]
      }
    ]
  },
  {
    "title": "Sports Nutritionist",
    "overview": "Develops nutrition plans to enhance athletic performance, recovery, and overall health of athletes.",
    "educationPath": "Degree in Nutrition, Dietetics, or Sports Science. Certification in sports nutrition is advantageous.",
    "avgSalary": "R250,000 - R600,000 / year", 
    "requiredSkills": ["Nutrition Science", "Diet Planning", "Sports Performance", "Communication"],  
    "categories": ["Nutrition", "Sports Science"],
    "roadmap": [  
      {
        "title": "Education Stage",
        "description": "Study nutrition principles, sports dietetics, and meal planning for athletes.",
        "resources": ["https://www.coursera.org/specializations/sports-nutrition", "https://www.eatright.org"]
      },
      {
        "title": "Experience Stage",
        "description": "Work with sports teams, fitness centers, or individual athletes to implement nutrition strategies.",
        "resources": ["https://www.sportsrd.org", "https://www.nutrition.org"]
      }
    ]
  },
  {
    "title": "Personal Trainer",
    "overview": "Designs and implements fitness programs to help clients achieve their health and fitness goals.",
    "educationPath": "Certification from recognized bodies (e.g., ACE, NASM). Diploma in Fitness or Exercise Science is beneficial.",
    "avgSalary": "R180,000 - R450,000 / year",  
    "requiredSkills": ["Exercise Programming", "Motivation", "Anatomy Knowledge", "Communication"],  
    "categories": ["Fitness", "Health"],
    "roadmap": [  
      {
        "title": "Certification Stage",
        "description": "Obtain personal training certification and learn exercise techniques, program design, and client assessment.",
        "resources": ["https://www.acefitness.org", "https://www.nasm.org"]
      },
      {
        "title": "Experience Stage",
        "description": "Gain experience by working in gyms, fitness centers, or as a freelance trainer.",
        "resources": ["https://www.indeed.com/q-Personal-Trainer-jobs.html", "https://www.fitnessjobs.com"]
      }
    ]
  },
  {
    title: "Yoga Instructor / Wellness Coach",
    overview: "Leads yoga sessions and promotes holistic wellness through physical, mental, and spiritual practices.",
    requiredSkills: ["Yoga Techniques", "Mindfulness", "Anatomy", "Communication", "Motivation"],
    educationPath: "Yoga teacher training certification (200-hour or 500-hour). Additional wellness coaching certifications are a plus.",
    avgSalary: "R150,000 - R400,000 / year",
    categories: ["Wellness", "Fitness", "Mindfulness"],
    roadmap: [
      {
        title: "Certification Stage",
        description: "Complete yoga teacher training and learn various yoga styles, anatomy, and teaching methods.",
        resources: ["https://www.yogaalliance.org", "https://www.coursera.org/learn/yoga"]
      },
      {
        title: "Experience Stage",
        description: "Teach yoga classes, workshops, or retreats to build experience and client base.",
        resources: ["https://www.yogajournal.com", "https://www.mindbodygreen.com"]
      }
    ]
  },
  {
    title: "Meditation Instructor / Mindfulness Coach",   
    overview: "Guides individuals in meditation practices to enhance mental clarity, reduce stress, and promote well-being.",
    requiredSkills: ["Meditation Techniques", "Mindfulness", "Communication", "Empathy", "Motivation"],
    educationPath: "Certification in meditation instruction or mindfulness coaching. Background in psychology or wellness is beneficial.",
    avgSalary: "R120,000 - R350,000 / year",
    categories: ["Wellness", "Mindfulness", "Mental Health"],
    roadmap: [
      {
        title: "Certification Stage",
        description: "Learn meditation techniques, mindfulness practices, and coaching methods.",
        resources: ["https://www.mindfulschools.org", "https://www.coursera.org/learn/mindfulness"]
      },
      {
        title: "Experience Stage",
        description: "Conduct meditation sessions, workshops, or retreats to gain practical experience.",
        resources: ["https://www.headspace.com", "https://www.mindbodygreen.com"]
      }
    ]
  }

];

const seedCareers = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected successfully!");

    // Clear existing careers to avoid duplicates
    await Career.deleteMany();
    console.log("🗑️ Old careers removed!");

    // Insert fresh careers
    await Career.insertMany(careers);
    console.log(`🌱 Successfully added ${careers.length} career paths!`);

    console.log("🎉 Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding careers:", err);
    process.exit(1);
  }
};

seedCareers();