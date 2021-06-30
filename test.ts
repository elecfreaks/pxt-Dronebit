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
