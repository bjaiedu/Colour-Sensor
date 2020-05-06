
enum tcs34725IntegrationTime_t {
    TCS34725_INTEGRATIONTIME_2_4MS = 0xFF,   /**<  2.4ms - 1 cycle    - Max Count: 1024  */
    TCS34725_INTEGRATIONTIME_24MS = 0xF6,   /**<  24ms  - 10 cycles  - Max Count: 10240 */
    TCS34725_INTEGRATIONTIME_50MS = 0xEB,   /**<  50ms  - 20 cycles  - Max Count: 20480 */
    TCS34725_INTEGRATIONTIME_101MS = 0xD5,   /**<  101ms - 42 cycles  - Max Count: 43008 */
    TCS34725_INTEGRATIONTIME_154MS = 0xC0,   /**<  154ms - 64 cycles  - Max Count: 65535 */
    TCS34725_INTEGRATIONTIME_700MS = 0x00    /**<  700ms - 256 cycles - Max Count: 65535 */
}
enum tcs34725Gain_t {
    TCS34725_GAIN_1X = 0x00,   /**<  No gain  */
    TCS34725_GAIN_4X = 0x01,   /**<  4x gain  */
    TCS34725_GAIN_16X = 0x02,   /**<  16x gain */
    TCS34725_GAIN_60X = 0x03    /**<  60x gain */
}
/**
 * 颜色传感器
 */
//% weight=7 color=#0855AA icon="\uf1fc" block="颜色传感器"
namespace TCS34725_I2C {
    let TCS34725_ADDRESS = 0x29;
    let TCS34725_COMMAND_BIT = 0x80;
    let TCS34725_ENABLE = 0x00;
    let TCS34725_ENABLE_AIEN = 0x10;   /* RGBC Interrupt Enable */
    let TCS34725_ENABLE_WEN = 0x08;   /* Wait enable - Writing 1 activates the wait timer */
    let TCS34725_ENABLE_AEN = 0x02;   /* RGBC Enable - Writing 1 actives the ADC, 0 disables it */
    let TCS34725_ENABLE_PON = 0x01;   /* Power on - Writing 1 activates the internal oscillator, 0 disables it */
    let TCS34725_ATIME = 0x01;   /* Integration time */
    let TCS34725_WTIME = 0x03;   /* Wait time (if TCS34725_ENABLE_WEN is asserted) */
    let TCS34725_WTIME_2_4MS = 0xFF;   /* WLONG0 = 2.4ms   WLONG1 = 0.029s */
    let TCS34725_WTIME_204MS = 0xAB;   /* WLONG0 = 204ms   WLONG1 = 2.45s  */
    let TCS34725_WTIME_614MS = 0x00;    /* WLONG0 = 614ms   WLONG1 = 7.4s   */
    let TCS34725_AILTL = 0x04;   /* Clear channel lower interrupt threshold */
    let TCS34725_AILTH = 0x05;
    let TCS34725_AIHTL = 0x06;   /* Clear channel upper interrupt threshold */
    let TCS34725_AIHTH = 0x07;
    let TCS34725_PERS = 0x0C;      /* Persistence register - basic SW filtering mechanism for interrupts */
    let TCS34725_PERS_NONE = 0b0000;  /* Every RGBC cycle generates an interrupt                                */
    let TCS34725_PERS_1_CYCLE = 0b0001;  /* 1 clean channel value outside threshold range generates an interrupt   */
    let TCS34725_PERS_2_CYCLE = 0b0010;   /* 2 clean channel values outside threshold range generates an interrupt  */
    let TCS34725_PERS_3_CYCLE = 0b0011;  /* 3 clean channel values outside threshold range generates an interrupt  */
    let TCS34725_PERS_5_CYCLE = 0b0100;  /* 5 clean channel values outside threshold range generates an interrupt  */
    let TCS34725_PERS_10_CYCLE = 0b0101;  /* 10 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_15_CYCLE = 0b0110;  /* 15 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_20_CYCLE = 0b0111;  /* 20 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_25_CYCLE = 0b1000;  /* 25 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_30_CYCLE = 0b1001;  /* 30 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_35_CYCLE = 0b1010; /* 35 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_40_CYCLE = 0b1011;  /* 40 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_45_CYCLE = 0b1100; /* 45 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_50_CYCLE = 0b1101;  /* 50 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_55_CYCLE = 0b1110;  /* 55 clean channel values outside threshold range generates an interrupt */
    let TCS34725_PERS_60_CYCLE = 0b1111;  /* 60 clean channel values outside threshold range generates an interrupt */
    let TCS34725_CONFIG = 0x0D;
    let TCS34725_CONFIG_WLONG = 0x02;    /* Choose between short and long (12x) wait times via TCS34725_WTIME */
    let TCS34725_CONTROL = 0x0F;    /* Set the gain level for the sensor */
    let TCS34725_ID = 0x12;    /* 0x44 = TCS34721/TCS34725, 0x4D = TCS34723/TCS34727 */
    let TCS34725_STATUS = 0x13;
    let TCS34725_STATUS_AINT = 0x10;    /* RGBC Clean channel interrupt */
    let TCS34725_STATUS_AVALID = 0x01;    /* Indicates that the RGBC channels have completed an integration cycle */
    let TCS34725_CDATAL = 0x14;    /* Clear channel data */
    let TCS34725_CDATAH = 0x15;
    let TCS34725_RDATAL = 0x16;    /* Red channel data */
    let TCS34725_RDATAH = 0x17;
    let TCS34725_GDATAL = 0x18;    /* Green channel data */
    let TCS34725_GDATAH = 0x19;
    let TCS34725_BDATAL = 0x1A;    /* Blue channel data */
    let TCS34725_BDATAH = 0x1B;

    let _tcs34725Initialised: number;
    let _tcs34725Gain: tcs34725Gain_t;
    let _tcs34725IntegrationTime: tcs34725IntegrationTime_t;
    let r: number;
    let g: number;
    let b: number;
    let c: number;

    function setreg(reg: number, dat: number): void {
        pins.i2cWriteNumber(TCS34725_ADDRESS, TCS34725_COMMAND_BIT | reg, NumberFormat.UInt8BE);
        pins.i2cWriteNumber(TCS34725_ADDRESS, dat & 0xFF, NumberFormat.UInt8BE);
    }
    function getreg(reg: number): number {
        pins.i2cWriteNumber(TCS34725_ADDRESS, TCS34725_COMMAND_BIT | reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(TCS34725_ADDRESS, NumberFormat.UInt8BE);
    }

    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(TCS34725_ADDRESS, TCS34725_COMMAND_BIT | reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(TCS34725_ADDRESS, NumberFormat.UInt16LE);
    }

    function getInt16LE(reg: number): number {
        pins.i2cWriteNumber(TCS34725_ADDRESS, TCS34725_COMMAND_BIT | reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(TCS34725_ADDRESS, NumberFormat.Int16LE);
    }

    function enable(): void {
        setreg(TCS34725_ENABLE, TCS34725_ENABLE_PON);
        basic.pause(3);
        setreg(TCS34725_ENABLE, TCS34725_ENABLE_PON | TCS34725_ENABLE_AEN);
    }
    function disable(): void {
        let reg = 0;
        reg = getreg(TCS34725_ENABLE);
        setreg(TCS34725_ENABLE, reg & ~(TCS34725_ENABLE_PON | TCS34725_ENABLE_AEN));
    }
    function setIntLimits(low: number, high: number): void {
        setreg(0x04, low & 0xFF);
        setreg(0x05, low >> 8);
        setreg(0x06, high & 0xFF);
        setreg(0x07, high >> 8);
    }
    function setIntegrationTime(it: tcs34725IntegrationTime_t): void {
        setreg(TCS34725_ATIME, it);    /* Update the timing register */
        _tcs34725IntegrationTime = it; /* Update value placeholders */
    }
    function setGain(gain: tcs34725Gain_t): void {
        setreg(TCS34725_CONTROL, gain);  /* Update the timing register */
        _tcs34725Gain = gain;/* Update value placeholders */
    }
    /**
     * 初始化颜色传感器
     */
    //% blockId="INIT_TCS34725" block="初始化颜色传感器"
    //% weight=100 color=#000011
    export function init_TCS34725(): void {
        /* Make sure we're actually connected */
        let x: number;
        _tcs34725Gain = tcs34725Gain_t.TCS34725_GAIN_16X;
        _tcs34725IntegrationTime = tcs34725IntegrationTime_t.TCS34725_INTEGRATIONTIME_50MS;
        x = getreg(TCS34725_ID);
        if ((x != 0x44) && (x != 0x10)) {
            return;
        }
        _tcs34725Initialised = 1;
        setIntegrationTime(_tcs34725IntegrationTime);  /* Set default integration time and gain */
        setGain(_tcs34725Gain);
        enable(); /* Note: by default, the device is in power down mode on bootup */
    }
    /**
     * 从传感器读取颜色值.
     */
    //% blockId="GET_RAW_DATA" block="从传感器读取颜色值"
    //% weight=99 color=#000012
    export function getRawData(): void {
        c = getUInt16LE(TCS34725_CDATAL);
        r = getUInt16LE(TCS34725_RDATAL);
        g = getUInt16LE(TCS34725_GDATAL);
        b = getUInt16LE(TCS34725_BDATAL);
        /* Set a delay for the integration time */
        switch (_tcs34725IntegrationTime) {
            case tcs34725IntegrationTime_t.TCS34725_INTEGRATIONTIME_2_4MS:
                basic.pause(3);
                break;
            case tcs34725IntegrationTime_t.TCS34725_INTEGRATIONTIME_24MS:
                basic.pause(24);
                break;
            case tcs34725IntegrationTime_t.TCS34725_INTEGRATIONTIME_50MS:
                basic.pause(50);
                break;
            case tcs34725IntegrationTime_t.TCS34725_INTEGRATIONTIME_101MS:
                basic.pause(101);
                break;
            case tcs34725IntegrationTime_t.TCS34725_INTEGRATIONTIME_154MS:
                basic.pause(154);
                break;
            case tcs34725IntegrationTime_t.TCS34725_INTEGRATIONTIME_700MS:
                basic.pause(700);
                break;
        }
    }
    /**
     * 色温值.
     */
    //% blockId="CALCULATE_TEMPERATURE" block="色温值"
    //% weight=93 blockGap=8
    export function calculateColorTemperature(): number {

        let X: number;
        let Y: number;
        let Z: number;      /* RGB to XYZ correlation      */
        let xc: number;
        let yc: number;       /* Chromaticity co-ordinates   */
        let n: number;           /* McCamy's formula            */
        let cct: number;

        /* 1. Map RGB values to their XYZ counterparts.    */
        /* Based on 6500K fluorescent, 3000K fluorescent   */
        /* and 60W incandescent values for a wide range.   */
        /* Note: Y = Illuminance or lux                    */
        X = (-14 * r) + (155 * g) + (-96 * b);
        Y = (-32 * r) + (158 * g) + (-74 * b);
        Z = (-68 * r) + (77 * g) + (56 * b);

        /* 2. Calculate the chromaticity co-ordinates      */
        xc = (X) / (X + Y + Z);
        yc = (Y) / (X + Y + Z);

        /* 3. Use McCamy's formula to determine the CCT    */
        n = (100 * xc - 33) / (18 - 100 * yc);

        /* Calculate the final CCT */
        cct = ((449 * Math.pow(n, 3)) / 1000000 + (3525 * Math.pow(n, 2)) / 10000 + (6823 * n) / 100 + 5520);

        /* Return the results in degrees Kelvin */
        return cct;
    }
    /**
     * 光强值.
     */
    //% blockId="CALCULATE_LUX" block="光强值"
    //% weight=92 blockGap=8
    export function calculateLux(): number {
        let illuminance: number;
        /* This only uses RGB ... how can we integrate clear or calculate lux */
        /* based exclusively on clear since this might be more reliable?      */
        illuminance = (-32 * r + 157 * g - 73 * b) / 100;
        return illuminance;
    }

    /**
    * 红色值.
    */
    //% blockId="GET_R_COLOR_DATA" block="红色值"
    //% weight=96 blockGap=8
    export function get_r_data(): number {
        return Math.floor(255*r/c);
    }
    /**
  * 绿色值.
  */
    //% blockId="GET_G_COLOR_DATA" block="绿色值"
    //% weight=95 blockGap=8
    export function get_g_data(): number {
        return Math.floor(255*g/c);
    }
    /**
  * 蓝色值.
  */
    //% blockId="GET_B_COLOR_DATA" block="蓝色值"
    //% weight=94 blockGap=8
    export function get_b_data(): number {
        return Math.floor(255*b/c);
    }
}
