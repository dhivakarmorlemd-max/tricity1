-- CareerPilot AI Seed Data for Hackathon Demo Setup

INSERT INTO public.skills (id, name, category, description) VALUES
('cpp', 'C++ & STL', 'Programming Fundamentals', 'Pointers, memory allocation, STL containers'),
('dsa', 'Data Structures & Algorithms', 'Data Structures & Algorithms', 'Trees, Graphs, DP, Sorting algorithms'),
('react', 'React.js & TypeScript', 'Web & Mobile Development', 'Hooks, state management, components, JSX'),
('node', 'Node.js & Express APIs', 'Web & Mobile Development', 'RESTful routing, middleware, async I/O'),
('sql', 'PostgreSQL & SQL Queries', 'Databases & Storage', 'Relational schema design, JOINs, indexing'),
('dbms', 'Database Management Systems', 'Core CS Fundamentals', 'ACID transactions, ER modeling, normalization');

INSERT INTO public.roadmap_tasks (id, year, semester, month, week, title, description, estimated_hours, difficulty, category, target_role_id) VALUES
('rt_101', 1, 1, 1, 1, 'Programming Fundamentals & C/C++ Syntax', 'Master variables, loops, functions, and memory allocation.', 12, 'Easy', 'Programming Fundamentals', 'fullstack_dev'),
('rt_102', 1, 1, 2, 5, 'Version Control with Git & GitHub', 'Learn repository initialization, committing, branching, and PRs.', 8, 'Easy', 'Projects & Practical Experience', 'fullstack_dev'),
('rt_301', 3, 5, 1, 1, 'Frontend Engineering with React.js & TypeScript', 'Components, Props, Hooks, State Management, and Tailwind CSS.', 25, 'Medium', 'Web & Mobile Development', 'fullstack_dev'),
('rt_302', 3, 5, 2, 5, 'Backend Development with Node.js & Express APIs', 'Building web servers, middleware, JWT auth, and ORMs.', 22, 'Medium', 'Web & Mobile Development', 'fullstack_dev');
