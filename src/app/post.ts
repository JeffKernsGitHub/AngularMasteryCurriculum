/**
 * =========================================================================================
 * Post Interface - Type-Safe Data Model
 * =========================================================================================
 *
 * Defines the contract for Blog Post entities fetched from the external REST API.
 * Using strict TypeScript interfaces prevents runtime errors, improves IDE autocompletion,
 * and ensures type safety across services, components, and templates.
 */
export interface Post {
  /** Unique numeric identifier for the post */
  id: number;

  /** Foreign key identifier for the authoring user */
  userId: number;

  /** Headline title of the post */
  title: string;

  /** Full markdown or text content of the post */
  body: string;
}
