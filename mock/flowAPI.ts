import dagData from './dag.json';

export default {
  'GET /api/flow/queryFlowData': (req: any, res: any) => {
    res.json({
      success: true,
      data: dagData,
      errorCode: 0,
    });
  },
};
