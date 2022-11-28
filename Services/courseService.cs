using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using Schedule.Entities;
using Schedule.Helpers;
using Schedule.Models.Course;

namespace Schedule.Services
{
    public interface ICourseService
    {
        IEnumerable<Course> GetAll();
        Course GetByText(string text);
        void Create(CreateCourse model);
        void Update(int id, UpdateCourse model);
        void Delete(int id);
    }

    public class CourseService : ICourseService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public CourseService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Course> GetAll()
        {
            return _context.course;
        }

        public Course GetByText(string text)
        {
            return getCourseByText(text);
        }

        public void Create(CreateCourse model)
        {
            // validate
            if (_context.course.Any(x => x.Text == model.Text))
                throw new AppException("Course with text '" + model.Text + "' already exists");

            // map model to new course object
            var course = _mapper.Map<Course>(model);

            //user.Role = Role.User;
            // hash password
            //user.Password = BCryptNet.HashPassword(model.Password);

            // save course
            _context.course.Add(course);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateCourse model)
        {
            var course = getCourse(id);

            // validate
            if (model.Text != course.Text && _context.course.Any(x => x.Text == model.Text))
                throw new AppException("Course with the name '" + model.Text + "' already exists");

            // hash password if it was entered
           // if (!string.IsNullOrEmpty(model.Password))
              //  user.Password = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, course);
            _context.course.Update(course);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var course = getCourse(id);
            _context.course.Remove(course);
            _context.SaveChanges();
        }

        // helper methods

        private Course getCourse(int id)
        {
            var course = _context.course.Find(id);
            if (course == null) throw new KeyNotFoundException("Course not found");
            return course;
        }
        private Course getCourseByText(string text)
        {
            var course = _context.course.Find(text);
            if (course == null) throw new KeyNotFoundException("Course not found");
            return course;
        }
    }
}