using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models.User;
using Schedule.Services;

namespace Schedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;

        public UserController(
            IUserService userService,
            IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var user = _userService.GetAll();
            return Ok(user);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Create(CreateRequest model)
        {
            _userService.Create(model);
            return Ok(new { message = "User created" });
        }

        [HttpPost("{sign-in}")]
        public IActionResult Login(LoginRequest model)
        {
            _userService.Login(model);
            return Ok(new { message = "User Login" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequest model)
        {
            _userService.Update(id, model);
            return Ok(new { message = "User updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok(new { message = "User deleted" });
        }
    }
}