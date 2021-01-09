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
    /**
    * TODO: Waiting for module initialize.
    */
    //% block="Initialize UAV"
    export function initModule():void{
        serial.redirect(SerialPin.P1, SerialPin.P2, 115200)
    }
    /**
     * TODO: Loop songs in folders
     * @param folderNum Specify a floder , eg: 0
     */
    //% blockId=fans block="Basic action %basicstate"
    export function Basic_action(basicstate: Basicoptions): void {
        let txBuff = pins.createBuffer(4)
        txBuff[0] = 0xEF
        txBuff[1] = 0
        txBuff[2] = 0x01
        txBuff[3] = basicstate
        serial.writeBuffer(txBuff)
    }

    

    
}