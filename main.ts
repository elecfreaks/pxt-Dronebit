/**
* Functions to UVA by ELECFREAKS Co.,Ltd.
*/
//% color=#FF0000  icon="\uf072" block="Drones" blockId="Drones"
namespace Drones {
    let txBuff = pins.createBuffer(9)
    let rxBuff = pins.createBuffer(3)
        export enum DigitalRJPin {
        //% block="J1" 
        J1,
        //% block="J2"
        J2,
        //% block="J3"
        J3,
        //% block="J4"
        J4
    }
    //% blockId=init block="Init UAV"
    export function initDrones():void{
        serial.redirect(SerialPin.P1, SerialPin.P2, 115200)
    }

    /**
     * TODO: Loop songs in folders
     * @param folderNum Specify a floder , eg: 0
     */
    //% blockId=fans block="Motor fan %Rjpin toggle to $fanstate || speed %speed \\%"
    //% Rjpin.fieldEditor="gridpicker"
    //% Rjpin.fieldOptions.columns=2
    //% fanstate.shadow="toggleOnOff"
    //% subcategory=Excute group="Digital" color=#EA5532
    //% speed.min=0 speed.max=100
    //% expandableArgumentMode="toggle"
    export function motorFan(fanstate: boolean, speed: number = 100): void {
        let pin = AnalogPin.P1
        if (fanstate) {
            pins.analogSetPeriod(pin, 100)
            pins.analogWritePin(pin, Math.map(speed, 0, 100, 0, 1023))
        }
        else {
            pins.analogWritePin(pin, 0)
            speed = 0
        }
    }

    
    
    
    
    
    
    
    
    
    
}