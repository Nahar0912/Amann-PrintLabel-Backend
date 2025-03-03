import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from 'src/article/article.entity';
import { LabelEntity } from './label.entity';
import { LabelDTO, UpdateLabelDto } from './label.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(LabelEntity)
    private readonly labelRepository: Repository<LabelEntity>,

    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  // Health check endpoint
  getIndex(): string {
    return 'Label Service is running';
  }

  // Create a new label
  async create(labelDto: LabelDTO): Promise<LabelEntity> {
    let article = await this.articleRepository.findOne({
      where: { Article_No: labelDto.ARTICLE_NO },
    });
    if (!article) {
      article = this.articleRepository.create({
        Article_No: labelDto.ARTICLE_NO,
        Tex_No: labelDto.TEX_NO,
        Length: labelDto.LENGTH,
        Cone_Round_Tex: labelDto.CONE_ROUND_TEX,
        No_of_Cones_inside_the_Carton: labelDto.CARTON_INSIDE_QUANTITY,
      });
      await this.articleRepository.save(article);
    }

    const label = this.labelRepository.create({
      ...labelDto,
      BATCH_LOT_NO: 'LT323',
      COLOR_CODE: 'BLUE',
      ARTICLE_NO: 'ART123',
      DATE: new Date(),
      CARTON_INSIDE_QUANTITY: '20',
      TEX_NO: 'TEX123',
      LENGTH: '100',
      CONE_ROUND_TEX: 'CONE123',
      NO_OF_STICKER_WITH_FULL_BOX: '5',
      NO_OF_LOOSE_QUANTITY_IN_LAST_STICKER: '10',
      PRINT_QUANTITY_FOR_LOOSE_STICKER: '20',
      PRINT_QUANTITY_FOR_CONE_ROUND_STICKER: '15',
      AMANN_COLOR_CODE: 'AM123',
      COMPETETOR_COLOR_CODE: 'COMP456',
    });

    return this.labelRepository.save(label);
  }

  // Get all labels
  async findAll(): Promise<LabelEntity[]> {
    const labels = await this.labelRepository.find();
    return labels.map(label => plainToClass(LabelEntity, label)); 
  }

  // Get a label by ID
  async getLabelById(id: number): Promise<LabelEntity> {
    const label = await this.labelRepository.findOne({ where: { ID: id } });
    if (!label) {
      throw new NotFoundException(`Label with ID '${id}' not found`);
    }
    return label;
  }

  // Update a label by ID
  async updateLabel(id: number, updateLabelDto: UpdateLabelDto): Promise<LabelEntity> {
    const label = await this.labelRepository.findOne({ where: { ID: id } });
    if (!label) {
      throw new NotFoundException(`Label with ID '${id}' not found`);
    }

    Object.assign(label, updateLabelDto);
    
    let article = await this.articleRepository.findOne({
      where: { Article_No: updateLabelDto.ARTICLE_NO },
    });

    if (!article) {
      article = this.articleRepository.create({
        Article_No: updateLabelDto.ARTICLE_NO,
        Tex_No: updateLabelDto.TEX_NO,
        Length: updateLabelDto.LENGTH,
        Cone_Round_Tex: updateLabelDto.CONE_ROUND_TEX,
        No_of_Cones_inside_the_Carton: updateLabelDto.CARTON_INSIDE_QUANTITY,
      });
    } else {
      Object.assign(article, {
        Tex_No: updateLabelDto.TEX_NO,
        Length: updateLabelDto.LENGTH,
        Cone_Round_Tex: updateLabelDto.CONE_ROUND_TEX,
        No_of_Cones_inside_the_Carton: updateLabelDto.CARTON_INSIDE_QUANTITY,
      });
    }
    await this.articleRepository.save(article);

    return this.labelRepository.save(label);
  }

  // Delete a label by ID
  async deleteLabel(id: number): Promise<void> {
    const label = await this.labelRepository.findOne({ where: { ID: id } });
    if (!label) {
      throw new NotFoundException(`Label with ID '${id}' not found`);
    }
    await this.labelRepository.remove(label);
  }
}
