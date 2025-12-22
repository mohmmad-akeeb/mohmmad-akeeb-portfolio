import { ResearchPaper } from '@/types';

export const researchPapers: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Optimizing React Performance Through Advanced Memoization Techniques',
    authors: ['John Doe', 'Jane Smith', 'Dr. Michael Johnson'],
    publication: 'Journal of Web Development Research',
    year: 2024,
    abstract: 'This paper explores advanced memoization techniques in React applications, analyzing the performance impact of various optimization strategies including React.memo, useMemo, and useCallback. Our research demonstrates significant performance improvements in large-scale applications through strategic implementation of these techniques.',
    url: 'https://example.com/papers/react-memoization-2024',
    doi: '10.1000/182',
    tags: ['React', 'Performance', 'Memoization', 'Web Development'],
  },
  // {
  //   id: 'paper-2',
  //   title: 'Machine Learning Approaches to Automated Code Review in JavaScript Applications',
  //   authors: ['John Doe', 'Dr. Sarah Wilson', 'Alex Chen'],
  //   publication: 'International Conference on Software Engineering (ICSE)',
  //   year: 2023,
  //   abstract: 'We present a novel machine learning approach for automated code review in JavaScript applications. Our system uses natural language processing and static analysis to identify potential issues, suggest improvements, and maintain code quality standards. Experimental results show a 40% reduction in manual review time.',
  //   url: 'https://example.com/papers/ml-code-review-2023',
  //   doi: '10.1145/3510003.3510234',
  //   tags: ['Machine Learning', 'Code Review', 'JavaScript', 'Static Analysis'],
  // },
];