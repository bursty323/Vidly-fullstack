import _ from "lodash";

export function paginate(array, pagesize, pagenumber) {
  const startindex = (pagenumber - 1) * pagesize;
  return _(array).slice(startindex).take(pagesize).value();
}
