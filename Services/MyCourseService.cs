using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using Schedule.Entities;
using Schedule.Helpers;
using Schedule.Models.MyCourse;

namespace Schedule.Services
{
    public interface IMyCourseService
    {
        IEnumerable<MyCourse> GetAll();
        MyCourse GetById(int id);
        void Create(CreateMyCourse model);
        void Update(int id, UpdateMyCourse model);
        void Delete(int id);
    }

    public class MyCourseService : IMyCourseService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public MyCourseService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<MyCourse> GetAll()
        {
            return _context.mycourse;
        }

        public MyCourse GetById(int id)
        {
            return getMyCourse(id);
        }

        public void Create(CreateMyCourse model)
        {
            // validate
            if (_context.mycourse.Any(x => x.Courses == model.Courses))
                throw new AppException("Course with name '" + model.Courses + "' already exists");

            // map model to new course object
            var mycourse = _mapper.Map<MyCourse>(model);

            //user.Role = Role.User;
            // hash password
            //user.Password = BCryptNet.HashPassword(model.Password);

            // save course
            _context.mycourse.Add(mycourse);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateMyCourse model)
        {
            var mycourse = getMyCourse(id);

            // validate
            if (model.Courses != mycourse.Courses && _context.mycourse.Any(x => x.Courses == model.Courses))
                throw new AppException("Course with the name '" + model.Courses + "' already exists");

            // hash password if it was entered
           // if (!string.IsNullOrEmpty(model.Password))
              //  user.Password = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, mycourse);
            _context.mycourse.Update(mycourse);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var mycourse = getMyCourse(id);
            _context.mycourse.Remove(mycourse);
            _context.SaveChanges();
        }

        // helper methods

        private MyCourse getMyCourse(int id)
        {
            var mycourse = _context.mycourse.Find(id);
            if (mycourse == null) throw new KeyNotFoundException("Course not found");
            return mycourse;
        }
    }
}