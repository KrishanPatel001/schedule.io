using System.ComponentModel.DataAnnotations;
using Schedule.Entities;

namespace Schedule.Models.MyCourse
{
    public class UpdateMyCourse
    {

       [Required]
        public int StudentId { get; set; }
        
        [Required]
        public string Course1 { get; set; }

        [Required]
        public string Course2 { get; set; }

        [Required]
        public string Course3 { get; set; }

        [Required]
        public string Course4 { get; set; }

        [Required]
        public string Course5 { get; set; }

        [Required]
        public string Course6 { get; set; }


}
}