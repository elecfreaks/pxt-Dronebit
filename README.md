![](https://img.shields.io/badge/Plantfrom-Micro%3Abit-red) ![](https://img.shields.io/travis/com/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/v/release/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/last-commit/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/languages/top/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/issues/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/license/elecfreaks/pxt-Dronebit) 

# Drone:bit Package

![](/image.jpg/)

This extension is designed to programme and drive the Drone:bit UAV, You can [get Drone:bit from the Elecfreaks store](https://www.elecfreaks.com/store)

## Code Example
```JavaScript
Drones.initModule(Drones.Runmodes.Master)
Drones.UAV_speed(80)
Drones.Basic_action(Drones.Basicoptions.Takeoff)
Drones.Move_action(Drones.Directionoptions.Forward, 100)
basic.forever(function () {
    if (Drones.Get_Sensor(Drones.Sensoroptions.Voltage) > 3.5) {
        Drones.Hovering(10)
    } else {
        Drones.Basic_action(Drones.Basicoptions.Takeoff)
    }
})

```
## Supported targets
for PXT/microbit

## License
MIT

