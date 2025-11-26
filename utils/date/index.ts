export const convertFacebookPostTimeToDateTime = (time: string) => {
  const s = time;
  const match = s
    .replace(/\,+/gm, "")
    .replace(/\p{L}+/gu, " ")
    .trim();

  const formattedTime = match.split(" ").filter((t) => t);

  const d = new Date(
    `${formattedTime[2]}-${formattedTime[1]}-${formattedTime[0]} ${formattedTime[3]}`
  );

  return d;
};

export const getStartOfDay = (date: Date) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfDay = (date: Date) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setHours(23, 59, 59, 999);
  return d;
};

export const isToday = (date: Date) => {
  return date.toDateString() === new Date().toDateString();
};

export const isYesterday = (date: Date) => {
  return (
    date.toDateString() ===
    new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
  );
};
