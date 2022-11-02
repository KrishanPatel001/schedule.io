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
        Course GetBytext(string text);
        void Create(CreateRequest model);
        void Update(string text, UpdateRequest model);
        void Delete(string text);
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

        public Course GetBytext(string text)
        {
            return getCourse(text);
        }

        public void Create(CreateRequest model)
        {
            // validate
            if (_context.course.Any(x => x.text == model.text))
                throw new AppException("Course with name '" + model.text + "' already exists");

            // map model to new course object
            var course = _mapper.Map<Course>(model);

            //user.Role = Role.User;
            // hash password
            //user.Password = BCryptNet.HashPassword(model.Password);

            // save course
            _context.course.Add(course);
            _context.SaveChanges();
        }

        public void Update(string text, UpdateRequest model)
        {
            var course = getCourse(text);

            // validate
            if (model.text != course.text && _context.course.Any(x => x.text == model.text))
                throw new AppException("Course with the name '" + model.text + "' already exists");

            // hash password if it was entered
           // if (!string.IsNullOrEmpty(model.Password))
              //  user.Password = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, course);
            _context.course.Update(course);
            _context.SaveChanges();
        }

        public void Delete(string text)
        {
            var course = getCourse(text);
            _context.course.Remove(course);
            _context.SaveChanges();
        }

        // helper methods

        private Course getCourse(string text)
        {
            var course = _context.course.Find(text);
            if (course == null) throw new KeyNotFoundException("Course not found");
            return course;
        }
    }
}