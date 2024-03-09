import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Comment} from './comment';

@Entity('blog_posts', {schema: 'family_coffee_db'})
export class BlogPost {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

  @Column('text', {name: 'title', comment: 'Tiêu đề bài viết'})
  title: string | undefined;

  @Column('text', {name: 'content', comment: 'Nội dung bài viết'})
  content: string | undefined;

  @Column('nvarchar', {
    name: 'author',
    length: 255,
    comment: 'Tác giả bài viết',
  })
  author: string | undefined;

  @Column('text', {name: 'category', comment: 'Danh mục của bài viết'})
  category: string | undefined;

  @Column('datetime', {
    name: 'published_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  publishedAt: Date | undefined;

  @OneToMany(() => Comment, comment => comment.blogPost)
  comments: Promise<Comment[]> | undefined;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | undefined;

  @Column('datetime', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | undefined;
}
