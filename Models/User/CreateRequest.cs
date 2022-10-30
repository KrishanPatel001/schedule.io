using System.ComponentModel.DataAnnotations;
using Schedule.Entities;

namespace Schedule.Models.User
{
    public class CreateRequest
    {

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    
        [EnumDataType(typeof(Role))]
        public Role Role { get; set; }
    }
}