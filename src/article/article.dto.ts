import { IsString, IsInt, IsOptional } from 'class-validator';

export class ArticleDto {
  @IsString()
  Article_No: string;

  @IsString()
  Tex_No: string;

  @IsString()
  Length: string;

  @IsString()
  Cone_Round_Tex: string;

  @IsInt()
  No_of_Cones_inside_the_Carton: string;
}

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  Article_No?: string;

  @IsOptional()
  @IsString()
  Tex_No?: string;

  @IsOptional()
  @IsString()
  Length?: string;

  @IsOptional()
  @IsString()
  Cone_Round_Tex?: string;

  @IsOptional()
  @IsString()
  No_of_Cones_inside_the_Carton?: string;
}
