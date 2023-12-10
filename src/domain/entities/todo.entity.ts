export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static FromObject(object: { [key: string]: any }) {
    const { id, text, completedAt } = object;
    if (!id || isNaN(Number(id))) throw new Error('Id must be a number');
    if (!text) throw new Error('text property is required');
    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime()))
        throw 'completedAt must be a valid date';
    }
    return new TodoEntity(id, text, newCompletedAt);
  }
}
