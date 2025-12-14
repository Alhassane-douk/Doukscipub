import { Book } from './types';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Quantum Mechanics: The Theoretical Minimum',
    author: 'Leonard Susskind',
    price: 29.99,
    category: 'Physics',
    coverUrl: 'https://picsum.photos/seed/quantum/300/450',
    description: 'A comprehensive introduction to the principles of quantum mechanics for serious students.',
    publishedDate: '2014-01-01',
    pages: 360
  },
  {
    id: '2',
    title: 'The Gene: An Intimate History',
    author: 'Siddhartha Mukherjee',
    price: 18.50,
    category: 'Biology',
    coverUrl: 'https://picsum.photos/seed/gene/300/450',
    description: 'A magnificent history of the gene and a response to the defining question of the future.',
    publishedDate: '2016-05-17',
    pages: 592
  },
  {
    id: '3',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    price: 34.99,
    category: 'Computer Science',
    coverUrl: 'https://picsum.photos/seed/arch/300/450',
    description: 'A craftsman\'s guide to software structure and design.',
    publishedDate: '2017-09-10',
    pages: 432
  },
  {
    id: '4',
    title: 'Astrophysics for People in a Hurry',
    author: 'Neil deGrasse Tyson',
    price: 14.99,
    category: 'Physics',
    coverUrl: 'https://picsum.photos/seed/astro/300/450',
    description: 'What is the nature of space and time? How do we fit within the universe?',
    publishedDate: '2017-05-02',
    pages: 224
  },
  {
    id: '5',
    title: 'Deep Learning',
    author: 'Ian Goodfellow',
    price: 79.99,
    category: 'Computer Science',
    coverUrl: 'https://picsum.photos/seed/deep/300/450',
    description: 'The definitive text on deep learning by the pioneers of the field.',
    publishedDate: '2016-11-18',
    pages: 800
  },
  {
    id: '6',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    price: 12.99,
    category: 'Psychology',
    coverUrl: 'https://picsum.photos/seed/think/300/450',
    description: 'The major work of the Nobel Prize winner in Economics.',
    publishedDate: '2011-10-25',
    pages: 499
  },
  {
    id: '7',
    title: 'Molecular Biology of the Cell',
    author: 'Bruce Alberts',
    price: 125.00,
    category: 'Biology',
    coverUrl: 'https://picsum.photos/seed/cell/300/450',
    description: 'The classic textbook for cell biology, updated with latest research.',
    publishedDate: '2014-11-15',
    pages: 1464
  },
  {
    id: '8',
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Harold Abelson',
    price: 55.00,
    category: 'Computer Science',
    coverUrl: 'https://picsum.photos/seed/sicp/300/450',
    description: 'A classic text in computer science education.',
    publishedDate: '1996-07-25',
    pages: 657
  }
];

export const CATEGORIES = ['All', 'Physics', 'Biology', 'Computer Science', 'Psychology'];
