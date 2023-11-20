import { Request, Response } from 'express';

const todos = [
  {
    id: 1,
    text: 'Todo 1',
    completedAt: new Date(),
  },
  {
    id: 2,
    text: 'Todo 2',
    completedAt: null,
  },
  {
    id: 3,
    text: 'Todo 3',
    completedAt: new Date(),
  },
];

export class TodosController {
  //*DI
  constructor() {}
  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };
  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' });
    const todo = todos.find((todo) => todo.id === id);
    todo ? res.json(todo) : res.status(404).json({ message: 'Todo not found' });
  };
  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });
    const newTodo = {
      id: todos.length + 1,
      text: 'text',
      completedAt: null,
    };
    todos.push(newTodo);
    res.json(newTodo);
  };
  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' });
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    const { text, completedAt } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });
    todo.text = text || todo.text;
    completedAt === 'null'
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));
    res.json(todo);
  };
  public deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' });
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    todos.splice(todos.indexOf(todo), 1);
    res.json({ message: 'Todo deleted' });
  };
}
