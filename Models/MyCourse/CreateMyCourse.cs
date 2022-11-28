using System.ComponentModel.DataAnnotations;
using Schedule.Entities;

namespace Schedule.Models.MyCourse
{
    public class CreateMyCourse
    {

        [Required]
        public int Id { get; set; }

        public string Courses { get; set; }

        public int IsOpen { get; set; }

        public string Start { get; set; }

        public string End { get; set; }

    }
}