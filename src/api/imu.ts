import { Express, Request, Response } from 'express';

export const imuPerformerData = {
  left: {
    currentNote: -1,
  },
  right: {
    currentNote: -1,
  },
};

function updatePeformerData(req: Request, res: Response) {
  const leftCurrentNote = req.body.left;
  const rightCurrentNote = req.body.right;

  imuPerformerData.left.currentNote = leftCurrentNote;
  imuPerformerData.right.currentNote = rightCurrentNote;

  res.send('Success');
}

function getPerformerData(req: Request, res: Response) {
  res.send(imuPerformerData);
}

export function register(app: Express) {
  app.put('/imu/performer', updatePeformerData);
  app.get('/imu/performer', getPerformerData);
}
