using System.ComponentModel.DataAnnotations;
using Schedule.Entities;

namespace Schedule.Models.Course
{
    public class CreateRequest
    {

        [Required]
        public string id { get; set; }

        [Required]
        public string start { get; set; }

        [Required]
        public string end { get; set; }

        [Required]
        public int isOpen { get; set; }

        [Required]
        public string resource { get; set; }

        [Required]
        public string text { get; set; }
    }
}