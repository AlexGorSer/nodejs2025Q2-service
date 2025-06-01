import { DocumentBuilder } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

const path = 'doc/api.yaml';

export const config = new DocumentBuilder()
  .setTitle('Home Library Service')
  .setDescription('Home music library service')
  .setVersion('1.0.0')
  .build();

const fileContents = fs.readFileSync(path, 'utf8');
export const swaggerDocument = yaml.load(fileContents);
