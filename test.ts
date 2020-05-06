// tests go here; this will not be compiled when this package is used as a library
// tests go here; this will not be compiled when this package is used as a library
TCS34725_I2C.init_TCS34725();
basic.forever(() => {
    TCS34725_I2C.getRawData();
    serial.writeValue("r", TCS34725_I2C.get_r_data())
    serial.writeValue("g", TCS34725_I2C.get_g_data())
    serial.writeValue("b", TCS34725_I2C.get_b_data())
    serial.writeValue("colorTemp", TCS34725_I2C.calculateColorTemperature())
    serial.writeValue("lux", TCS34725_I2C.calculateLux())
    basic.pause(2000)
})
