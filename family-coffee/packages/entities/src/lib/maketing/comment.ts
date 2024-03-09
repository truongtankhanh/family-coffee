import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BlogPost} from './blog-post';

@Entity('comments', {schema: 'family_coffee_db'})
export class Comment {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number | undefined;

  @Column('nvarchar', {
    name: 'commenter_name',
    length: 255,
    comment: 'Tên người bình luận',
  })
  commenterName: string | undefined;

  @Column('text', {name: 'comment_content', comment: 'Nội dung bình luận'})
  commentContent: string | undefined;

  @Column('datetime', {
    name: 'commented_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Thời điểm bình luận',
  })
  commentedAt: Date | undefined;

  @ManyToOne(() => BlogPost, blog => blog.comments)
  blogPost: BlogPost | undefined;

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
