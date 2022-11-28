using System.ComponentModel.DataAnnotations;
using Schedule.Entities;

namespace Schedule.Models.MyCourse
{
    public class UpdateMyCourse
    {

       [Required]
        public int Id { get; set; }
        
        public string Courses { get; set; }


}
}