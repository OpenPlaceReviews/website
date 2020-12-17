export default {
  blockchain: {
    blocksPageLimit: parseInt(process.env.BLOCK_LOAD_LIMIT) || 50,
    blocksSidebarLimit: parseInt(process.env.BLOCK_SIDEBAR_LIMIT) || 3,
  }
};
