import { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend Technologies
  {
    id: 'python',
    name: 'Python',
    icon: 'python',
    category: 'backend',
    proficiency: 5,
  },
  {
    id: 'tensorflow',
    name: 'Tensorflow',
    icon: 'tensorflow',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'pytorch',
    name: 'Pytorch',
    icon: 'pytorch',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'scikitlearn',
    name: 'Scikit Learn',
    icon: 'scikitlearn',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: 'sql',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    icon: 'powerbi',
    category: 'backend',
    proficiency: 3,
  },
  {
    id: 'flask',
    name: 'Flask',
    icon: 'flask',
    category: 'frontend',
    proficiency: 3,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    icon: 'fastapi',
    category: 'frontend',
    proficiency: 3,
  },
  {
    id: 'react',
    name: 'React.js',
    icon: 'react',
    category: 'frontend',
    proficiency: 3,
  },
  {
    id: 'streamlit',
    name: 'Streamlit',
    icon: 'streamlit',
    category: 'frontend',
    proficiency: 4,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'javascript',
    category: 'frontend',
    proficiency: 4,
  },

  // Backend Technologies
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: 'mongodb',
    category: 'backend', // Currently displayed as AI/ML & Data Science in Skills.tsx 
    // This seems like a misnomer in the UI mapping, but sticking to existing pattern for now
    // Actually, let's keep it as is, but maybe move ML stuff here
    proficiency: 3,
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    icon: 'huggingface',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'rag',
    name: 'RAG',
    icon: 'rag',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'agenticai',
    name: 'Agentic AI',
    icon: 'agenticai',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'pandas',
    name: 'Pandas',
    icon: 'pandas',
    category: 'backend',
    proficiency: 5,
  },
  {
    id: 'numpy',
    name: 'NumPy',
    icon: 'numpy',
    category: 'backend',
    proficiency: 5,
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    icon: 'matplotlib',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    icon: 'seaborn',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'plotly',
    name: 'Plotly',
    icon: 'plotly',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'bokeh',
    name: 'Bokeh',
    icon: 'bokeh',
    category: 'backend',
    proficiency: 3,
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    icon: 'ml',
    category: 'backend',
    proficiency: 4,
  },
  {
    id: 'dl',
    name: 'Deep Learning',
    icon: 'dl',
    category: 'backend',
    proficiency: 4,
  },

  // Tools & Others
  {
    id: 'git',
    name: 'Git',
    icon: 'git',
    category: 'tools',
    proficiency: 4,
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: 'docker',
    category: 'tools',
    proficiency: 3,
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: 'aws',
    category: 'tools',
    proficiency: 3,
  },

  // Core & Other
  {
    id: 'java',
    name: 'Java',
    icon: 'java',
    category: 'other',
    proficiency: 3,
  },
  {
    id: 'dsa',
    name: 'Data Structures',
    icon: 'dsa',
    category: 'other',
    proficiency: 4,
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    icon: 'algorithms',
    category: 'other',
    proficiency: 4,
  },
];