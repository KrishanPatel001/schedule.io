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
        public IActionResult GetBytext(string text)
        {
            var course = _courseService.GetBytext(text);
            return Ok(course);
        }

        [HttpPost]
        public IActionResult Create(CreateRequest model)
        {
            _courseService.Create(model);
            return Ok(new { message = "Course created" });
        }

        [HttpPut("{text}")]
        public IActionResult Update(string text, UpdateRequest model)
        {
            _courseService.Update(text, model);
            return Ok(new { message = "Course updated" });
        }

        [HttpDelete("{text}")]
        public IActionResult Delete(int text)
        {
            _courseService.Delete(text);
            return Ok(new { message = "Course deleted" });
        }
    }
}