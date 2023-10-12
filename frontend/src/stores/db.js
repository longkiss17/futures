import Dexie from "dexie";

export const db = new Dexie("asm");
// db.version(1).stores({
//   notice: "++id, noticeSeq, title, noticeCategory, contents, noticeScheduleStart, noticeScheduleEnd, useYn, registerId, registerTime, modifyId, modifyTime, serviceSeq, hits, useYnLabel, noticeCategoryLabel, serviceSeqLabel, modifyIdLabel", // Primary key and indexed props
// });

// db.version(1).stores({
//   notice: "++id",
//   multilingual: "++id",
// });
