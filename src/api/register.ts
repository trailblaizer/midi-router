import { Express } from 'express';
import { MidiRouterConfig, register as portsApi } from './ports';
import { register as imuApi } from './imu';

export function registerApis(app: Express, config: MidiRouterConfig) {
  portsApi(app, config);
  imuApi(app);
}
