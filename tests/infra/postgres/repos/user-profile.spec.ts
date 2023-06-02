import { PgUser } from '@/infra/postgres/entities';
import { PgUserProfileRepository } from '@/infra/postgres/repos';
import { makeFakeDb } from '@/tests/infra/postgres/mocks';

import { IBackup } from 'pg-mem';
import { Repository, getConnection, getRepository } from 'typeorm';

describe('PgUserProfileRepository', () => {
  let sut: PgUserProfileRepository;
  let pgUserRepo: Repository<PgUser>;
  let backup: IBackup;

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser]);
    backup = db.backup();
    pgUserRepo = getRepository(PgUser);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  beforeEach(() => {
    backup.restore();
    sut = new PgUserProfileRepository();
  });

  describe('savePicture', () => {
    it('should update user profile', async () => {
      const { id } = await pgUserRepo.save({
        email: 'any_email',
        initials: 'any_initials',
      });

      await sut.savePicture({ id: id.toString(), pictureUrl: 'any_url' });
      const pgUser = await pgUserRepo.findOne({ id });

      expect(pgUser).toMatchObject({
        id,
        pictureUrl: 'any_url',
        initials: null,
      });
    });
  });

  describe('load', () => {
    it('should load user profile', async () => {
      const { id } = await pgUserRepo.save({
        email: 'any_email',
        name: 'any_name',
      });

      const userProfile = await sut.load({ id: id.toString() });

      expect(userProfile?.name).toBe('any_name');
    });
  });
});
