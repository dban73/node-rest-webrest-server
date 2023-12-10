import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodosController {
  //*DI
  constructor(private readonly todoRepository: TodoRepository) {}
  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  };
  public getTodoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const todo = await this.todoRepository.findById(Number(id));
      if (!todo) return res.status(404).json({ message: 'Todo not found' });
      return res.json(todo);
    } catch (error) {
      res.status(404).json({ error });
    }
  };
  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ message: error });
    const todo = await this.todoRepository.create(createTodoDto!);
    return res.json(todo);
  };
  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ message: error });
    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
    return res.json(updatedTodo);
  };
  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' });
    const deletedTodo = await this.todoRepository.deleteById(id);
    return res.json(deletedTodo);
  };
}
