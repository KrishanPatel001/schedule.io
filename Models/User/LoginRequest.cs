using System.ComponentModel.DataAnnotations;
using Schedule.Entities;

namespace Schedule.Models.User
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    
        //[EnumDataType(typeof(Role))]
        //public Role Role { get; set; }
    }
}