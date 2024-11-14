import { Material } from "./material";

export interface WantedItem {
  type: string;
  materiales: Material[];
  id: string;
}
