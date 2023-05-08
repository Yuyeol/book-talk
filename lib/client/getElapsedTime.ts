import dayjs from "dayjs";

export const getElapsedTime = (dateData: Date | null) => {
  if (!dateData) return;
  const date = dayjs(dateData);
  const now = dayjs();
  const diff = now.diff(date);
  const min = diff / 1000 / 60;
  const hour = min / 60;
  const day = hour / 24;

  if (diff < 0) return "방금 전";
  if (diff / 1000 / 60 < 60) return `${Math.floor(min)}분 전`;
  else if (diff / 1000 / 60 / 60 < 24) return `${Math.floor(hour)}시간 전`;
  else if (diff / 1000 / 60 / 60 / 24 < 8) return `${Math.floor(day)}일 전`;
  else return String(date).split(" G")[0];
};

export const getTime = (dateData: Date | null) => {
  if (!dateData) return;
  return String(dayjs(dateData)).split(" G")[0];
};
