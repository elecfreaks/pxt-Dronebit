/**
* Functions to UVA by ELECFREAKS Co.,Ltd.
*/
//% color=#FF0000  icon="\uf072" block="Drones" blockId="Drones"
namespace Drones {
    let rxBuff = pins.createBuffer(3)
    export enum  Basicoptions{
        //% block="Take off" 
        Take_off = 0x01,
        //% block="Landing"
        Landing = 0x02
    }
    export enum Directionoptions{
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
    export enum Angleoptions{
        //% block="Left" 
        Take_off = 0x16,
        //% block="Right"
        Landing = 0x17
    }
    export enum Rolloptions{
        //% block="Roll forward" 
        Roll_forward = 0x20,
        //% block="Roll back"
        Roll_back = 0x21,
        //% block="Roll left" 
        Roll_left = 0x22,
        //% block="Roll right"
        Roll_right = 0x23
    }
    export enum Sensoroptions{
        //% block="Voltage" 
        Voltage = 0x01,
        //% block="Height"
        Height = 0x02
    }
    function Dronesback():boolean{
        basic.pause(300)
        rxBuff = serial.readBuffer(3)
        if(rxBuff[0] == 0x01 && rxBuff[1] == 0x01){
            return true
        }
        else if(rxBuff[0] == 0x01 && rxBuff[1] == 0x02){
            //执行错误
        }
        else{
            return false
        }
        return false
    }
    /**
    * TODO: Waiting for module initialize.
    */
    //% block="Initialize UAV"
    export function initModule():void{
        serial.redirect(SerialPin.P1, SerialPin.P2, 115200)
    }

    //% block="Basic action %basicstate"
    export function Basic_action(basicstate: Basicoptions): void {
        let txBuff = pins.createBuffer(4)
        let rxBuff = pins.createBuffer(3)
        txBuff[0] = 0xEF
        txBuff[1] = 0
        txBuff[2] = 0x01
        txBuff[3] = basicstate
        serial.writeBuffer(txBuff)
        while(!Dronesback());
    }
    //% block="Move action %basicstate by %distance cm"
    export function Move_action(basicstate: Basicoptions,distance:number): void {
        let txBuff = pins.createBuffer(6)
        let rxBuff = pins.createBuffer(3)
        txBuff[0] = 0xEF
        txBuff[1] = 2
        txBuff[2] = 0x01
        txBuff[3] = basicstate
        if(distance > 255){
            txBuff[4] = 255
            txBuff[5] = distance - 255
        }
        else{
            txBuff[4] = distance
            txBuff[5] = 0
        }
        serial.writeBuffer(txBuff)
        while(!Dronesback());
    }
    //% block="Get %state Value"
    export function Get_Sensor(state:Sensoroptions): number{
        let txBuff = pins.createBuffer(4)
        let rxBuff = pins.createBuffer(3)
        txBuff[0] = 0xEF
        txBuff[1] = 0
        txBuff[2] = 0x02
        serial.writeBuffer(txBuff)
        rxBuff = serial.readBuffer(3)
        return rxBuff[1]+rxBuff[2]
    }

    
}