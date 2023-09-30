import { PanelPlugin } from "@grafana/data";
import { IPanelSettings } from "./interfaces";
import { Controller } from "./panel/Controller";
import { optionsBuilder } from './options/options';

export const plugin = new PanelPlugin<IPanelSettings>(Controller)
  .setPanelOptions(optionsBuilder)