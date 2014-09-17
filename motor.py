import os,sys
import serial
import time
ser = serial.Serial("/dev/ttyACM0",115200, timeout= 2)

class Motor(object):
    def __init__(self, which_motor, speed = 0):
        global ser
        self._speed = speed
        if which_motor == 0:
            self.motor_side = "left"
        elif which_motor ==1:
            self.motor_side = "right"
        

    @property
    def speed(self):
        return self._speed


    @speed.setter
    def speed(self, value):
        self._speed = value
         
        print "1257," + str(self.motor_side)+ str(self._speed)
            
        
        elif self._speed >100 or self._speed < -100:
            print "1257 ERROR - Speed value out of Range"
            sys.exit()

    @speed.deleter
    def speed(self):
        del self._speed
