using System.ComponentModel.DataAnnotations;
public class TodoItem{
    public long Id{get;set;}

    [Required]
    [StringLength(10)]
    public string Name{get;set;}
    public string Status{get;set;}
    public string Secret { get; set; }
    public string PersonAssigned { get; set; }
    public string Priority { get; set; }
}