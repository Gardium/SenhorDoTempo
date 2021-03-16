export function condition(condition) {
  let icon = {};
  switch (condition) {
    case "clear_day":
      icon = {
        name: "sunny-outline",
        color: "#ffb300",
      };

      break;

    case "clear_night":
      icon = {
        name: "partly-night-outline",
        color: "#0662ff",
      };

      break;

    case "cloudly_day":
      icon = {
        name: "partly-sunny-outline",
        color: "#ffb300",
      };

      break;
    case "cloudly_night":
      icon = {
        name: "cloudy-night-outline",
        color: "#0662ff",
      };

      break;

    case "snow":
      icon = {
        name: "snow-outline",
        color: "#bec",
      };

      break;
    case "rain":
      icon = {
        name: "rainy-outline",
        color: "#1ec9ff",
      };

      break;
    case "storm":
      icon = {
        name: "thunderstorm-outline",
        color: "#1ec9ff",
      };

      break;

    default:
      icon = {
        name: "cloud-outline",
        color: "#1ec9ff",
      };

      break;
  }

  return icon;
}
