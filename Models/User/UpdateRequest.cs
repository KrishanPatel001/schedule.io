using System.ComponentModel.DataAnnotations;
using Schedule.Entities;

namespace Schedule.Models.User
{
    public class UpdateRequest
    {

        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        // treat empty string as null for password fields to 
        // make them optional in front end apps
        private string _password;
        [MinLength(6)]
        public string Password
        {
            get => _password;
            set => _password = replaceEmptyWithNull(value);
        }

        /*[EnumDataType(typeof(Role))]
        public string Role { get; set; }*/
        // helpers

        private string replaceEmptyWithNull(string value)
        {
            // replace empty string with null to make field optional
            return string.IsNullOrEmpty(value) ? null : value;
        }
    }
}