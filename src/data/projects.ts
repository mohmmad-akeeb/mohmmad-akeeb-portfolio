import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Image Caption Generator',
    description: 'A web app that generates captions for images using deep learning models.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'Streamlit'],
    githubUrl: 'https://github.com/mohmmad-akeeb/image-caption-generation',
    demoUrl: 'https://github.com/mohmmad-akeeb/image-caption-generation',
    imageUrl: '/projects/image_caption.png',
    featured: false,
  },
  {
    id: 'project-2',
    title: 'Customer Churn Prediction',
    description: 'A FastAPI based customer churn prediction web-app for telecom company that predicts churn rate of customer.',
    technologies: ['Scikit-Learn', 'FastAPI', 'Feature Engineering', 'EDA'],
    githubUrl: 'https://github.com/mohmmad-akeeb/customer-churn-prediction',
    demoUrl: 'https://customer-churn-prediction-v1-0-0.onrender.com/',
    imageUrl: '/projects/Churn.png',
    featured: false,
  },
  {
    id: 'project-3',
    title: 'Book Recommender Systems',
    description: 'A cross-platform web app for recommending books based on previously read books.',
    technologies: ['Python', 'Scikit-Learn', 'Flask', 'Docker'],
    githubUrl: 'https://github.com/mohmmad-akeeb/book-recommender-system',
    demoUrl: 'https://book-recommender-app-jng3.onrender.com',
    imageUrl: '/projects/book_recommendoor.png',
    featured: false,
  },
  {
    id: 'project-4',
    title: 'Olympics',
    description: 'Interactive Streamlit app analyzing Olympic data, visualizing medal trends, athlete performance, and country comparisons with dynamic charts and insights.',
    technologies: ['Python', 'Docker', 'Plotly', 'PyCharm'],
    githubUrl: 'https://github.com/mohmmad-akeeb/Olympics_Analysis_App',
    demoUrl: 'https://olympics-analysis-app-v1-1.onrender.com',
    imageUrl: '/projects/olympics_analysis.png',
    featured: false,
  },
];