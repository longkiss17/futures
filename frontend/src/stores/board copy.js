import { reactive, isRef, watchEffect, watch } from "vue";
import { useRoute } from "vue-router";
import * as hangul from "hangul-js";
// import { db } from "@/stores/db";
// import { useObservable } from "@vueuse/rxjs";
// import { liveQuery } from "dexie";

export default function useBoard(data, options) {
  let optsOrigin = {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 1000],
    currentPage: 1,
    total: 0,
    filteredCount: 0,
    indexKey: "index",
    selectKeys: {},
    filterKeys: {},
    filterGroupKeys: {},
    checkboxKeys: {},
    sortKeys: {},
    labels: [],
    mergeKeys: {},
  };

  let opts = reactive(JSON.parse(JSON.stringify(optsOrigin)));

  const route = useRoute();

  if (route.query.page) opts.currentPage = parseInt(route.query.page);
  if (route.query.size) opts.pageSize = parseInt(route.query.size);

  if (route.query.gkeys) {
    route.query.gkeys.split(",").forEach((entry) => {
      let arr = entry.split(":");
      options.filterGroupKeys[arr[0]].value = decodeURIComponent(arr[1]);
    });
  }
  if (route.query.dkeys) {
    route.query.dkeys.split(",").forEach((entry) => {
      let arr = entry.split(":");
      opts.selectKeys[arr[0]] = decodeURIComponent(arr[1]);
    });
  }
  if (route.query.fkeys) {
    route.query.fkeys.split(",").forEach((entry) => {
      let arr = entry.split(":");
      opts.filterKeys[arr[0]] = decodeURIComponent(arr[1]);
    });
  }
  if (route.query.skeys) {
    route.query.skeys.split(",").forEach((entry) => {
      let arr = entry.split(":");
      opts.sortKeys[arr[0]] = decodeURIComponent(arr[1]);
    });
  }
  if (route.query.ckeys) {
    route.query.ckeys.split("|").forEach((entry) => {
      let arr = entry.split(":");
      arr[1].split(",").forEach((v) => {
        if (!opts.checkboxKeys[arr[0]]) opts.checkboxKeys[arr[0]] = {};
        opts.checkboxKeys[arr[0]][v] = v;
      });
    });
  }

  let results = reactive({
    data: data.value ? data.value : [],
    filteredData: [],
  });

  watch(
    () => data.value,
    () => {
      let total = data.value.length;
      data.value.forEach((entry, i) => {
        entry[opts.indexKey] = total - i;
        Object.keys(opts.mergeKeys).forEach((key) => {
          entry[key] = entry[key] ? entry[key] : entry[opts.mergeKeys[key]];
        });
      });
    }
  );

  function filteredResults() {
    Object.assign(opts, options);

    if (data.value && data.value.length > 0) {
      results.data = data.value;

      Object.keys(data.value.first()).forEach((key) => {
        //opts.filterKeys[key] = opts.filterKeys[key] ? opts.filterKeys[key] : "";
        opts.sortKeys[key] = opts.sortKeys[key] ? opts.sortKeys[key] : 0;
      });

      opts.sortKeys[opts.indexKey] = opts.sortKeys[opts.indexKey] ? opts.sortKeys[opts.indexKey] : 0;

      data.value.forEach((entry, i) => {
        Object.keys(entry).forEach((key) => {
          if (entry[key + "Origin"]) entry[key] = entry[key + "Origin"];
        });
      });

      // 메타 유형의 값을 입력 값으로 변환
      if (Object.keys(opts.labels).length > 0) {
        Object.keys(opts.labels).forEach((key) => {
          if (opts.labels[key])
            results.data.forEach((entry) => {
              entry[key + "Label"] = opts.labels[key][entry[key]] ? opts.labels[key][entry[key]] : entry[key];
            });
        });
      }
      // db.delete();
      // db.version(1).stores({ [name]: "++id, " + Object.keys(data.value.first()).join(", ") });

      // db.open();
      // db[name].clear();
      // await db[name].bulkAdd(JSON.parse(JSON.stringify(data.value)));
    }

    if (
      Object.keys(opts.filterKeys)
        .map((key) => opts.filterKeys[key])
        .some((value) => value)
    ) {
      results.filteredData = results.data.filter((row) => {
        let fIndex = [];
        for (let [key, value] of Object.entries(opts.filterKeys)) {
          let originKey = key + "Origin";
          let index = 0;

          if (value) {
            if (!row[originKey]) row[originKey] = row[key];

            if (row[originKey] && hangul.disassemble(row[originKey].toString().toLowerCase()).join("").indexOf(hangul.disassemble(value.toString().toLowerCase()).join("")) >= 0) {
              let v = value.replace(/\(/, "\\(").replace(/\)/, "\\)").replace(/\?/, "\\?").replace(/\[/, "\\[");

              row[key] = row[originKey].toString().replace(new RegExp("" + v + "", "igm"), "<b>" + value + "</b>");
            } else {
              row[key] = row[originKey];
              index = -1;
            }
          } else {
            if (row[originKey]) row[key] = row[originKey];
          }
          fIndex.push(index);
        }

        return fIndex.some((entry) => entry === -1) ? false : true;
      });
    } else {
      results.filteredData = results.data;
    }

    if (
      Object.keys(opts.filterGroupKeys)
        .map((key) => opts.filterGroupKeys[key].value)
        .some((value) => value)
    ) {
      Object.keys(opts.filterGroupKeys).forEach((key) => {
        let filterKeys = {};

        opts.filterGroupKeys[key].keys.forEach((entry) => {
          filterKeys[entry] = opts.filterGroupKeys[key].value;
        });

        results.filteredData = results.filteredData.filter((row) => {
          let fIndex = [];
          for (let [key, value] of Object.entries(filterKeys)) {
            let originKey = key + "Origin";
            let index = 0;

            if (value) {
              if (!row[originKey]) row[originKey] = row[key];

              if (row[originKey] && hangul.disassemble(row[originKey].toLowerCase()).join("").indexOf(hangul.disassemble(value.toLowerCase()).join("")) >= 0) {
                let v = value.replace(/\(/, "\\(").replace(/\)/, "\\)").replace(/\?/, "\\?").replace(/\[/, "\\[");
                row[key] = row[originKey].replace(new RegExp("" + v + "", "igm"), "<b>" + value + "</b>");
              } else {
                row[key] = row[originKey];
                index = -1;
              }
            } else {
              if (row[originKey]) row[key] = row[originKey];
            }
            fIndex.push(index);
          }

          return fIndex.filter((entry) => entry >= 0).length > 0 ? true : false;
        });
      });
    }

    if (Object.keys(opts.selectKeys).length > 0) {
      results.filteredData = results.filteredData.filter((row) => {
        let fIndex = [];

        for (let [key, value] of Object.entries(opts.selectKeys)) {
          let index = -1;
          if (value && row[key].toString() === value.toString()) index = 0;
          if (!value) index = 0;
          fIndex.push(index);
        }

        return fIndex.some((entry) => entry === -1) ? false : true;
      });
    }

    if (Object.keys(opts.checkboxKeys).length > 0) {
      results.filteredData = results.filteredData.filter((row) => {
        let isKeys = [];

        Object.keys(opts.checkboxKeys).forEach((key) => {
          let fIndex = [];
          Object.keys(opts.checkboxKeys[key]).forEach((k) => {
            fIndex.push(row[key].indexOf(k));
          });

          // key에 해당하는 값 OR 조건
          isKeys.push(fIndex.filter((entry) => entry >= 0).length === 1 ? true : false);
        });

        // 전체 key에 해당하는 값 AND 조건
        return isKeys.filter((entry) => !entry).length === 0 ? true : false;
      });
    }

    if (
      Object.keys(opts.sortKeys)
        .map((key) => opts.sortKeys[key])
        .some((value) => value !== 0)
    ) {
      for (let [key, value] of Object.entries(opts.sortKeys)) {
        results.filteredData = results.filteredData.sortKey(key, value);
      }
    }

    opts.total = results.filteredData.length;
    opts.filteredCount = data.value ? data.value.length : 0;

    results.filteredData = results.filteredData.slice(opts.pageSize * (opts.currentPage - 1), opts.pageSize * opts.currentPage);
  }

  if (isRef(data) || isRef(options)) {
    watchEffect(filteredResults);
  } else {
    filteredResults();
  }

  function sortKey(key) {
    opts.sortKeys[key] = opts.sortKeys[key] === 0 ? 1 : opts.sortKeys[key] === 1 ? -1 : 0;
  }

  function del(condition) {
    results.data.splice(
      results.data.findIndex((entry) => entry[condition.key] === condition.value),
      1
    );
    filteredResults();
  }

  function dropdownData(key) {
    let values = [];

    results.data
      .map((entry) => entry[key])
      .groupBy()
      .forEach((value) => {
        let checked = false;
        if (opts.checkboxKeys[key] && opts.checkboxKeys[key][value]) checked = true;
        let label = opts.labels[key] ? opts.labels[key][value] : value;
        values.push({ key: value, label: label, checked: checked });
      });
    return values;
  }

  function checked(key) {
    return opts.checkboxKeys[key];
  }

  function toggle(checked, key, target) {
    if (checked) {
      if (!opts.checkboxKeys[key]) {
        opts.checkboxKeys[key] = {};
      }
      opts.checkboxKeys[key][target.key] = target.label;
    } else {
      delete opts.checkboxKeys[key][target.key];
      if (Object.keys(opts.checkboxKeys[key]).length === 0) delete opts.checkboxKeys[key];
    }
  }

  function reset() {
    opts.pageSize = 10;
    opts.currentPage = 1;
    opts.selectKeys = {};
    opts.filterKeys = {};
    Object.keys(opts.filterGroupKeys).forEach((key) => {
      opts.filterGroupKeys[key].value = "";
    });
    opts.checkboxKeys = {};
    opts.sortKeys = {};
  }

  function resetCheckBox(key) {
    delete opts.checkboxKeys[key];
  }

  function queryStrings() {
    let params = {};

    if (optsOrigin.currentPage !== opts.currentPage) {
      params.page = opts.currentPage;
    }

    if (optsOrigin.pageSize !== opts.pageSize) {
      params.size = opts.pageSize;
    }

    if (JSON.stringify(optsOrigin.pageSizes) !== JSON.stringify(opts.pageSizes)) {
      params.sizes = opts.pageSizes;
    }

    if (Object.keys(opts.filterGroupKeys).filter((key) => opts.filterGroupKeys[key].value).length)
      params.gkeys = Object.keys(opts.filterGroupKeys)
        .filter((key) => opts.filterGroupKeys[key].value)
        .map((key) => `${key}:${encodeURIComponent(opts.filterGroupKeys[key].value)}`)
        .join(",");

    if (Object.keys(opts.selectKeys).filter((key) => opts.selectKeys[key]).length)
      params.dkeys = Object.keys(opts.selectKeys)
        .filter((key) => opts.selectKeys[key])
        .map((key) => `${key}:${encodeURIComponent(opts.selectKeys[key])}`)
        .join(",");

    if (Object.keys(opts.filterKeys).filter((key) => opts.filterKeys[key]).length)
      params.fkeys = Object.keys(opts.filterKeys)
        .filter((key) => opts.filterKeys[key])
        .map((key) => `${key}:${encodeURIComponent(opts.filterKeys[key])}`)
        .join(",");

    if (Object.keys(opts.sortKeys).filter((key) => opts.sortKeys[key] !== 0).length)
      params.skeys = Object.keys(opts.sortKeys)
        .filter((key) => opts.sortKeys[key])
        .map((key) => `${key}:${encodeURIComponent(opts.sortKeys[key])}`)
        .join(",");

    if (Object.keys(opts.checkboxKeys).length > 0) {
      let data = {};
      Object.keys(opts.checkboxKeys).forEach((key) => {
        data[key] = Object.keys(opts.checkboxKeys[key]).join(",");
      });

      params.ckeys = Object.keys(data)
        .map(
          (key) =>
            `${key}:${data[key]
              .split(",")
              .map((v) => encodeURIComponent(v))
              .join(",")}`
        )
        .join("|");
    }

    return params;
  }

  return { boardData: results, options: opts, sortKey, del, dropdownData, checked, toggle, reset, resetCheckBox, queryStrings };
}
