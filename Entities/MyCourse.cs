using System.Text.Json.Serialization;

namespace Schedule.Entities
{
    public class MyCourse
    {
        public int Id { get; set; }

        public string Courses { get; set; }

        public string Resource { get; set; }

        public int IsOpen { get; set; }

        public string Start { get; set; }

        public string End { get; set; }


    }
}