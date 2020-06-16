const { expect } = require('chai');
const Mux = require('../../../src/mux');

/** @test {Uploads} */
describe('SigningKeys', () => {
  const muxClient = new Mux();
  const { Video } = muxClient;

  /** @test {SigningKeys.create} */
  describe('SigningKeys.create', () => {
    let signingKey;

    after(async () => {
      await Video.SigningKeys.del(signingKey.id);
    });

    /** @test {SigningKeys.create} */
    it('creates a new signing key', async () => {
      signingKey = await Video.SigningKeys.create();

      expect(signingKey.id).to.exist;
      expect(signingKey.private_key).to.exist;
      expect(signingKey.created_at).to.exist;
    });
  });

  /** @test {SigningKeys.get} */
  describe('SigningKeys.get', () => {
    let signingKey;

    after(async () => {
      await Video.SigningKeys.del(signingKey.id);
    });

    /** @test {SigningKeys.get} */
    it('retrieves a signing key', async () => {
      const createdSigningKey = await Video.SigningKeys.create();

      signingKey = await Video.SigningKeys.get(createdSigningKey.id);
      expect(signingKey.id).to.exist;
      expect(signingKey.created_at).to.exist;
      expect(signingKey.private_key).to.not.exist;
    });
  });

  /** @test {SigningKeys.del} */
  describe('SigningKeys.del', () => {
    /** @test {SigningKeys.del} */
    it('deletes a signing key', async () => {
      const createdSigningKey = await Video.SigningKeys.create();

      const signingKey = await Video.SigningKeys.del(createdSigningKey.id);
      expect(signingKey).to.be.empty;

      try {
        await Video.SigningKeys.get(createdSigningKey.id);
      } catch (err) {
        expect(err.type).to.eq('not_found');
      }
    });
  });

  /** @test {SigningKeys.list} */
  describe('SigningKeys.list', () => {
    const createdKeys = [];

    after(async () => {
      await Promise.all(createdKeys.map(({ id }) => Video.SigningKeys.del(id)));
    });

    /** @test {SigningKeys.list} */
    it('lists signing keys', async () => {
      const createdKey = await Video.SigningKeys.create();
      createdKeys.push(createdKey);

      const signingKeys = await Video.SigningKeys.list();

      expect(signingKeys.length).to.be.greaterThan(0);
    });
  });
});
