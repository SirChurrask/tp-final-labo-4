import { materiales } from "../../weapon/interface/weapon";

export interface WantedItem {
  type: string;
  materiales: materiales;
  id: string;
}
