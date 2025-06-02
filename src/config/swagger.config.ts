import { OpenAPIObject } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { resolve } from 'path';

const path = resolve('doc/api.yaml');
export const getSwagger = async () => {
  const fileContents = await fs.promises.readFile(path, 'utf8');
  const swaggerDocument = yaml.load(fileContents) as OpenAPIObject;
  return swaggerDocument;
};
