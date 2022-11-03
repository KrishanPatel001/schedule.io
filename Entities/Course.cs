using System.Text.Json.Serialization;

namespace Schedule.Entities
{
    public class Course
    {
        public string text { get; set; }
        
        public string id { get; set; }

        public string start { get; set; }


        public string end { get; set; }


        public int isOpen { get; set; }

    }
}