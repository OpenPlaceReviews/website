export default {
  auth: {
    typingTimeout: 1000,
    minPasswordLength: 10,
  },
  blockchain: {
    blocksPageLimit: parseInt(process.env.BLOCK_LOAD_LIMIT) || 50,
    blocksSidebarLimit: parseInt(process.env.BLOCK_SIDEBAR_LIMIT) || 3,
    opsTransformSrc: process.env.OPS_TRANSFORM_SRC || '/api/ops.js',
  }
};
