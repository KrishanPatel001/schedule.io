using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models.MyCourse;
using Schedule.Services;

namespace Schedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyCourseController : ControllerBase
    {
        private IMyCourseService _mycourseService;
        private IMapper _mapper;

        public MyCourseController(
            IMyCourseService mycourseService,
            IMapper mapper)
        {
            _mycourseService = mycourseService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var mycourse = _mycourseService.GetAll();
            return Ok(mycourse);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var mycourse = _mycourseService.GetById(id);
            return Ok(mycourse);
        }

        [HttpPost]
        public IActionResult Create(CreateMyCourse model)
        {
            _mycourseService.Create(model);
            return Ok(new { message = "My Course created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateMyCourse model)
        {
            _mycourseService.Update(id, model);
            return Ok(new { message = "My Course updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _mycourseService.Delete(id);
            return Ok(new { message = "My Course deleted" });
        }
    }
}