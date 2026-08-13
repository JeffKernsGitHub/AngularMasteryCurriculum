/**
 * =========================================================================================
 * User Interface - Type-Safe Data Model
 * =========================================================================================
 *
 * Defines the contract for User entities fetched from the external REST API.
 * Ensures strict typing across data-loading pipelines and presentation templates.
 */
export interface User {
  /** Unique numeric identifier for the user */
  id: number;

  /** Full display name of the user */
  name: string;

  /** Unique handle/username */
  username: string;

  /** Contact email address */
  email: string;
}
