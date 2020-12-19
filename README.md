# hue-twinkle

## Requirements
* Hue bridge
* Couple of connected Hue lights

## Setup
* Go to http://your-hub-ip/debug/clip.html
* Click the button on the bridge
* Right afterwards, make a POST with the data `{"devicetype":"my app"}` to `/api`
* The response will contain a username, remember this
* Make a GET to `/api/the-username/lights, remember the numerical id of the lights you want to twinkle
* `cp .env.sample .env`
* Add variables to .env
* `npm install`
