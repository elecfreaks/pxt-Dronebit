![](https://img.shields.io/badge/Plantfrom-Micro%3Abit-red) ![](https://img.shields.io/travis/com/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/v/release/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/last-commit/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/languages/top/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/issues/elecfreaks/pxt-Dronebit) ![](https://img.shields.io/github/license/elecfreaks/pxt-Dronebit) 

# Drone:bit Package

![](/image.png/)

Drone:bit is a new UAV based on micro:bit.

It can achieve a series of flight actions, such as hovering at a fixed height, flying at a fixed point, rolling and so on, all of which are carried out by micro:bit Programming implementation.

This extension is designed to programme and drive the Drone:bit UAV, You can [get Drone:bit from the Elecfreaks store](https://www.elecfreaks.com/micro-bit-Drone-kit.html)

## Document

You can get more information about Drone:bit on [ELECFREAKS WIKI](
https://www.elecfreaks.com/learn-en/microbitKit/Drone_Kit/index.html)

## Basic usage
* To initialize the UAV, you can set it to remote control mode and master control mode
```JavaScript
    Drones.initModule(Drones.Runmodes.Master)
```
* Setting the flight power of UAV
```JavaScript
    Drones.UAV_speed(80)
```
* Basic command of UAV, take off and landing
```JavaScript
    Drones.Basic_action(Drones.Basicoptions.Takeoff)
```
* Move command, up and down, left and right, front and back
```JavaScript
    Drones.Move_action(Drones.Directionoptions.Forward, 100)
```
* Rotation command, left to right
```JavaScript
    Drones.Rotation_action(Drones.Angleoptions.Left, 0)
```
* Roll command, roll 360 degrees, forward, backward, left and right
```JavaScript
    Drones.Roll_action(Drones.Rolloptions.Roll_forward)
```
* UAV hover, do not use pause, or UAV will land
```JavaScript
    Drones.Hovering(0)
```
* Get the height or voltage of the UAV
```JavaScript
    Drones.Get_Sensor(Drones.Sensoroptions.Voltage)
```
* Emergency command, highest priority. The rotor braked and the drone fell. Caution!
```JavaScript
    Drones.Urgent_action(Drones.Urgentoptions.Emergency_stop)
```

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

