import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

import { config } from './ormconfig';

/**
 * Заполнение базы.
 * @link https://typeorm-extension.tada5hi.net/guide/seeding.html
 */
(async (): Promise<void> => {
  const dataSource: DataSource = new DataSource(config);
  await dataSource.initialize();
  await runSeeders(dataSource);
})();
