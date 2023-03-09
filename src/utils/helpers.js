export function getValuesDiffClass(val1, val2) {
  const diff = val2 - val1;
  if (diff > 0) {
    return "increase-color";
  } else if (diff < 0) {
    return "decrease-color";
  } else {
    return "";
  }
}
