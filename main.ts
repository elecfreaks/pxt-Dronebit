/**
* Functions to UVA by ELECFREAKS Co.,Ltd.
*/
//% color=#FF0000  icon="\uf072" block="Drones" blockId="Drones"
//% groups='["Basic", "Caution!"]'
namespace Drones {
    let rxBuff = pins.createBuffer(3)
    export enum Runmodes {
        //% block="Master"
        Master = 0x01,
        //% block="Remote"
        Remote = 0x02
    }
    export enum Basicoptions {
        //% block="Take off" 
        Takeoff = 0x01,
        //% block="Landing"
        Landing = 0x02
    }
    export enum Urgentoptions {
        //% block="Emergency stop"
        Emergency_stop = 0x05
    }
    export enum Directionoptions {
        //% block="Up" 
        Up = 0x10,
        //% block="Down"
        Down = 0x11,
        //% block="Forward" 
        Forward = 0x12,
        //% block="Backward"
        Backward = 0x13,
        //% block="Left" 
        Left = 0x14,
        //% block="Right"
        Right = 0x15
    }
    export enum Angleoptions {
        //% block="Left" 
        Left = 0x16,
        //% block="Right"
        Right = 0x17
    }
    export enum Rolloptions {
        //% block="Roll forward" 
        Roll_forward = 0x20,
        //% block="Roll back"
        Roll_back = 0x21,
        //% block="Roll left" 
        Roll_left = 0x22,
        //% block="Roll right"
        Roll_right = 0x23
    }
    export enum Sensoroptions {
        //% block="Voltage" 
        Voltage = 0x01,
        //% block="Height"
        Height = 0x02
    }
    function WaitCellback(): boolean {
        basic.pause(1000)
        rxBuff = serial.readBuffer(3)
        if (rxBuff[0] == 0x01 && rxBuff[1] == 0x01) {
            radio.sendString("S")
            return true
        }
        else {
            radio.sendString("F")
            return false
        }
    }

    //% block="Initialize UAV to %mode mode"
    //% weight=100 group="Basic"
    export function initModule(mode: Runmodes): void {
        serial.redirect(SerialPin.P1, SerialPin.P2, 115200)
        let txBuff = pins.createBuffer(1)
        let rxBuff = pins.createBuffer(3)
        serial.readString()
        rxBuff = serial.readBuffer(3)
        while (rxBuff[1] == 0x02) {
            music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
            basic.pause(3000)
        }
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        txBuff[0] = mode
        basic.pause(200)
        serial.writeBuffer(txBuff)
        basic.pause(200)

        if (mode == Runmodes.Remote) {
            while (true) {
                basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            `)
                basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . # . # .
            . . . . .
            `)
                basic.showLeds(`
            . # # # .
            # . . . #
            . . . . .
            . . . . .
            . . . . .
            `)
            }

        }
        loops.everyInterval(1000, function () {
            let breathBuff = pins.createBuffer(2)
            breathBuff[0] = 0xAF
            breathBuff[1] = 0xFA
            serial.writeBuffer(breathBuff)
        })
    }
    //% block="Setting UAV power $power \\%"
    //% power.min=0 power.max=100
    //% weight=90 group="Basic"
    export function UAV_speed(power: number): void {
        serial.readString()
        let txBuff = pins.createBuffer(5)
        txBuff[0] = 0xEF
        txBuff[1] = 1
        txBuff[2] = 0x01
        txBuff[3] = 0x03
        txBuff[4] = power
        serial.writeBuffer(txBuff)
        WaitCellback()
    }
    //% block="Basic action %basicstate"
    //% weight=89 group="Basic"
    export function Basic_action(basicstate: Basicoptions): void {
        if (basicstate == 1) {
            for (let index = 3; index >= 0; index--) {
                basic.showNumber(index)
                if (index == 0) {
                    music.playTone(523, music.beat(BeatFraction.Double))
                } else {
                    music.playTone(262, music.beat(BeatFraction.Whole))
                }
            }
        }
        serial.readString()
        let txBuff = pins.createBuffer(4)
        txBuff[0] = 0xEF
        txBuff[1] = 0
        txBuff[2] = 0x01
        txBuff[3] = basicstate
        serial.writeBuffer(txBuff)
        WaitCellback()
    }

    //% block="Move action %Directionstate by %distance cm"
    //% weight=70 group="Basic"
    export function Move_action(Directionstate: Directionoptions, distance: number): void {
        serial.readString()
        let txBuff = pins.createBuffer(6)
        txBuff[0] = 0xEF
        txBuff[2] = 0x01
        txBuff[3] = Directionstate
        if (distance > 255) {
            txBuff[1] = 2
            txBuff[4] = 255
            txBuff[5] = distance - 255
        }
        else {
            txBuff[1] = 1
            txBuff[4] = distance
            txBuff[5] = 0
        }
        serial.writeBuffer(txBuff)
        WaitCellback()
    }
    //% block="Rotation action %rotationstate by %angle °"
    //% weight=65 group="Basic"
    export function Rotation_action(rotationstate: Angleoptions, angle: number): void {
        serial.readString()
        let txBuff = pins.createBuffer(6)
        txBuff[0] = 0xEF
        txBuff[2] = 0x01
        txBuff[3] = rotationstate
        if (angle > 255) {
            txBuff[1] = 2
            txBuff[4] = 255
            txBuff[5] = angle - 255
        }
        else {
            txBuff[1] = 1
            txBuff[4] = angle
            txBuff[5] = 0
        }
        serial.writeBuffer(txBuff)
        WaitCellback()
    }
    //% block="Roll action %rotationstate "
    //% weight=64 group="Basic"
    //% deprecated=true
    export function Roll_action(rollstate: Rolloptions): void {
        serial.readString()
        let txBuff = pins.createBuffer(6)
        txBuff[0] = 0xEF
        txBuff[2] = 0x01
        txBuff[3] = rollstate
        serial.writeBuffer(txBuff)
        WaitCellback()
    }
    //% block="UAV hovering %time S"
    //% weight=60 group="Basic"
    export function Hovering(time: number): void {
        serial.readString()
        let txBuff = pins.createBuffer(5)
        txBuff[0] = 0xEF
        txBuff[1] = 1
        txBuff[2] = 0x01
        txBuff[3] = 0x04
        txBuff[4] = time
        serial.writeBuffer(txBuff)
        basic.pause(time * 1000)
        WaitCellback()
    }

    //% block="Get %state Value"
    //% weight=50 group="Basic"
    export function Get_Sensor(state: Sensoroptions): number {
        serial.readString()
        let txBuff = pins.createBuffer(4)
        let rxBuff = pins.createBuffer(3)
        txBuff[0] = 0xEF
        txBuff[1] = 0
        txBuff[2] = 0x02
        txBuff[3] = state
        serial.writeBuffer(txBuff)
        rxBuff = serial.readBuffer(3)
        if (state == Sensoroptions.Voltage) {
            return (rxBuff[1] + rxBuff[2]) * 0.1
        }
        else {
            return rxBuff[1] + rxBuff[2]
        }

    }

    //% block="Urgent action %urgentstate"
    //% weight=10 group="Caution!"
    export function Urgent_action(urgentstate: Urgentoptions): void {
        serial.readString()
        let txBuff = pins.createBuffer(4)
        txBuff[0] = 0xEF
        txBuff[1] = 0
        txBuff[2] = 0x01
        txBuff[3] = urgentstate
        serial.writeBuffer(txBuff)
        serial.redirectToUSB()
        while (true) {
            music.setTempo(150)
            music.playTone(784, music.beat(BeatFraction.Eighth))
            basic.pause(100)
        }
    }
}