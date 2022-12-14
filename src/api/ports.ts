import { Express, Request, Response } from 'express';
import { Output } from 'midi';

export interface MidiPort {
  id: string;
  name: string;
}

export interface MidiRouterConfig {
  virtualPorts: MidiPort[];
}

export type MidiMessage = [cc: number, data1: number, data2: number];
export type Time = [number, number];
export type TimeSignature = [number, number];

export interface PerformerItem {
  portId: string;
  messages: MidiMessage[];
}

export interface PerformerData {
  items: PerformerItem[];
}

const ports: (MidiPort & { output: Output })[] = [];

function createPorts(config: MidiRouterConfig) {
  console.log('Config', config, config.virtualPorts.length);
  config.virtualPorts.forEach((port) => {
    const output = new Output();
    output.openVirtualPort(port.name);
    ports.push({ ...port, output });
  });
}

function getPorts(req: Request, res: Response) {
  res.send(ports.map((port) => port.name));
}

function sendMidiMessages(portId: string, messages: MidiMessage[]) {
  const output = ports.find((port) => port.id === portId)?.output;

  messages.forEach((msg) => output?.sendMessage(msg));
}

function perform(req: Request, res: Response) {
  const performerData = req.body as PerformerData;

  performerData.items.forEach((performerItem) => {
    sendMidiMessages(performerItem.portId, performerItem.messages);
  });

  res.send('Scheduled');
}

export function register(app: Express, config: MidiRouterConfig) {
  createPorts(config);

  app.get('/ports', getPorts);
  app.post('/perform', perform);
}
