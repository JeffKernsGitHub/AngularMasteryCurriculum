/**
 * =========================================================================================
 * Todo Interface - Type-Safe Data Model
 * =========================================================================================
 *
 * Defines the structure for Todo task items manipulated in our reactive state services
 * and CRUD presentation components.
 */
export interface Todo {
  /** Unique numeric identifier for the todo task */
  id: number;

  /** Description text of the task */
  title: string;

  /** Boolean completion status flag */
  completed: boolean;
}
