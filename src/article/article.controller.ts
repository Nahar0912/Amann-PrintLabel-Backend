import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleDto } from "./article.dto";
import { ArticleEntity } from "./article.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) { }

  // Health check endpoint
  @Get('/index')
  getIndex(): string {
    return this.articleService.getIndex();
  }

  // Create a new article
  @Post('/add')
  async create(@Body() articleDto: ArticleDto): Promise<ArticleEntity> {
    return this.articleService.create(articleDto);
  }

  // Get all articles
  @Get()
  async findAll(): Promise<ArticleEntity[]> {
    return this.articleService.findAll();
  }

  // Get article by ID
  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<ArticleEntity> {
    return this.articleService.findOneById(id);
  }

  // Get article by ARTICLE_NO
  @Get('/get/:articleNo')
  async findOne(@Param('articleNo') articleNo: string): Promise<ArticleEntity> {
    return this.articleService.findOneByArticleNo(articleNo);
  }

  // Update an article by ID
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() articleDto: ArticleDto,
  ): Promise<ArticleEntity> {
    return this.articleService.update(id, articleDto);
  }

  // Delete an article by ID
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.articleService.delete(id);
    return { message: `Article with ID ${id} successfully deleted` };
  }
}
