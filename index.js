const axios = require('axios');
const baseUrl = `http://${process.env.HUE_ADDRESS}/api/${process.env.HUE_USERNAME}/lights`;

const main = async() => {
  await checkForLights();

  const lightIds = process.env.LIGHTS.split(',');
  let lights = await Promise.all(lightIds.map(mapLights));

  lights.forEach(async(light) => {
    setInterval(() => timer(light), 250);
  });
};

const mapLights = async(id) => {
  const brightness = await getBrightness(id);
  const direction = Math.random() < 0.5 ? -1 : 1;
  return { id, brightness, direction, sp: brightness };
};

const timer = async(light) => {
  if (light.direction === 1 && light.sp < (light.brightness + 50)) {
    light.sp += 3;
  } else if (light.direction === -1 && light.sp > (light.brightness - 50)) {
    light.sp -= 3;
  } else {
    light.direction *= -1;
    light.sp += (3 * light.direction);
  }
  await setBrightness(light.id, light.sp);
};

const checkForLights = async() => {
  new Promise(function(res, _) {
    if (!process.env.LIGHTS.split(',').length) {
      console.log('No lights present');
      process.exit(1);
    } else {
      return res();
    }
  });
};

const getBrightness = async(lightId) => (await axios.get(`${baseUrl}/${lightId}`)).data.state.bri;

const setBrightness = async(lightId, brightness) => await axios.put(`${baseUrl}/${lightId}/state`, { bri: brightness });

main();
