import { proxy } from "valtio";
const state = proxy({
  page: "home",
});
export default state;
