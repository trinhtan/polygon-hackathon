/** @format */

const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('BaseNFT', async () => {
  let warrior, pveItem, pvpItem;
  let admin, minter, alice, bob;

  beforeEach(async () => {
    [admin, minter, alice, bob] = await ethers.getSigners();

    let BaseNFT = await ethers.getContractFactory('BaseNFT');

    warrior = await BaseNFT.connect(admin).deploy('Warrior', 'WARRIOR', 'warrior/');
    pveItem = await BaseNFT.connect(admin).deploy('Pve Item', 'PVE_ITEM', 'pveItem/');
    pvpItem = await BaseNFT.connect(admin).deploy('Pvp Item', 'PVP_ITEM', 'pvpItem/');
  });

  it('Deploy successfully', async () => {
    expect(await warrior.name()).to.equal('Warrior');
    expect(await warrior.symbol()).to.equal('WARRIOR');

    expect(await pveItem.name()).to.equal('Pve Item');
    expect(await pveItem.symbol()).to.equal('PVE_ITEM');

    expect(await pvpItem.name()).to.equal('Pvp Item');
    expect(await pvpItem.symbol()).to.equal('PVP_ITEM');
  });

  context('Before admin grants minter_role for minter', () => {
    let adminRole, minterRole;
    beforeEach(async () => {
      adminRole = await warrior.DEFAULT_ADMIN_ROLE();
      minterRole = await warrior.MINTER_ROLE();
    });

    it('Check admin role', async () => {
      expect(await warrior.hasRole(adminRole, admin.address)).to.be.equal(true);
      expect(await pveItem.hasRole(adminRole, admin.address)).to.be.equal(true);
      expect(await pvpItem.hasRole(adminRole, admin.address)).to.be.equal(true);

      expect(await warrior.hasRole(adminRole, minter.address)).to.be.equal(false);
      expect(await pveItem.hasRole(adminRole, minter.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(adminRole, minter.address)).to.be.equal(false);

      expect(await warrior.hasRole(adminRole, alice.address)).to.be.equal(false);
      expect(await pveItem.hasRole(adminRole, alice.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(adminRole, alice.address)).to.be.equal(false);

      expect(await warrior.hasRole(adminRole, bob.address)).to.be.equal(false);
      expect(await pveItem.hasRole(adminRole, bob.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(adminRole, bob.address)).to.be.equal(false);
    });

    it('Check minter role', async () => {
      expect(await warrior.hasRole(minterRole, admin.address)).to.be.equal(false);
      expect(await pveItem.hasRole(minterRole, admin.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(minterRole, admin.address)).to.be.equal(false);

      expect(await warrior.hasRole(minterRole, minter.address)).to.be.equal(false);
      expect(await pveItem.hasRole(minterRole, minter.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(minterRole, minter.address)).to.be.equal(false);

      expect(await warrior.hasRole(minterRole, alice.address)).to.be.equal(false);
      expect(await pveItem.hasRole(minterRole, alice.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(minterRole, alice.address)).to.be.equal(false);

      expect(await warrior.hasRole(minterRole, bob.address)).to.be.equal(false);
      expect(await pveItem.hasRole(minterRole, bob.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(minterRole, bob.address)).to.be.equal(false);
    });

    it('Mint failed', async () => {
      await expect(warrior.connect(admin).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(admin).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(admin).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );

      await expect(warrior.connect(minter).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(minter).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(minter).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );

      await expect(warrior.connect(alice).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(alice).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(alice).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );

      await expect(warrior.connect(bob).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(bob).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(bob).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
    });

    it('Mint by batch failed', async () => {
      await expect(warrior.connect(admin).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(admin).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(admin).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );

      await expect(warrior.connect(minter).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(minter).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(minter).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );

      await expect(warrior.connect(alice).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(alice).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(alice).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );

      await expect(warrior.connect(bob).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(bob).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(bob).mintByBatch([alice.address])).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
    });

    it('Set baseURI failed', async () => {
      await expect(warrior.connect(minter).setBaseUri('warrior/')).to.be.revertedWith(
        'NFT: must have admin role to set base uri'
      );
      await expect(pveItem.connect(minter).setBaseUri('pveItem/')).to.be.revertedWith(
        'NFT: must have admin role to set base uri'
      );
      await expect(pvpItem.connect(minter).setBaseUri('pvpItem/')).to.be.revertedWith(
        'NFT: must have admin role to set base uri'
      );

      await expect(warrior.connect(alice).setBaseUri('warrior/')).to.be.revertedWith(
        'NFT: must have admin role to set base uri'
      );
      await expect(pveItem.connect(alice).setBaseUri('pveItem/')).to.be.revertedWith(
        'NFT: must have admin role to set base uri'
      );
      await expect(pvpItem.connect(alice).setBaseUri('pvpItem/')).to.be.revertedWith(
        'NFT: must have admin role to set base uri'
      );

      await expect(warrior.connect(bob).setBaseUri('warrior/')).to.be.revertedWith(
        'NFT: must have admin role to set base uri'
      );
      await expect(pveItem.connect(bob).setBaseUri('pveItem/')).to.be.revertedWith(
        'NFT: must have admin role to set base uri'
      );
      await expect(pvpItem.connect(bob).setBaseUri('pvpItem/')).to.be.revertedWith(
        'NFT: must have admin role to set base uri'
      );
    });
  });

  it('User is not admin cannot grant role', async () => {
    let adminRole = await warrior.DEFAULT_ADMIN_ROLE();
    let minterRole = await warrior.MINTER_ROLE();

    await expect(warrior.connect(minter).grantRole(adminRole, minter.address)).to.be.revertedWith(
      ''
    );
    await expect(warrior.connect(minter).grantRole(minterRole, minter.address)).to.be.revertedWith(
      ''
    );
    await expect(pveItem.connect(minter).grantRole(adminRole, minter.address)).to.be.revertedWith(
      ''
    );
    await expect(pveItem.connect(minter).grantRole(minterRole, minter.address)).to.be.revertedWith(
      ''
    );
    await expect(pvpItem.connect(minter).grantRole(adminRole, minter.address)).to.be.revertedWith(
      ''
    );
    await expect(pvpItem.connect(minter).grantRole(minterRole, minter.address)).to.be.revertedWith(
      ''
    );

    await expect(warrior.connect(alice).grantRole(adminRole, alice.address)).to.be.revertedWith('');
    await expect(warrior.connect(alice).grantRole(minterRole, alice.address)).to.be.revertedWith(
      ''
    );
    await expect(pveItem.connect(alice).grantRole(adminRole, alice.address)).to.be.revertedWith('');
    await expect(pveItem.connect(alice).grantRole(minterRole, alice.address)).to.be.revertedWith(
      ''
    );
    await expect(pvpItem.connect(alice).grantRole(adminRole, alice.address)).to.be.revertedWith('');
    await expect(pvpItem.connect(alice).grantRole(minterRole, alice.address)).to.be.revertedWith(
      ''
    );

    await expect(warrior.connect(bob).grantRole(adminRole, bob.address)).to.be.revertedWith('');
    await expect(warrior.connect(bob).grantRole(minterRole, bob.address)).to.be.revertedWith('');
    await expect(pveItem.connect(bob).grantRole(adminRole, bob.address)).to.be.revertedWith('');
    await expect(pveItem.connect(bob).grantRole(minterRole, bob.address)).to.be.revertedWith('');
    await expect(pvpItem.connect(bob).grantRole(adminRole, bob.address)).to.be.revertedWith('');
    await expect(pvpItem.connect(bob).grantRole(minterRole, bob.address)).to.be.revertedWith('');
  });

  context('After admin grants minter_role for minter', () => {
    let adminRole, minterRole;
    beforeEach(async () => {
      adminRole = await warrior.DEFAULT_ADMIN_ROLE();
      minterRole = await warrior.MINTER_ROLE();

      await warrior.connect(admin).grantRole(minterRole, minter.address);
      await pveItem.connect(admin).grantRole(minterRole, minter.address);
      await pvpItem.connect(admin).grantRole(minterRole, minter.address);
    });

    it('Check role', async () => {
      expect(await warrior.hasRole(adminRole, admin.address)).to.be.equal(true);
      expect(await pveItem.hasRole(adminRole, admin.address)).to.be.equal(true);
      expect(await pvpItem.hasRole(adminRole, admin.address)).to.be.equal(true);

      expect(await warrior.hasRole(adminRole, minter.address)).to.be.equal(false);
      expect(await pveItem.hasRole(adminRole, minter.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(adminRole, minter.address)).to.be.equal(false);

      expect(await warrior.hasRole(adminRole, alice.address)).to.be.equal(false);
      expect(await pveItem.hasRole(adminRole, alice.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(adminRole, alice.address)).to.be.equal(false);

      expect(await warrior.hasRole(adminRole, bob.address)).to.be.equal(false);
      expect(await pveItem.hasRole(adminRole, bob.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(adminRole, bob.address)).to.be.equal(false);

      expect(await warrior.hasRole(minterRole, admin.address)).to.be.equal(false);
      expect(await pveItem.hasRole(minterRole, admin.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(minterRole, admin.address)).to.be.equal(false);

      expect(await warrior.hasRole(minterRole, minter.address)).to.be.equal(true);
      expect(await pveItem.hasRole(minterRole, minter.address)).to.be.equal(true);
      expect(await pvpItem.hasRole(minterRole, minter.address)).to.be.equal(true);

      expect(await warrior.hasRole(minterRole, alice.address)).to.be.equal(false);
      expect(await pveItem.hasRole(minterRole, alice.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(minterRole, alice.address)).to.be.equal(false);

      expect(await warrior.hasRole(minterRole, bob.address)).to.be.equal(false);
      expect(await pveItem.hasRole(minterRole, bob.address)).to.be.equal(false);
      expect(await pvpItem.hasRole(minterRole, bob.address)).to.be.equal(false);
    });

    it('Only minter can mint', async () => {
      await expect(warrior.connect(admin).mint(admin.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(admin).mint(admin.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(admin).mint(admin.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );

      await expect(warrior.connect(alice).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(alice).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(alice).mint(alice.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );

      await expect(warrior.connect(bob).mint(bob.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pveItem.connect(bob).mint(bob.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
      await expect(pvpItem.connect(bob).mint(bob.address)).to.be.revertedWith(
        'NFT: must have minter role to mint'
      );
    });

    context('Mint successfully', () => {
      beforeEach(async () => {
        await warrior.connect(minter).mint(alice.address);
        await warrior.connect(minter).mint(bob.address);

        await pveItem.connect(minter).mint(alice.address);
        await pveItem.connect(minter).mint(bob.address);

        await pvpItem.connect(minter).mint(alice.address);
        await pvpItem.connect(minter).mint(bob.address);

        await warrior.connect(minter).mintByBatch([alice.address, bob.address]);
        await pveItem.connect(minter).mintByBatch([alice.address, bob.address]);
        await pvpItem.connect(minter).mintByBatch([alice.address, bob.address]);
      });

      it('Check owner', async () => {
        expect(await warrior.ownerOf(1)).to.be.equal(alice.address);
        expect(await pveItem.ownerOf(1)).to.be.equal(alice.address);
        expect(await pvpItem.ownerOf(1)).to.be.equal(alice.address);

        expect(await warrior.ownerOf(3)).to.be.equal(alice.address);
        expect(await pveItem.ownerOf(3)).to.be.equal(alice.address);
        expect(await pvpItem.ownerOf(3)).to.be.equal(alice.address);

        expect(await warrior.balanceOf(alice.address)).to.be.equal(2);
        expect(await pveItem.balanceOf(alice.address)).to.be.equal(2);
        expect(await pvpItem.balanceOf(alice.address)).to.be.equal(2);

        expect(await warrior.ownerOf(2)).to.be.equal(bob.address);
        expect(await pveItem.ownerOf(2)).to.be.equal(bob.address);
        expect(await pvpItem.ownerOf(2)).to.be.equal(bob.address);

        expect(await warrior.ownerOf(4)).to.be.equal(bob.address);
        expect(await pveItem.ownerOf(4)).to.be.equal(bob.address);
        expect(await pvpItem.ownerOf(4)).to.be.equal(bob.address);

        expect(await warrior.balanceOf(bob.address)).to.be.equal(2);
        expect(await pveItem.balanceOf(bob.address)).to.be.equal(2);
        expect(await pvpItem.balanceOf(bob.address)).to.be.equal(2);
      });

      it('Check tokenURI', async () => {
        expect(await warrior.tokenURI(1)).to.be.equal('warrior/1');
        expect(await pveItem.tokenURI(1)).to.be.equal('pveItem/1');
        expect(await pvpItem.tokenURI(1)).to.be.equal('pvpItem/1');

        expect(await warrior.tokenURI(2)).to.be.equal('warrior/2');
        expect(await pveItem.tokenURI(2)).to.be.equal('pveItem/2');
        expect(await pvpItem.tokenURI(2)).to.be.equal('pvpItem/2');

        expect(await warrior.tokenURI(3)).to.be.equal('warrior/3');
        expect(await pveItem.tokenURI(3)).to.be.equal('pveItem/3');
        expect(await pvpItem.tokenURI(3)).to.be.equal('pvpItem/3');

        expect(await warrior.tokenURI(4)).to.be.equal('warrior/4');
        expect(await pveItem.tokenURI(4)).to.be.equal('pveItem/4');
        expect(await pvpItem.tokenURI(4)).to.be.equal('pvpItem/4');

        await expect(warrior.tokenURI(5)).to.be.revertedWith(
          'ERC721Metadata: URI query for nonexistent token'
        );
        await expect(pveItem.tokenURI(5)).to.be.revertedWith(
          'ERC721Metadata: URI query for nonexistent token'
        );
        await expect(pvpItem.tokenURI(5)).to.be.revertedWith(
          'ERC721Metadata: URI query for nonexistent token'
        );
      });
    });
  });
});
