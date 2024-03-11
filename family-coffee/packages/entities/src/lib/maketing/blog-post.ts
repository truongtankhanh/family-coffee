import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from './comment';
import { BaseEntity } from '../base-entity';

@Entity('blog_posts', { schema: 'family_coffee_db' })
export class BlogPost extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('text', { name: 'title', comment: 'Tiêu đề bài viết' })
  title: string | undefined;

  @Column('text', { name: 'content', comment: 'Nội dung bài viết' })
  content: string | undefined;

  @Column('nvarchar', {
    name: 'author',
    length: 255,
    comment: 'Tác giả bài viết',
  })
  author: string | undefined;

  @Column('text', { name: 'category', comment: 'Danh mục của bài viết' })
  category: string | undefined;

  @Column('datetime', {
    name: 'published_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  publishedAt: Date | undefined;

  @OneToMany(() => Comment, (comment) => comment.blogPost)
  comments: Promise<Comment[]> | undefined;
}
