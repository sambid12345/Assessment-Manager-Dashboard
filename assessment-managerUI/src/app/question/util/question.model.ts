export interface Question {
  _id?: string; // Optional, used for uniquely identifying the question, especially when interacting with a backend
  text: string;
  options: string[];
  correctOption: number; // Index of the correct answer in the options array (0-based index)
  marks: number;
  negativeMarks?: number; // Optional, defaults to 0 if not provided
  tags: string[];
  createdAt?: Date; // Optional, used to store the creation date
  updatedAt?: Date; // Optional, used to store the last update date
}
