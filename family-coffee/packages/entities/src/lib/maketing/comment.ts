import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BlogPost } from './blog-post';
import { BaseEntity } from '../base-entity';

@Entity('comments', { schema: 'family_coffee_db' })
export class Comment extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
  }

  @Column('nvarchar', {
    name: 'commenter_name',
    length: 255,
    comment: 'Tên người bình luận',
  })
  commenterName: string | undefined;

  @Column('text', { name: 'comment_content', comment: 'Nội dung bình luận' })
  commentContent: string | undefined;

  @Column('datetime', {
    name: 'commented_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Thời điểm bình luận',
  })
  commentedAt: Date | undefined;

  @ManyToOne(() => BlogPost, (blog) => blog.comments)
  blogPost: BlogPost | undefined;
}
