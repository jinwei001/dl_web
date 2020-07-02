import request from '@/utils/request'
import qs from "qs"
/**采集工艺库 */
const info = {
  /**
   * 列表数据
   */
  List(params) {
    return request.get("/zjgc/cjgy/list", params);
  },
  /**新增父节点 */
  addFather(data) {
    return request.post("/zjgc/cjgy/pSave", qs.stringify(data));
  },
  /**编辑子节点 */
  editSon(data) {
    return request.post("/zjgc/cjgy/edit", qs.stringify(data));
  },
  /**新增子节点 */
  addSon(data) {
    return request.post("/zjgc/cjgy/cSave", qs.stringify(data));
  },
  /**施工过程影像 */
  sgimage(data) {
    return request.post("/zjgc/sgimage/list", qs.stringify(data));
  },
  /**删除 */
  del(data) {
    return request.post("/zjgc/cjgy/remove", qs.stringify({
      objId: data
    }));
  },
  /**下拉数据 */

  getJdList(data) {
    return request.post("/zjgc/cjgy/getJdList", qs.stringify(data));
  },
}
export default info
