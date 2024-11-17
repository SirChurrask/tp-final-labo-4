import { Material } from "../../shared/interface/material";


export interface WantedItem {
  type: string;
  materiales: Material[];
  id: string;
}
