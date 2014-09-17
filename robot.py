
import motor
import time
import random
import os,sys
from vision import *

'''
Created By Adam Ferguson (RoboPython @ RoboArmadillo) 2013
'''


round_length = 180

class Robot(object):
	def __init__(self):
		self.zone = 0

		self.motors = [	motor.Motor(0,0),
				motor.Motor(1,0)]

		def Timer_exit(round_length):
			while True:
				time.sleep(round_length)
				print "END OF ROUND, NOW EXITING CODE."
				thread.interrupt_main()

		if self.mode == "comp":
			thread.start_new_thread(Timer_exit,(round_length))


	def see(self, (WIDTH, HEIGHT)=(1280,1024), preview=True, preview_time=1):
            n=vision_see((WIDTH, HEIGHT), preview, preview_time)
            return n 
