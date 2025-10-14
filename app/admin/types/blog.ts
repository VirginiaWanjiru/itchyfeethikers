export interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string; // URL
  authorId?: string;
  createdAt?: string;
}
