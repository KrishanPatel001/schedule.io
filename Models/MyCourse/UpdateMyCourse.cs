using System.ComponentModel.DataAnnotations;
using Schedule.Entities;

namespace Schedule.Models.MyCourse
{
    public class UpdateMyCourse
    {

       [Required]
        public int Id { get; set; }

        [Required]
        public string Courses { get; set; }
        
        [Required]
        public string Resource { get; set; }


        [Required]
        public int IsOpen { get; set; }

        [Required]
        public string Start { get; set; }

        [Required]
        public string End { get; set; }
}
}