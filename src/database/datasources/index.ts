import exp from 'constants';
import * as fs from 'fs';
import * as path from 'path';

// const files = fs.readdirSync(__dirname);

// files.forEach((file) => {
//   if (file !== 'index.ts' && file.endsWith('datasource.js')) {
//     const fileName = path.basename(file, '.js');
//     (async () => {
//       const module = await import(`./${fileName}`);
//       for (const exportName in module) {
//         if (module.hasOwnProperty(exportName)) {
//           exports[exportName] = module[exportName];
//         }
//       }
//     })();
//   }
// });

export * as main from './main.datasource';
export * as test from './test.datasource';
export * as tenant1 from './tenant1.datasource';
export * as tenant2 from './tenant2.datasource';
