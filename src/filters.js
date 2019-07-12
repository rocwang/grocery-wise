export function money(value) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    minimumFractionDigits: 2
  }).format(value);
}

export function storeName(value) {
  const map = {
    countdown: "Countdown",
    newworld: "New World",
    paknsave: "Pak'nSave"
  };

  return map[value] || value;
}
