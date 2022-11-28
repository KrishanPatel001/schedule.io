using System.Text.Json.Serialization;

namespace Schedule.Entities
{
    public class Course
    {
        public int Id { get; set; }

        public string Resource { get; set; }

        public string Text { get; set; }

        public int IsOpen { get; set; }

        public string Start { get; set; }

        public string End { get; set; }

    }
}