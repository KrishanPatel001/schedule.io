using System.Text.Json.Serialization;

namespace Schedule.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public Role Role { get; set; } 
    }
}