import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ArticleEntity } from "./article.entity";
import { ArticleDto, UpdateArticleDto } from "./article.dto";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  // Health check method
  getIndex(): string {
    return 'Article Service is running';
  }

  // Create a new article
  async create(articleDto: ArticleDto): Promise<ArticleEntity> {
    const article = this.articleRepository.create(articleDto);
    return this.articleRepository.save(article);
  }

  // Get all articles
  async findAll(): Promise<ArticleEntity[]> {
    return this.articleRepository.find();
  }

  // Get an article by ARTICLE_NO
  async findOneByArticleNo(articleNo: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ where: { Article_No: articleNo } });
    if (!article) {
      throw new NotFoundException(`Article with ARTICLE_NO ${articleNo} not found`);
    }
    return article;
  }

  // Get an article by ID
  async findOneById(id: number): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ where: { Id: id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }
  
  // Update an article by ID
  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<ArticleEntity> {
    const article = await this.findOneById(id); 
    Object.assign(article, updateArticleDto);
    return this.articleRepository.save(article); 
  }

  // Delete an article by ID
  async delete(id: number): Promise<void> {
    const article = await this.findOneById(id); 
    await this.articleRepository.remove(article); 
  }

}
