using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using User.Models;
using System.ComponentModel.DataAnnotations;


namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItemDTO>>> GetTodoItems()
    {
        return await _context.TodoItems
            .Select(x => ItemToDTO(x))
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItemDTO>> GetTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        return ItemToDTO(todoItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodoItem(long id, TodoItemDTO todoItemDTO)
    {
        Console.WriteLine(todoItemDTO.Name);
        var context = new ValidationContext(todoItemDTO, serviceProvider: null, items: null);
        var results = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(todoItemDTO, context, results, true);
        Console.WriteLine(isValid);
        if (!isValid){
            foreach (var validationResult in results){
                Console.WriteLine(validationResult.ErrorMessage);
            }
        }
        else{
        
            if (id != todoItemDTO.Id)
            {
                return BadRequest();
            }

            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            todoItem.Name = todoItemDTO.Name;
            todoItem.Status = todoItemDTO.Status;
            todoItem.PersonAssigned = todoItemDTO.PersonAssigned;
            todoItem.Priority = todoItemDTO.Priority;
            todoItemDTO.ToStringRedacted();  

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
            {
                if(!TodoItemExists(id)){
                    return NotFound();
                }else {
                    throw;
                }
            }
        }
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<TodoItemDTO>> CreateTodoItem(TodoItemDTO todoItemDTO)
    {
        Console.WriteLine(todoItemDTO.Name);
        var context = new ValidationContext(todoItemDTO, serviceProvider: null, items: null);
        var results = new List<ValidationResult>();

        var isValid = Validator.TryValidateObject(todoItemDTO, context, results, true);
        Console.WriteLine(isValid);
        var todoItem = new TodoItem
            {
                Status = "",
                Name = "",
                PersonAssigned = "",
                Priority = ""
        };

        if (!isValid){
            foreach (var validationResult in results){
                Console.WriteLine(validationResult.ErrorMessage);
            }
            todoItem.Equals(null);
        }
        else{
            todoItem = new TodoItem
            {
                Status = todoItemDTO.Status,
                Name = todoItemDTO.Name,
                PersonAssigned = todoItemDTO.PersonAssigned,
                Priority = todoItemDTO.Priority
                
            };
            todoItemDTO.ToStringRedacted();
            _context.TodoItems.Add(todoItem);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, ItemToDTO(todoItem));
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodoItemExists(long id) =>
        _context.TodoItems.Any(e => e.Id == id);

    private static TodoItemDTO ItemToDTO(TodoItem todoItem) =>
        new TodoItemDTO
        {
            Id = todoItem.Id,
            Name = todoItem.Name,
            Status = todoItem.Status,
            PersonAssigned = todoItem.PersonAssigned,
            Priority = todoItem.Priority
        };
    }
}