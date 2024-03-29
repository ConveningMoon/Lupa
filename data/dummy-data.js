import Group from '../models/group';
import Parent from '../models/parent';
import School from '../models/school';
import Student from '../models/student';
import Teacher from '../models/teacher';
import Subject from '../models/subject';

export const SCHOOLS = [
    new School(
        'sc1', 
        'The best school ever',
        'URFU1',
        'my_urfu1',
        'urfu1@gmail.com',
        'urfu.com',
        'Malysheva Street'
    ),
    new School(
        'sc2', 
        'The best school ever',
        'URFU2',
        'my_urfu2',
        'urfu2@gmail.com',
        'urfu.com',
        'Malysheva Street'
    )
];

export const SUBJECTS = [
    new Subject(
        'Maths',
        'Maths'    
    ),
    new Subject(
        'English',
        'English'
    ),
    new Subject(
        'Informatics',
        'Informatics'
    )
];

export const TEACHERS = [
    new Teacher(
        't1',
        'The best teacher 1',
        'Marco Teacher1',
        'teacher_1',
        'teacher1@gmail.com',
        ['Group_1', 'Group_2'],
        ['Maths']
        ['sc1']
    ),
    new Teacher(
        't2',
        'The best teacher 2',
        'Pedro Teacher2',
        'teacher_2',
        'teacher2@gmail.com',
        ['Group_2', 'Group_3'],
        ['English', 'Informatics']
        ['sc2']
    )
];

export const PARENTS = [
    new Parent(
        'p1',
        'Jose Parent1',
        'parent_1',
        ['s1', 's2'],
        'parent1@gmail.com'
    ),
    new Parent(
        'p2',
        'Maria Parent2',
        'parent_2',
        ['s1', 's2'],
        'parent2@gmail.com'
    ),
    new Parent(
        'p3',
        'Carlos Parent3',
        'parent_3',
        ['s3'],
        'parent3@gmail.com'
    ),
];

export const STUDENTS = [
    new Student(
        's1',
        'Dylan Student1',
        'student_1',
        'student1@gmail.com',
        'Group_1',
        ['p1', 'p2'],
        'sc1'
    ),
    new Student(
        's2',
        'James Student2',
        'student_2',
        'student2@gmail.com',
        'Group_1',
        ['p1', 'p2'],
        'sc2'
    ),
    new Student(
        's3',
        'Margarita Student3',
        'student_3',
        'student3@gmail.com',
        'Group_2',
        ['p3'],
        'sc1'
    )
];

export const GROUPS = [
    new Group(
        'Group_1',
        'Group_1', 
        'sc1',
        ['sb1', 'sb2']
    ),
    new Group(
        'Group_2',
        'Group_2', 
        'sc1',
        ['sb2', 'sb3']
    ),
    new Group(
        'Group_3',
        'Group_3',
        'sc2',
        ['sb4', 'sb5']
    )
];