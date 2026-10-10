import crypto from 'node:crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const password = 'Student@123';
const demoUsers = [
  { name: 'UDAY REDDY YASA', email: 'student@university.edu', role: 'STUDENT' },
  { name: 'PRIYA SHARMA', email: 'priya@university.edu', role: 'STUDENT' },
  { name: 'ARUN KUMAR', email: 'arun@university.edu', role: 'STUDENT' },
  { name: 'MEERA NAIR', email: 'meera@university.edu', role: 'STUDENT' },
];

const demoUsersWithPassword = demoUsers.map((user) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = `${salt}:${crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')}`;
  return { ...user, password: hash };
});

const courses = [
  { id: 'dsa', title: 'Data Structures & Algorithms', instructor: 'Prof. R. Kumar', category: 'Core', progress: 62, lessonsCompleted: 18, totalLessons: 29, status: 'Continue' },
  { id: 'web-dev', title: 'Web Development', instructor: 'Dr. S. Lakshmi', category: 'Frontend', progress: 35, lessonsCompleted: 9, totalLessons: 25, status: 'Continue' },
  { id: 'dbms', title: 'Database Management', instructor: 'Prof. A. Reddy', category: 'Database', progress: 80, lessonsCompleted: 16, totalLessons: 20, status: 'Continue' },
  { id: 'java', title: 'Java Programming', instructor: 'Dr. M. Rao', category: 'Language', progress: 10, lessonsCompleted: 3, totalLessons: 22, status: 'Not started' },
  { id: 'python', title: 'Python Programming', instructor: 'Ms. K. Nair', category: 'Language', progress: 54, lessonsCompleted: 12, totalLessons: 22, status: 'Continue' },
  { id: 'ai', title: 'Artificial Intelligence', instructor: 'Dr. A. Singh', category: 'AI', progress: 91, lessonsCompleted: 20, totalLessons: 22, status: 'Completed' },
];

const assessments = [
  { id: 'coding-two-sum', title: 'Coding Assessment: Two Sum', category: 'Screening Test', count: 1, description: 'Write a function that returns the indices of two numbers that add up to a target.', status: 'Open' },
  { id: 'campus-2028', title: '2028_Campus_Assessments', category: 'Screening Test', count: 28, description: 'Campus aptitude and communication screening tests.', status: 'Open' },
  { id: 'qalr-2028', title: 'QALR_2028', category: 'Screening Test', count: 12, description: 'Quantitative, analytical and language reasoning bundle.', status: 'Scheduled' },
  { id: 'verbal-screening', title: 'Verbal Screening Round', category: 'Screening Test', count: 6, description: 'Reading comprehension and verbal reasoning practice.', status: 'Open' },
  { id: 'coding-screening', title: 'Coding Screening Round', category: 'Screening Test', count: 9, description: 'Problem solving and coding basics.', status: 'Open' },
  { id: 'aptitude-weekly', title: 'Aptitude Weekly Assessments', category: 'Aptitude', count: 20, description: 'Weekly aptitude drills for speed and accuracy.', status: 'Open' },
  { id: 'aptitude-mock', title: 'Aptitude Mock Series', category: 'Aptitude', count: 8, description: 'Mock test series with detailed analytics.', status: 'Completed' },
];

const leaderboard = [
  { id: 'ananya', name: 'Ananya Rao', department: 'CSE', points: 480, level: 5, completedAssessments: 18, codingScore: 92, weeklyProgress: 86 },
  { id: 'rohit', name: 'Rohit Sharma', department: 'ECE', points: 455, level: 5, completedAssessments: 15, codingScore: 90, weeklyProgress: 83 },
  { id: 'meera', name: 'Meera Nair', department: 'IT', points: 410, level: 4, completedAssessments: 14, codingScore: 88, weeklyProgress: 79 },
  { id: 'karthik', name: 'Karthik Iyer', department: 'CSE', points: 360, level: 4, completedAssessments: 12, codingScore: 85, weeklyProgress: 74 },
  { id: 'sneha', name: 'Sneha Patel', department: 'EEE', points: 290, level: 3, completedAssessments: 10, codingScore: 80, weeklyProgress: 72 },
  { id: 'arjun', name: 'Arjun Verma', department: 'MECH', points: 210, level: 3, completedAssessments: 9, codingScore: 74, weeklyProgress: 66 },
  { id: 'divya', name: 'Divya Menon', department: 'CSE', points: 150, level: 2, completedAssessments: 7, codingScore: 68, weeklyProgress: 62 },
  { id: 'vikram', name: 'Vikram Singh', department: 'CSE', points: 96, level: 2, completedAssessments: 6, codingScore: 60, weeklyProgress: 54 },
  { id: 'pooja', name: 'Pooja Das', department: 'IT', points: 40, level: 1, completedAssessments: 4, codingScore: 51, weeklyProgress: 45 },
  { id: 'uday', name: 'UDAY REDDY YASA', department: 'CSE', points: 9, level: 1, completedAssessments: 1, codingScore: 42, weeklyProgress: 28 },
];

const blogs = [
  { id: 'campus-screening', title: 'How to prepare for campus screening tests', category: 'Placements', author: 'Career Cell', publishedAt: 'Sep 12, 2026', readTime: '5 min read' },
  { id: 'big-o', title: 'Understanding Big-O without the math', category: 'Algorithms', author: 'Prof. G. Menon', publishedAt: 'Aug 21, 2026', readTime: '7 min read' },
  { id: 'consistent-coders', title: 'Ten habits of consistent coders', category: 'Career', author: 'Ananya Rao', publishedAt: 'Aug 02, 2026', readTime: '4 min read' },
  { id: 'sql-joins', title: 'SQL joins explained with examples', category: 'Databases', author: 'Dr. S. Iyer', publishedAt: 'Jul 15, 2026', readTime: '6 min read' },
];

const trainings = [
  { id: 'ml-bootcamp', title: 'Machine Learning Bootcamp', trainer: 'Dr. N. Sen', date: 'Nov 18, 2026', duration: '3 weeks', status: 'Registered' },
  { id: 'cyber-security', title: 'Cybersecurity Fundamentals', trainer: 'Ms. V. Rao', date: 'Nov 22, 2026', duration: '2 days', status: 'Available' },
  { id: 'cloud-architect', title: 'Cloud Architecture Workshop', trainer: 'Mr. T. Shah', date: 'Dec 02, 2026', duration: '1 week', status: 'Available' },
];

async function main() {
  for (const assessment of assessments) {
    await prisma.assessment.upsert({
      where: { id: assessment.id },
      update: assessment,
      create: assessment,
    });
  }

  for (const user of demoUsersWithPassword) {
    const seededUser = await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name, password: user.password, role: user.role },
      create: user,
    });

    const dashboard = await prisma.userDashboard.upsert({
      where: { userId: seededUser.id },
      update: {},
      create: { userId: seededUser.id },
    });
    await prisma.userCourseProgress.createMany({
      data: courses.map((course) => ({ dashboardId: dashboard.id, courseId: course.id, title: course.title })),
      skipDuplicates: true,
    });
    await prisma.userAssessmentProgress.createMany({
      data: assessments.map((assessment) => ({ dashboardId: dashboard.id, assessmentId: assessment.id })),
      skipDuplicates: true,
    });
  }

  for (const course of courses) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: course,
      create: course,
    });
  }

  for (const entry of leaderboard) {
    await prisma.leaderboardEntry.upsert({
      where: { id: entry.id },
      update: entry,
      create: entry,
    });
  }

  for (const post of blogs) {
    await prisma.blogPost.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
  }

  for (const item of trainings) {
    await prisma.training.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
