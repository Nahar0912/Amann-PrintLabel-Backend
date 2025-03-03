import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { LabelEntity } from './label.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/article.entity';


@Module({
  imports:[TypeOrmModule.forFeature([LabelEntity, ArticleEntity])],
  controllers: [LabelController],
  providers: [LabelService],
})

export class LabelModule {}
