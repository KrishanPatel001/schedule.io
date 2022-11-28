using System.ComponentModel.DataAnnotations;
using Schedule.Entities;

namespace Schedule.Models.MyCourse
{
    public class CreateMyCourse
    {

        [Required]
        public int Id { get; set; }

         [Required]
        public string Course1 { get; set; }

        public string Course2 { get; set; }

        public string Course3 { get; set; }

        public string Course4 { get; set; }

        public string Course5 { get; set; }

        public string Course6 { get; set; }

    

     
    }
}