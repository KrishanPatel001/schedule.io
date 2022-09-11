using System.ComponentModel.DataAnnotations;
using System;
using System.Reflection;

public class TodoItemDTO
{
    [Required]
    [Key]
    public long Id { get; set; }

    [Required]
    [StringLength(15, ErrorMessage = "Name must be <15 characters>")]
    public string Name { get; set; }
    [Required]
    [Editable(true)]
    public string Status { get; set; }
    [Required]
    [StringLength(10, ErrorMessage = "Person name must be <10 characters>")]
    public string PersonAssigned { get; set; }
    [Required]
    [Range(1,10)]
    public string Priority { get; set; }
    public string ToStringRedacted() { 
        foreach(PropertyInfo p in this.GetType().GetProperties()){
            Console.Write(p.Name);
            object[] attributes = p.GetCustomAttributes(true);
            foreach (object o in attributes){
                Console.Write(" - "+o.GetType().Name);
            }
            Console.WriteLine("\n----------------------------------------------------------------");
        }
        return $"";
    }
}