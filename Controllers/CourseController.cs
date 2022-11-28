using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models.Course;
using Schedule.Services;

namespace Schedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CourseController : ControllerBase
    {
        private ICourseService _courseService;
        private IMapper _mapper;

        public CourseController(
            ICourseService courseService,
            IMapper mapper)
        {
            _courseService = courseService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var course = _courseService.GetAll();
            return Ok(course);
        }

        [HttpGet("{text}")]
        public IActionResult GetByText(string text)
        {
            var course = _courseService.GetByText(text);
            return Ok(course);
        }

        [HttpPost]
        public IActionResult Create(CreateCourse model)
        {
            _courseService.Create(model);
            return Ok(new { message = "Course created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateCourse model)
        {
            _courseService.Update(id, model);
            return Ok(new { message = "Course updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _courseService.Delete(id);
            return Ok(new { message = "Course deleted" });
        }
    }
}